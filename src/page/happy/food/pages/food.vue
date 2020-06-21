<template>
  <nav class="container">
    <div id="top">
      <img src="../assets/images/food_01.jpg">
      <a href="javascript:;" class="top-share" @click="shareClick" v-if="shareBtn"></a>
    </div>
    <img src="../assets/images/food_02.jpg">
    <div class="shop_lists">
      <div>
        <div>
          <img v-lazy="el.img" v-for="(el, index) in shops" :key="index" @click="toShop(el.id)">
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
    <div v-if="navFIxed" class="diangao"></div>

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
            <!-- <img v-lazy="good.img320_url"> -->
            <img src="../assets/images/eg.jpg">
          </div>
          <div class="good_info">
            <p class="good_name">{{good.goods_name}}</p>
            <p class="buy">
              <span>
                <i>￥{{good.group_price}}</i>
                <i>￥{{good.shop_price}}</i>
              </span>
              <span class="buy_now">立即购买></span>
            </p>
          </div>
        </div>
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods">
          <img class="more" src="../assets/images/more.png" @click="toMore()" alt>
        </div>
      </div>
    </div>

    <img class src="../assets/images/food_07.jpg" @click="backMain" alt>
    <ToTop></ToTop>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import { GoodList } from "./../assets/js/api.js";
import { scroller } from "vue-scrollto/src/scrollTo";
let vm = null;
export default {
  data() {
    return {
      goods: [],
      navs: [
        { name: "馋猫专享" },
        { name: "食惠到家" },
        { name: "畅饮一夏" },
        { name: "农副生鲜" },
        { name: "休闲食品" }
      ],
      shops: [
        {
          img: require("../assets/images/01.jpg"),
          id: 77430,
          name: "优米优品"
        },
        {
          img: require("../assets/images/02.jpg"),
          id: 17652,
          name: "坚果零食店"
        },
        {
          img: require("../assets/images/03.jpg"),
          id: 76730,
          name: "天下"
        },
        {
          img: require("../assets/images/04.jpg"),
          id: 72430,
          name: "农家鲜果店"
        },
        {
          img: require("../assets/images/05.jpg"),
          id: 34982,
          name: "鸠府百货"
        },
        {
          img: require("../assets/images/06.jpg"),
          id: 75451,
          name: "杞然良品"
        },
        {
          img: require("../assets/images/07.jpg"),
          id: 36403,
          name: "嗨吃家"
        },
        {
          img: require("../assets/images/08.jpg"),
          id: 103618,
          name: "皓皓零食铺"
        },
        {
          img: require("../assets/images/09.jpg"),
          id: 85272,
          name: "小食后"
        },
        {
          img: require("../assets/images/10.jpg"),
          id: 96081,
          name: "美食美刻美食店"
        },
        {
          img: require("../assets/images/11.jpg"),
          id: 101111,
          name: "福建红状元茶业旗舰店"
        },
        {
          img: require("../assets/images/12.jpg"),
          id: 65820,
          name: "臻味坊零食店"
        }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      // goods_ids: [
      //   "1035897,1472288,80987,3059533,1768192,2224392,1481551,63728,2603429,956037,1159814,31453,1139701,2685849,404,1208420,927420,2898241,15295,3079338,424,1070106,2694765,186373,2590340,2076,1114571,2735605,29077,619265,2685924,3519935,1137185,2863164,2883421,2539296,1802691,1208419,3520300,3616538,204327,1455,2530219,2839263,2717952,8137,10206,2771426,2579430,2447298,105258,1110907,56389,1765615,1566434,3616536,1372539,1860300,1125269,1725751",
      //   "2566616,2566890,2579910,2593470,1768192,2566129,875793,2685866,1779336,2539966,2006054,2685891,2501954,2833597,2555359,913657,3041601,2608686,2563193,2598464,2822103,1670100,1516449,2693973,3561900,1802,2828026,2707201,2594609,2592882,1117418,2593425,2449766,2886088,3050375,1491097,2839263,1139183,2714057,2685924,50130,1120279,2875101,2522019,67615,2176856,945355,2875094,1766406,2553273,984720,1287493,2555408,2716118,3244929,2047722,2851925,2185700,3071105,1802691",
      //   "772518,1755,2826162,1969,2241454,779922,1042686,1766971,8147,2639107,6639,18458,2969502,2306625,1293735,2535053,2618358,2521877,1468161,950,2534300,1329,2501492,782622,3864,248042,63,14690,2958290,1044,2667262,12951,2539874,1133120,2331108,2209,29641,2736660,2195318,849162,2570906,2736087,63543,2521951,2526841,2615366,39970,2943879,2137277,729394,11208,3312,231522,400634,5529,2460409,166683,1351,2729924,856254",
      //   "299757,42432,915001,1493982,2859555,1702628,2494934,914844,5220,2564195,2155490,15414,2883415,5993,5960,2160610,2652232,2070682,2576271,1136248,2505087,2311097,2504232,1586036,806458,2520708,2330670,1469897,1838068,2519327,2578768,1658645,1140505,2807177,2445654,4310,813268,2534991,2152534,2619907,2079595,1245395,2035277,61481,2538754,1075689,24390,1792847,2504012,2574855,1435202,119621,1806538,81387,1164714,1824141,2459498,2618405,2171577,2542826",
      //   "1307844,104750,1882657,1857304,1198956,1441215,1215705,483906,39435,5304,1766510,2507638,148666,1467501,184339,1312488,1867737,1229727,1878118,1864371,2505069,47709,138274,1194794,1752472,2572045,1190781,1768722,1883713,1856090,1218181,99577,3023430,2498859,2494935,1001042,1767196,1867237,1111333,2749782,2122599,891171,1727800,1884121,72202,2743290,1115211,1424795,2072579,2059522,1115261,1857128,1121618,2499634,1320392,1278664,2593415,30510,101425,1348147,",
      // ],
      goods_ids: [
        "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
      ],
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
      await this.$http.get(GoodList, { params }).then(res => {
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

    this.navTop = document.getElementsByClassName("nav")[0].offsetTop;
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
        source: "食品"
      };
      send.sendPoint(params);
      if (user_id) {
      } else {
        tjjApp.web.login();
      }
    };

    window.addEventListener("scroll", this.handleScroll);
    var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      vm.shareBtn = false;
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      let token = tjjApp.web.getUrlQuery("token", window.location.href);
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    window.onload = () => {
      vm.navTop = document.getElementsByClassName("nav")[0].offsetTop;
    };
  },
  methods: {
    handleScroll() {
      //监听滚动
      var windowUrl = window.location.href;
      var moreshow = true;
      if (windowUrl.indexOf("uuid=wechat") > -1) {
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

      let goodsListsDom = document.getElementsByClassName("goods_list");
      for (let i = 0; i < goodsListsDom.length; i++) {
        if (scrollTop >= goodsListsDom[i].offsetTop) {
          this.changeNav = i;
        }
      }

      if (scrollTop >= this.navTop) {
        this.navFIxed = true;
      } else {
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
      tjjApp.web.toCATE({ id: 361, name: "食品" });
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
      let jump_url =
        window.location.origin + "/activity/project/happy/happies/view/index";
      console.log(jump_url);
      window.location.href = jump_url;
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
  background: #fa773c !important;
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
  background-color: #f56328;
  border-radius: 5px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
}
.shop_lists > div {
  width: 198%;
}
.shop_lists > div > div {
  height: 130%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-right: 0.14rem;
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
  background-color: #f64e0a;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #c8420c;
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
  height: 5.21rem;
}
.goods_list .good_img img {
  height: 100%;
  width: 100%;
}
.goods_list .good_info {
  margin: 0.2rem 0.1rem;
}
.goods_list .good_name {
  font-family: MicrosoftYaHei;
  font-size: 0.28rem;
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
.buy span {
  overflow: hidden;
  display: inline-block;
}

.buy i:nth-of-type(1) {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.26rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff9141;
  font-style: normal;
  float: left;
  line-height: 0.4rem;
}
.buy i:nth-of-type(2) {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.2rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #978c8c;
  float: left;
  font-style: normal;
  line-height: 0.4rem;
}
.buy_now {
  background-color: #f64e0a;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.25rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  padding: 0 0.12rem;
  line-height: 0.4rem;
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
  background: url(../assets/images/share_new.png) center center no-repeat;
  background-size: 1.84rem 0.45rem;
}
</style>

