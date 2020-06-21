<template>
  <div class="container">
    <section class="banner">
      <img src="../../assets/images/index/banner.png" alt>
      <a href="javascript:;" class="share" v-if="shareBtn" @click="shareClick"></a>
    </section>
    <!-- 秒杀 -->
    <div class="top">
      <img class="top-img" src="../../assets/images/index/top_01.png" alt>
    </div>
    <div id="spike-nav">
      <a
        href="javascript:;"
        class="spike-nav"
        @click="spikeTab(index)"
        :class="{'spike-nav-active': index == spikeIndex, 'spike-nav-prev': index == spikeIndex - 1}"
        v-for="(el, index) in spikeNav"
        :key="index"
      >
        <span class="spike-nav-span">{{ el.name }}</span>
      </a>
    </div>
    <div id="spike">
      <div class="spike" v-for="(el, index) in spikeData" :key="index" v-if="index < 3">
        <img
          v-lazy="el.img320_url"
          class="spike-img"
          alt
          @click="toGoods(el.goods_id, spikeIndex<spikeIndexNow? 'over': null)"
        >
        <h3
          class="spike-title"
          @click="toGoods(el.goods_id, spikeIndex<spikeIndexNow? 'over': null)"
        >{{ el.goods_name }}</h3>
        <div
          class="spike-price"
          @click="toGoods(el.goods_id, spikeIndex<spikeIndexNow? 'over': null)"
        >
          <span class="spike-price-new">
            <font>￥</font>
            {{ el.group_price | numFilter }}
          </span>
          <span class="spike-price-old">
            <font>￥</font>
            {{ el.shop_price | numFilter }}
          </span>
          <a href="javascript:;" class="spike-price-go">立即抢</a>
        </div>
        <a
          href="javascript:;"
          class="over"
          v-if="(el.num == 0 || !el.num) && el.goods_id"
          @click="toGoods(-1)"
        >
          <img src="../../assets/images/index/over.png" class="over-img" alt>
        </a>
      </div>
    </div>
    <!-- 分会场 -->
    <div class="top">
      <img class="top-img" src="../../assets/images/index/top_02.png" alt>
    </div>
    <div id="type">
      <div class="type">
        <a href="javascript:;" class="type-a" @click="typeHref(gril.router)">
          <img v-lazy="gril.img" alt>
        </a>
        <div class="type-box">
          <a
            href="javascript:;"
            class="type-box-a"
            v-for="(el, index) in gril_list"
            :key="index"
            @click="locationHref(el.router)"
          >
            <img v-lazy="el.img" alt>
          </a>
        </div>
      </div>
      <div class="type">
        <a href="javascript:;" class="type-a" @click="typeHref(boy.router)">
          <img v-lazy="boy.img" alt>
        </a>
        <div class="type-box">
          <a
            href="javascript:;"
            class="type-box-a"
            v-for="(el, index) in boy_list"
            :key="index"
            @click="locationHref(el.router)"
          >
            <img v-lazy="el.img" alt>
          </a>
        </div>
      </div>
    </div>
    <!-- 店铺 -->
    <div class="top">
      <img class="top-img" src="../../assets/images/index/top_03.png" alt>
    </div>
    <div id="shop">
      <a
        href="javascript:;"
        class="shop"
        v-for="(el, index) in shopData"
        :key="index"
        @click="toShop(el.id)"
      >
        <img v-lazy="el.img" alt class="shop-img">
      </a>
    </div>
    <!-- 菜单 -->
    <div id="nav" :class="{'fixed': fixed}">
      <a
        href="javascript:;"
        class="nav"
        :class="{'nav-active': index == navIndex, 'nav-prev': index == navIndex - 1}"
        v-for="(el, index) in navs"
        :key="index"
        @click="tabClick(index)"
      >
        <span class="nav-span">{{ el.name }}</span>
      </a>
    </div>
    <div v-if="fixed" id="zw_height"></div>
    <!-- 商品 -->
    <div id="goods">
      <div
        class="goods"
        v-for="(el, index) in goodsData"
        :key="index"
        @click="toGoods(el.goods_id)"
      >
        <div class="goods-top">
          <img v-lazy="el.img320_url" class="goods-img" alt>
          <img src="../../assets/images/index/icon.png" class="goods-icon" alt>
          <h3 class="goods-title">{{ el.goods_name }}</h3>
        </div>
        <div class="goods-price">
          <span class="goods-price-new">{{ el.group_price }}</span>
          <span class="goods-price-old">
            <font>￥</font>
            {{ el.shop_price }}
          </span>
          <a href="javascript:;" class="goods-price-go">立即抢</a>
        </div>
      </div>
      <a href="javascript:;" class="goods" @click="toMore" v-if="shareBtn">
        <img v-lazy="shareImg" class="goods-more" alt>
      </a>
    </div>
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import msgBox from "@/components/msgBox";
import URL from "./../../assets/js/api";
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      spikeNav: [
        {
          name: "8:00"
        },
        {
          name: "12:00"
        },
        {
          name: "16:00"
        },
        {
          name: "20:00"
        }
      ],
      spikeIndex: -1,
      spikeIndexNow: -1,
      spikeData: [],
      spikeCacheData: {
        1: [],
        2: [],
        3: [],
        4: []
      },
      gril: {
        id: 11,
        img: require("../../assets/images/index/gril.png"),
        router: "/woman"
      },
      gril_list: [
        {
          id: 1,
          name: "时髦女装",
          img: require("../../assets/images/index/gril_01.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/10af3595f2c19581c0-html5.html"
        },
        {
          id: 2,
          name: "内衣配饰",
          img: require("../../assets/images/index/gril_02.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/102b0b1b863201fce6-html5.html"
        },
        {
          id: 3,
          name: "美妆个护",
          img: require("../../assets/images/index/gril_03.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/107f32021968096dd6-html5.html"
        },
        {
          id: 4,
          name: "时尚女鞋",
          img: require("../../assets/images/index/gril_04.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/1022739d5145ac210d-html5.html"
        }
      ],
      boy: {
        id: 22,
        img: require("../../assets/images/index/boy.png"),
        router: "/man"
      },
      boy_list: [
        {
          id: 1,
          name: "热卖男装",
          img: require("../../assets/images/index/boy_01.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/109f81282c4ce64672-html5.html"
        },
        {
          id: 2,
          name: "流行男鞋",
          img: require("../../assets/images/index/boy_02.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/10b8c2829c9c135e31-html5.html"
        },
        {
          id: 3,
          name: "数码电器",
          img: require("../../assets/images/index/boy_03.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/10d9b886faf36d96e8-html5.html"
        },
        {
          id: 4,
          name: "男士护理",
          img: require("../../assets/images/index/boy_04.png"),
          router:
            "https://modeup.taojiji.com/taojiji/pages/2019/05/1082cccb4f7a5978e2-html5.html"
        }
      ],
      shopData: [
        {
          id: 4107,
          name: "佰优食品旗舰店",
          img: require("../../assets/images/index/shop_01.png")
        },
        {
          id: 97424,
          name: "电器工厂专营店",
          img: require("../../assets/images/index/shop_02.png")
        },
        {
          id: 57564,
          name: "久盛美妆",
          img: require("../../assets/images/index/shop_03.png")
        },
        {
          id: 96234,
          name: "弄潮儿",
          img: require("../../assets/images/index/shop_04.png")
        },
        {
          id: 41640,
          name: "女主脚女鞋",
          img: require("../../assets/images/index/shop_05.png")
        },
        {
          id: 26800,
          name: "妍妍家",
          img: require("../../assets/images/index/shop_06.png")
        }
      ],
      // 317 母婴
      // 361 食品
      // 328 鞋包
      // 406 百货
      // 315 服饰
      // 332 美妆
      // 340 手机
      navs: [
        { name: "服饰内衣", id: 315, toMoreName: "服饰" },
        { name: "鞋包配饰", id: 328, toMoreName: "鞋包" },
        { name: "美妆", id: 332, toMoreName: "美妆" },
        { name: "食品", id: 361, toMoreName: "食品" },
        { name: "数码电器", id: 340, toMoreName: "手机" }
      ],
      navIndex: 0,
      fixed: false,
      toMoreId: null,
      toMoreName: null,
      goodsData: [],
      goodsCacheData: {},
      goods_ids: [
        "2644924,296875,4217670,4438165,3182979,3434870,4995453,1333560,18529,905501,4303215,4227181,4663795,2139783,1793360,4950912,4613778,4336392,2499512,4254022,4693614,4567421,4084497,1854984,2509187,128870,4221539,1379290,4600281,2845784,2580444,2519942,4995439,3980033,4338674,2600155,4082625,3392403,4687772,4227205,4602593,940875,2654771,4274303,4209739,2693255,4227188,384203,4433712,2539430,4335866,4663749,4558263,4439852,4567511,16216,3006109,4597357,2922,4218866,4075934,4433837,4564117,4679128,4673864,3723565,4613760,4385231,4425971,4558217,4687939,4693906,4608894,4356893,4995334,3465087,4693639,4628451,4674702,4673665,3898843",
        "20201,2852992,2984666,2807108,2243947,2537409,4094881,2863991,2863960,20288,1609766,2827018,119593,2848257,2192931,4094935,2826400,1414116,3115,4048762,4313304,2735227,2827014,4170171,2735234,2715668,2579925,4064430,4687523,2779982,4673797,4630600,70916,3698,4289777,4421185,61813,53555,2881448,2702392,2659073,4085208,2574329,3901570,2351162,4314531,7150,4239789,3677309,4436436,3122899,3379,98490,3793953,2618106,4327256,3095880,3721588,15236,2890790,4619650,2892301,2807515,2870450,2910199,2269657,10195,4421468,3486846,2603648,2603734,2522932,4959107,779102,4941441,2892305,2829246,2908419,2517539,4110203,4421425,4564253,4421360,4408380,2517542,2807194,3379514,4293643,2864127",
        "4436315,2833193,4078124,1329,1829967,3217173,2529900,6639,1317,3247342,4511,4539990,3312,1969,1932,1990931,4395970,4299722,899501,3918754,4085507,911954,4235700,4284938,1755,190529,3010702,4265756,2512898,1660837,4554767,4398988,1741443,4566873,2013630,2958290,4335305,60851,4036466,769521,4313372,4564210,2907431,3839239,17895,63,2771488,900947,3622694,204859,1802667,12951,2886184,1664553,94,53620,849162,2785404,4272590,2575199,3864,2537549,3168,3182940,23447,32188,2517510,150570,3056412,2755683,14690,7385,3897549",
        "3182944,2685981,3395084,1802,1139183,4132015,3969267,1764648,2553349,2522025,3830954,1994184,3722969,3818548,1013521,3859826,3654379,2557607,2047722,2553273,212839,2435471,2588774,1323505,1084888,1566434,3071105,4110320,3650764,769584,2346690,3481820,2435478,1411532,26396,1918023,2537813,1463469,1121909,2699915,1764203,1766727,997748,912400,937821,1612709,3378819,1467499,1872803,929796,2883421,3717580,2603421,2852136,3986950,2830994,2601163,3414734,3520300,3107431,1063246,1288624,1564442,3864389,2384143",
        "1106467,1363620,3283553,2853853,3667837,390822,1881020,1076665,934072,1078098,1756447,1413,1160663,1140404,1648964,1026174,1743912,3137351,2537609,944053,2736776,2584323,3176303,2694349,95714,1120715,220941,35508,1187960,1716419,1771403,1537355,2883529,102745,1529253,1666119,104132,1073163,2442810,2363756,2838448,901384,2285042,1652709,2644297,1013703,2476773,3410403,1587612,2516147,2507880,58963,3221255,1756447,689629,1887878,1114409,1886411,4226851,1588745,3913906,1030286,331524"
      ],
      // goods_ids: [
      //   "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298"
      // ],
      shareBtn: true,
      msgTxt: null,
      shareImg: null,
      shareImgData: [
        require("../../assets/images/index/more_01.png"),
        require("../../assets/images/index/more_02.png"),
        require("../../assets/images/index/more_03.png"),
        require("../../assets/images/index/more_04.png"),
        require("../../assets/images/index/more_05.png")
      ],
      type: null
    };
  },
  created() {
    vm = this;
    for (let i = 0; i < vm.navs.length; i++) {
      vm.goodsCacheData[i] = [];
    }
    vm.spikeInit(null, "begin");
    vm.toMoreId = vm.navs[0].id;
    vm.toMoreName = vm.navs[0].toMoreName;
    vm.shareImg = vm.shareImgData[0];
    vm.tabInit(0);
  },
  filters: {
    numFilter(value) {
      value = String(value);
      if (value.indexOf(".") > -1) {
        let num = value.split(".");
        let arr = num[1].split("");
        let price = null;
        if (arr[1] == 0) {
          price = num[0] + "." + arr[0];
          if (arr[0] == 0) {
            price = num[0];
          }
        } else {
          price = value;
        }
        return price;
      } else {
        return value;
      }
    }
  },
  methods: {
    // 秒杀tab
    spikeTab(index) {
      vm.spikeIndex = index;
      vm.type = index + 1;
      vm.spikeInit(index, "spikeTab");
    },
    // 秒杀商品
    spikeInit(i, btn) {
      if (btn != "begin") {
        vm.spikeIndex = i;
        if (vm.spikeCacheData[i + 1].length > 0) {
          vm.spikeData = vm.spikeCacheData[i + 1];
          return false;
        }
      }

      vm.$http.post(URL.GetGoodsSkillCategory, { type: vm.type }).then(res => {
        let data = JSON.parse(res.data);
        console.log(data);
        if (data.result == 1) {
          vm.spikeData = data.data.list;
          let index = null;
          if (btn != "spikeTab") {
            vm.spikeIndex = data.data.currentType - 1;
            vm.spikeIndexNow = data.data.currentType - 1;
            index = data.data.currentType;
          } else {
            index = i + 1;
          }
          vm.spikeCacheData[index] = data.data.list;
        } else {
          vm.msgTxt = data.message;
        }
      });
    },
    // 菜单
    tabClick(index) {
      vm.navIndex = index;
      vm.toMoreId = vm.navs[index].id;
      vm.toMoreName = vm.navs[index].toMoreName;
      vm.shareImg = vm.shareImgData[index];
      vm.tabInit(index);
    },
    // 列表商品
    tabInit(i) {
      if (vm.goodsCacheData[i].length > 0) {
        vm.goodsData = vm.goodsCacheData[i];
        return false;
      }
      let params = {
        goods_id: vm.goods_ids[i]
      };
      vm.$http.get(URL.GoodList, { params }).then(res => {
        console.log(res);
        let data = res.data;
        if(!data){
          vm.goodsData = [];
          return false;
        }
        if (res.status == "200" && data.length != 0) {
          if (xcx_user) {
            if (data.length % 2 != 0 && data.length > 1) {
              data = data.slice(0, data.length - 1);
            }
          } else {
            if (data.length % 2 == 0 && data.length > 1) {
              data = data.slice(0, data.length - 1);
            }
          }
          vm.goodsData = data;
          vm.goodsCacheData[i] = data;
        } else {
          vm.goodsCacheData[i] = [];
          vm.msgTxt = res.statusText;
        }
      });
    },
    // 监听滚动
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (!this.fixed) {
        this.fixed_top = document.getElementById("nav").offsetTop;
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
    // 跳转二级分类
    toMore() {
      tjjApp.web.toCATE({ id: vm.toMoreId, name: vm.toMoreName });
    },
    // 跳转店铺
    toShop(id) {
      tjjApp.web.startShopHome(id);
    },
    // 跳转商品
    toGoods(id, over) {
      if (id == -1) {
        vm.msgTxt = "已售罄";
        return false;
      } else if (!id) {
        vm.msgTxt = "即将开抢 敬请期待";
        return false;
      }
      // if (over == "over") {
      //   vm.msgTxt = "抢购中";
      //   return false;
      // }
      tjjApp.web.jump2good(id);
    },
    // 分享
    shareClick() {
      tjjApp.web.share({
        title: document.title,
        shareUrl: 'https://a.taojiji.com/a/a'
      });
    },
    // 跳转分会场
    typeHref(router) {
      window.location.$router = router;
      this.$router.push(router);
    },
    // 自定义路径跳转
    locationHref(url) {
      location.href = url;
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

    window.addEventListener("scroll", this.handleScroll);
    if (xcx_user) {
      vm.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  components: {
    ToTop,
    msgBox
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.container,
section,
.top,
#spike-nav,
#spike,
#shop,
#type,
#nav,
#goods {
  background: #d8eaf8 !important;
  -webkit-user-select: none;
  user-select: none;
}
img {
  width: 100%;
  display: block;
}
section {
  width: 100%;
  position: relative;
  overflow: hidden;
}
section:nth-of-type(1) {
  margin-bottom: 0.14rem;
}
.share {
  position: absolute;
  right: 0.4rem;
  top: 0.26rem;
  width: 1.83rem;
  height: 0.54rem;
  background: url(../../assets/images/index/share.png) center center no-repeat;
  background-size: 1.83rem 0.54rem;
}
.banner {
  height: 10.37rem;
}
.top {
  width: 100%;
  height: 1.6rem;
  position: relative;
}
.top .top-img {
  position: absolute;
  width: 5.32rem;
  height: 0.96rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
/* 秒杀 */
#spike-nav {
  width: 100%;
  height: 1.08rem;
  overflow: hidden;
  margin-bottom: 0.33rem;
  background: #fed4e7 !important;
}
.spike-nav {
  display: block;
  width: calc(100% / 4);
  height: 1.08rem;
  background: #fed4e7;
  float: left;
  font-family: Helvetica;
  font-size: 0.7rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #f04184;
  text-align: center;
}
.spike-nav .spike-nav-span {
  height: 0.78rem;
  line-height: 0.78rem;
  width: 100%;
  display: inline-block;
  margin-top: 0.15rem;
  border-right-width: 0.06rem;
  border-right-style: solid;
  border-right-color: #fff;
}
.spike-nav:last-child .spike-nav-span {
  border-right-color: #fed4e7;
}
.spike-nav-active {
  color: #fff;
  background: #f04184;
}
.spike-nav-active .spike-nav-span {
  border-right-color: #f04184 !important;
}
.spike-nav-prev .spike-nav-span {
  border-right-color: #fed4e7;
}
#spike {
  width: 100%;
  padding: 0 0.23rem;
  overflow: hidden;
}
.spike {
  width: calc(calc(100% - 0.34rem) / 3);
  height: 5.34rem;
  background: #fff;
  float: left;
  margin-right: 0.17rem;
  overflow: hidden;
  position: relative;
}
.spike:last-child {
  margin-right: 0;
}
.spike .spike-img {
  width: 100%;
  height: 3.76rem;
}
.spike-title {
  width: 100%;
  height: 0.8rem;
  padding: 0 0.2rem;
  line-height: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: FZLTXHK--GBK1-0;
  font-size: 0.39rem;
  font-weight: normal;
  font-stretch: normal;
  color: #000;
}
.spike-price {
  width: 100%;
  height: 0.5rem;
  padding: 0 0.2rem;
}
.spike-price-new {
  display: inline-block;
  float: left;
  font-family: FZLTDHK--GBK1-0;
  font-size: 0.48rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #f04184;
  margin-top: 0.02rem;
}
.spike-price-new font {
  font-size: 0.31rem;
}
.spike-price-old {
  display: inline-block;
  float: left;
  font-family: FZLTZHUNHK--GBK1-0;
  font-size: 0.3rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #000000;
  opacity: 0.4;
  margin-left: 0.16rem;
  margin-top: 0.2rem;
  text-decoration: line-through;
}
.spike-price-old font {
  font-size: 0.19rem;
}
.spike-price-go {
  width: 1.35rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  float: right;
  background: #f04184;
  border-radius: 0.04rem;
  font-family: FZLTZHUNHK--GBK1-0;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
}
.over {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.7;
}
.over .over-img {
  width: 2.94rem;
  height: 1.64rem;
  margin: 1.5rem auto 0;
}
/* 分类会场 */
#type {
  width: 100%;
  overflow: hidden;
}
.type {
  width: calc(100% - 0.46rem);
  margin: 0 0.23rem;
  height: 6.13rem;
  overflow: hidden;
}
.type:nth-of-type(1) {
  background: #ed3079;
  margin-bottom: 0.17rem;
}
.type:nth-of-type(2) {
  background: #309bed;
}
.type-a {
  display: block;
  width: 4.93rem;
  height: 5.85rem;
  margin: 0.15rem 0 0 0.17rem;
  float: left;
}
.type-a img {
  width: 100%;
  height: 100%;
}
.type-box {
  float: right;
  width: 6.16rem;
  height: 5.85rem;
  margin-right: 0.17rem;
  margin-top: 0.15rem;
}
.type-box .type-box-a {
  display: block;
  width: 3.09rem;
  height: 2.88rem;
  float: left;
  margin-bottom: 0.09rem;
  margin-right: 0.11rem;
}
.type-box .type-box-a:nth-of-type(2n) {
  margin-right: 0;
  width: 2.96rem;
}
.type-box .type-box-a:nth-of-type(3) {
  margin-bottom: 0;
}
.type-box .type-box-a:nth-of-type(4) {
  margin-bottom: 0;
}
.type-box .type-box-a img {
  width: 100%;
  height: 100%;
}

.type:nth-of-type(2) .type-a {
  float: right;
  margin-left: 0;
  margin-right: 0.17rem;
}
.type:nth-of-type(2) .type-box {
  float: left;
  margin-left: 0.17rem;
  margin-right: 0;
}
/* 店铺 */
#shop {
  width: 100%;
  overflow: hidden;
  padding: 0 0.23rem 0.43rem;
}
.shop {
  display: block;
  width: calc(calc(100% - 0.16rem) / 2);
  height: 5.16rem;
  overflow: hidden;
  margin-bottom: 0.17rem;
  margin-right: 0.16rem;
  float: left;
}
.shop .shop-img {
  width: 100%;
  height: 100%;
}
.shop:nth-of-type(2n) {
  margin-right: 0;
}
/* 菜单 */
#nav {
  width: 100%;
  height: 1.2rem;
  overflow: hidden;
  background: #feb4d1 !important;
}
#zw_height {
  width: 100%;
  height: 1.2rem;
}
.nav {
  display: block;
  width: calc(100% / 5);
  height: 1.2rem;
  background: #feb4d1;
  float: left;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.44rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #f04184;
  text-align: center;
}
.nav .nav-span {
  height: 0.72rem;
  line-height: 0.72rem;
  width: 100%;
  display: inline-block;
  border-right-width: 0.05rem;
  border-right-style: solid;
  border-right-color: #fff;
  margin-top: 0.24rem;
}
.nav:last-child .nav-span {
  border-right-color: #feb4d1;
}
.nav-active {
  color: #fff;
  background: #f04184;
}
.nav-active .nav-span {
  border-right-color: #f04184 !important;
}
.nav-prev .nav-span {
  border-right-color: #feb4d1;
}
/* 商品 */
#goods {
  width: 100%;
  overflow: hidden;
  padding: 0.23rem 0.23rem 0;
}
.goods {
  width: calc(calc(100% - 0.18rem) / 2);
  background: #fff;
  float: left;
  margin-right: 0.18rem;
  margin-bottom: 0.16rem;
  height: 6.79rem;
}
.goods:nth-of-type(2n) {
  margin-right: 0;
}
.goods:last-child {
  margin-right: 0;
}
.goods-more {
  width: 100%;
  height: 100%;
}
.goods-top {
  width: 100%;
  height: 5.68rem;
  overflow: hidden;
  position: relative;
}
.goods-img {
  width: 100%;
  height: 5.68rem;
}
.goods-icon {
  width: 0.84rem;
  height: 0.94rem;
  position: absolute;
  left: 0.2rem;
  top: 0;
}
.goods-title {
  position: absolute;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  font-family: FZLTXHK--GBK1-0;
  font-size: 0.44rem;
  font-weight: normal;
  font-stretch: normal;
  color: #fff;
  padding: 0 0.34rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-price {
  width: 100%;
  padding: 0.2rem 0.2rem 0;
  height: 1.11rem;
}
.goods-price-new {
  display: inline-block;
  float: left;
  font-family: SourceHanSansCN-Bold;
  font-size: 0.76rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #f04184;
  margin-right: 0.1rem;
}
.goods-price-old {
  display: inline-block;
  float: left;
  font-family: MicrosoftYaHei;
  font-size: 0.38rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #a18f96;
  opacity: 0.6;
  text-decoration: line-through;
  margin-top: 0.34rem;
}
.goods-price-go {
  width: 1.84rem;
  height: 0.65rem;
  line-height: 0.65rem;
  text-align: center;
  float: right;
  background: #f04184;
  border-radius: 0.04rem;
  font-family: FZLTZHUNHK--GBK1-0;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
</style>
