<template>
  <nav class="container">
    <div id="top">
      <img v-lazy="bannerImg">
      <a href="javascript:;" class="top-a txt" @click="popupClick"></a>
      <a href="javascript:;" class="top-a share" @click="shareClick" v-if="shareBtn"></a>
    </div>
    <div id="calendar">
      <img v-lazy="dateImg">
      <div class="calendar">
        <div class="calendar-box">
          <a
            href="javascript:;"
            class="calendar-box-a"
            v-for="(el, index) in goods"
            :key="index"
            v-if="index != 0"
            @click="toPage(el.page)"
          ></a>
        </div>
      </div>
    </div>
    <img src="../../assets/images/strategy/top_03.jpg" @click="backMain">
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
    <img class="bottom-img" src="../../assets/images/strategy/top_04.jpg" @click="backMain">
    <div class="placeholder"></div>
    <div id="popup" v-if="popupBtn" @click="popupCancleClick">
      <div class="popup">
        <div class="popup-top">活动规则</div>
        <div class="popup-top-bottom"></div>
        <p class="popup-title">一、活动时间</p>
        <p class="popup-txt">2019年4月23日0点_2019年4月27日24点</p>
        <p class="popup-title">二、限时秒杀</p>
        <p class="popup-txt">(1)2019年4月23日-2019年4月27日每天8点开始秒杀，总共不低于16场；</p>
        <p class="popup-txt">(2)整点抢0.1元好物：每个时间档都会设有0.1元好物，数量有限，先到先得</p>
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
import URL from "./../../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
export default {
  data() {
    return {
      goods: [
        {
          img: require("../../assets/images/strategy/goods_01.jpg"),
          title: "OH！买噶！秒它！",
          time: "每天8~24点",
          txt: "整点疯抢0.1元好物",
          tj_time: "4月23日~4月27日",
          page: "flashSale"
        },
        {
          img: require("../../assets/images/strategy/goods_02.jpg"),
          title: "唤醒你的衣橱",
          time: "",
          txt: "连衣裙0.1元限量秒",
          tj_time: "4月23日",
          page: "dress"
        },
        {
          img: require("../../assets/images/strategy/goods_03.jpg"),
          title: "居家正能量",
          time: "",
          txt: "6.9元3件限定发售",
          tj_time: "4月24日",
          page: "general"
        },
        {
          img: require("../../assets/images/strategy/goods_04.jpg"),
          title: "春日活力趣味出游",
          time: "",
          txt: "春夏新品0.1元限量抢",
          tj_time: "4月25日",
          page: "shoesBag"
        },
        {
          img: require("../../assets/images/strategy/goods_05.jpg"),
          title: "辣妈萌宝出街",
          time: "",
          txt: "谁与争锋？！0.1元起",
          tj_time: "4月26日",
          page: "makeup"
        },
        {
          img: require("../../assets/images/strategy/goods_06.jpg"),
          title: "美好食光为爱吃狂",
          time: "",
          txt: "对不起又让你嘴馋了",
          tj_time: "4月27日",
          page: "food"
        }
      ],
      popupBtn: false,
      shareBtn: true,
      bannerImg: require("../../assets/images/strategy/top_01.png"),
      dateImg: require("../../assets/images/strategy/top_02.jpg")
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
    let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    if (xcx_user) {
      this.shareBtn = false;
       let user_id = xcx_user.user_id
      let token = xcx_user.token;
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
    shareClick() {
      tjjApp.web.share({
        title: document.title
      });
    },
    // 跳转
    toPage(page) {
      if (page == "flashSale") {
        window.location.$router = "/" + page;
        this.$router.push(page);
      } else {
        window.location.$router = "/" + page + "index";
        this.$router.push(page + "index");
      }
    },
    // 返回主会场
    backMain() {
      window.location.$router = "/index";
      this.$router.push("/index");
    }
  },
  components: {
    ToTop
  },
  computed: {},
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped >
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
  width: 1.84rem;
  height: .45rem;
  right: 0.2rem;
}
.txt {
  top: .27rem;
  background: url(../../assets/images/strategy/hdgz.png) center center no-repeat;
  background-size: 1.84rem .45rem;
}
.share {
  position: absolute;
  top: 0.9rem;
  background: url(../../assets/images/strategy/share_new.png) center center
    no-repeat;
  background-size: 1.84rem .45rem;
}
#goods {
  width: 100%;
  padding: 0.17rem 0.24rem 0;
  overflow: hidden;
  background: #d32737;
}
.goods {
  width: 100%;
  overflow: hidden;
}
.goods-time {
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
  color: #fff;
  background: url(../../assets/images/strategy/icon.png) left 0.27rem no-repeat;
  background-size: 0.21rem 0.3rem;
  text-indent: 0.3rem;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  border: 0.05rem solid #fed370;
  border-radius: 0.24rem;
  height: 2.3rem;
  background: #fff;
}

.goods-box-left {
  width: 2.9rem;
  height: 2.2rem;
  margin: 0 0.5rem 0 0.16rem;
  float: left;
}
.goods-box-left-img {
  height: 100%;
  width: 100%;
}
.goods-box-center {
  float: left;
  width: 4.4rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.goods-box-center-p-title {
  width: 100%;
  font-size: .46rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  font-weight: bold;
  line-height: 0.6rem;
}
.goods-box-center-p-txt {
  width: 100%;
  font-size: 0.34rem;
  font-family: "FZLTHJW";
  color: rgb(231, 119, 43);
  line-height: 0.5rem;
}
.goods-box-right {
  float: right;
  width: 2.85rem;
  height: 2.2rem;
  background: url("../../assets/images/strategy/go.png") left center no-repeat;
  background-size: 2rem 1.9rem;
}
.goods .goods-placeholder {
  width: 100%;
  height: 0.3rem;
  border-bottom: 0.02rem dashed #e1655c;
}
.goods:last-child .goods-placeholder {
  border-bottom: none;
}
.placeholder {
  width: 100%;
  height: 0.12rem;
}
#popup {
  width: 10.56rem;
  height: 8.64rem;
  background: #fff;
  position: fixed;
  top: 3.36rem;
  left: 50%;
  margin-left: -5.28rem;
  z-index: 5;
}
#popup .popup {
  width: 100%;
  padding-top: 0.32rem;
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
.popup-statement {
  margin-top: 0.544rem;
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
  width: 1.5rem;
  height: 1.94rem;
}
.calendar-box-a:nth-of-type(1) {
  right: 1.5rem;
  top: 0;
}
.calendar-box-a:nth-of-type(2) {
  right: 0;
  top: 0;
}
.calendar-box-a:nth-of-type(3) {
  left: 0;
  bottom: 0;
}
.calendar-box-a:nth-of-type(4) {
  left: 1.5rem;
  bottom: 0;
}
.calendar-box-a:nth-of-type(5) {
  left: 3rem;
  bottom: 0;
}
.bottom-img{
  margin-top: -.02rem;
} 
</style>

