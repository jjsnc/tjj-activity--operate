<template>
  <nav class="container">
    <div id="top">
      <img src="../../assets/images/food/food_01.jpg">
      <a href="javascript:;" class="top-share" @click="shareClick" v-if="shareBtn"></a>
    </div>
    <img src="../../assets/images/food/food_02.jpg">
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
        <div v-if="goods_lists[index].length/2>0&&index==4" class="moregoods more">
          <img
            class="more more-height"
            src="../../assets/images/food/more.png"
            @click="toMore()"
            alt
          >
        </div>
      </div>
    </div>

    <img class="bottom-img" src="../../assets/images/food/food_07.jpg" @click="backMain" alt>
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
        { name: "馋猫专享" },
        { name: "食惠到家" },
        { name: "畅饮一夏" },
        { name: "农副生鲜" },
        { name: "休闲食品" }
      ],
      shops: [
        {
          img: require("../../assets/images/food/01.jpg"),
          id: 77430,
          name: "优米优品"
        },
        {
          img: require("../../assets/images/food/02.jpg"),
          id: 17652,
          name: "坚果零食店"
        },
        {
          img: require("../../assets/images/food/03.jpg"),
          id: 76730,
          name: "天下"
        },
        {
          img: require("../../assets/images/food/04.jpg"),
          id: 72430,
          name: "农家鲜果店"
        },
        {
          img: require("../../assets/images/food/05.jpg"),
          id: 34982,
          name: "鸠府百货"
        },
        {
          img: require("../../assets/images/food/06.jpg"),
          id: 75451,
          name: "杞然良品"
        },
        {
          img: require("../../assets/images/food/07.jpg"),
          id: 36403,
          name: "嗨吃家"
        },
        {
          img: require("../../assets/images/food/08.jpg"),
          id: 103618,
          name: "皓皓零食铺"
        },
        {
          img: require("../../assets/images/food/09.jpg"),
          id: 85272,
          name: "小食后"
        },
        {
          img: require("../../assets/images/food/10.jpg"),
          id: 96081,
          name: "美食美刻美食店"
        },
        {
          img: require("../../assets/images/food/11.jpg"),
          id: 101111,
          name: "福建红状元茶业旗舰店"
        },
        {
          img: require("../../assets/images/food/12.jpg"),
          id: 65820,
          name: "臻味坊零食店"
        }
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      goods_ids: [
        "1035897,1472288,80987,3059533,1768192,2224392,1481551,63728,2603429,956037,1159814,31453,1139701,2685849,404,1208420,927420,2898241,15295,3079338,424,1070106,2694765,186373,2590340,2076,1114571,2735605,29077,619265,2685924,3519935,1137185,2863164,2883421,2539296,1802691,1208419,3520300,3616538,204327,1455,2530219,2839263,2717952,8137,10206,2771426,2579430,2447298,105258,1110907,56389,1765615,1566434,3616536,1372539,1860300,1125269,1725751",
        "2566616,2566890,2579910,2593470,1768192,2566129,875793,2685866,1779336,2539966,2006054,2685891,2501954,2833597,2555359,913657,3041601,2608686,2563193,2598464,2822103,1670100,1516449,2693973,3561900,1802,2828026,2707201,2594609,2592882,1117418,2593425,2449766,2886088,3050375,1491097,2839263,1139183,2714057,2685924,50130,1120279,2875101,2522019,67615,2176856,945355,2875094,1766406,2553273,984720,1287493,2555408,2716118,3244929,2047722,2851925,2185700,3071105,1802691",
        "2508829,1062605,955765,2621400,986050,1623257,2523482,475419,1073853,2619508,1750068,1772534,2816839,1123592,1029522,57712,2574347,33401,1903694,1355465,1849923,1021168,1453958,2871640,1155477,1598877,1709298,1755721,912573,11842,2601606,1534597,11972,2884236,2207809,78172,3005967,2579397,1565320,2579416,3145429,1556064,1206247,2537607,2539947,3790892,42897,51486,2540047,3790877,2463468,3414734",
        "2526891,717638,3213657,1020973,2320458,1758445,5617,2608688,1231324,3071153,1760904,1694749,2690971,1135658,19637,1982890,1236971,1023270,3416112,1657439,1042952,1092947,2170,1475398,1134781,2490232,1742738,2221039,1121414,2821575,1287530,940695,1655335,645441,3832,2579446,1715113,2577070,1255612,1218470,544,99360,1404,1281282,1760549,544490,88879,6115,3071150,3071053,3006178,1661819",
        "1628884,2539950,1160467,110886,1372539,2539296,1764648,2469079,2553349,2936383,2522025,1759952,2897141,2447298,580431,16742,2680329,1994184,3562562,2936392,143139,8163,1743231,1208420,204327,1114571,1572977,2737471,1654164,1172606,2858978,2685874,3042943,1765615,2449673,1281017,1566434,2771426,2639764,1735067,2539910,2362180,1846161,80987,441938,1106328,927420,1766406,2771547,2664860,1455324,67345,2634688,1169837,2771542,2865408,2685882,1061238",
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
    let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    let len = this.goods_ids.length;
    for (let i = 0; i < len; i++) {
      let params = {
        goods_id: this.goods_ids[i]
      };
      await this.$http.get(URL.GoodList, { params }).then(res => {
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
    let xcx_user = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    if (xcx_user) {
      vm.shareBtn = false;
      let user_id = xcx_user.user_id
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    }  else {
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
      this.$router.push("/index");
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
<style scoped >
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
  color: #ff9141;
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
  background-color: #f64e0a;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
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
  background: url(../../assets/images/food/share_new.png) center center
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

