<template>
  <nav class="container">
    <div id="top">
      <img src="../assets/images/makeup_01.jpg">
      <a href="javascript:;" class="top-share" @click="shareClick" v-if="shareBtn"></a>
    </div>
    <img src="../assets/images/makeup_02.jpg">
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
          <img class="more" src="../assets/images/more.png" @click="toMore" alt>
        </div>
      </div>
    </div>
    <img class src="../assets/images/makeup_07.jpg" @click="backMain" alt>
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
        { name: "热销榜单" },
        { name: "美妆达人" },
        { name: "护肤专家" },
        { name: "时尚潮娃" },
        { name: "玩具天地" }
      ],
      shops: [
        {
          img: require("../assets/images/01.png"),
          id: 27826,
          name: "故梦专卖店"
        },
        {
          img: require("../assets/images/02.png"),
          id: 13544,
          name: "韩韩母婴专营店"
        },
        {
          img: require("../assets/images/03.png"),
          id: 104262,
          name: "集集美妆"
        },
        {
          img: require("../assets/images/04.jpg"),
          id: 14212,
          name: "丽人美妆店"
        },
        {
          img: require("../assets/images/05.jpg"),
          id: 96589,
          name: "欧琪美妆专营店"
        },
        {
          img: require("../assets/images/06.png"),
          id: 76167,
          name: "思雅鞋坊"
        }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      // goods_ids: [
      //   "2966592,1344881,25040,28181,2578833,29046,1664553,2387696,2428624,1026285,2599834,2536592,2729903,2282770,899501,2585560,1191627,1765249,23338,20114,2812024,1987886,2439050,820275,1317,2854490,1802667,2494943,2517510,2692909,13450,57026,1818549,4414,1772180,2585548,2507751,36212,2468019,2494932,1829822,1037802,1741443,2585557,1505665,70316,1675081,2601688,2792486,1551693,110752,1437077,1021562,2204331,5231,2538817,869699,2563478,1892075,2016658",
      //   "1847,911954,48894,1932,2471618,2598678,7385,2160253,10374,2231823,60141,2571398,2166480,1503275,1678294,349135,692194,58455,1825420,1875662,17405,60851,1676828,1102933,2996962,35592,1826316,190529,2570209,2997104,744888,2653864,1401874,2967406,293051,2907431,1383803,1009023,2577020,2862755,1139100,2847224,517292,53620,561755,2519357,8651,2886184,1155537,2961489,1415399,1465730,998109,2833683,8129,315896,26045,2717654,2567369,2729886",
      //   "7273,30510,64262,71551,81071,106243,177130,189190,742825,1073548,1094253,1229727,1270297,1272083,1313107,1386574,1499683,1503154,1526745,1519378,1866136,1767251,1834820,1872675,1867399,1863056,1863428,1867292,1745527,1865758,1857180,1860293,1867723,1876879,1855909,1875150,1854523,1862992,1859714,1868714,1860126,1885056,1853976,1879987,1873461,1872859,1879894,1885446,1875097,1873374,1871941,1875034,2127148,2434877,2487992,2585560,2563470,3162507,3162503",
      //   "11623,2260998,21100,28971,37262,56806,131571,297457,426960,426973,427249,504666,912207,943946,989217,1005600,1034572,1046446,1047296,1069050,2221104,1086942,1092408,1140505,1136393,1164691,1321838,1222729,1325757,1245395,1247418,1241647,1498104,1443097,1407371,1381767,1518144,1566653,1829286,1881381,2032680,2368530,2079732,2116962,2079595,2091952,2104885,2089200,2175215,2075536,2209736,2191765,2216026,2220535,2282770,2266493,2307980,2314418,2298159,2305785,2241787,2310094,2344113,2335204,2324399,2378849,2505513,2400099,2399992,2499150,2529169,2571375,2571372,2581218,2505492,2567362",
      //   "5970,5397,18127,23512,36803,43121,54004,66055,70144,71396,72251,75551,80740,43212,86264,90895,113719,129843,187096,447862,152967,816944,961192,1173160,1160358,1136922,1136924,1217396,1212813,1247455,1290684,1370851,1411014,1418114,1457973,1818303,1869405,1919880,1951477,2194714,2223386,2585557,2538764,2597674,2597688,2853190,36112"
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
      tjjApp.web.toCATE({ id: 317, name: "母婴" });
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
  color: #fb7c7c;
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
  background-color: #fb7c7c;
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

