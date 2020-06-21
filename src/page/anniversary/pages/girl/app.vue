<template>
  <div id="box">
    <HeaderBanner :options="options" />
    <img src="./../../assets/images/girl/banner_1.jpg" alt />
    <img src="./../../assets/images/girl/banner_2.jpg" alt />
    <!-- 分享领钱 -->
    <div class="img-box img-box-share">
      <div class="share-has" v-for="(el, index) in couponData" :key="index">
        <div class="share-has-box">
          <span class="share-has-price">{{ el.discount | price_point_no_zero }}</span>
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
    <!-- 穿搭攻略 -->
    <div class="img-box">
      <img src="./../../assets/images/girl/banner_4.jpg" alt />
      <div class="lx-box">
        <a href="javascript:;" v-for="(el, index) in href1" :key="index" class="lx-box-list" @click="toPage(el)"></a>
      </div>
    </div>
    <!-- 流行解读 -->
    <div class="img-box">
      <img src="./../../assets/images/girl/banner_5.jpg" alt />
      <div class="cd-box">
        <div class="cd-box-top">
          <a href="javascript:;" @click="toPage(href2)" class="cd-box-top-list"></a>
          <div class="cd-box-top-list">
            <a href="javascript:;" v-for="(el, index) in href3" :key="index" @click="toPage(el)" class="cd-box-top-list-list"></a>
          </div>
        </div>
        <div class="cd-box-bottom">
          <a href="javascript:;" v-for="(el, index) in href4" :key="index" @click="toPage(el)" class="cd-box-bottom-list"></a>
        </div>
      </div>
    </div>
    <!-- 菜单、内容 -->
    <div class="girl-nav-box-height" v-if="fixed"></div>
    <div class="girl-nav-box" id="nav" :class="{fixed:fixed}">
      <van-tabs type="card" @click="navClick" class="navs" id="girl-box">
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
    // 优惠券coordinate 15-9
    // 优惠券第一张coordinate 15-9-1
    // 优惠券第二张coordinate 15-9-2
    return {
      // 头部组件传参
      options: {
        imgUrl: require("./../../assets/images/girl/banner.jpg"),
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
          shareXCXTitle: "女王价到 今天我最大！全场低至0.8元",
          shareXCXImg: "share/girl.jpg"
        }
      },
      msgTxt: null,
      // 菜单
      navs: [
        {
          name: "风格会场",
          coordinate: "15-1"
        },
        {
          name: "新品会场",
          coordinate: "15-2"
        },
        {
          name: "女装",
          coordinate: "15-3"
        },
        {
          name: "女鞋",
          coordinate: "15-4"
        },
        {
          name: "美妆",
          coordinate: "15-5"
        },
        {
          name: "内衣",
          coordinate: "15-6"
        },
        {
          name: "箱包",
          coordinate: "15-7"
        },
        {
          name: "配饰",
          coordinate: "15-8"
        }
      ],
      navIndex: 0,
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
      // 穿搭攻略
      href1: [
        'https://modeup.taojiji.com/taojiji/pages/2019/07/15c18062118c876332-html5.html', // 休闲搭配
        'https://modeup.taojiji.com/taojiji/pages/2019/07/152e99e2f0611b18f3-html5.html', // 文艺青年
        'https://modeup.taojiji.com/taojiji/pages/2019/07/15b7c4cdad3b3ccf60-html5.html', // 名媛淑女
        'https://modeup.taojiji.com/taojiji/pages/2019/07/1570c93d4a6d79dde8-html5.html', // 甜美少女
      ],
      // 流行解读
      href2: 'https://modeup.taojiji.com/taojiji/pages/2019/07/15220e5db610909c5c-html5.html', // 女装
      href3: [
        'https://modeup.taojiji.com/taojiji/pages/2019/07/11004a469bc7db99a3-html5.html', // 女鞋
        'https://modeup.taojiji.com/taojiji/pages/2019/07/15e162920dc7b6281e-html5.html' // 美妆
      ],
      href4: [
        'https://modeup.taojiji.com/taojiji/pages/2019/07/15d05f40906c909950-html5.html', // 内衣
        'https://modeup.taojiji.com/taojiji/pages/2019/07/11ed6029d8671ebdfb-html5.html', // 箱包
        'https://modeup.taojiji.com/taojiji/pages/2019/07/16fd2253d8b3d71f5d-html5.html' // 配饰
      ],
      coordinate: "15-1",
      tabName: "风格会场",
      fixed: false,
      fixed_top: 0,
    };
  },
  created() {
    vm = this;
    this.initPv();
    this.goodsId();
     document.getElementsByTagName("html")[0].style.backgroundColor = "#f74141";
     document.getElementsByTagName("body")[0].style.backgroundColor = "#f74141";
   
  },
  methods: {
    // 优惠券列表
    couponList() {
      let params = {
        coordinate: "15-9",
        activity_id: 1
      };
      this.$http.get(this.$api.categoryList, { params }).then(res => {
        console.log(res);
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
        coordinate: "15-9",
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
        pageName: "zhounian_14",
        tabName: this.tabName
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      this.$.initPv({
        pageName: "zhounian_14"
      });
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
    // 分享
    shareClick() {
      if (this.$.xcx()) {
        this.$.share({
          title: "女王价到 今天我最大！全场低至0.8元",
          shareActivity: 0,
          shareUrl: window.location.origin + "/project/anniversary/view/girl",
          imgUrl: require("./../../assets/images/share/girl.jpg")
        });
      } else {
        this.shareMini("share/girl.jpg", "女王价到 今天我最大！全场低至0.8元");
      }
    },
    // 优惠券使用
    useClick() {
      scrollerTo(".navs");
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
  background: #f52a00;
  -webkit-user-select: none;
  user-select: none;
}
.img-box {
  position: relative;
  width: 100%;
  overflow: hidden;
}
img {
  display: block;
  width: 100%;
  overflow: hidden;
}
.share-has {
  position: absolute;
  width: 5.62rem;
  height: 3.27rem;
  top: 0.21rem;
}
.share-has:first-of-type {
  left: 0.23rem;
}
.share-has:last-child {
  right: 0.29rem;
}
.lx-box {
  position: absolute;
  width: calc(100% - 0.66rem);
  height: 13.27rem;
  left: 0.33rem;
  top: 2.44rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.lx-box-list {
  width: calc(calc(100% - 0.12rem) / 2);
  height: 6.58rem;
  margin-bottom: 0.14rem;
}
.cd-box {
  position: absolute;
  width: calc(100% - 0.54rem);
  height: 12.9rem;
  top: 1.4rem;
  left: 0.23rem;
}
.cd-box-top {
  width: 100%;
  height: 8.75rem;
  margin-bottom: 0.1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cd-box-top-list {
  width: calc(calc(100% - 0.07rem) / 2);
  height: 8.75rem;
}
.cd-box-top-list-list {
  display: block;
  width: 100%;
  height: 4.3rem;
  margin-bottom: 0.13rem;
}
.cd-box-top-list-list:last-child {
  margin-bottom: 0;
}
.cd-box-bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 4.12rem;
}
.cd-box-bottom-list {
  width: calc(calc(100% - 0.08rem) / 3);
  height: 4.12rem;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .14rem;
}
.goods {
  width: calc(calc(100% - 0.08rem) / 2);
  overflow: hidden;
  background: #fff;
  margin-bottom: 0.08rem;
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
  height: 3.65rem;
  background: #d30000;
}
.share-has {
  background: url("./../../assets/images/girl/coupon_bg.png") center center
    no-repeat;
  background-size: 5.62rem 3.27rem;
}
.share-has-box {
  width: 100%;
  height: 3.27rem;
  position: relative;
}
.share-has-box span {
  position: absolute;
}
.share-has-time {
  font-family: MyriadPro-Semibold;
  font-size: 0.51rem;
  line-height: 0.51rem;
  font-weight: normal;
  font-stretch: normal;
  color: #ff2222;
  width: 100%;
  text-align: center;
  top: 0.3rem;
}
.share-has-price {
  font-family: Impact;
  font-size: 1.61rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.2rem;
  color: #ff2222;
  left: 1.33rem;
  top: 1rem;
  line-height: 1.61rem;
}
.share-has-share {
  background: url("./../../assets/images/girl/coupon_share.png") center center
    no-repeat;
  background-size: 1.9rem;
  width: 1.9rem;
  height: 1.9rem;
  right: 0.42rem;
  top: 1.1rem;
}
.share-has-over {
  background: url("./../../assets/images/girl/coupon_over.png") center center
    no-repeat;
  background-size: 1.9rem;
}
.share-has-use {
  background: url("./../../assets/images/girl/coupon_use.png") center center
    no-repeat;
  background-size: 1.9rem;
}
.girl-nav-box{
  height: 0.96rem;
  overflow: hidden;
  width: 100%;
}
.girl-nav-box-height{
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
/* html,
body {
  background: #f74141;
} */
#girl-box .van-tabs__nav--card {
  margin: 0;
  height: 0.96rem;
  background: #f74141;
}
#girl-box .van-tabs--card .van-tabs__wrap {
  height: 0.96rem;
}
#girl-box .van-tabs__wrap--scrollable .van-tabs__nav {
  padding: 0;
  margin: 0 0.03rem;
  border: none;
  background: #f74141;
  border-radius: 0;
  overflow-y: hidden;
  height: 1.2rem;
}
#girl-box .van-tabs__nav--card .van-tab {
  width: 2rem;
  margin: 0;
  margin-left: 0.03rem;
  height: 0.96rem;
  opacity: 0.8;
  font-family: Tianshi-Yanti;
  font-size: 0.46rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.96rem;
  color: #fff;
  border: none;
  padding: 0;
  text-align: center;
  background: #c51212;
  letter-spacing: 0px;
}
#girl-box .van-tabs__nav--card .van-tab.van-tab--active {
  color: #c51212;
  background: #ffd33a;
}
#girl-box {
  padding-top: 1.12rem;
  background: #f74141;
}
</style>