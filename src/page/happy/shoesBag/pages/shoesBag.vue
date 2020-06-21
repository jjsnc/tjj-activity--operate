<template>
  <nav class="container">
    <div class="lb">
      <img src="../assets/images/shoesBag_01.jpg">
      <div class="share" @click="share" v-if="xcx==false"></div>
    </div>

    <img src="../assets/images/shoesBag_03.jpg">
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
                <i>￥{{good.group_price}}</i>
                <i>￥{{good.shop_price}}</i>
              </span>
              <span class="buy_now">立即购买></span>
            </p>
          </div>
        </div>
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods more">
          <img src="../assets/images/more_03.jpg" @click="toMore()" alt>
        </div>
      </div>
    </div>

    <img src="../assets/images/shoesBag_05.jpg" @click="back()" alt>
    <ToTop></ToTop>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import { GoodList } from "./../assets/js/api.js";
import { scroller } from "vue-scrollto/src/scrollTo";
export default {
  data() {
    return {
      goods: [],
      shops: [
        { url: require("../assets/images/1.jpg"), id: "78901" },
        { url: require("../assets/images/2.jpg"), id: "25630" },
        { url: require("../assets/images/3.jpg"), id: "71654" },
        { url: require("../assets/images/4.jpg"), id: "87850" },
        { url: require("../assets/images/5.jpg"), id: "5004" },
        { url: require("../assets/images/6.jpg"), id: "14733" },
        { url: require("../assets/images/7.jpg"), id: "9518" },
        { url: require("../assets/images/8.jpg"), id: "5942" },
        { url: require("../assets/images/9.jpg"), id: "14226" },
        { url: require("../assets/images/10.jpg"), id: "12680" },
        { url: require("../assets/images/11.jpg"), id: "15222" },
        { url: require("../assets/images/12.png"), id: "5388" }
      ],
      navs: [
        { name: "热销榜单" },
        { name: "时尚女鞋" },
        { name: "潮流男装" },
        { name: "百搭箱包" },
        { name: "网红配饰" }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      xcx: false,
      // goods_ids: [
      //  "2985152,2656119,2572510,3464950,7713,2243947,3590048,2807108,2811869,2269657,3702300,2572525,2537409,2870450,2827014,23,2521986,3538356,1577567,2863991,2715668,3379,1219273,2863960,2192931,3698,2735234,1609766,1042239,2848257,2641703,61813,2852992,2702469,1487672,2579925,3050381,2684855,2892301,183,3217142,3122899,2656013,1714932,2656311,2863970,3149934,2702392,1863494,2517542,2596458,2826400,2811517,10195,3020909,3055983,7150,1767549,2515245,2603734,2778,2522932,2506067,2807515,3702288,2807150,2984850,976380,25513,2863967,2602605,27177,2602605,27177",
      // "2511707,3379514,2892319,2596448,2864191,2262096,3131394,2538775,2603648,3407084,3041813,2601354,2870476,2864135,2512922,3546128,1219270,7799,3217187,1646434,2535268,1158000,2142802,2602769,2864127,1124343,777,2678637,3055985,12976,3034631,2591976,1004028,3240900,764870,1936619,2572514,3166998,2337777,1328,2199189,2539587,3702709,2848253,2161738,2827873,2985378,2843169,2082456,2600213,1123150,925093,3423463,1487251,1951803,1010229,286,2015,3121,3299211",
      // "2848270,3150038,2984666,2870486,2604115,2884566,1357037,2985152,2843156,2863957,3438576,2525958,2654386,2596062,2371867,3373373,11502,2262792,3563425,1377542,2892348,2685,2724449,1219268,3464913,2591960,2618106,3151211,3268137,2504186,2871567,2984784,1894124,1288828,2351162,18893,1495717,2843126,3648571,19081,1803452,1941997,11527,138501,2688572,3597749,2120238,3876,2641570,3631016,2864136,3151217,2538771,1404579,3493691,1105684,2585543,21614,96697,39461",
      // "2596461,2603706,3500869,2678636,2539521,35210,2678552,1577567,1756923,727629,2722066,49442,1659514,3438364,1132105,2735239,3494070,2707358,262762,2603720,3098089,7843,1805275,2572525,49514,1908549,2656017,2811556,3055580,187071,1911125,1485388,2596394,4277,2807208,2807214,43004,2807197,1583089,759735,3117928,2678526,10547,6812,71822,1932218,4316,7704,2492031,2516121,1373404,17179,2722062,901670,2572545,214335,2678639,43678,43632,15990",
      // "1659624,2574329,2574917,2678618,908679,930236,29,1451101,2914387,1088841,2807544,2414639,1299678,2807364,2901834,3117405,2390276,983738,3085768,3158623,15236,904552,863653,1671691,50212,2500476,605712,14908,928795,2723578,2871560,2811869,2416761,937053,2575191,1768834,2834215,3596581,2500148,1383,2468617,2579403,823014,2722008,152,1044904,1316746,118,1359513,846413,1747153,1822159,1254198,1545458,1539900,3171216,762769,23832,902110,3125375"
      // ],
      goods_ids: [
        "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
        "1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1214983,1214982",
        "1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,1215147"
      ],
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
      var params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "鞋包"
      };
      send.sendPoint(params);
      if(user_id){
          
      }else{
        tjjApp.web.login()
      }
    };

    window.addEventListener("scroll", this.handleScroll);
    var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      this.xcx = true;
       let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      let token = tjjApp.web.getUrlQuery("token", window.location.href);
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  methods: {
    topage() {
      var url = window.location.href;
      var jump_url = "";
      var origin = "index";
      //页面进入的三种来源 需要判断url是否是一种
      var source = ["index", "banner"];
      source.map(function(el) {
        if (url.indexOf(el) > -1) {
          origin = el;
        }
      });
      if (origin == "banner") {
        //此时在banner 出现
        jump_url = url.slice(0, url.indexOf("view")) + "view/index" + origin;
      } else {
        // 在首页出现
        jump_url = url.slice(0, url.indexOf("view")) + "view" + origin;
      }
    },

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
      tjjApp.web.toCATE({ id: 328, name: "鞋包" });
    },
    toShop: function(id) {
      //跳转店铺
      tjjApp.web.startShopHome(id);
    },
    back: function() {
      var jump_url =
        window.location.origin + "/activity/project/happy/happies/view/index";
      console.log(jump_url);
      window.location.href = jump_url;
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
  }
};
</script>
<style >
.goods_list,
.moregoods,
.container,
.lists {
  background: #a5dbcf !important;
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
  background: url(../assets/images/share_new.png);
  background-size: 100%;
  background-repeat: no-repeat;
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
  background-color: #73cbb7;
  border-radius: 5px;
  margin: 0 auto;
  padding: 0.14rem;
  box-sizing: border-box;
  overflow-y: hidden;
}
.shop_lists > div {
  width: 199%;
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
  background-color: #1ba888;
  color: #fff;
  font-size: 0.36rem;
  line-height: 0.59rem;
}
.nav .active {
  background-color: #056843;
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
  color: #1ba888;
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
  text-decoration-line: line-through;
}
.buy_now {
  width: 1.36rem;
  height: 0.35rem;
  line-height: 0.4rem;
  text-align: center;
  display: block;
  display: inline-block;
  background-color: #1ba888;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.25rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
</style>

