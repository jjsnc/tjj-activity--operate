<template>
  <div id="box">
    <HeaderBanner :options="options" />
    <!-- 菜单、内容 -->
    <van-tabs type="card" sticky @click="navClick">
      <van-tab v-for="(nav, index) in navs" :key="index" :title="nav.name">
        <div class="goods-box">
          <div
            class="goods"
            v-for="(goods, index) in dataSlice(goodsData)"
            :key="index"
            @click="toGoods(goods.goodsId, goods.goodsName)"
          >
            <span class="icon"></span>
            <div class="goods-img">
              <img class="goods-img-img" v-lazy="goods.img640Url" alt />
            </div>
            <h3 class="goods-title">{{ goods.goodsName }}</h3>
            <div class="goods-price">
              <div class="price-box">
                <span class="price-new">
                  <font>￥</font>{{ goods.minGroupPrice }}
                </span>
                <span class="price-old">￥{{ goods.shopPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <!-- more -->
    <div id="more" v-if="options.shareBtn">
      <a href="javascript:;" class="more" @click="toMore"></a>
    </div>
    <ToTop />
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
        imgUrl: require("./../../assets/images/one/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("./../../assets/images/icon/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "2.15rem",
            height: ".93rem",
            right: "0.17rem",
            top: ".24rem"
          }
        }
      },
      msgTxt: null,
      // 菜单
      navs: [
        {
          name: "特色推荐",
          id: 1
        },
        {
          name: "潮流服饰",
          id: 2
        },
        {
          name: "家居百货",
          id: 3
        },
        {
          name: "时尚鞋包",
          id: 4
        },
        {
          name: "美妆个护",
          id: 5
        },
        {
          name: "休闲美食",
          id: 6
        },
        {
          name: "3C生活",
          id: 7
        }
      ],
      navIndex: 0,
      goodsData: [],
      goodsIdData: [],
      page: 1,
      pageSize: 30,
      totalPage: 0,
      loading: false,
      toMoreId: null,
      toMoreName: null,
      num: 1
    };
  },
  created() {
    vm = this;
    let str = "";
    for (let index = 100; index < 300; index++) {
      str += index + ",";
    }
    console.log(str);
    this.goodsId();
  },
  methods: {
    // 菜单点击
    navClick(index, title) {
      this.page = 1;
      this.loading = false;
      this.goodsData = [];
      this.goodsInfo();
    },
    // 获取商品id
    goodsId() {
      let params = {
        user_id: 1,
        coordinate: 1,
        activity_id: 1
      };
      this.$http.get(this.$api.goods_list, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.goodsIdData = data.data.goods_ids.join(",");
          vm.goodsIdData =
            "220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481";
          vm.goodsInfo();
        } else {
          vm.msgTxt = data.message;
        }
      });
    },
    // 获取商品详细信息
    goodsInfo() {
      let params = {
        page: vm.page,
        pageSize: vm.pageSize,
        goodsIds: vm.goodsIdData
      };
      this.$http.get(this.$api.goods_info, { params }).then(javaRes => {
        let javaData = javaRes.data;
        console.log(javaData);
        if (javaData.status == "1") {
          vm.page++;
          vm.totalPage = javaData.totalPage;
          vm.goodsData = vm.goodsData.concat(javaData.data);
          vm.loading = true;
          // if (vm.totalPage < vm.page) {
          //   alert("我是有底线的！！！");
          //   return false;
          // }
        } else {
          vm.msgTxt = javaData.message;
        }
      });
    },
    // 获取菜单
    initTab() {},
    // 跳转商品 name传值 埋点开关
    toGoods(id, name) {
      this.$.jump2good({
        goodsId: id,
        goodsName: name,
        activityName: "8月8周年庆"
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
      this.$.initPv();
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
      let params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "首页"
      };
      this.$send.sendPoint(params);
      if (user_id) {
      } else {
        this.$.login();
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
.goods-box {
  width: 100%;
  overflow: hidden;
  padding: 0 0.18rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.goods {
  width: calc(calc(100% - 0.22rem) / 3);
  overflow: hidden;
  background: #fff;
  border-radius: 0 0 0.16rem 0.16rem;
  margin-bottom: 0.11rem;
  position: relative;
}
.icon {
  position: absolute;
  width: 0.82rem;
  height: 0.8rem;
  left: 0.07rem;
  top: 0;
  background: url("./../../assets/images/one/icon.png") center top no-repeat;
  background-size: 100%;
}
.goods-img {
  width: 100%;
  height: 3.8rem;
  background: #ffe1e1;
}
.goods-img-img {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.goods-title {
  width: 100%;
  height: 0.56rem;
  line-height: 0.56rem;
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
  height: 0.67rem;
  width: 100%;
  background: url("./../../assets/images/one/go.png") right center no-repeat;
  background-size: 1.98rem 0.67rem;
}
.price-box {
  width: 3rem;
  height: 0.67rem;
  float: left;
  overflow: hidden;
  margin-left: 0.08rem;
  padding-top: 0.1rem;
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
  background: url("./../../assets/images/one/more.png") center center no-repeat;
  background-size: 100%;
  margin: 0.54rem auto 0;
}
</style>
<style>
html,
body {
  background: #f01a0b;
}
.van-tabs__nav--card {
  margin: 0 !important;
  height: 0.87rem !important;
}
.van-tabs--card .van-tabs__wrap {
  height: 0.87rem !important;
}
.van-tabs__wrap--scrollable .van-tabs__nav {
  padding: 0.05rem 0 !important;
  margin: 0 !important;
  border: none !important;
  background: #ffc344 !important;
  border-radius: 0 !important;
}
.van-tabs__nav--card .van-tab {
  width: 2.55rem !important;
  margin: 0 !important;
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
  margin-left: 0.05rem;
  border-right: none;
  border-left: 0.05rem solid #ffc344;
  padding: 0 !important;
}
.van-tabs__nav--card .van-tab:last-child {
  border-right: 0.05rem solid #ffc344;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  background: #ae0508;
  color: #fdfcb3;
}
.van-tabs--card {
  padding-top: 1.09rem;
}
.van-tabs__content {
  background: #f01a0b;
}
</style>