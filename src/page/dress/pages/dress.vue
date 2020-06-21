<template>
  <nav class="container">
   <router-link to="dress2"> <img src="../assets/images/dress/dress.jpg"></router-link>
    <div class="shop_lists">
      <div>
        <div>
          <img src="../assets/images/dress/1.jpg" @click="toShop('7941')">
          <img src="../assets/images/dress/2.jpg" @click="toShop('55229')">
          <img src="../assets/images/dress/3.png" @click="toShop('5003')">
          <img src="../assets/images/dress/4.jpg" @click="toShop('99704')">
          <img src="../assets/images/dress/5.jpg" @click="toShop('77220')">
          <img src="../assets/images/dress/6.jpg" @click="toShop('87856')">
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
    <div>
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
          <div class="good_tag" v-if="index==0">
            <img src="../assets/images/dress/icon.png">
          </div>
        </div>
        <div v-if="goods_lists[index].length==51&&index==4" class="moregoods">
          <img class="more" src="../assets/images/dress/more.jpg" @click="toMore()" alt>
        </div>
      </div>
    </div>

    <img class="more" src="../assets/images/dress/more_04.jpg" @click="toMore()" alt>
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
        { name: "限量抢购" },
        { name: "热销榜" },
        { name: "时尚女装" },
        { name: "潮流男装" },
        { name: "内衣家居服" }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      goods_ids: [
        "2578810,2659588,2604461,65864,2862838,2871194,2603060,2871121,2870661,1465843,2871508,2871504,2862843,2533993,2655558,2058893,2539348,2474826,2604870,2845779,2871064,2801059,2871116,2537934,2847268,2862856,2871502,2871503,2806278,2671242,2851934,2830602,1702720,1274597,2512842,2862830,2871164,2801071,2862846,2843134,2657444,2871509,20610,2530163,3981,2521878,2089876,2521872",
        "2871168,2870664,2871162,2862713,3264,2578784,195353,2871500,2871130,2830632,2871505,2685948,2578844,2036660,2845423,2574941,2837933,2603311,2839168,2839118,2862834,2845421,2801049,1013413,2655563,2654121,156666,2848919,2868600,2871501,2833646,2578802,2830695,31716,2871156,2871188,1492070,2843174,1741917,2016606,2870700,2603739,2862810,384203,1657118,2521881,2871513,2870668,2811983,203957",
        "2521880,2862384,2871173,2538073,2148248,2847264,2539355,2139783,2843476,2539420,2665559,2412681,2845777,2848920,2819976,2839201,2871111,2845773,2851159,2843100,2845783,2837965,2652362,2871528,2871123,2871506,2871517,2868251,2858076,2539647,2618433,2830628,2830649,2871175,2830607,2570935,2871532,2862840,1205454,2521883,54120,2486440,2575502,2532034,2539504,2542380,2457377,2537344,2539352,2593770,2595349,2600290",
        "2644924,2578805,1684827,2871511,2521878,2608635,2537655,2847473,2842995,2847477,2843131,1656343,904941,2853188,2847471,2520022,2871507,2871510,2871531,2811034,2596518,2596047,2865751,2845704,2870695,2760249,2830702,2313636,2871512,2830701,2537895,2870621,2497649,2301388,2591405,2603673,2578803,2347118,129655,43588,15388,1718990,927567,2299249,2580444,2568737,2603744,2603742,2693988,2603736,2630464,130944,1809820,2603058,2604200,2603674,2644957,2604500",
        "2796693,2458468,2424957,2506955,2837956,2571369,2658338,2858009,2736696,2570006,782236,2600124,2801059,2585220,2574817,2689518,542112,1674662,2843044,2768347,1764883,2837945,2839205,63697,2837938,2833646,1465180,11811,2837953,2845427,2647040,2862868,2016606,45022,2658322,2197812,65379,2665538,2603066,2625062,4086,2603105,2542394,1348969,2193041,2603273,2847496,2862942,929277,1026420,2862937"
      ],
      goods_lists: {}
    };
  },
  async created() {
    // 加载数据

    let goods_list = {};
    for (let i = 0; i < this.goods_ids.length; i++) {
      let params = {
        goods_id: this.goods_ids[i]
      };
      await this.$http.get(GoodList, { params }).then(res => {
        console.log(res);
        this.goods_lists[i] = res.data;
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
        source:"首页"
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
      if (!window.isroll_open) {
        clearInterval(window.isroll_timer);
        this.slideTo(top);
      }
      this.changeNav = index;
    },
    toMore: function() {
      //跳转二级分类
      tjjApp.web.toCATE({ id: 315, name: "服饰" });
    },
    slideTo: function(targetPageY) {
      var that = this;
      window.isroll_timer = setInterval(function() {
        console.log(1);
        window.isroll_open = true;
        var currentY =
          document.documentElement.scrollTop || document.body.scrollTop; //当前及滑动中任意时刻位置
        var distance =
          targetPageY > currentY
            ? targetPageY - currentY
            : currentY - targetPageY; //剩余距离
        var speed = Math.ceil(distance / 10); //每时刻速度
        if (currentY == targetPageY) {
          clearInterval(window.isroll_timer);
          window.isroll_open = false;
        } else {
          window.scrollTo(
            0,
            targetPageY > currentY ? currentY + speed : currentY - speed
          );
        }
      }, 1);
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
body,
.goods_list,
.moregoods,
.container {
  background: #90bdfc !important;
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
}
.shop_lists {
  width: 11.84rem;
  height: 7.91rem;
  background-color: #6e98f8;
  border-radius: 10px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
}
.shop_lists > div {
  width: 100%;
  overflow: auto;
}
.shop_lists > div > div {
  overflow-x: hidden;
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
  margin: 0.15rem auto !important;
  height: 0.59rem;
  display: flex;
  justify-content: space-between;
}
.nav span {
  width: 2.31rem;
  height: 0.59rem;
  text-align: center;
  background-color: #497ef6;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #1f53ca;
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
  color: #497ef6;
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
  line-height: 0.5rem;
}
.buy_now {
  width: 1.36rem;
  height: 0.35rem;
  line-height: 0.4rem;
  text-align: center;
  display: block;
  display: inline-block;
  background-color: #497ef6;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.25rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>

