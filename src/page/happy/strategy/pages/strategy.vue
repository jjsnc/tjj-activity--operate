<template>
  <nav class="container">
    <div id="top">
      <img src="../assets/images/top_01.png">
      <a href="javascript:;" class="top-a txt" @click="popupClick"></a>
      <a href="javascript:;" class="top-a share" @click="shareClick" v-if="shareBtn"></a>
    </div>
    <div id="calendar">
      <img src="../assets/images/top_02.jpg">
      <div class="calendar">
        <div class="calendar-box">
          <a href="javascript:;" class="calendar-box-a" v-for="(el, index) in goods" :key="index" v-if="index != 0" @click="toPage(el.page)"></a>
        </div>
      </div>
    </div>
    <img src="../assets/images/top_03.jpg" @click="backMain">
    <div id="goods">
      <div class="goods" v-for="(el, index) in goods" :key="index">
        <p class="goods-time">{{ el.tj_time }}</p>
        <div class="goods-box" @click="toPage(el.page)">
          <div class="goods-box-left">
            <img class="goods-box-left-img" :src="el.img" alt>
          </div>
          <div class="goods-box-center">
            <p class="goods-box-center-p goods-box-center-p-title">{{ el.title }}</p>
            <p class="goods-box-center-p goods-box-center-p-txt" v-if="el.time != ''">{{ el.time }}</p>
            <p class="goods-box-center-p goods-box-center-p-txt">{{ el.txt }}</p>
          </div>
          <a href="javascript:;" class="goods-box-right"></a>
        </div>
        <p class="goods-placeholder"></p>
      </div>
    </div>
    <img src="../assets/images/top_04.jpg" @click="backMain">
    <div class="placeholder"></div>
    <div id="popup" v-if="popupBtn" @click="popupCancleClick">
      <div class="popup">
        <div class="popup-top">活动规则</div>
        <div class="popup-top-bottom"></div>
        <p class="popup-title">一、活动时间</p>
        <p class="popup-txt">2019年4月23日0点_2019年4月27日24点</p>
        <p class="popup-title">二、限时秒杀</p>
        <p class="popup-txt">(1)2019年4月23日-2019年4月27日每天8点开始秒杀，每场秒杀持续4小时，每天至少6场；</p>
        <p class="popup-txt">(2)整点抢0.1元好物：每个时间档都会设有1元好物，数量有限，先到先得</p>
        <p class="popup-title">具体活动规则详见页面</p>
        <p class="popup-statement">本次活动最终解释权归淘集集所有</p>
      </div>
    </div>
    <div id="mask" v-if="popupBtn" @click="popupCancleClick"></div>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import { GoodList } from "./../assets/js/api.js";
import { scroller } from "vue-scrollto/src/scrollTo";
export default {
  data() {
    return {
      goods: [
        {
          img: require("../assets/images/goods_01.jpg"),
          title: "OH！买噶！秒它！",
          time: "每天8~24点",
          txt: "整点疯抢0.1元好物",
          tj_time: "4月23日~4月27日",
          page: 'flashSale',
        },
        {
          img: require("../assets/images/goods_02.jpg"),
          title: "唤醒你的衣橱",
          time: "",
          txt: "连衣裙0.1元限量秒",
          tj_time: "4月23日",
          page: 'dress',
        },
        {
          img: require("../assets/images/goods_03.jpg"),
          title: "居家正能量",
          time: "",
          txt: "6.9元3件限定发售",
          tj_time: "4月24日",
          page: 'general',
        },
        {
          img: require("../assets/images/goods_04.jpg"),
          title: "OH！买噶！秒它！",
          time: "",
          txt: "春夏新品0.1元限量抢",
          tj_time: "4月25日",
          page: 'shoesBag',
        },
        {
          img: require("../assets/images/goods_05.jpg"),
          title: "辣妈萌宝出街",
          time: "",
          txt: "谁与争锋？！0.1元起",
          tj_time: "4月26日",
          page: 'makeup',
        },
        {
          img: require("../assets/images/goods_06.jpg"),
          title: "美好食光为爱吃狂",
          time: "",
          txt: "对不起又让你嘴馋了",
          tj_time: "4月27日",
          page: 'food',
        }
      ],
      popupBtn: false,
      shareBtn: true,
    };
  },
  created() {},
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

    let windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      this.shareBtn = false;
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      let token = tjjApp.web.getUrlQuery("token", window.location.href);
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 滚动
    handleScroll() {
      if (this.popupBtn) {
        this.stop();
      } else {
        this.move();
      }
    },
    // 弹窗影响body的滑动处理
    mo(e) {
      e.preventDefault();
    },
    stop() {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", this.mo, false);
    },
    move() {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", this.mo, false);
    },
    // 规则弹窗
    popupClick() {
      this.popupBtn = true;
      this.stop();
    },
    // 规则弹窗
    popupCancleClick() {
      this.popupBtn = false;
      this.move();
    },
    toMore() {
      //跳转二级分类
      tjjApp.web.toCATE({ id: 317, name: "休闲美食" });
    },
    toShop(id) {
      //跳转店铺
      tjjApp.web.startShopHome(id);
    },
    toGoods(id) {
      //跳转商品
      tjjApp.web.jump2good(id);
    },
    // 分享
    shareClick(){
      tjjApp.web.share({
        title: document.title
      });
    },
    // 跳转
    toPage(page){
      let jump_url = window.location.origin + "/activity/project/happy/"+page+"/view/index";
      console.log(jump_url);
      window.location.href = jump_url;
    },
    // 返回主会场
    backMain(){
     let jump_url = window.location.origin + "/activity/project/happy/happies/view/index";
     console.log(jump_url);
     window.location.href = jump_url;
    }
  },
  components: {
    ToTop
  }
};
</script>
<style >
html,
body,
.goods_list,
.moregoods,
.container,
.lists {
  background: #d32737 !important;
}
img {
  width: 100%;
  display: block;
}
#top {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.top-a {
  position: absolute;
  width: 1.15rem;
  height: 0.28125rem;
  right: .2rem;
}
.txt {
  top: .16875rem;
  background: url(../assets/images/hdgz.png) center center no-repeat;
  background-size: 1.15rem 0.28125rem;
}
.share {
  position: absolute;
  top: .56rem;
  background: url(../assets/images/share_new.png) center center no-repeat;
  background-size: 1.15rem 0.28125rem;
}
#goods {
  width: calc(100% - 0.3rem);
  margin: 0.1rem auto 0;
  overflow: hidden;
}
.goods {
  width: 100%;
  overflow: hidden;
}
.goods-time {
  width: 100%;
  height: 0.6rem;
  line-height: 0.7rem;
  font-size: 0.2rem;
  color: #fff;
  background: url(../assets/images/icon.png) left 0.16rem no-repeat;
  background-size: 0.21rem 0.29rem;
  text-indent: 0.3rem;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  border: 0.03rem solid #fed370;
  border-radius: 0.15rem;
  height: 1.5rem;
  background: #fff;
}
.goods-box-left {
  width: 1.8rem;
  height: 1.4rem;
  margin: 0 0.2rem 0 0.16rem;
  float: left;
}
.goods-box-left-img {
  height: 100%;
  width: 100%;
}
.goods-box-center {
  float: left;
  width: 2.6rem;
  height: 1.4rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.goods-box-center-p-title {
  width: 100%;
  font-size: 0.2rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  font-weight: bold;
  line-height: 0.4rem;
}
.goods-box-center-p-txt {
  width: 100%;
  font-size: 0.15rem;
  font-family: "FZLTHJW";
  color: rgb(231, 119, 43);
  line-height: 0.3rem;
}
.goods-box-right {
  float: right;
  width: 1.9rem;
  height: 1.4rem;
  background: url("../assets/images/go.png") left center no-repeat;
  background-size: 1.28rem 1.21rem;
}
.goods .goods-placeholder {
  width: 100%;
  height: 0.2rem;
  border-bottom: 0.01rem dashed #e1655c;
}
.goods:last-child .goods-placeholder {
  border-bottom: none;
}
.placeholder {
  width: 100%;
  height: 0.12rem;
}
#popup {
  width: 6.6rem;
  height: 5.4rem;
  background: #fff;
  position: fixed;
  top: 2.1rem;
  left: 50%;
  margin-left: -3.3rem;
  z-index: 5;
}
#popup .popup {
  width: 100%;
  padding-top: 0.2rem;
  overflow: hidden;
}
#popup .popup .popup-top {
  width: 3.2rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.22rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  transform: matrix(1.69727563594311, 0, 0, 1.69727563594311, 0, 0);
}
#popup .popup .popup-top-bottom {
  width: 3.2rem;
  height: 0.02rem;
  margin: 0.1rem auto 0.2rem;
  overflow: hidden;
  border-top: 0.02rem solid #ff1c50;
  border-bottom: 0.01rem solid #d62538;
}
.popup-title,
.popup-txt,
.popup-statement {
  width: calc(100% - 1rem);
  margin: 0 auto;
  font-size: 0.2rem;
  font-family: "FZLTHJW";
  color: rgb(129, 81, 28);
  line-height: 0.4rem;
  text-align: justifyLeft;
}
.popup-txt {
  text-indent: 0.4rem;
}
.popup-statement {
  margin-top: 0.34rem;
  text-align: right;
}
#mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.7;
  z-index: 4;
}
#calendar{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.calendar{
  width: 6.6rem;
  height: 2.3rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -3.3rem;
}
.calendar-box{
  width: 6.6rem;
  height: 2.3rem;
  position: relative;
}
.calendar-box-a{
  position: absolute;
  width: .94rem;
  height: 1.1rem;
}
.calendar-box-a:nth-of-type(1){
  right: .94rem;
  top: 0;
}
.calendar-box-a:nth-of-type(2){
  right: 0;
  top: 0;
}
.calendar-box-a:nth-of-type(3){
  left: 0;
  bottom: 0;
}
.calendar-box-a:nth-of-type(4){
  left: .94rem;
  bottom: 0;
}
.calendar-box-a:nth-of-type(5){
  left: 1.88rem;
  bottom: 0;
}
</style>

