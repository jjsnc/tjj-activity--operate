<template>
  <nav class="container">
    <img src="../assets/images/baby_01.jpg">
    <div class="shop_lists">
      <div>
        <div>
          <img src="../assets/images/1.png" @click="toShop('98178')">
          <img src="../assets/images/2.png" @click="toShop('77625')">
          <img src="../assets/images/3.jpg" @click="toShop('34127')">
          <img src="../assets/images/4.png" @click="toShop('75835')">
          <img src="../assets/images/5.png" @click="toShop('57381')">
          <img src="../assets/images/6.png" @click="toShop('60310')">
          <img src="../assets/images/7.png" @click="toShop('102843')">
          <img src="../assets/images/8.png" @click="toShop('77107')">
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

    <!-- shangpin -->
    <div class="lists" >
      <div class="goods_list" v-for="(item,index) in goods_lists" :key="(index)">
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
                <i>￥{{good.group_price}}</i>
                <i>￥{{good.shop_price}}</i>
              </span>
              <span class="buy_now">立即购买></span>
            </p>
          </div>
        </div>
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods">
          <img class="more" src="../assets/images/baby_04.jpg" @click="toMore()" alt>
        </div>
      </div>
    </div>

    <img class="more "  src="../assets/images/baby_07.jpg" @click="toMore()" alt>
    <ToTop></ToTop>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import { GoodList } from "./../assets/js/api.js";
export default {
  data() {
    return {
      goods: [],
      navs: [
        { name: "超低价" },
        { name: "热销榜" },
        { name: "宝宝玩具" },
        { name: "新衣新库" },
        { name: "妈妈优选" }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      goods_ids: [
        "1765249,2883415,6736,2821769,1723793,1857128,2891145,1218147,1860481,2876147,1882657,2876153,1870470,2883404,1858208,1857325,2876165,2808718,2876171",
        "29377,40229,910609,1001042,1026285,1070845,1309430,1512648,1853923,1133305,1860944,1864237,1856090,1871111,1873326,1859586,1870223,1838068,1867669,1860426,1856186,1852307,1875943,1870946,1857351,1855465,1352129,1866623,1864371,1852839,1867737,1869966,1862190,1882500,1869233,1867237,1869385,1869141,1882317,1857534,1869922,1873594,1884121,1882441,1873734,1885177,1872215,1866131,1873093,1875854,1875386,1883713,1857304,1856655,1874914,1885537,1885708,1882023,1878118,1873818,1874141,2021972,2363506",
        "7273,30510,64262,71551,81071,106243,177130,189190,742825,1073548,1094253,1229727,1270297,1272083,1313107,1386574,1499683,1503154,1526745,1519378,1866136,1767251,1834820,1872675,1867399,1863056,1863428,1867292,1745527,1865758,1857180,1860293,1867723,1876879,1855909,1875150,1854523,1862992,1859714,1868714,1860126,1885056,1853976,1879987,1873461,1872859,1879894,1885446,1875097,1873374,1871941,1875034,2127148,2434877,2487992,2585560,2563470,3162507,3162503",
        "11623,2260998,21100,28971,37262,56806,131571,297457,426960,426973,427249,504666,912207,943946,989217,1005600,1034572,1046446,1047296,1069050,2221104,1086942,1092408,1140505,1136393,1164691,1321838,1222729,1325757,1245395,1247418,1241647,1498104,1443097,1407371,1381767,1518144,1566653,1829286,1881381,2032680,2368530,2079732,2116962,2079595,2091952,2104885,2089200,2175215,2075536,2209736,2191765,2216026,2220535,2282770,2266493,2307980,2314418,2298159,2305785,2241787,2310094,2344113,2335204,2324399,2378849,2505513,2400099,2399992,2499150,2529169,2571375,2571372,2581218,2505492,2567362",
        "5970,5397,18127,23512,36803,43121,54004,66055,70144,71396,72251,75551,80740,43212,86264,90895,113719,129843,187096,447862,152967,816944,961192,1173160,1160358,1136922,1136924,1217396,1212813,1247455,1290684,1370851,1411014,1418114,1457973,1818303,1869405,1919880,1951477,2194714,2223386,2585557,2538764,2597674,2597688,2853190,36112"
      ],
      // goods_ids:[
      //   "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
      // ],
      goods_lists: {}
    };
  },
  async created() {
    // 加载数据

    let goods_list = {};

    let len = this.goods_ids.length;
    for (let i = 0; i < len; i++) {
      let params = {
        goods_id: this.goods_ids[i]
      };
      await this.$http.get(GoodList, { params }).then(res => {
        //console.log(res);
        let goods = res.data;
        //这里判断如果查到的商品下架一个 再取消一个
        if (i >= len - 1) {
          if (goods.length % 2 == 0) {
            goods = goods.slice(0, goods.length - 1);
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
      var params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "首页"
      };
      send.sendPoint(params);
    };

    window.addEventListener("scroll", this.handleScroll);
    var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      window.isLogin(user_id, 0, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    console.log(this.finalLists);
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

      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      let navTop = document.getElementsByClassName("nav")[0].offsetTop;
      // console.log("现在：" + navTop);
      var goodsTop = document.getElementsByClassName("goods_list");
      for (var i = 0; i < goodsTop.length; i++) {
        // console.log("现在：" + goodsTop[i].offsetTop);
        if (scrollTop >= goodsTop[i].offsetTop) {
          this.changeNav = i;
        }
      }

      //console.log("浏览器" + scrollTop);
      //console.log("nav" + navTop);
      if (scrollTop >= navTop) {
        // console.log("ee"+navTop);
        this.navFIxed = true;
      }
      if (scrollTop < goodsTop[0].offsetTop) {
        this.navFIxed = false;
      }
    },
    toGoodNav: function(index) {
      //滚动位置
      var top = document.getElementsByClassName("goods_list")[index].offsetTop;
      	window.scrollTo(top,top);
      // if (!window.isroll_open) {
      //   clearInterval(window.isroll_timer);
      //   this.slideTo(top);
      // }
      this.changeNav = index;
    },
    toMore: function() {
      //跳转二级分类
      tjjApp.web.toCATE({ id: 317, name: "母婴" });
    },
 
    toShop: function(id) {
      //跳转店铺
      tjjApp.web.startShopHome(id);
    },
    toGoods: function(id) {
      //跳转商品
      tjjApp.web.jump2good(id);
    }
  },
  components: {
    ToTop
  }
};
</script>
<style >
.goods_list,
.moregoods,
.container,
.lists {
  background: #fcd2ab !important;
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
  background-color: #f8b478;
  border-radius: 5px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
}
.shop_lists > div {
  width: 130%;
}
.shop_lists > div > div {
  height: 100%;
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
  margin: 0.15rem auto ;
  height: 0.59rem;
  display: flex;
  justify-content: space-between;
}
.nav span {
  width: 2.31rem;
  height: 0.59rem;
  text-align: center;
  background-color: #ff9a41;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #da6a03;
}
.goods_list {
  width: 100%;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
}
.goods_list > div {
  width: 5.74rem;
  height: 6.4rem;
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
  font-size: 0.29rem;
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
  height: 0.4rem;
  margin-top: 0.2rem;
}
.buy span {
  overflow: hidden;
  height: 0.4rem;
  display: inline-block;
}
.buy i:nth-of-type(1) {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.33rem;
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
  font-size: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #978c8c;
  float: left;
  font-style: normal;
  line-height: 0.4rem;
}
.buy_now {
  width: 1.36rem;
  height: 0.35rem;
  line-height: 0.4rem;
  text-align: center;
  display: block;
  display: inline-block;
  background-color: #ff9141;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.25rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>

