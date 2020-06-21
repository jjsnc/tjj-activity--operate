<template>
  <nav class="container">
    <div class="lb">
      <img src="../../assets/images/dress/dress_01.jpg">
      <div class="share" @click="share" v-if="xcx==false"></div>
    </div>
    <div class="shop_lists">
      <div>
        <div>
          <img src="../../assets/images/dress/1.jpg" @click="toShop('55229')">
          <img src="../../assets/images/dress/2.jpg" @click="toShop('26800')">
          <img src="../../assets/images/dress/3.jpeg" @click="toShop('10592')">
          <img src="../../assets/images/dress/4.png" @click="toShop('99532')">
          <img src="../../assets/images/dress/5.jpg" @click="toShop('96234')">
          <img src="../../assets/images/dress/6.jpg" @click="toShop('31224')">
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
                  <font>￥</font>{{good.group_price}}
                </span>
                <span>￥{{good.shop_price}}</span>
              </span>
              <span class="buy_now">立即购买</span>
            </p>
          </div>
        </div>
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods more">
          <img src="../../assets/images/dress/more_03.jpg" @click="toMore()" alt>
        </div>
      </div>
    </div>

    <img src="../../assets/images/dress/back_02.jpg" class="bottom-img" @click="back()" alt>
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
      navs: [
        { name: "Top榜单" },
        { name: "夏季新品" },
        { name: "时尚女装" },
        { name: "魅力男装" },
        { name: "内衣家居服" }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      xcx: false,
      goods_ids: [
        "3377459,2862838,3376929,2601062,2994246,3377471,2574817,3162654,2644924,3392555,3182990,3182981,3084986,3182979,3162973,3117729,2918174,3145292,2831171,3021979,2860726,3141652,2889206,3087735,3084974,3444377,2806278,2994302,3175624,203957,3393450,3692023,3670602,2630464,2674692,2604461,3003164,2602907,3067897,2539348,2322493,2533993,3449000,1764482,2884013,2858009,2845784,128870,3149742,3121507,2578810,2665548,3121468,3175216,3082894,2603084,2671026,65864,2139783,3435159,2871583,2449361,195353,3139004,3442271,2571369,2602927,3435521",
        "3149723,2827055,2539504,3082919,3082952,2593770,45022,2884003,12069,2497649,2533919,3132249,1793360,15388,2857901,2826980,3155177,3033222,2196330,2578844,2603098,2871500,3081497,2657444,2653871,3442357,2709267,2570059,3566931,3566204,2602487,2729859,3003902,2865552,3078553,3449751,2973901,2840594,2571392,3421239,3153287,2736696,2749428,3033181,3030973,2603739,3050502,3392461,3153422,2542537,3260455,2989106,3380840,3149908,2625062,3082927,3197662,3439558,3132241,3006109,3465084,2794116,3367339,3506102,3432092,3084999,3376945,3444485,3366871,2552335,3439546,2393829,3443722,3405819,3392226,3503059,2837933,3491138,3459675,3443475",
        "3041479,3377441,2862713,3459683,3569263,2089876,2512842,2827058,38144,2542380,2148248,2486440,2575502,2652362,2182403,2602727,2602867,2685941,2986824,3155165,2683999,2578784,2665597,2847459,3169549,2600299,2607640,2539425,3153544,2659588,3082836,3149675,2600155,2683992,2654728,3392403,2499512,3169834,2717640,2583032,3226811,2806558,3438805,3032044,3083007,3149688,3439575,2529122,2856232,3474674,2859637,3121474,2670407,3138507,2537344,2973835,3021987,3089673,3153337,3121501,2808202,3438840,3494084,3438825,3438924,3182728,3569273,3435148,3491755,4017",
        "2578805,326270,2578803,927567,1806033,1818002,8036,2883878,1664821,2519302,2580444,2604200,2538860,2602709,1717809,3077954,264986,1107552,2603673,3153443,2603659,3049830,2652228,2495700,2571390,2602516,1137167,2245404,2508776,2811983,31714,23272,1257017,1473074,927561,2497638,3021953,2856959,3152602,2681640,2616839,2585788,3229902,2763492,3432156,3444243,3041966,3444166,3500856,3445038",
        "2501941,2587647,2474826,2585220,2326576,2509187,1854984,1348969,384203,905501,308777,32252,20610,2922,22674,3087725,3500892,3082816,3000789,2839126,2801059,2633044,2601435,2601000,2512914,2571371,2509155,2458468,1832382,1778656,1765716,1764883,1741917,1068041,197603,80659,63697,27663,3149,3421232,3393755,3392204,3268938,3183197,3175593,3164636,30010,1465843,681871,46612,307327,97652,1846586,3514852,2571401,1609184,185893"
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
  created() {
    // 加载数据

    let goods_list = {};

    let len = this.goods_ids.length;
    for (let i = 0; i < len; i++) {
      let params = {
        goods_id: this.goods_ids[i]
      };
      this.$http.get(URL.GoodList, { params }).then(res => {
        //console.log(res);
        let goods = res.data;
        //这里判断如果查到的商品下架一个 再取消一个
         let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));

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
    window.$router = this.$root.$route;
    fz.rem();
    window.isLogin = (user_id, token, uuid) => {
      var params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "服饰"
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
      window.location.$router = "/index";
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
      tjjApp.web.toCATE({ id: 315, name: "服饰" });
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
  background: #90bdfc !important;
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
.lb {
  position: relative;
}
.share {
  position: absolute;
  width: 1.84rem;
  height: 0.45rem;
  right: 0.2rem;
  top: 0.27rem;
  background: url(../../assets/images/dress/share_new.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.shop_lists {
  width: 11.84rem;
  height: 7.91rem;
  background-color: #6e98f8;
  border-radius: 5px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
  overflow-y: hidden;
}
.shop_lists > div {
  width: 100%;
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
.bottom-img {
  margin-top: -0.02rem;
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
  background-color: #4e7bf6;
  color: #fff;
  font-size: 0.4rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #1f54ca;
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
  font-weight: normal;
  font-weight: bold;
  letter-spacing: 0px;
  color: #497ef6;
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
  background-color: #497ef6;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.35rem;
  font-weight: bold;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>

