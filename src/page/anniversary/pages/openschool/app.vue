<template>
  <div id="box">
    <HeaderBanner :options="options" />
    <img src="./../../assets/images/openschool/banner_1.jpg" alt />
    <div class="img-box img-box-share">
      <div class="share-has" v-for="(el, index) in couponData" :key="index">
        <div class="share-has-box">
          <span class="share-has-price">
            <font>￥</font>
            <font>{{ Number(el.discount) }}</font>现金券
          </span>
          <span
            class="share-has-share"
            v-if="el.status == 1 && !couponUse[index]"
            @click="couponShare(index)"
          ></span>
          <span
            class="share-has-share share-has-over"
            v-if="el.status == 2"
            @click="msgTxt = '已抢完'"
          ></span>
          <span
            class="share-has-share share-has-use"
            v-if="el.status == 3 || couponUse[index]"
            @click="useClick"
          ></span>
        </div>
      </div>
    </div>
    <div class="img-box">
      <img src="./../../assets/images/openschool/banner_3.jpg" alt />
      <div class="lx-box">
        <a href="javascript:;" class="lx-box-list" v-for="(el, index) in href1" :key="index" @click="toPage(el)"></a>
      </div>
    </div>
    <div class="img-box img-box-sec">
      <img src="./../../assets/images/openschool/banner_4.png" alt />
      <div class="lx-box lx-box-sec">
        <a href="javascript:;" class="lx-box-sec-list" v-for="(el, index) in href2" :key="index" @click="toPage(el)"></a>
      </div>
    </div>
    <!-- 菜单、内容 -->
    <div class="openschool-nav-box-height" v-if="fixed"></div>
    <div class="openschool-nav-box" id="nav" :class="{fixed:fixed}">
      <van-tabs type="card" @click="navClick" class="navs" id="openschool-box">
        <van-tab v-for="(nav, index) in navs" :key="index" :title="nav.name"></van-tab>
      </van-tabs>
    </div>
    <div class="goods-box">
      <div
        class="goods"
        v-for="(goods, index) in dataSlice(goodsData)"
        :key="index"
        @click="toGoods(goods.goodsId, goods.goodsName, goods.totalStock == 0 || !goods.totalStock)"
      >
        <div class="goods-img">
          <img class="goods-img-img" v-lazy="goods.img640Url" alt />
        </div>
        <h3 class="goods-title">{{ goods.goodsName }}</h3>
        <div class="goods-price" :class="{'goods-price-over': goods.totalStock == 0 || !goods.totalStock}">
          <span class="price-new-num">￥{{ Number(goods.minGroupPrice) }}</span>
          <span class="price-old">￥{{ Number(goods.shopPrice) }}</span>
        </div>
      </div>
    </div>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
import roll from "./../../components/roll";
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
import { scroller } from "vue-scrollto/src/scrollTo";
const scrollerTo = scroller();
export default {
  components: {
    roll
  },
  data() {
    // 优惠券coordinate 18-8
    // 优惠券第一张coordinate 18-8-1
    // 优惠券第二张coordinate 18-8-2
    return {
      // 头部组件传参
      options: {
        imgUrl: require("./../../assets/images/openschool/banner.png"),
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
          shareXCXTitle: "开学季，新生价最低只需0.1元",
          shareXCXImg: "share/openschool.jpg"
        }
      },
      msgTxt: null,
      // 菜单
      navs: [
        {
          name: "靓丽女装",
          coordinate: "18-1"
        },
        {
          name: "床品家纺",
          coordinate: "18-2"
        },
        {
          name: "帅气男装",
          coordinate: "18-3"
        },
        {
          name: "箱包配饰",
          coordinate: "18-4"
        },
        {
          name: "潮童萌宝",
          coordinate: "18-5"
        },
        {
          name: "家电百货",
          coordinate: "18-6"
        },
        {
          name: "食品生鲜",
          coordinate: "18-7"
        }
      ],
      goodsData: [],
      goodsIdData: [],
      page: 1,
      pageSize: 20,
      totalPage: 0,
      loading: false,
      // status: 优惠券状态，1：未领取，2：无库存，3：已领取
      couponData: [],
      couponNum: 0,
      couponUse: {
        0: false,
        1: false
      },
      href1: [
        'https://modeup.taojiji.com/taojiji/pages/2019/07/1514117b2a6e622532-html5.html', // 开学做淑女
        'https://modeup.taojiji.com/taojiji/pages/2019/07/199fde382c001ce2c9-html5.html', // 床品家纺
        'https://modeup.taojiji.com/taojiji/pages/2019/07/15b8765365b3263a15-html5.html', // 球打得好
        'https://modeup.taojiji.com/taojiji/pages/2019/07/18bfec6cc7a86d9bd4-html5.html', // 背个包说走就走
      ],
      href2: [
        'https://modeup.taojiji.com/taojiji/pages/2019/07/1830738a418e133bbd-html5.html', // 潮童萌宝
        'https://modeup.taojiji.com/taojiji/pages/2019/07/18fcd5b5109c675f89-html5.html', // 家电百货
        'https://modeup.taojiji.com/taojiji/pages/2019/07/1612b27e8b427f9486-html5.html', // 食品生鲜
      ],
      coordinate: "18-1",
      tabName: "靓丽女装",
      fixed: false,
      fixed_top: 0,
    };
  },
  created() {
    document.getElementsByTagName("html")[0].style.backgroundColor = "#e50a00";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#e50a00";
    vm = this;
    this.initPv();
    this.goodsId();
  },
  methods: {
    // 优惠券列表
    couponList() {
      let params = {
        coordinate: "18-8",
        activity_id: 1
      };
      this.$http.get(this.$api.categoryList, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == 1) {
          vm.couponData = data.data.coupon_list;
        } else if (data.result == '-51') {
          // 拉取优惠券的列表不正常
          // vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        } else {
          vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        }
      });
    },
    // 优惠券分享
    couponShare(index) {
      this.shareClick();
      this.couponNum = Number(index) + 1;
      let params = {
        coordinate: "18-8",
        num: this.couponNum,
        activity_id: 1
      };
      setTimeout(function(){
        vm.$http.get(vm.$api.categoryShare, { params }).then(res => {
          let data = res.data;
          console.log(data);
          if (data.result == 1) {
            vm.$set(vm.couponUse, index, true);
          } else if (data.result == "-51") {
            vm.$set(vm.couponUse, index, true);
          } else {
            vm.msgTxt = data.message;
            vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
          }
        });
      },300)
    },
    // 菜单点击
    navClick(index, title) {
      this.coordinate = this.navs[index].coordinate;
      this.tabName = title;
      this.page = 1;
      this.loading = false;
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
        pageName: "zhounian_17",
        tabName: this.tabName
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      this.$.initPv({
        pageName: "zhounian_17"
      });
    },
    // 分享
    shareClick() {
      if (this.$.xcx()) {
        this.$.share({
          title: "开学季，新生价最低只需0.1元",
          shareActivity: 0,
          shareUrl:
            window.location.origin + "/project/anniversary/view/openschool",
          imgUrl: require("./../../assets/images/share/openschool.jpg")
        });
      } else {
        this.shareMini("share/openschool.jpg", "开学季，新生价最低只需0.1元");
      }
    },
    // 优惠券使用
    useClick() {
      scrollerTo(".navs");
    },
    // 数据截取
    dataSlice(data) {
      let dataLength = data.length;
      let yNum = dataLength % 2;
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

      if (!this.fixed) {
        this.fixed_top = document.getElementById("nav").offsetTop;
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
    },
    // 页面跳转
    toPage(page){
      window.location.href = page;
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      if (user_id) {
        this.couponList();
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
  background: #e50a00;
  -webkit-user-select: none;
  user-select: none;
}
.img-box {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.img-box-sec {
  padding-bottom: 0.3rem;
  background: #e50a00;
}
img {
  display: block;
  width: 100%;
  overflow: hidden;
}
.share-has {
  position: absolute;
  width: 5.6rem;
  height: 2.74rem;
  top: 0.2rem;
}
.share-has:first-of-type {
  left: 0.23rem;
}
.share-has:last-child {
  right: 0.23rem;
}
.lx-box {
  position: absolute;
  width: calc(100% - 0.32rem);
  height: 6.9rem;
  left: 0.16rem;
  top: 0.3rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.lx-box-list {
  width: calc(calc(100% - 0.12rem) / 2);
  height: 3.26rem;
  margin-bottom: 0.3rem;
}
.lx-box-sec {
  height: 4.4rem;
  top: 0;
}
.lx-box-sec-list {
  width: calc(calc(100% - 0.36rem) / 3);
  height: 4.4rem;
  margin-bottom: 0;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .34rem;
}
.goods {
  width: calc(calc(100% - 0.08rem) / 2);
  overflow: hidden;
  background: #fff;
  margin-bottom: 0.5rem;
  position: relative;
  height: 7.78rem;
  border-radius: 0 0 0.16rem 0.16rem;
}
.goods-img {
  width: 100%;
  height: 5.78rem;
}
.goods-img-img {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.goods-title {
  width: 100%;
  height: 1rem;
  line-height: 0.9rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0;
  padding: 0 0.17rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: PingFang-SC-Bold;
  font-size: 0.6rem;
  color: #333333;
}
.goods-price {
  height: 1rem;
  width: 101%;
  background: url("./../../assets/images/girl/go.png") right bottom no-repeat;
  background-size: 3rem 1rem;
}
.goods-price-over{
  background: url("./../../assets/images/girl/over.png") right bottom no-repeat;
  background-size: 3rem 1rem;
}
.goods-price span {
  font-family: SourceHanSansCN-Medium;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  display: inline-block;
  float: left;
}
.goods-price .price-new-num {
  font-size: 0.58rem;
  color: #ff4860;
  margin-top: 0.28rem;
  margin-left: 0.12rem;
}
.goods-price .price-old {
  font-size: 0.39rem;
  margin-left: 0.12rem;
  margin-top: 0.4rem;
  text-decoration: line-through;
  font-family: PingFang-SC-Regular;
  font-size: 0.44rem;
  color: #000;
  opacity: 0.4;
}
.img-box-share {
  height: 3.19rem;
  background: #d30000;
}
.share-has {
  background: url("./../../assets/images/openschool/coupon_bg.png") center
    center no-repeat;
  background-size: 5.6rem 2.74rem;
}
.share-has-box {
  width: 100%;
  height: 2.74rem;
  position: relative;
}
.share-has-box span {
  position: absolute;
}
.share-has-price {
  font-family: AliHYAiHei;
  font-size: 0.62rem;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
  top: 0.72rem;
  left: 0.47rem;
  line-height: 0.62rem;
}
.share-has-price font {
  color: #eefd06;
  float: left;
}
.share-has-price font:first-child {
  font-size: 0.38rem;
  margin-right: -0.06rem;
  line-height: 0.38rem;
  margin-top: 0.1rem;
}
.share-has-share {
  width: 2.79rem;
  height: 1rem;
  left: 0.64rem;
  top: 1.66rem;
  background: url("./../../assets/images/openschool/coupon_share.png") center
    center no-repeat;
  background-size: 2.79rem 1rem;
}
.share-has-use {
  background: url("./../../assets/images/openschool/coupon_use.png") center
    center no-repeat;
  background-size: 2.79rem 1rem;
}
.share-has-over {
  background: url("./../../assets/images/openschool/coupon_over.png") center
    center no-repeat;
  background-size: 2.79rem 1rem;
}
.openschool-nav-box{
  height: 0.96rem;
  overflow: hidden;
  width: 100%;
}
.openschool-nav-box-height{
  height: 0.96rem;
  overflow: hidden;
  width: 100%;
}
.fixed{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
}
</style>
<style>
html,
body {
  /* background: #e50a00; */
}
#openschool-box .van-tabs__nav--card {
  margin: 0;
  height: 0.96rem;
  background: #e50a00;
}
#openschool-box .van-tabs__wrap {
  height: 0.96rem;
}
#openschool-box .van-tabs__wrap--scrollable .van-tabs__nav {
  padding: 0;
  margin: 0;
  border: none;
  background: #e50a00;
  border-radius: 0;
  height: 1.16rem;
}
#openschool-box .van-tabs__nav--card .van-tab {
  width: 2rem;
  margin: 0;
  margin-left: 0.03rem;
  height: 0.96rem;
  font-family: Tianshi-Yanti;
  font-size: 0.46rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.96rem;
  color: #ffc6cb;
  border: none;
  padding: 0;
  text-align: center;
  background: #ff6059;
  letter-spacing: 0px;
}
#openschool-box .van-tabs__nav--card .van-tab:first-child {
  margin-left: 0;
}
#openschool-box .van-tabs__nav--card .van-tab.van-tab--active {
  background: #c10800;
}
#openschool-box {
  padding-top: 1.3rem;
  background: #e50a00;
}
#openschool-box .van-tabs__content {
  background: #e50a00;
}
</style>