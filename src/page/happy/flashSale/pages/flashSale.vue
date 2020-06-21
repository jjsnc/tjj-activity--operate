<template>
  <nav class="container">
    <div id="top">
      <img src="../assets/images/top_01.png">
      <a href="javascript:;" class="top-share" @click="shareClick" v-if="shareBtn"></a>
      <p class="top-p">
        站内相似商品热搜指数:
        <font id="hot-num">{{ hotSearchNum }}</font>
      </p>
    </div>
    <div id="time">
      <a
        href="javascript:;"
        class="time"
        v-for="(el, index) in times"
        :key="index"
        :class="{'time-active': el.id==timeNavNum}"
        @click="timeNavClick(el.id)"
      >
        <img class="time-num" :src="el.img_active" alt v-if="el.id==timeNavNum">
        <img class="time-num" :src="el.img" alt v-else>
        <span class="time-span">{{ el.time }}</span>
        <img class="time-icon" :src="el.icon_active" alt v-if="el.id==timeNavNum">
        <img class="time-icon" :src="el.icon" alt v-else>
      </a>
    </div>
    <img src="../assets/images/top_03.jpg">
    <div id="hot" v-if="hots.length != 0">
      <div class="hot" v-for="(el, index) in hots" :key="index" @click="toGoods(el.goods_id)">
        <img v-lazy="el.img320_url" alt class="hot-img">
        <div class="hot-content">
          <p class="hot-title">{{ el.goods_name }}</p>
          <div class="hot-search">
            <img class="hot-search-img" src="../assets/images/hot.png" alt>
            <span class="hot-search-txt">热搜指数</span>
            <div
              class="hot-search-bg"
              :class="{'hot-search-bg-last': index == hots.length - 1 && index != 0}"
            ></div>
          </div>
          <div class="hot-placeholder"></div>
          <div class="hot-price">
            <span class="hot-new">￥{{ el.group_price }}</span>
            <del class="hot-old">￥{{ el.shop_price }}</del>
            <a href="javascript:;" class="hot-miao">立即秒 ></a>
          </div>
        </div>
      </div>
    </div>
    <div id="hot-else" v-else>
      <img v-lazy="imgName" alt @click="noGoodsClick">
    </div>
    <div id="nav" :class="{fixed:navFIxed}">
      <a
        href="javascript:;"
        class="nav"
        :class="{'nav-active': index==navNum}"
        v-for="(el, index) in navs"
        :key="index"
        @click="navClick(index)"
      >{{ el.name }}</a>
    </div>
    <div class="diangao" v-if="navFIxed"></div>
    <div id="goods">
      <div
        class="goods"
        v-for="(el, index) in goods_lists"
        :key="index"
        @click="toGoods(el.goods_id)"
      >
        <!-- <img class="goods-img" v-lazy="el.img320_url" alt> -->
        <img class="goods-img" src="../assets/images/goods_02.png" alt>
        <p class="goods-title">{{ el.goods_name }}</p>
        <div class="goods-box">
          <span class="goods-font">￥</span>
          <span class="goods-price">{{ el.shop_price }}</span>
          <del class="goods-num">￥{{ el.group_price }}</del>
          <a href="javascript:;" class="goods-go"></a>
        </div>
      </div>
      <div id="more">
        <a href="javascript:;" class="more" @click="toMore">查看更多></a>
      </div>
    </div>
    <img src="../assets/images/top_04.jpg" @click="backMain">
    <div class="placeholder"></div>
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import msgBox from "@/components/msgBox";
import URL from "./../assets/js/api.js";
import { scroller } from "vue-scrollto/src/scrollTo";
let vm = null;
export default {
  data() {
    return {
      hots: [],
      times: [
        {
          time: "8:00",
          icon: require("../assets/images/icon.png"),
          icon_active: require("../assets/images/icon_active.png"),
          img: require("../assets/images/8.png"),
          img_active: require("../assets/images/8_active.png"),
          id: 8
        },
        {
          time: "12:00",
          icon: require("../assets/images/icon.png"),
          icon_active: require("../assets/images/icon_active.png"),
          img: require("../assets/images/12.png"),
          img_active: require("../assets/images/12_active.png"),
          id: 12
        },
        {
          time: "16:00",
          icon: require("../assets/images/icon.png"),
          icon_active: require("../assets/images/icon_active.png"),
          img: require("../assets/images/16.png"),
          img_active: require("../assets/images/16_active.png"),
          id: 16
        },
        {
          time: "20:00",
          icon: require("../assets/images/icon.png"),
          icon_active: require("../assets/images/icon_active.png"),
          img: require("../assets/images/8.png"),
          img_active: require("../assets/images/8_active.png"),
          id: 20
        }
      ],
      // 317 母婴
      // 361 食品
      // 328 鞋包
      // 406 百货
      // 315 服饰
      navs: [
        { name: "服饰内衣", id: 315, toMoreName: "服饰" },
        { name: "家居百货", id: 406, toMoreName: "百货" },
        { name: "鞋包配饰", id: 328, toMoreName: "鞋包" },
        { name: "辣妈萌宝", id: 317, toMoreName: "母婴" },
        { name: "休闲美食", id: 361, toMoreName: "食品" }
      ],
      navNum: 0,
      timeNavNum: 0,
      hotSearchNum: 0,
      navTop: 0,
      navFIxed: false,
      scrollFirst: true,
      hotsObj: {},
      goods_ids: [
        "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
      ],
      goods_lists: [],
      goods_lists_obj: {},
      shareBtn: true,
      imgName: "",
      msgTxt: "",
      toMoreId: null,
      toMoreName: null
    };
  },
  created() {
    vm = this;
    this.msInit();
    this.goodsListInit(0);
    // this.navTop = document.getElementById("nav").offsetTop;
  },
  methods: {
    // handleScroll() {
    //   //监听滚动
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   if(this.scrollFirst){
    //     this.navTop = document.getElementById("nav").offsetTop;
    //     this.scrollFirst = false;
    //   }
    //   if (scrollTop >= this.navTop) {
    //     this.navFIxed = true;
    //   } else {
    //     this.navFIxed = false;
    //   }
    // },
    // 热搜指数
    hotSearch() {
      let hotSearchTimer = setInterval(() => {
        vm.hotSearchNum += 99;
      }, 180000);
    },
    // 热搜指数样式计算
    hotCssWidth(num) {
      return (num / 5) * 0.95;
    },
    // 秒杀数据
    msInit() {
      this.$http.get(URL.GetGoodsSkillCategory).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.hotSearchNum = data.num;
          vm.timeNavNum = data.currentHour;
          vm.toMoreId = vm.navs[0].id;
          vm.toMoreName = vm.navs[0].toMoreName;
          for (let key in data.goods) {
            vm.hotsObj[key] = data.goods[key];
          }
          vm.hots = vm.hotsObj[data.currentHour];
          vm.hotSearch();
          vm.getTime(data.currentHour);
        } else {
          vm.msgTxt = data.message;
        }
      });
    },
    // 未到时间档-秒杀-数据
    noGoodsClick(){
      vm.msgTxt = "即将开抢 敬请期待";
    },
    // 秒杀时间导航
    timeNavClick(index) {
      this.timeNavNum = index;
      if (this.hotsObj[index].length == 0) {
        this.hots = this.hotsObj[index];
        this.getTime(index);
        return false;
      }
      this.hots = this.hotsObj[index];
    },
    // 菜单导航
    navClick(index) {
      this.navNum = index;
      vm.toMoreId = vm.navs[index].id;
      vm.toMoreName = vm.navs[index].toMoreName;
      this.goodsListInit(index);
    },
    // 商品列表
    goodsListInit(index) {
      let params = {
        goods_id: this.goods_ids[index]
      };
      if (!!vm.goods_lists_obj[index]) {
        this.goods_lists = vm.goods_lists_obj[index];
        return false;
      }
      this.$http.get(URL.GoodList, { params }).then(res => {
        let goods = res.data;
        console.log(goods);
        //这里判断如果查到的商品下架一个 再取消一个
        if (goods.length % 2 != 0) {
          goods = goods.slice(0, goods.length - 1);
        }
        vm.goods_lists = goods;
        // 数据缓存
        vm.goods_lists_obj[index] = goods;
      });
    },
    toMore() {
      //跳转二级分类
      tjjApp.web.toCATE({ id: vm.toMoreId, name: vm.toMoreName });
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
    // 返回主会场
    backMain() {
      let jump_url =
        window.location.origin + "/activity/project/happy/happies/view/index";
      console.log(jump_url);
      window.location.href = jump_url;
    },
    // 获取时间
    getTime(navTime) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate() + 6;
      let hour = date.getHours();
      let tagDate = "";
      if (navTime > hour) {
        tagDate = require("../assets/images/" +
          month +
          "_" +
          day +
          "_" +
          navTime +
          ".png");
      } else {
        tagDate = "";
      }
      vm.imgName = tagDate;
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

    let windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      vm.shareBtn = false;
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      let token = tjjApp.web.getUrlQuery("token", window.location.href);
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    // window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    ToTop,
    msgBox
  }
};
</script>
<style>
html,
body {
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
.top-share {
  position: absolute;
  width: 1.15rem;
  height: 0.28125rem;
  right: 0.2rem;
  top: .16875rem;
  background: url(../assets/images/share_new.png) center center no-repeat;
  background-size: 1.15rem 0.28125rem;
}
.top-p {
  position: absolute;
  width: 5.5rem;
  height: 0.6rem;
  line-height: 0.6rem;
  left: 50%;
  margin-left: -2.75rem;
  top: 1.77rem;
  font-size: 0.3rem;
  color: rgb(255, 251, 226);
  font-family: "SourceHanSansCN";
  text-shadow: 0px 0.04rem 0.12rem rgba(0, 0, 0, 0.45);
  transform: matrix(1.19426603419603, 0, 0, 1.19426603419603, 0, 0);
  text-align: center;
  text-indent: 0.1rem;
}
#time {
  width: 100%;
  height: 0.7rem;
  overflow: hidden;
}
#time .time {
  display: block;
  float: left;
  width: calc(calc(100% - 0.06rem) / 4);
  height: 0.7rem;
  font-family: "FZLTZHUNHK";
  background: #fadf95;
}
#time .time-active {
  background: #d32737;
}
#time .time:nth-of-type(2) {
  margin: 0 0.02rem;
}
#time .time:nth-of-type(3) {
  margin-right: 0.02rem;
}
#time .time .time-num {
  display: block;
  width: 0.27rem;
  height: 0.27rem;
  margin: 0.22rem 0 0 0.3rem;
  float: left;
}
#time .time .time-span {
  display: inline-block;
  line-height: 0.7rem;
  color: rgb(234, 39, 66);
  font-size: 0.28rem;
  text-align: center;
  float: left;
  padding-left: 0.1rem;
}
#time .time .time-icon {
  display: block;
  width: 0.17rem;
  height: 0.19rem;
  margin-top: 0.12rem;
  float: left;
}
#time .time-active .time-span {
  color: #fadf95;
}
#hot {
  width: calc(100% - 0.34rem);
  margin: 0 auto 0.08rem;
  overflow: hidden;
  min-height: 2.8rem;
}
.hot {
  width: 100%;
  height: 2.8rem;
  background: #fff;
  margin-bottom: 0.1rem;
  overflow: hidden;
}
.hot:first-child{
  margin-top: .18rem;
}
.hot .hot-img {
  width: 2.74rem;
  height: 2.54rem;
  margin: 0.13rem 0.24rem 0.13rem 0.15rem;
  float: left;
}
.hot-content {
  width: 3.7rem;
  height: 2.54rem;
  float: left;
  margin: 0.13rem 0;
}
.hot-title {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.32rem;
  font-family: "SourceHanSansCN";
  color: rgb(79, 79, 79);
  font-weight: bold;
  transform: matrix(1.0069367816092, 0, 0, 1.00841339419613, 0, 0);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hot-search {
  width: 2.73rem;
  height: 0.38rem;
  background: #fff1f1;
  border-radius: 0.38rem;
}
.hot-search-img {
  float: left;
  width: 0.38rem;
  height: 0.38rem;
}
.hot-search-txt {
  float: left;
  width: 1.2rem;
  text-align: center;
  height: 0.38rem;
  line-height: 0.38rem;
  font-size: 0.26rem;
  font-family: "FZY3JW";
  color: rgb(213, 38, 55);
  transform: matrix(0.90923191218452, 0, 0, 0.91056524642208, 0, 0);
}
.hot-search-bg {
  width: 0.95rem;
  height: 0.17rem;
  float: left;
  margin-top: 0.11rem;
  background: url(../assets/images/start_has.png) left center no-repeat;
  background-size: 0.95rem 0.17rem;
  position: relative;
}
.hot-search-bg-last {
  background: url(../assets/images/start_nohas.png) left center no-repeat;
  background-size: 0.95rem 0.17rem;
}
.hot-placeholder {
  width: 100%;
  height: 0.33rem;
  border-bottom: 0.02rem dashed #d9d9d9;
  margin-bottom: 0.43rem;
}
.hot-price {
  width: 100%;
  height: 0.42rem;
}
.hot-price .hot-new {
  display: inline-block;
  float: left;
  line-height: 0.54rem;
  font-size: 0.28rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  text-transform: uppercase;
  transform: matrix(1.24882579184901, 0, 0, 1.25065712020727, 0, 0);
}
.hot-price .hot-old {
  margin-left: 0.2rem;
  display: inline-block;
  float: left;
  line-height: 0.62rem;
  font-size: 0.24rem;
  font-family: "Microsoft YaHei";
  color: rgb(170, 170, 170);
  text-decoration: line-through;
  text-transform: uppercase;
  transform: matrix(1.0069367816092, 0, 0, 1.00841339419613, 0, 0);
}
.hot-miao {
  display: block;
  float: right;
  width: 1.66rem;
  height: 0.42rem;
  background: rgb(213, 38, 55);
  border-radius: 0.05rem;
  font-size: 0.28rem;
  font-family: "SourceHanSansCN";
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-align: center;
  line-height: 0.42rem;
  transform: matrix(1.0069367816092, 0, 0, 1.00841339419613, 0, 0);
}
#nav {
  width: 100%;
  padding: 0 0.03rem;
  margin: 0 auto;
  height: 0.5rem;
  background: #d32737;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
#nav .nav {
  width: calc(calc(100% - 0.3rem) / 5);
  height: 0.5rem;
  display: block;
  margin: 0 0.03rem;
  float: left;
  text-align: center;
  line-height: 0.5rem;
  background: #000;
  background: linear-gradient(to right, #fd5162, #f52d40);
  font-size: 0.3rem;
  font-family: "SourceHanSansCN";
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-shadow: 0px 0.03rem 0px rgba(113, 4, 20, 0.47);
}
#nav .nav-active {
  background: linear-gradient(to right, #f75e44, #f34022);
}
#goods {
  width: 100%;
  margin: 0.01rem auto 0;
  padding: 0.15rem;
  background: #fff;
  overflow: hidden;
}
.goods {
  width: calc(calc(100% - 0.06rem) / 2);
  overflow: hidden;
  float: left;
  margin-bottom: 0.2rem;
  background: #fff;
}
.goods:nth-of-type(2n) {
  margin-left: 0.06rem;
}
.goods-title {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.22rem;
  font-family: "SourceHanSansCN";
  color: rgb(88, 92, 99);
  text-transform: uppercase;
  /* text-align: center; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0.2rem;
}
.goods-box {
  width: 100%;
  height: 0.55rem;
  overflow: hidden;
}
.goods-price {
  display: block;
  line-height: 0.46rem;
  font-size: 0.26rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  float: left;
  margin-left: 0.16rem;
  text-transform: uppercase;
  transform: matrix(1.50611868105775, 0, 0, 1.50611868105775, 0, 0);
}
.goods-font {
  display: block;
  line-height: 0.4rem;
  height: 0.4rem;
  font-size: 0.16rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  float: left;
  margin-left: 0.26rem;
  text-transform: uppercase;
  transform: matrix(1.50611868105775, 0, 0, 1.50611868105775, 0, 0);
}
.goods-num {
  line-height: 0.56rem;
  transform: matrix(0.91179467524918, 0, 0, 0.91179467524919, 0, 0);
  font-size: 0.22rem;
  font-family: "SourceHanSansCN";
  color: rgb(153, 153, 153);
  text-transform: uppercase;
  float: left;
  display: inline-block;
  margin-left: 0.2rem;
  max-width: 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-go {
  display: block;
  width: 0.55rem;
  height: 0.55rem;
  background: url(../assets/images/shop.png) center center no-repeat;
  background-size: 0.55rem;
  float: right;
  margin-right: 0.2rem;
}
#more {
  width: 100%;
  height: 0.4rem;
  background: #fff;
  overflow: hidden;
}
#more .more {
  display: block;
  width: 2rem;
  height: 0.4rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.26rem;
  background: #d32737;
  font-family: "SourceHanSansCN";
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  margin: 0 auto;
  border-radius: 0.4rem;
  transform: matrix(0.76622412473431, 0, 0, 0.76622412473431, 0, 0);
}
.diangao {
  width: 100%;
  height: 0.5rem;
}
.loading-wrap .loading {
  width: 1.875rem !important;
  height: 1.875rem !important;
  border-radius: 0.1953125rem !important;
  padding: 0.5859375rem !important;
}
.loading-wrap .loading .loading-bar {
  width: 0.78125rem !important;
  height: 0.78125rem !important;
  margin: -0.390625rem auto !important;
}
.loading-wrap .loading .text {
  bottom: 0.390625rem !important;
  font-size: 0.3125rem !important;
}
.msgBox {
  font-size: 0.546875rem !important;
  padding: 0.3125rem 0.625rem !important;
  line-height: 0.78125rem !important;
  border-radius: 0.234375rem !important;
}
</style>

