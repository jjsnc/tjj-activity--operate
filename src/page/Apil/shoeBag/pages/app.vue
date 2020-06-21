<template>
  <div class="container">
    <section>
      <img src="../assets/images/top_01.jpg" alt>
      <a href="javascript:;" class="share" v-if="shareBtn" @click="shareClick"></a>
    </section>
    <img src="../assets/images/top_02.jpg" alt>
    <section id="type">
      <img src="../assets/images/top_03.jpg" alt>
      <a
        href="javascript:;"
        class="type"
        v-for="(type, index) in types"
        :key="index"
        @click="locationHref(type.url)"
      ></a>
    </section>
    <div id="shop-title">
      <img class="shop-title" src="../assets/images/top_04.png" alt>
    </div>
    <div id="nav" :class="{'fixed': fixed}">
      <a
        href="javascript:;"
        class="nav"
        :class="{'nav_active': nav_active == index}"
        v-for="(nav, index) in navs"
        :key="index"
        @click="navClick(index)"
      >{{ nav.name }}</a>
    </div>
    <div v-if="fixed" id="zw_height"></div>
    <div id="goods">
      <div class="goods" v-for="(shop, index) in goods" :key="index">
        <div class="shop goods-box">
          <img v-lazy="shop.shop_img" alt="">
          <a href="javascript:;" class="shop-a" @click="toShop(shop.shop_id)"></a>
        </div>
        <div class="good goods-box">
          <img v-lazy="shop.goods_img[0]" alt="">
          <img v-lazy="shop.goods_img[1]" alt="">
          <a href="javascript:;" class="good-a" v-for="(good, index) in shop.goods_id" :key="index" @click="toGoods(good)"></a>
          <a href="javascript:;" class="good-more" @click="toShop(shop.shop_id)"></a>
        </div>
      </div>
    </div>
    <div id="more" v-if="shareBtn">
      <a href="javascript:;" class="more-a" @click="toMore"></a>
    </div>
    <div id="more-height" v-else></div>
    <ToTop></ToTop>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import URL from "./../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
let scrollTo = scroller();
let vm = null;
export default {
  data() {
    return {
      navs: [
        { name: "鞋柜" },
        { name: "雅路宝" },
        { name: "法罗妮" },
        { name: "优秀鞋业" },
        { name: "茹诗菲" },
        { name: "普乐达" }
      ],
      types: [
        {
          name: "女鞋",
          url: "https://modeup.taojiji.com/taojiji/pages/2019/04/264a07f96fc478bdc9-html5.html"
        },
        {
          name: "箱包",
          url: "https://modeup.taojiji.com/taojiji/pages/2019/04/2696d13cf5e82d0a69-html5.html"
        },
        {
          name: "配饰",
          url: "https://modeup.taojiji.com/taojiji/pages/2019/04/26334564f57e4ef32b-html5.html"
        },
        {
          name: "男鞋",
          url: "https://modeup.taojiji.com/taojiji/pages/2019/04/261cfc0d306a91ecb7-html5.html"
        }
      ],
      goods: [
        {
          shop_id: 6860,
          goods_id: [4421468, 4421425, 4421479, 4421360],
          shop_img: require("../assets/images/shop_01.jpg"),
          goods_img: [require("../assets/images/list_11.jpg"), require("../assets/images/list_12.jpg")],
          name: "鞋柜"
        },
        {
          shop_id: 25630,
          goods_id: [2351162, 20201, 2243947, 2910199],
          shop_img: require("../assets/images/shop_02.jpg"),
          goods_img: [require("../assets/images/list_21.jpg"), require("../assets/images/list_22.jpg")],
          name: "雅路宝"
        },
        {
          shop_id: 5004,
          goods_id: [4408375, 183, 4408370, 2603648],
          shop_img: require("../assets/images/shop_03.jpg"),
          goods_img: [require("../assets/images/list_31.jpg"), require("../assets/images/list_32.jpg")],
          name: "法罗妮"
        },
        {
          shop_id: 6672,
          goods_id: [4605527, 4421185, 4421451, 10195],
          shop_img: require("../assets/images/shop_04.jpg"),
          goods_img: [require("../assets/images/list_41.jpg"), require("../assets/images/list_42.jpg")],
          name: "优秀鞋业"
        },
        {
          shop_id: 9518,
          goods_id: [4110203, 2892305, 7713, 4314531],
          shop_img: require("../assets/images/shop_05.jpg"),
          goods_img: [require("../assets/images/list_51.jpg"), require("../assets/images/list_52.jpg")],
          name: "茹诗菲"
        },
        {
          shop_id: 5102,
          goods_id: [4421214, 4421129, 4421206, 4421287],
          shop_img: require("../assets/images/shop_06.jpg"),
          goods_img: [require("../assets/images/list_61.jpg"), require("../assets/images/list_62.jpg")],
          name: "普乐达"
        }
      ],
      fixed: false,
      fixed_top: 0,
      nav_active: -1,
      shareBtn: true
    };
  },
  created() {
    vm = this;
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

    window.addEventListener("scroll", this.handleScroll);
    let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
    if (xcx_user) {
      vm.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  methods: {
    // 菜单点击滚动
    navClick(index) {
      scrollTo(document.getElementsByClassName("goods")[index], {
        offset: this.remFn(-0.53),
        onDone: function(element) {
          vm.nav_active = index;
        },
      });
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
      let goodsTop = document.getElementsByClassName("goods");
      for (let i = 0; i < goodsTop.length; i++) {
        if (scrollTop >= goodsTop[i].offsetTop + this.remFn(-0.53) - 1) {
          this.nav_active = i;
        }
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
        this.nav_active = -1;
      }
    },
    // 跳转二级分类
    toMore() {
      tjjApp.web.toCATE({ id: 328, name: "鞋包" });
    },
    // 跳转店铺
    toShop(id) {
      tjjApp.web.startShopHome(id);
    },
    // 跳转商品
    toGoods(id) {
      tjjApp.web.jump2good(id);
    },
    // 分享
    shareClick() {
      tjjApp.web.share({
        title: document.title
      });
    },
    // rem换算成px
    remFn(num) {
      return num * 25;
    },
    // 自定义路径跳转
    locationHref(url) {
      location.href = url;
    }
  },
  components: {
    ToTop
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped >
.container,
#shop-title,
#nav,
#goods,
#more,
#more-height {
  background: url(../assets/images/bg.jpg) center top repeat-y;
  background-size: 100% 0.27rem;
}
img {
  width: 100%;
  display: block;
}
section {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.share {
  position: absolute;
  width: 1.84rem;
  height: 0.45rem;
  top: 0.4rem;
  right: 0.2rem;
  background: url(../assets/images/share.png) center center no-repeat;
  background-size: 1.84rem 0.45rem;
}
#type {
  height: 4.7rem;
}
#type img {
  height: 4.7rem;
}
#type .type {
  position: absolute;
  width: 1rem;
  height: 1rem;
  z-index: 1;
}
#type .type:nth-of-type(1) {
  width: 2.9rem;
  height: 4.7rem;
  left: 0.54rem;
  top: 0;
}
#type .type:nth-of-type(2) {
  width: 5rem;
  height: 2.3rem;
  left: 3.5rem;
  top: 0;
}
#type .type:nth-of-type(3) {
  width: 5rem;
  height: 2.3rem;
  left: 3.5rem;
  bottom: 0;
}
#type .type:nth-of-type(4) {
  width: 2.9rem;
  height: 4.7rem;
  right: 0.54rem;
  top: 0;
}
#shop-title {
  width: 100%;
  overflow: hidden;
  height: 1.5rem;
  position: relative;
}
#shop-title .shop-title {
  width: 4.17rem;
  height: 0.62rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
#nav {
  width: 100%;
  height: 0.53rem;
  margin: 0 auto;
  padding: 0 0.07rem;
}
#nav .nav {
  width: calc(100% / 6);
  height: 0.5rem;
  display: block;
  float: left;
  background: #e5516e;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.5rem;
  letter-spacing: 0.02rem;
  color: #fff;
  text-align: center;
  border-right: .03rem solid #fff;
}
#nav .nav_active {
  background: #cc2949;
}
#nav .nav:last-child {
  border-right: none;
}
#nav .nav:last-child {
  margin-right: 0;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
#zw_height {
  width: 100%;
  height: 0.53rem;
}
#goods {
  width: 100%;
  overflow: hidden;
}
#goods .goods{
  width: 100%;
  height: 18.76rem;
  overflow: hidden;
}
#goods .goods .goods-box{
  width: 100%;
  overflow: hidden;
  position: relative;
}
#goods .goods .shop .shop-a{
  position: absolute;
  width: calc(100% - 1rem);
  height: calc(100% - .2rem);
  left: .5rem;
  bottom: 0;
}
#goods .goods .good .good-a{
  position: absolute;
  width: 4.2rem;
  height: 5.1rem;
}
#goods .goods .good .good-more{
  position: absolute;
  width: 100%;
  height: .9rem;
  bottom: .1rem;
  left: 0;
}
#goods .goods .good .good-a:nth-of-type(1){
  left: .53rem;
  top: .2rem;
}
#goods .goods .good .good-a:nth-of-type(2){
  left: 5.9rem;
  top: .2rem;
}
#goods .goods .good .good-a:nth-of-type(3){
  left: 1.06rem;
  top: 5.7rem;
}
#goods .goods .good .good-a:nth-of-type(4){
  left: 6.5rem;
  top: 5.7rem;
}
#more{
  width: 100%;
  height: 2rem;
  position: relative;
}
#more .more-a{
  position: absolute;
  width: 5.81rem;
  height: 1.02rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: url(../assets/images/more.png) center center  no-repeat;
  background-size: 5.81rem 1.02rem;
}
#more-height{
  width: 100%;
  height: 1rem;
}
</style>

