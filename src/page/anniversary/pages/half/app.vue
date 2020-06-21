<template>
  <div id="box">
    <HeaderBanner id="HeaderBanner" :options="options" />
    <!-- 菜单、内容 -->
    <div class="half-nav-box-height" v-if="fixed"></div>
    <div class="half-nav-box" id="navs" :class="{fixed:fixed}">
      <van-tabs type="card" @click="navClick" id="half-box">
        <van-tab v-for="(nav, index) in navs" :key="index" :title="nav.name"></van-tab>
      </van-tabs>
    </div>
    <div class="goods-box">
      <div
        class="goods"
        :class="{'goods-over': goods.totalStock == 0 || !goods.totalStock}"
        v-for="(goods, index) in dataSlice(goodsData)"
        :key="index"
        @click="toGoods(goods.goodsId, goods.goodsName, goods.totalStock == 0 || !goods.totalStock)"
      >
        <!-- residue为0的时候icon不显示 -->
        <div class="icon" v-if="Number(goods.residue) > 0 || !!goods.residue">前{{Number(goods.storeLimit)}}件半价</div>
        <div class="goods-img">
          <img class="goods-img-img" v-lazy="goods.img640Url" alt />
        </div>
        <h3 class="goods-title">{{ goods.goodsName }}</h3>
        <div class="goods-price">
          <div class="price-box">
            <span class="price-new">
              <font>￥</font>{{ Number(goods.minGroupPrice) }}
            </span>
            <span class="price-old">￥{{ Number(goods.shopPrice) }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- more -->
    <div id="more" v-if="options.shareBtn && toMoreFirst">
      <a href="javascript:;" class="more" @click="toMore"></a>
    </div>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("./../../assets/images/half/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("./../../assets/images/icon/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "2.15rem",
            height: ".93rem",
            right: "0.17rem",
            top: ".24rem"
          },
          shareXCX: true,
          shareXCXTitle: "快来抢限量半价 好货0.1元起",
          shareXCXImg: "share/half.jpg"
        }
      },
      msgTxt: null,
      // 菜单
      navs: [
        {
          name: "精选推荐",
          coordinate: "14-1",
          moreId: "",
          moreName: ""
        },
        {
          name: "潮流服饰",
          coordinate: "14-2",
          moreId: "315",
          moreName: "服饰"
        },
        {
          name: "家居百货",
          coordinate: "14-3",
          moreId: "406",
          moreName: "百货"
        },
        {
          name: "时尚鞋包",
          coordinate: "14-4",
          moreId: "328",
          moreName: "鞋包"
        },
        {
          name: "美妆个护",
          coordinate: "14-5",
          moreId: "332",
          moreName: "美妆"
        },
        {
          name: "休闲美食",
          coordinate: "14-6",
          moreId: "361",
          moreName: "食品"
        },
        {
          name: "3C生活",
          coordinate: "14-7",
          moreId: "340",
          moreName: "手机"
        }
      ],
      goodsData: [],
      goodsIdData: [],
      page: 1,
      pageSize: 20,
      totalPage: 0,
      loading: false,
      toMoreId: null,
      toMoreName: null,
      coordinate: "14-1",
      tabName: "精选推荐",
      toMoreFirst: false,
      fixed_top: 0,
      fixed: false,
      init: true,
    };
  },
  created() {
    this.fixed = false;
    document.getElementsByTagName("html")[0].style.backgroundColor = "#f01a0b";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f01a0b";
    vm = this;
    this.initPv();
    this.goodsId();
  },
  methods: {
    // 菜单点击
    navClick(index, title) {
      this.coordinate = this.navs[index].coordinate;
      this.tabName = title;
      this.toMoreId = this.navs[index].moreId;
      this.toMoreName = this.navs[index].moreName;
      this.page = 1;
      this.loading = false;
      if (index == 0) {
        this.toMoreFirst = false;
      } else if (xcx_user) {
        this.toMoreFirst = false;
      } else {
        this.toMoreFirst = true;
      }
      this.goodsId();
    },
    // 获取商品id
    goodsId() {
      let params = {
        coordinate: this.coordinate,
        activity_id: 1
      };
      this.$http.get(this.$api.goods_list, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.goodsIdData = data.data.goods_ids;
          if(!!vm.goodsIdData){
            vm.goodsInfo()
          }else{
            vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, '获取商品id为空，参数：data.data.goods_ids' + data.data.goods_ids, res.status);
          }
        } else {
          vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        }
      });
    },
    // 获取商品详细信息
    goodsInfo() {
      let params = {
        page: vm.page,
        pageSize: vm.pageSize,
        goodsIds: vm.goodsIdData,
        stockNullShow: 1,
        orderType: 0,
      };
      this.$http.post(this.$api.goods_info, params).then(javaRes => {
        let javaData = javaRes.data;
        console.log(javaData);
        if (javaData.status == "1") {
          if (vm.page == 1) {
            vm.goodsData = [];
          }
          vm.page++;
          vm.totalPage = javaData.totalPage;
          vm.goodsData = vm.goodsData.concat(javaData.data);
          vm.loading = true;
          if(vm.init){
            vm.$forceUpdate();
            document.body.scrollTop = 0.1;
            vm.init = false;
          }
        } else {
          vm.msgTxt = javaData.message;
          vm.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, javaData.message, javaRes.status);
        }
      });
    },
    // 跳转商品 name传值 埋点开关
    toGoods(id, name, btn) {
      if(btn){
        this.msgTxt = '该商品已售罄';
        return false;
      }
      this.$.jump2good({
        goodsId: id,
        goodsName: name,
        elementId: "good_detail",
        pageName: "zhounian_20",
        tabName: this.tabName
      });
    },
    // 二级分类页
    toMore() {
      this.$.toCATE({
        id: this.toMoreId,
        name: this.toMoreName
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      this.$.initPv({
        pageName: "zhounian_20"
      });
    },
    // 数据截取
    dataSlice(data) {
      let dataLength = data.length;
      let yNum = dataLength % 3;
      if (yNum != 0 && dataLength > 1) {
        data = data.slice(0, dataLength - yNum);
      }
      return data;
    },
    // 监听滚动
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // alert(this.fixed)
      if (!this.fixed) {
        this.fixed_top = document.getElementById("navs").offsetTop;
        console.log(this.fixed_top)
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }

      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }

      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      if (
        scrollHeight - clientHeight <= scrollTop + 300 &&
        this.loading &&
        vm.totalPage >= vm.page
      ) {
        // 下拉加载
        vm.loading = false;
        this.goodsInfo();
      }
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      if (user_id) {
      } else {
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
      }
    };
    window.addEventListener("scroll", this.handleScroll);
    if (xcx_user) {
      vm.options.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      this.$.checkLogin();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
#box {
  background: #f01a0b;
  -webkit-user-select: none;
  user-select: none;
}
#HeaderBanner{
  width: 100%;
  min-height: 6rem;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  padding: 0 0.18rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .32rem;
  background: #f01a0b;
}
.goods {
  width: 3.82rem;
  overflow: hidden;
  /* border-radius: 0 0 0.16rem 0.16rem; */
  margin-bottom: 0.11rem;
  position: relative;
  height: 5.03rem;
  background: url("./../../assets/images/half/good_bg.png") right center no-repeat;
  background-size: 100% 5.03rem;
}
.icon {
  position: absolute;
  width: 2.5rem;
  height: 0.61rem;
  line-height: 0.71rem;
  left: 0;
  top: 3rem;
  background: url("./../../assets/images/half/icon.png") left center no-repeat;
  background-size: 100%;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0;
  color: #fff;
  text-indent: 0.5rem;
  z-index: 9;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.goods-img {
  width: 100%;
  height: 3.8rem;
  background: #ffe1e1;
  overflow: hidden;
}
.goods-img-img {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.goods-title {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0;
  color: #333;
  padding: 0 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-price {
  height: 0.7rem;
  width: 100%;
}
.goods-over {
  background: url("./../../assets/images/half/good_over.png") right center no-repeat;
  background-size: cover;
}
.price-box {
  width: 3rem;
  height: 0.7rem;
  float: left;
  overflow: hidden;
  margin-left: 0.08rem;
  /* padding-top: 0.1rem; */
}
.price-box span {
  font-family: PingFang-SC-Heavy;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  display: inline-block;
  float: left;
}
.price-box .price-new {
  font-size: 0.53rem;
  color: #ff3333;
  height: 0.17rem;
}
.price-box .price-new font {
  font-size: 0.22rem;
}
.price-box .price-old {
  font-size: 0.22rem;
  color: #000;
  opacity: 0.4;
  margin-top: 0.25rem;
  margin-left: 0.06rem;
  letter-spacing: -0.02rem;
  height: 0.17rem;
  text-decoration: line-through;
}
#more {
  width: 100%;
  height: 2.35rem;
  background: #f01a0b;
  overflow: hidden;
}
.more {
  display: block;
  width: 5.08rem;
  height: 1.07rem;
  overflow: hidden;
  background: url("./../../assets/images/half/more.png") center center no-repeat;
  background-size: 100%;
  margin: 0.54rem auto 0;
}
.half-nav-box{
  width: 100%;
  overflow: hidden;
  height: 0.87rem;
}
.half-nav-box-height{
  width: 100%;
  overflow: hidden;
  height: 0.87rem;
}
.fixed{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>
<style>
html,
body {
  /* background: #f01a0b; */
}
#half-box .van-tabs__nav--card {
  margin: 0;
  height: 0.87rem;
}
#half-box .van-tabs__wrap {
  height: 0.87rem;
}
#half-box .van-tabs__wrap--scrollable .van-tabs__nav {
  padding: 0.05rem 0;
  margin: 0;
  border: none;
  background: #ffc344;
  border-radius: 0;
  overflow-y: hidden;
  height: 1.3rem;
}
#half-box .van-tabs__nav--card .van-tab {
  width: 2.55rem;
  margin: 0;
  height: 0.77rem;
  opacity: 0.8;
  background: #fea92c;
  font-family: Tianshi-Yanti;
  font-size: 0.48rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.77rem;
  letter-spacing: 0px;
  color: #f40606;
  border-right: none;
  border-left: 0.05rem solid #ffc344;
  padding: 0;
}
#half-box .van-tabs__nav--card .van-tab:last-child {
  border-right: 0.05rem solid #ffc344;
}
#half-box .van-tabs__nav--card .van-tab.van-tab--active {
  background: #ae0508;
  color: #fdfcb3;
  opacity: 1;
}
#half-box {
  padding-top: 1.09rem;
}
#half-box .van-tabs__content {
  background: #f01a0b;
}
</style>