<template>
  <nav class="container">
    <div id="top">
      <img src="../../assets/images/flashSale/top_01.png">
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
    <img src="../../assets/images/flashSale/top_03.jpg">
    <div id="hot" v-if="hots.length != 0">
      <div class="hot" v-for="(el, index) in hots" :key="index" @click="toGoods(el.goods_id, el.num)">
        <img v-lazy="el.img320_url" alt class="hot-img">
        <!-- <img src="./../../assets/images/flashSale/goods_01.png" alt class="hot-img"> -->
        <div class="hot-img-over" v-if="el.num <= 0"></div>
        <div class="hot-content">
          <p class="hot-title">{{ el.goods_name }}</p>
          <div class="hot-search">
            <img class="hot-search-img" src="../../assets/images/flashSale/hot.png" alt>
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
      <img :src="imgName" alt @click="noGoodsClick">
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
        <img class="goods-img" v-lazy="el.img320_url" alt>
        <!-- <img class="goods-img" src="../../assets/images/flashSale/goods_02.png" alt> -->
        <p class="goods-title">{{ el.goods_name }}</p>
        <div class="goods-box">
          <span class="goods-font">￥</span>
          <span class="goods-price">{{ el.group_price }}</span>
          <del class="goods-num">￥{{ el.shop_price }}</del>
          <a href="javascript:;" class="goods-go"></a>
        </div>
      </div>
      <div id="more" v-if="shareBtn">
        <a href="javascript:;" class="more" @click="toMore">查看更多></a>
      </div>
    </div>
    <img src="../../assets/images/flashSale/top_04.jpg" @click="backMain">
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
import URL from "./../../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
let vm = null;
export default {
  data() {
    return {
      hots: [],
      times: [
        {
          time: "8:00",
          icon: require("../../assets/images/flashSale/icon.png"),
          icon_active: require("../../assets/images/flashSale/icon_active.png"),
          img: require("../../assets/images/flashSale/8.png"),
          img_active: require("../../assets/images/flashSale/8_active.png"),
          id: 8
        },
        {
          time: "12:00",
          icon: require("../../assets/images/flashSale/icon.png"),
          icon_active: require("../../assets/images/flashSale/icon_active.png"),
          img: require("../../assets/images/flashSale/12.png"),
          img_active: require("../../assets/images/flashSale/12_active.png"),
          id: 12
        },
        {
          time: "16:00",
          icon: require("../../assets/images/flashSale/icon.png"),
          icon_active: require("../../assets/images/flashSale/icon_active.png"),
          img: require("../../assets/images/flashSale/16.png"),
          img_active: require("../../assets/images/flashSale/16_active.png"),
          id: 16
        },
        {
          time: "20:00",
          icon: require("../../assets/images/flashSale/icon.png"),
          icon_active: require("../../assets/images/flashSale/icon_active.png"),
          img: require("../../assets/images/flashSale/8.png"),
          img_active: require("../../assets/images/flashSale/8_active.png"),
          id: 20
        }
      ],
      // 317 母婴
      // 361 食品
      // 328 鞋包
      // 406 百货
      // 315 服饰
      // 332 美妆
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
        "2533993,2539348,2139783,2806278,2994246,195353,2862838,2644924,3377459,2858009,3021979,2601062,3182990,3162973,2665548,3084986,3376929,1764482,65864,3182979,203957,2889206,3067897,3175216,2603084,2574817,2860726,2831171,2578810,3121468,3139004,3182981,3377471,3145292,3084974,3392555,2674692,2630464,2604461,3082894,2322493,3271969,2671026,3003164,3149742,3121507,3087735,2571369,2884013,2449361,3162654,3117729,2871583,3449000,3175624,2602907,2994302,3444377,3435521,2602927,3393450,3435159,3141652,2918174,128870,3692023,3670602,3566931,3566204,2845784",
        "1331952,53678,2535231,1761368,59930,2736776,1198534,91777,3107482,2865378,14718,2600331,1340444,64869,2505,3005914,1138597,3141246,2659787,17709,17766,48327,7270,906589,1303310,59906,2766,11718,2454610,886937,38895,1073,4029,91431,96388,2736794,2744133,2593467,31861,2693996,1632629,2593464,2581296,926668,2693292,4242,54614,3114,1301868,17745,2481468,2583794,2389541,2694349,2760335,71392,1648964,1529253,62296,1258176",
        "2243947,2807108,2537409,2269657,3379,1219273,3698,2715668,2863960,2192931,2827014,2870450,2863991,2735234,1609766,1042239,2848257,2641703,61813,2852992,2702469,1487672,2579925,3050381,2684855,2892301,183,3217142,3122899,2656013,2656311,1714932,3149934,2863970,2702392,1863494,2517542,2596458,2826400,2811517,10195,3020909,3055983,7150,1767549,2778,2515245,2603734,2522932,2506067,2807515,3702288,2807150,2984850,2572510,976380,25513,2863967,2602605,27177",
        "7697,910609,1022791,2542818,1794098,2325854,1136457,1070845,2112,2538548,2768,1026641,23447,2585568,1138697,2602926,902049,2430326,2487708,29377,2827557,2563506,1096576,2587658,548963,1510806,1387224,189148,2729861,1512648,903252,2568035,2821772,3225,909374,2567362,3168,5233,93206,5867,3084,427397,2856786,152967,2575199,412122,2985733,99255,2591961,1917490,1766649,925286,2729780,35412,40624,1873594,1513994,2245705,2845841",
        "1035897,1472288,994764,80987,1765605,1641943,3059533,2224392,2603429,925889,1186399,1021168,956037,986658,1121414,1481551,88879,1833423,63728,2607775,1106328,1070106,16302,1049972,1766215,424,1467070,1160467,1768389,544,3456611,5617,1618274,3554512,8137,1033125,2636166,3848574,3762061,3137163,3137587,3006169,2601390,56389,2640674,2640683,2635860,56373,2635860,2825801,1208420,31453,3079338,3850382,1139639,56373,2871634,2825929,16436,2596084"
      ],
      // goods_ids: [
      //   "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
      // ],
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
      vm.toMoreId = vm.navs[0].id;
      vm.toMoreName = vm.navs[0].toMoreName;
      this.$http.get(URL.GetGoodsSkillCategory).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.hotSearchNum = data.num;
          vm.timeNavNum = data.currentHour;
          console.log(data.goods)
          for (let key in data.goods) {
            vm.hotsObj[key] = data.goods[key];
          }
          vm.hotSearch();
          vm.getTime(data.currentHour);
          if(!data.currentHour){
            vm.hots = [];
            vm.timeNavNum = 8;
            return false;
          }
          vm.hots = vm.hotsObj[data.currentHour];
        } else {
          vm.msgTxt = data.message;
        }
      });
    },
    // 未到时间档-秒杀-数据
    noGoodsClick() {
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
    toGoods(id, num) {
      if(num == 0){
        vm.msgTxt = '已售罄';
        return false
      }
      num = num || 3;
      if(num <= 0){
        vm.msgTxt = '已售罄';
      }else{
        //跳转商品
        tjjApp.web.jump2good(id);
      }
     
    },
    // 分享
    shareClick() {
      tjjApp.web.share({
        title: document.title
      });
    },
    // 返回主会场
    backMain() {
      window.location.$router = "/index";
      this.$router.push("/index");
    },
    // 获取时间
    getTime(navTime) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      if(day<=23){
        day = 23
      }else if(day>=27){
        day = 27
      }
      if(!navTime){
        navTime = 8;
      }
      vm.imgName = require("../../assets/images/flashSale/" +
        month +
        "_" +
        day +
        "_" +
        navTime +
        ".png");
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
    let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    if (xcx_user) {
       vm.shareBtn = false;
      let user_id = xcx_user.user_id
      let token = xcx_user.token;
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
<style scoped >
.container {
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
  width: 1.84rem;
  height: 0.45rem;
  right: 0.2rem;
  top: 0.27rem;
  background: url(../../assets/images/flashSale/share_new.png) center center no-repeat;
  background-size: 1.84rem 0.45rem;
}
.top-p {
  position: absolute;
  width: 8.8rem;
  height: 0.96rem;
  line-height: 0.96rem;
  left: 50%;
  margin-left: -4.4rem;
  top: 2.8rem;
  font-size: 0.52rem;
  color: rgb(255, 251, 226);
  font-family: "SourceHanSansCN";
  text-align: center;
  text-indent: 0.2rem;
}
#time {
  width: 100%;
  height: 1.1rem;
  overflow: hidden;
}
#time .time {
  display: block;
  float: left;
  width: calc(calc(100% - 0.06rem) / 4);
  height: 1.1rem;
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
  width: 0.46rem;
  height: 0.46rem;
  margin: 0.34rem 0 0 0.5rem;
  float: left;
}
#time .time .time-span {
  display: inline-block;
  line-height: 1.1rem;
  color: rgb(234, 39, 66);
  font-size: 0.45rem;
  float: left;
  padding-left: 0.1rem;
  padding-right: 0.04rem;
}
#time .time .time-icon {
  display: block;
  width: 0.28rem;
  height: 0.3rem;
  margin-top: 0.2rem;
  float: left;
}
#time .time-active .time-span {
  color: #fadf95;
}
#hot {
  width: calc(100% - 0.56rem);
  margin: 0 auto 0.28rem;
  overflow: hidden;
  min-height: 4.46rem;
}
.hot {
  width: 100%;
  height: 4.46rem;
  background: #fff;
  margin-bottom: 0.1rem;
  overflow: hidden;
  position: relative;
}
.hot:first-child {
  margin-top: 0.24rem;
}
.hot .hot-img {
  width: 4.4rem;
  height: 4rem;
  margin: 0.22rem 0.4rem 0 0.28rem;
  float: left;
}
.hot .hot-img-over{
  position: absolute;
  left: .28rem;
  top: .22rem;
  width: 4.4rem;
  height: 4rem;
  background: rgba(0,0,0,.52) url(./../../assets/images/flashSale/over.png) center center no-repeat;
  background-size: 3.968rem 3.136rem;
}
.hot-content {
  width: 5.9rem;
  height: 4rem;
  float: left;
  margin: 0.22rem 0 0;
}
.hot-title {
  width: 100%;
  height: 1.14rem;
  line-height: 1.14rem;
  font-size: 0.52rem;
  font-family: "SourceHanSansCN";
  color: rgb(79, 79, 79);
  font-weight: bold;
  transform: matrix(1.0069367816092, 0, 0, 1.00841339419613, 0, 0);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hot-search {
  width: 4.4rem;
  height: 0.6rem;
  background: #fff1f1;
  border-radius: 0.6rem;
}
.hot-search-img {
  float: left;
  width: 0.6rem;
  height: 0.6rem;
}
.hot-search-txt {
  float: left;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0 .12rem 0 .2rem;
  font-size: 0.38rem;
  font-family: "FZY3JW";
  color: rgb(213, 38, 55);
  transform: matrix(0.90923191218452, 0, 0, 0.91056524642208, 0, 0);
}
.hot-search-bg {
  width: 1.52rem;
  height: .27rem;
  float: left;
  margin-top: 0.165rem;
  background: url(../../assets/images/flashSale/start_has.png) left center no-repeat;
  background-size: 1.52rem .27rem;
  position: relative;
}
.hot-search-bg-last {
  background: url(../../assets/images/flashSale/start_nohas.png) left center no-repeat;
  background-size: 1.52rem .27rem;
}
.hot-placeholder {
  width: 100%;
  height: 0.54rem;
  border-bottom: 0.02rem dashed #d9d9d9;
  margin-bottom: 0.7rem;
}
.hot-price {
  width: 100%;
  height: 0.68rem;
}
.hot-price .hot-new {
  display: inline-block;
  float: left;
  font-size: 0.58rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  text-transform: uppercase;
  transform: matrix(1.24882579184901, 0, 0, 1.25065712020727, 0, 0);
  line-height: .68rem;
}
.hot-price .hot-old {
  margin-left: 0.2rem;
  display: inline-block;
  float: left;
  font-size: 0.38rem;
  font-family: "Microsoft YaHei";
  color: rgb(170, 170, 170);
  text-decoration: line-through;
  text-transform: uppercase;
  transform: matrix(1.0069367816092, 0, 0, 1.00841339419613, 0, 0);
  line-height: .86rem;
}
.hot-miao {
  display: block;
  float: right;
  width: 2.68rem;
  height: 0.68rem;
  background: rgb(213, 38, 55);
  border-radius: 0.08rem;
  font-size: 0.45rem;
  font-family: "SourceHanSansCN";
  color: rgb(255, 255, 255);
  text-transform: uppercase;
  text-align: center;
  line-height: 0.68rem;
  transform: matrix(1.0069367816092, 0, 0, 1.00841339419613, 0, 0);
}
#nav {
  width: 100%;
  padding: 0 0.03rem;
  margin: 0 auto;
  height: 0.78rem;
  background: #d32737;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
#nav .nav {
  width: calc(calc(100% - 0.3rem) / 5);
  height: 0.78rem;
  display: block;
  margin: 0 0.03rem;
  float: left;
  text-align: center;
  line-height: 0.78rem;
  background: #000;
  background: linear-gradient(to right, #fd5162, #f52d40);
  font-size: 0.48rem;
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
  padding: 0.25rem;
  background: #fff;
  overflow: hidden;
}
.goods {
  width: calc(calc(100% - 0.06rem) / 2);
  overflow: hidden;
  float: left;
  margin-bottom: 0.33rem;
  background: #fff;
}
.goods:nth-of-type(2n) {
  margin-left: 0.06rem;
}
.goods-title {
  width: 100%;
  height: 0.97rem;
  line-height: 0.97rem;
  font-size: 0.35rem;
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
  height: 0.88rem;
  overflow: hidden;
}
.goods-price {
  display: block;
  line-height: 0.8rem;
  height: 0.8rem;
  font-size: 0.53rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  float: left; 
}
.goods-font {
  display: block;
  line-height: 0.8rem;
  height: 0.8rem;
  font-size: 0.43rem;
  font-family: "SourceHanSansCN";
  color: rgb(213, 38, 55);
  float: left;
  margin-left: 0.42rem;
}
.goods-num {
  line-height: 0.8rem;
  height: 0.8rem;
  font-size: 0.32rem;
  font-family: "SourceHanSansCN";
  color: rgb(153, 153, 153);
  float: left;
  display: inline-block;
  margin-left: 0.3rem;
  max-width: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-go {
  display: block;
  width: 0.88rem;
  height: 0.88rem;
  background: url(../../assets/images/flashSale/shop.png) center center no-repeat;
  background-size: 0.88rem;
  float: right;
  margin-right: 0.44rem;
}
#more {
  width: 100%;
  height: 0.68rem;
  background: #fff;
  overflow: hidden;
}
#more .more {
  display: block;
  width: 3.12rem;
  height: 0.68rem;
  line-height: 0.68rem;
  text-align: center;
  font-size: 0.44rem;
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
.goods-img{
  height: 5.7rem;
}
</style>
