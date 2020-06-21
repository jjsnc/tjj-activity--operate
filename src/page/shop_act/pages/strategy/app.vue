<template>
  <div class="container">
    <headerBanner class="banner" :options="options" @sendMsg="getMsg"></headerBanner>
    <div id="calendar">
      <img v-lazy="dateImg">
      <div class="calendar">
        <div class="calendar-box">
          <a href="javascript:;" class="calendar-box-a" v-for="(el, index) in tabs" :key="index"></a>
        </div>
      </div>
    </div>
    <!-- 返回主会场 -->
    <img v-lazy="require('../../assets/images/strategy/top_03.jpg')" @click="toPage('/index')">
    <div id="goods">
      <div class="goods" v-for="(el, index) in goods" :key="index">
        <p class="goods-time">{{ el.tj_time }}</p>
        <div
          class="goods-box"
          @click="toPage(el.page)"
          :style="{backgroundImage: 'url('+el.img+')'}"
        >
          <div class="goods-box-left"></div>
          <div class="goods-box-center">
            <p class="goods-box-center-p goods-box-center-p-title">{{ el.title }}</p>
            <p class="goods-box-center-p goods-box-center-p-txt" v-if="el.time_bold != ''">
              {{ el.time }}
              <strong>{{ el.time_bold }}</strong>
              {{ el.time_end }}
            </p>
            <p class="goods-box-center-p goods-box-center-p-txt">
              {{ el.txt }}
              <strong>{{ el.txt_bold }}</strong>
              {{ el.txt_end }}
            </p>
          </div>
          <a href="javascript:;" class="goods-box-right"></a>
        </div>
        <p class="goods-placeholder"></p>
      </div>
    </div>
    <img v-lazy="require('../../assets/images/strategy/top_04.jpg')" @click="toPage('/index')">
    <van-popup v-model="popupBtn" position="center">
      <div id="popup" v-if="popupBtn" @click="closePopup">
        <div class="popup">
          <div class="popup-top">活动规则</div>
          <div class="popup-top-bottom"></div>
          <p class="popup-title">一、活动时间</p>
          <p class="popup-txt">2019年6月13日0点-2018年6月21日24点</p>
          <p class="popup-title">二、限时秒杀</p>
          <p class="popup-txt">2018年6月13日-6月21日每天8点开始秒杀，每场秒杀持续4小时，每天至少4场</p>
          <p class="popup-title">三、集淘有礼</p>
          <p class="popup-txt">1、活动时间：2019年6月13日~2019年6月18日</p>
          <p class="popup-txt">
            2、活动说明：活动共有6个风云淘人物，点击进入活动页面即可获得
            <font color="red">1个风云淘人物</font>；除此之外可通过下单获取机会，用户下一单既有机会获取一个淘人物，退单则无机会获取。集齐淘人物则可合成淘老板。
            <font
              color="red"
            >（1元拼团，新人全额返订单不可获得领取机会）</font>
          </p>
          <p class="popup-txt"></p>
          <p class="popup-txt">3、活动奖品：</p>
          <p class="popup-txt popup-txt-indent">特等奖华为P30Pro</p>
          <p class="popup-txt popup-txt-indent">一等奖88元优惠券</p>
          <p class="popup-txt popup-txt-indent">二等奖66元优惠券</p>
          <p class="popup-txt popup-txt-indent">三等奖33元优惠券</p>
          <p class="popup-statement">本次活动最终解释权归淘集集所有</p>
        </div>
      </div>
    </van-popup>
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
    <!-- 底部通栏 -->
    <div class="bottom-nav"></div>
    <bottomNav></bottomNav>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import URL from "./../../assets/js/api";
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("../../assets/images/strategy/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("../../assets/images/strategy/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "2.07rem",
            height: "0.6rem",
            right: "0.14rem",
            top: "0.24rem"
          }
        },
        // 其他自定义按钮，sendMsg为点击事件区别btn
        otherTab: [
          {
            otherTabImg: require("../../assets/images/strategy/hdgz.png"),
            otherTabCssStyle: {
              width: "2.07rem",
              height: "0.6rem",
              right: "0.14rem",
              top: "0.94rem"
            },
            sendMsg: "tab1"
          }
        ]
      },
      goods: [
        {
          img: require("../../assets/images/strategy/list_01.png"),
          title: "好物限时秒",
          time: "每天",
          time_bold: "8~24",
          time_end: "点",
          txt: "整点疯抢秒杀礼物",
          txt_bold: "",
          txt_end: "",
          tj_time: "6月11日~6月21日",
          page: "flashSale"
        },
        {
          img: require("../../assets/images/strategy/list_02.png"),
          title: "集“淘”有礼",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "抢",
          txt_bold: "88",
          txt_end: "元现金红包",
          tj_time: "6月11日~6月21日",
          page: "/games"
        },
        {
          img: require("../../assets/images/strategy/list_03.png"),
          title: "万券齐发",
          time: "",
          time_bold: "无门槛",
          time_end: "优惠券",
          txt: "满减券应有尽有",
          txt_bold: "",
          txt_end: "",
          tj_time: "6月11日~6月21日",
          page: "/coupon"
        },
        {
          img: require("../../assets/images/strategy/list_04.png"),
          title: "潮流服饰",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "限量抢购T恤",
          txt_bold: "0.9",
          txt_end: "元起",
          tj_time: "6月14日~6月18日",
          page: "/clothes"
        },
        {
          img: require("../../assets/images/strategy/list_05.png"),
          title: "家居百货",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "",
          txt_bold: "0.1",
          txt_end: "元等你抢",
          tj_time: "6月14日~6月18日",
          page: "/baibao"
        },
        {
          img: require("../../assets/images/strategy/list_06.png"),
          title: "时尚鞋包",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "网红爆款",
          txt_bold: "50元3件",
          txt_end: "",
          tj_time: "6月14日~6月18日",
          page: "/shoe"
        },
        {
          img: require("../../assets/images/strategy/list_07.png"),
          title: "美妆个护",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "必备防晒",
          txt_bold: "4.8",
          txt_end: "元起",
          tj_time: "6月14日~6月18日",
          page: "/beauty"
        },
        {
          img: require("../../assets/images/strategy/list_08.png"),
          title: "休闲美食",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "休闲美食",
          txt_bold: "1",
          txt_end: "折优惠",
          tj_time: "6月14日~6月18日",
          page: "/food"
        },
        {
          img: require("../../assets/images/strategy/list_09.png"),
          title: "3C生活",
          time: "",
          time_bold: "",
          time_end: "",
          txt: "吹风机低至",
          txt_bold: "9.9",
          txt_end: "元起",
          tj_time: "6月14日~6月18日",
          page: "/digital"
        }
      ],
      tabs: [
        {
          name: "特色趣玩赢大奖",
          page: "/games"
        },
        {
          name: "终极狂欢一元购",
          page: "/hot"
        },
        {
          name: "终极狂欢一元购",
          page: "/hot"
        },
        {
          name: "惊喜返场",
          page: "/hot"
        }
      ],
      popupBtn: false,
      dateImg: require("../../assets/images/strategy/top_02.jpg"),
      msgTxt: null
    };
  },
  created() {
    vm = this;
    vm.initPv();
  },
  methods: {
    // 进入页面发起埋点pv
    initPv() {
      tjjApp.web.initPv();
    },
    // 组件通信
    getMsg(data) {
      this.popupBtn = true;
    },
    // 跳转
    toPage(page) {
      if (page == "flashSale") {
        window.location.href = vm.hrefUrl(
          "a.taojiji.com/index.php/MzzAct/xsmsAct0130/xsmsAct"
        );
      } else {
        this.$router.push(page);
      }
    },
    closePopup() {
      this.popupBtn = false;
    },
    hrefUrl(page) {
      let href = window.location.href;
      let hosts = window.location.host;
      return href.replace(
        hosts + "/activity/project/shop_act/view/" + vm.$route.name,
        page
      );
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
      send.sendPoint(params);
      if (user_id) {
      } else {
        tjjApp.web.login();
      }
    };

    if (xcx_user) {
      vm.options.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  }
};
</script>
<style>
html,
body {
  background: #ff4f4f;
}
/* 返回顶部 */
.toTop {
  bottom: 1.66rem !important;
}
/* bottom-nav站位高度 */
.bottom-nav {
  width: 100%;
  height: 1.64rem;
}
</style>
<style scoped >
.goods_list,
.moregoods,
.container,
.lists {
  background: #ff4f4f;
}
img {
  width: 100%;
  display: block;
}
#goods {
  width: 100%;
  padding: 0.17rem 0.24rem 0;
  overflow: hidden;
  background: #ff4f4f;
}
.goods {
  width: 100%;
  overflow: hidden;
}
.goods-time {
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.48rem;
  color: #fff;
  background: url(../../assets/images/strategy/icon.png) left center no-repeat;
  background-size: 0.32rem 0.47rem;
  text-indent: 0.46rem;
  font-family: SourceHanSansCN-Heavy;
  font-weight: normal;
  font-stretch: normal;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  border-radius: 0.24rem;
  height: 2.3rem;
  background-size: 100% 2.3rem;
  background-repeat: no-repeat;
  background-position: left center;
}
.goods-box-left {
  width: 5rem;
  height: 2.3rem;
  float: left;
}
.goods-box-left-img {
  height: 100%;
  width: 100%;
}
.goods-box-center {
  float: left;
  width: calc(100% - 7.56rem);
  height: 2.3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.goods-box-center-p-title {
  width: 100%;
  font-size: 0.5rem;
  font-family: "SourceHanSansCN";
  color: #fff;
  font-weight: bold;
  line-height: 0.64rem;
}
.goods-box-center-p-txt {
  width: 100%;
  font-size: 0.34rem;
  font-family: "FZLTHJW";
  color: #fff;
  line-height: 0.5rem;
}
.goods-box-center-p-txt strong {
  font-size: 0.38rem;
}
.goods-box-right {
  float: right;
  width: 2.56rem;
  height: 2.3rem;
  background: #fff url("../../assets/images/strategy/go.png") center center
    no-repeat;
  background-size: 2.05rem 1.93rem;
}
.goods .goods-placeholder {
  width: 100%;
  height: 0.3rem;
  border-bottom: 0.02rem dashed #fe7666;
}
.goods:last-child .goods-placeholder {
  border-bottom: none;
}
#popup {
  width: 10.56rem;
  background: #fff;
  overflow: hidden;
}
#popup .popup {
  width: 100%;
  padding: 0.32rem 0;
  overflow: hidden;
}
#popup .popup .popup-top {
  width: 5.12rem;
  height: 0.96rem;
  line-height: 0.96rem;
  font-size: 0.352rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  transform: matrix(1.69727563594311, 0, 0, 1.69727563594311, 0, 0);
}
#popup .popup .popup-top-bottom {
  width: 5.12rem;
  height: 0.02rem;
  margin: 0.16rem auto 0.32rem;
  overflow: hidden;
  border-top: 0.02rem solid #ff1c50;
  border-bottom: 0.01rem solid #d62538;
}
.popup-title,
.popup-txt,
.popup-statement {
  width: calc(100% - 1.6rem);
  margin: 0 auto;
  font-size: 0.32rem;
  font-family: "FZLTHJW";
  color: rgb(129, 81, 28);
  line-height: 0.64rem;
  text-align: justifyLeft;
}
.popup-txt {
  text-indent: 0.64rem;
}
.popup-txt font {
  font-weight: bold;
}
.popup-statement {
  margin-top: 0.3rem;
  text-align: right;
}
#calendar {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.calendar {
  width: 10.6rem;
  height: 3.7rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -5.3rem;
}
.calendar-box {
  width: 10.6rem;
  height: 3.7rem;
  position: relative;
}
.calendar-box-a {
  position: absolute;
  height: 1.94rem;
  width: 4.5rem;
}
.calendar-box-a:nth-of-type(1) {
  left: 0;
  top: 0;
  width: 6rem;
}
.calendar-box-a:nth-of-type(2) {
  right: 0;
  top: 0;
}
.calendar-box-a:nth-of-type(3) {
  left: 0;
  bottom: 0;
  height: 1.8rem;
  width: 1.5rem;
}
.calendar-box-a:nth-of-type(4) {
  left: 1.5rem;
  bottom: 0;
  height: 1.8rem;
}
</style>

