<template>
  <nav class="container">
    <div class="lb">
      <img src="../../assets/images/general/general_01.jpg">
      <div class="share" @click="share" v-if="xcx==false"></div>
    </div>
    <img src="../../assets/images/general/general_03.jpg">
    <div class="shop_lists">
      <div>
        <div>
          <img
            v-for="(good,index) in shops "
            :key="index"
            v-lazy="good.url"
            @click="toShop(good.id)"
          >
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
    <div class="lists">
      <div
        class="goods_list list-item"
        v-for="(item,index) in goods_lists"
        :key="(index)"
        :class="'goods_list'+(index)"
      >
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
                  <font>￥</font>
                  {{good.group_price}}
                </span>
                <span>￥{{good.shop_price}}</span>
              </span>
              <span class="buy_now">立即购买</span>
            </p>
          </div>
        </div>
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods more">
          <img src="../../assets/images/general/more_07.jpg" @click="toMore()" alt>
        </div>
      </div>
    </div>

    <img src="../../assets/images/general/general_05.jpg" class="bottom-img" @click="back()" alt>
    <ToTop></ToTop>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import URL from "./../../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
import fz from "./../../assets/js/rem_750.js";
export default {
  data() {
    return {
      goods: [],
      shops: [
        { url: require("../../assets/images/general/1.png"), id: "21583" },
        { url: require("../../assets/images/general/2.jpg"), id: "13546" },
        { url: require("../../assets/images/general/3.jpg"), id: "15216" },
        { url: require("../../assets/images/general/4.png"), id: "80116" },
        { url: require("../../assets/images/general/5.png"), id: "22547" },
        { url: require("../../assets/images/general/6.png"), id: "34127" }
      ],
      navs: [
        { name: "热销榜单" },
        { name: "居家好物" },
        { name: "同床共枕" },
        { name: "3C数码" },
        { name: "轻车熟路" }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      xcx: false,
      goods_ids: [
        "5559,231724,4060,81734,1519936,1474564,1464771,11850,1722902,8939,1728,2167833,11727,11758,1217402,2527653,2375804,2293,2154,1665351,28318,2736705,1397142,3829,2602470,588082,13372,18564,2892,1423932,2796619,2586729,12732,2532032,564,2470534,2159200,21018,1800016,1413,2542831,1037773,6436,2736774,2542766,2346932,1181537,2530966,2552042,1695092,106117,1484529,244988,16392,1501936,8739,1702320,8804,31847",
        "3546,9328,4959,2401592,1980910,9402,159470,6876,2605932,14918,59923,2537559,3709,18099,1732128,2587691,4743,983646,3005907,2590354,1132873,2535014,2566544,112380,1487,6302,2849756,1775413,3332,23024,1978164,1437202,1635700,1446,928912,121286,4874,60985,11111,20521,2979007,1634912,964942,50035,45477,2965304,19514,1441734,2262592,2871550,800071,2736773,1075,926757,14747,2535276,2060178,2649,1023187,1062106",
        "1624537,53063,2873031,1510686,394059,844529,1858252,1390729,98226,90895,1031133,2113103,958698,2143794,1758208,1720766,12250,909900,1258287,2331271,2495934,1778753,1790201,34311,17692,1114686,2765767,2532052,1104717,3085299,1006161,1540040,830390,218830,947433,2466978,2807910,1132311,30073,1002228,23282,2884792,906485,32595,1851284,958015,765937,2598980,1592830,924697,1308946,2597863,2602295,1620679,1722489,14808,52967,26043,2402319,399976",
        "3553116,3107482,2865378,3141246,2690910,2659787,3176303,2663791,2920324,2481468,2583794,2397882,2389541,1824776,1743912,1753529,1660504,1648964,1529253,1528916,1422738,1437952,1301868,1472439,1258176,1218160,1140404,1106472,1106467,1078098,1060273,1060286,1026174,1060721,934072,930416,927338,950028,982086,918332,902177,914116,888699,2058496,491707,282897,64389,28501,10172,8469,4624,3208,8416,3288498,3047149,1587955,3280379,29342",
        "2736776,610809,911948,1303310,13009,2694624,2389977,2694349,670818,2760335,37581,71392,2693996,2593467,2466464,2593464,62296,1115284,972029,60699,1036773,70803,929990,33537,1764636,2539892,894800,60928,157391,2604780,2696802,75312,409157,2487982,2809488,3022764,2825076,932192,1761077,1075653,2736795,2710855,993670,200989,117683,1744540,2536079,2536059,86956,1952022,1527866,2864112,3117764,37716,16324,1500202"
      ],
      // goods_ids: [
      //   "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,1215147"
      // ],
      goods_lists: {}
    };
  },
  async created() {
    // 加载数据

    let goods_list = {};
    let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    let len = this.goods_ids.length;
    for (let i = 0; i < len; i++) {
      let params = {
        goods_id: this.goods_ids[i]
      };
      await this.$http.get(URL.GoodList, { params }).then(res => {
        //console.log(res);
        let goods = res.data;
        //这里判断如果查到的商品下架一个 再取消一个
        if (i >= len - 1) {
          if (!xcx_user) {
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
    fz.rem();
    window.isLogin = (user_id, token, uuid) => {
      var params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "百货"
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
      this.xcx = true;
       let user_id = xcx_user.user_id
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  methods: {
    back() {
      this.$router.push("/index");
    },

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

      var scrollTop =
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
    toGoodNav: function(index) {
      //滚动位置
      const firstScrollTo = scroller();
      firstScrollTo(".goods_list" + index);
      this.changeNav = index;
    },
    toMore: function() {
      //跳转二级分类
      tjjApp.web.toCATE({ id: 406, name: "百货" });
    },
    toShop: function(id) {
      //跳转店铺
      tjjApp.web.startShopHome(id);
    },
    toGoods: function(id) {
      //跳转商品
      tjjApp.web.jump2good(id);
    },
    share: function() {
      //分享
      var a = {
        title: "春日活力趣味出游"
      };
      tjjApp.web.share(a);
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
.goods_list,
.moregoods,
.container,
.lists {
  background: #d9dcce !important;
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
  background-color: #bec5a5;
  border-radius: 5px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
  overflow-y: hidden;
}
.shop_lists > div {
  width: 100%;
}
.lb {
  position: relative;
}
.share {
  position: absolute;
  width: 1.84rem;
  height: 0.45rem;
  right: 0.2rem;
  top: 0.27rem;
  background: url(../../assets/images/general/share_new.png);
  background-size: 100%;
  background-repeat: no-repeat;
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
  margin: 0.15rem auto;
  height: 0.59rem;
  display: flex;
  justify-content: space-between;
}
.nav span {
  width: 2.31rem;
  height: 0.59rem;
  text-align: center;
  background-color: #648f57;
  color: #fff;
  font-size: 0.4rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #3c6f28;
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
  height: 4.97rem;
}
.goods_list .good_img img {
  height: 4.97rem;
  width: 5.74rem;
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
  height: 0.6rem;
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
  color: #4e8b3a;
  font-style: normal;
  float: left;
  line-height: 0.5rem;
  margin-top: 0.14rem;
}

.buy > span span:nth-of-type(2) {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #978c8c;
  float: left;
  font-style: normal;
  line-height: 0.5rem;
  line-height: 0.5rem;
  margin-left: 0.1rem;
  margin-top: 0.2rem;
  text-decoration-line: line-through;
}
.buy_now {
  width: 1.84rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  display: block;
  display: inline-block;
  background-color: #4e8b3a;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
.bottom-img {
  margin-top: -0.02rem;
}
</style>

