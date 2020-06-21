<template>
  <nav class="container">
    <div id="top">
      <img src="../../assets/images/makeup/makeup_01.jpg">
      <a href="javascript:;" class="top-share" @click="shareClick" v-if="shareBtn"></a>
    </div>
    <img src="../../assets/images/makeup/makeup_02.jpg">
    <div class="shop_lists">
      <div>
        <div>
          <img v-lazy="el.img" @click="toShop(el.id)" v-for="(el, index) in shops" :key="index">
        </div>
      </div>
    </div>
    <div class="nav" :class="{fixed:navFIxed}">
      <span
        v-for="(item,index) in navs"
        :key="index"
        @click="toGoodNav(index)"
        :class="{ active:changeNav == index}"
      >{{item.name}}</span>
    </div>
    <!-- <div v-if="navFIxed" class="diangao"></div> -->

    <!-- shangpin -->
    <div class="lists">
      <div class="goods_list" v-for="(item,index) in goods_lists" :key="(index)" :id="'el'+index">
        <div
          v-for="(good,key) in item"
          :key="(key)"
          :id="good.goods_id"
          @click="toGoods(good.goods_id)"
        >
          <div class="good_img">
            <img v-lazy="good.img320_url">
          </div>
          <div class="good_info">
            <p class="good_name">{{good.goods_name}}</p>
            <p class="buy">
              <span>
                <span>
                 <font>￥</font>{{good.group_price}}
                </span>
                <span>￥{{good.shop_price}}</span>
              </span>
              <span class="buy_now">立即购买</span>
            </p>
          </div>
        </div>
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods">
          <img
            class="more more-height"
            src="../../assets/images/makeup/more.png"
            @click="toMore"
            alt
          >
        </div>
      </div>
    </div>
    <img class="bottom-img" src="../../assets/images/makeup/makeup_07.jpg" @click="backMain" alt>
    <ToTop></ToTop>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import URL from "./../../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
let vm = null;
export default {
  data() {
    return {
      goods: [],
      navs: [
        { name: "热销榜单" },
        { name: "美妆达人" },
        { name: "护肤专家" },
        { name: "时尚潮娃" },
        { name: "玩具天地" }
      ],
      shops: [
        {
          img: require("../../assets/images/makeup/01.png"),
          id: 27826,
          name: "故梦专卖店"
        },
        {
          img: require("../../assets/images/makeup/02.png"),
          id: 13544,
          name: "韩韩母婴专营店"
        },
        {
          img: require("../../assets/images/makeup/03.png"),
          id: 104262,
          name: "集集美妆"
        },
        {
          img: require("../../assets/images/makeup/04.jpg"),
          id: 14212,
          name: "丽人美妆店"
        },
        {
          img: require("../../assets/images/makeup/05.jpg"),
          id: 96589,
          name: "欧琪美妆专营店"
        },
        {
          img: require("../../assets/images/makeup/06.png"),
          id: 76167,
          name: "思雅鞋坊"
        }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      goods_ids: [
        "2966592,1344881,25040,28181,2578833,29046,1664553,2387696,2428624,1026285,2599834,2536592,2729903,2282770,899501,2585560,1191627,1765249,23338,20114,2812024,1987886,2439050,820275,1317,2854490,1802667,2494943,2517510,2692909,13450,57026,1818549,4414,1772180,2585548,2507751,36212,2468019,2494932,1829822,1037802,1741443,2585557,1505665,70316,1675081,2601688,2792486,1551693,110752,1437077,1021562,2204331,5231,2538817,869699,2563478,1892075,2016658",
        "1847,911954,48894,1932,2471618,2598678,7385,2160253,10374,2231823,60141,2571398,2166480,1503275,1678294,349135,692194,58455,1825420,1875662,17405,60851,1676828,1102933,2996962,35592,1826316,190529,2570209,2997104,744888,2653864,1401874,2967406,293051,2907431,1383803,1009023,2577020,2862755,1139100,2847224,517292,53620,561755,2519357,8651,2886184,1155537,2961489,1415399,1465730,998109,2833683,8129,315896,26045,2717654,2567369,2729886",
        "772518,1755,2826162,1969,2241454,779922,1042686,1766971,8147,2639107,6639,18458,2969502,2306625,1293735,2535053,2618358,2521877,1468161,950,2534300,1329,2501492,782622,3864,248042,63,14690,2958290,1044,2667262,12951,2539874,1133120,2331108,2209,29641,2736660,2195318,849162,2570906,2736087,63543,2521951,2526841,2615366,39970,2943879,2137277,729394,11208,3312,231522,400634,5529,2460409,166683,1351,2729924,856254",
        "299757,42432,915001,1493982,2859555,1702628,2494934,914844,5220,2564195,2155490,15414,2883415,5993,5960,2160610,2652232,2070682,2576271,1136248,2505087,2311097,2504232,1586036,806458,2520708,2330670,1469897,1838068,2519327,2578768,1658645,1140505,2807177,2445654,4310,813268,2534991,2152534,2619907,2079595,1245395,2035277,61481,2538754,1075689,24390,1792847,2504012,2574855,1435202,119621,1806538,81387,1164714,1824141,2459498,2618405,2171577,2542826",
        "1307844,104750,1882657,1857304,1198956,1441215,1215705,483906,39435,5304,1766510,2507638,148666,1467501,184339,1312488,1867737,1229727,1878118,1864371,2505069,47709,138274,1194794,1752472,2572045,1190781,1768722,1883713,1856090,1218181,99577,3023430,2498859,2494935,1001042,1767196,1867237,1111333,2749782,2122599,891171,1727800,1884121,72202,2743290,1115211,1424795,2072579,2059522,1115261,1857128,1121618,2499634,1320392,1278664,2593415,30510,101425,1348147"
      ],
      // goods_ids: [
      //   "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
      // ],
      goods_lists: {},
      navTop: 0,
      scrollFirst: true,
      shareBtn: true
    };
  },
  async created() {
    // 加载数据
    vm = this;
    let goods_list = {};

    let len = this.goods_ids.length;
    for (let i = 0; i < len; i++) {
      let params = {
        goods_id: this.goods_ids[i]
      };
      await this.$http.get(URL.GoodList, { params }).then(res => {
        let goods = res.data;
        //这里判断如果查到的商品下架一个 再取消一个
        if (i >= len - 1) {
          if (!tjjApp.web.xcx) {
            if (goods.length % 2 == 0) {
              goods = goods.slice(0, goods.length - 1);
            }
          } else {
            if (goods.length % 2 > 0) {
              goods = goods.slice(0, goods.length - 1);
            }
          }
        } else {
          if (goods.length % 2 > 0) {
            goods = goods.slice(0, goods.length - 1);
          }
        }
        this.goods_lists[i] = goods;
        this.$forceUpdate();
      });
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
        source: "母婴"
      };
      send.sendPoint(params);
      if (user_id) {
      } else {
        tjjApp.web.login();
      }
    };

    window.addEventListener("scroll", this.handleScroll);
    var windowUrl = window.location.href;
    let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    if (xcx_user) {
      vm.shareBtn = false;
      let user_id = xcx_user.user_id
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  methods: {
    handleScroll() {
      //监听滚动
      var windowUrl = window.location.href;
      var moreshow = true;
       let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
      if (xcx_user) {
        var more = document.getElementsByClassName("more");
        if (moreshow) {
          for (let index = 0; index < more.length; index++) {
            more[index].style.display = "none";
          }
        }
        moreshow = false;
      }

      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let navTop = document.getElementsByClassName("nav")[0].offsetTop;
      var goodsTop = document.getElementsByClassName("goods_list");
      for (var i = 0; i < goodsTop.length; i++) {
        if (scrollTop >= goodsTop[i].offsetTop) {
          this.changeNav = i;
        }
      }

      if (scrollTop >= navTop) {
        this.navFIxed = true;
      }
      if (scrollTop < goodsTop[0].offsetTop) {
        this.navFIxed = false;
      }
    },
    // 滚动位置
    toGoodNav(index) {
      let listScrollTo = scroller();
      listScrollTo(document.getElementsByClassName("goods_list")[index]);
      this.changeNav = index;
    },
    toMore() {
      //跳转二级分类
      tjjApp.web.toCATE({ id: 332, name: "美妆" });
    },
    toShop(id) {
      //跳转店铺
      tjjApp.web.startShopHome(id);
    },
    toGoods(id) {
      //跳转商品
      tjjApp.web.jump2good(id);
    },
    // 返回主会场
    backMain() {
      this.$router.push("index");
    },
    // 分享
    shareClick() {
      tjjApp.web.share({
        title: document.title
      });
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
<style scoped>
html,
body,
.goods_list,
.moregoods,
.container,
.lists {
  background: #f8ced2 !important;
}
.lists {
  padding-bottom: 8px;
}
img {
  width: 100%;
  display: block;
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 100;
  margin: 0 auto;
  left: 0;
  right: 0;
  margin: 0rem auto !important;
}
.shop_lists {
  width: 11.84rem;
  height: 7.91rem;
  background-color: #ffadad;
  border-radius: 5px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
}
.shop_lists > div {
  width: 100%;
}
.shop_lists > div > div {
  height: 130%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.shop_lists img {
  width: 3.74rem;
  height: 3.74rem;
  float: left;
  margin-bottom: 0.2rem;
  border-radius: 5px;
}

.nav {
  width: 11.84rem;
  margin: 0.15rem auto;
  height: 0.59rem;
  display: flex;
  justify-content: space-between;
}
.diangao {
  width: 11.84rem;
  margin: 0.15rem auto;
  height: 0.59rem;
}
.nav span {
  width: 2.31rem;
  height: 0.59rem;
  text-align: center;
  background-color: #fe8282;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #fb5b5b;
}
.goods_list {
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
}
.goods_list > div {
  width: 5.74rem;
  overflow: hidden;
  background: #fff;
  margin-top: 0.16rem;
  position: relative;
}
.good_tag {
  position: absolute;
  top: 0px;
  left: 0.1rem;
  height: 1.08rem;
  width: 0.94rem;
}
.goods_list .good_img {
  width: 5.74rem;
  height: 4.97rem;
}
.goods_list .good_img img {
  height: 100%;
  width: 100%;
}
.goods_list .good_info {
  margin: 0.15rem 0.1rem;
}
.goods_list .good_name {
  font-family: MicrosoftYaHei;
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.buy {
  justify-content: space-between;
  display: flex;
  margin-top: 0.1rem;
}
.buy > span {
  overflow: hidden;
  height: 0.6rem;
  display: inline-block;
  line-height: 0.6rem;
  margin-top: 0.1rem;
}
.buy span font {
  font-family: MicrosoftYaHei;
  font-size: 0.35rem;
  font-weight: bold;
}
.buy > span span:nth-of-type(1) {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.49rem;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fb7c7c;
  font-style: normal;
  float: left;
  line-height: 0.5rem;
  margin-top: 0.14rem;
}
.buy > span span:nth-of-type(2) {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.2rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #978c8c;
  float: left;
  font-style: normal;
  line-height: 0.5rem;
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  text-decoration-line: line-through;
}
.buy_now {
  width: 1.84rem;
  height: 0.46rem;
  line-height: 0.46rem;
  background-color: #fb7c7c;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  text-align: center;
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
  background: url(../../assets/images/makeup/share_new.png) center center
    no-repeat;
  background-size: 1.84rem 0.45rem;
}
.bottom-img {
  margin-top: -0.02rem;
}
.more-height {
  height: 100%;
}
</style>

