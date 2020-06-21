<template>
  <div class="container">
    <headerBanner class="banner" :options="options"></headerBanner>
    <!-- 菜单 -->
    <div id="nav" :class="{'fixed': fixed}">
      <div class="nav">
        <div class="nav-box">
          <a
            href="javascript:;"
            @click="tabclick(index)"
            class="tab"
            :class="{'tab-active': index == navIndex}"
            v-for="(el, index) in navs"
            :key="index"
          >
            <span
              class="tab-icon"
              :style="{backgroundImage: 'url('+ el.icon +')', backgroundSize: el.size}"
            ></span>
            <span class="tab-name">{{ el.name }}</span>
          </a>
        </div>
      </div>
      <div class="next" @click="tabMove">
        <a href="javascript:;" class="next-icon"></a>
      </div>
    </div>
    <div class="zw-height" v-if="fixed"></div>
    <!-- 必抢超低价 -->
    <img v-lazy="require('../../assets/images/nine/top_01.jpg')" alt v-if="goodsLoadBtn">
    <!-- 商品 -->
    <div id="goods">
      <div class="goods">
        <a
          href="javascript:;"
          class="goods-list"
          v-for="(el, index) in goodsData"
          :key="index"
          @click="toGoods(el.goods_id, el.goods_name)"
        >
          <img v-lazy="el.img320_url" alt class="good-img">
          <h3 class="good-title">{{ el.goods_name }}</h3>
          <div class="good-price">
            <span class="good-price-new">
              <font>￥</font>
              {{ el.group_price | price_point_no_zero }}
            </span>
            <span class="good-price-old">
              <font>￥</font>
              {{ el.shop_price | price_point_no_zero }}
            </span>
            <a href="javascript:;" class="good-price-go">立即购买</a>
          </div>
        </a>
      </div>
    </div>
    <!-- 特价推荐 -->
    <img v-lazy="require('../../assets/images/nine/top_02.jpg')" alt v-if="goodsLoadBtn">
    <!-- 商品 -->
    <div id="goods">
      <div class="goods">
        <a
          href="javascript:;"
          class="goods-list"
          v-for="(el, index) in goodsDataList"
          :key="index"
          @click="toGoods(el.goods_id, el.goods_name)"
        >
          <img v-lazy="el.img320_url" alt class="good-img">
          <h3 class="good-title">{{ el.goods_name }}</h3>
          <div class="good-price">
            <span class="good-price-new">
              <font>￥</font>
              {{ el.group_price | price_point_no_zero }}
            </span>
            <span class="good-price-old">
              <font>￥</font>
              {{ el.shop_price | price_point_no_zero }}
            </span>
            <a href="javascript:;" class="good-price-go">立即购买</a>
          </div>
        </a>
      </div>
    </div>
    <!-- 更多 -->
    <img
      v-lazy="require('../../assets/images/nine/more.jpg')"
      alt
      v-if="options.shareBtn && goodsLoadBtn && moreFirstBtn"
      @click="toMore"
    >
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
    <!-- 底部通栏 -->
    <div class="bottom-nav"></div>
    <bottomNav></bottomNav>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import URL from "./../../assets/js/api";
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("../../assets/images/nine/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("../../assets/images/nine/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "1.92rem",
            height: "0.68rem",
            right: "0.22rem",
            top: "0.27rem"
          }
        }
      },
      // 317 母婴
      // 361 食品
      // 328 鞋包
      // 406 百货
      // 315 服饰
      // 332 美妆
      // 340 手机
      // 菜单
      navs: [
        {
          name: "精选推荐",
          icon: require("../../assets/images/icon/tab_01.png"),
          size: ".51rem",
          toMoreId: 1,
          toMoreName: "精选"
        },
        {
          name: "家居百货",
          icon: require("../../assets/images/icon/tab_03.png"),
          size: ".74rem .55rem",
          toMoreId: 406,
          toMoreName: "百货"
        },
        {
          name: "潮流服饰",
          icon: require("../../assets/images/icon/tab_02.png"),
          size: ".53rem .65rem",
          toMoreId: 315,
          toMoreName: "服饰"
        },
        {
          name: "时尚鞋包",
          icon: require("../../assets/images/icon/tab_04.png"),
          size: ".74rem .62rem",
          toMoreId: 328,
          toMoreName: "鞋包"
        },
        {
          name: "美妆个护",
          icon: require("../../assets/images/icon/tab_05.png"),
          size: ".61rem .66rem",
          toMoreId: 332,
          toMoreName: "美妆"
        },
        {
          name: "休闲美食",
          icon: require("../../assets/images/icon/tab_06.png"),
          size: ".69rem .64rem",
          toMoreId: 361,
          toMoreName: "食品"
        },
        {
          name: "3C生活",
          icon: require("../../assets/images/icon/tab_07.png"),
          size: ".7rem .53rem",
          toMoreId: 340,
          toMoreName: "手机"
        }
      ],
      navIndex: 0,
      navWidth: 0,
      // 跳转二级分类
      toMoreId: null,
      toMoreName: null,
      // 吸顶菜单开关
      fixed: false,
      // 商品信息
      goodsData: [],
      goodsDataList: [],
      goodsCacheData: [],
      goodsLoadBtn: false,
      moreFirstBtn: false,
      goods_ids: [
        [
          "6270028,4613778,2575175,2574843,4094898,5501627,5618569,3182944,6493211",
          "2329,3948864,14579,6371309,14690,3434870,2579910,187071,1936619,3182990,6450923,2755683,1888688,1413,3956827,5151015,1335262,4254022,1765716,2845777,5393762,12732,4995895,5861335,2980748,1284720,2936383,2671354,2671341,2452485,3145365,5873683,6245248,3317116,6093499,4986200,2853010,3541744,4457142,5887697,3531668,3117727,6041909,6049271,3016957,6459871,2727711,2713694,6397206,4328916,6124171,6327117,6380272,6506318,12900,6412921"
        ],
        [
          "1915,59930,347721,1321788,2526970,3616589,2587688,6053629,4975233",
          "2575175,2574843,2713694,3541744,3145365,4328916,6380272,3016957,6412921,3117727,2980748,2871550,1095277,2466464,6412280,6412172,4133020,3712246,6324944,6070366,4831436,5458687,6380379,3050363,18440,3440958,6036509,3583427,3835910,2907314,3706234,4479407,29307,3910939,1288706,4035090,3743379,3975931,4264495,6380358,6380314,4329222,5409269,4310019,4382111,31847,19252,4133019,2854490,2245705,2195178,3358691,6736,40082,2186364,29134,6307590,6380369,6380297,29377"
        ],
        [
          "6109805,6784182,2655558,5540328,5481345,5381786,4768281,2969568,8707",
          "6270028,4613778,2644924,5077944,5971068,6405052,4599829,5658062,1888688,3434870,3182990,5393762,4995895,3956827,5873683,6093499,3948864,4254022,2845777,5861335,5151015,1765716,5539442,4567421,3084974,5873673,3599486,5618560,5986336,4437491,80659,5877471,6104826,6264960,6044207,4350198,5051050,2607699,6108194,6099688,5930571,6447063,4000564,2539358,5519021,4371628,1674662,5543203,4687281,4304536,6044142,4318047,5605974,1662342,5986722,6103635,6108160,6286943,5038761,5938615,5999710,4799283,6102540,3955084,6040152,6286844,5938550,6402266,6108356,6303299,6104656,5666048,5925465,6279081,6405060,5944367,6044359,5664723,5999704,2542380"
        ],
        [
          "3407084,6405008,1608028,20201,4668422,6419470,6371277,2243947,6371112",
          "4094898,5501627,4457142,3531668,2671354,6124171,1335262,3317116,2853010,6371309,1936619,6245248,187071,2671341,6350168,6124206,6371254,6371130,6371097,6371244,6371262,6371106,6371136,6371116,6371095,6371114,6371123,6371086,6378572,6371077,6371072,6405020,6370357,3153163,2701946,928797,2843126,939029,6278451,2512514,6419463,6420501,6232620,2892348,4238911,2479369,73724,841972,2167729,5953380,3195897,6238136,6423248,1599285,6381325,4267874,5384709,2830804,6372790,6378616,5842275,5901469,5569541,5196158,5304345,6381369,2735234,151681,1320392,2622449,3486846,6405013,6405032,6419648"
        ],
        [
          "6358562,6293118,6296279,6378684,4291010,6305223,6305237,6314339,6336297",
          "5618569,2753126,5887697,2755683,6049271,14579,1284720,14690,2574331,1133120,2428624,3973639,5781116,2306625,5487363,5990112,1327202,2487698,5677115,2029779,1660837,5501628,2598678,3414561,3918754,4559335,55720,2768,5990076,5876483,3071280,6049345,1798165,1139100,3010702,2571398,3117788,4566873,4429509,2570209,3117785,2826162,1435212,3364088,5830488,5399341,4184593,1675081,2729905,1735691,2537455,2519357,2375188,4798098,1042686,1155537,6049174,4983707,4335305,11800"
        ],
        [
          "4032399,4549607,6378945,6397232,6313456,6312833,6061854,6359580,5960840",
          "3182944,5370465,2579910,6041909,4986200,6397206,2727711,2936383,2452485,1236971,2253531,6359580,1694749,2898241,6284985,6416991,1766727,2602356,6354194,5338144,5831666,5418101,5418094,6313775,1625942,2535067,2816839,4032399,5960840,5997530,6313456,2621400,6378945,1491743,775548,6397232,6284941,4549607,4211141,1224667,2537810,5279291,6421427,2602355,2041964,6317626,6312833,6362306,1644993,6376435,3679237,4720155,4879168,4760063,5336924,3532705,4026364,4986212"
        ],
        [
          "6124331,6309995,6314354,2482582,1604448,1475097,5028560,3117764,3117766",
          "6493211,6327117,6459871,6450923,6506318,1413,2329,12732,12900,29654,480297,927338,1051421,1118206,1106444,1185940,1258176,1328308,1631806,1664440,1800016,2079364,2327979,2537893,2575175,2574843,2713694,2694689,3541744,3145365,3046058,3117727,2980748,2871550,3050363,3823391,3798664,3440958,3583427,3763675,3835910,3910939,4035090,4264495,4294440,5267919,6314347,5622240,5726259,5868596,6328208,6309886"
        ]
      ],
      // goods_ids: [
      //   ["154,118,121,122,123,128", "154,118,121,122,123,128,130,142,152"],
      //   ["118,121,122,123,128,130", "118,121,122,123,128,130,142,152,154"],
      //   ["123,128,130", "123,128,130,142,152,154"],
      //   ["128,130,142", "128,130,142,152,154,118"],
      //   ["130,142,152", "130,142,152,154,118,121"],
      //   ["142,152,154", "142,152,154,121,118,130"],
      //   ["152,154,128", "152,154,128,130,142,118"]
      // ],
      msgTxt: null
    };
  },
  created() {
    vm = this;
    vm.initPv();
    vm.navs.map((el, index) => {
      vm.goodsCacheData[index] = {};
    });
    vm.init(0);
    // 二级类目
    vm.toMoreId = vm.navs[0].toMoreId;
    vm.toMoreName = vm.navs[0].toMoreName;
  },
  methods: {
    // 菜单点击
    tabclick(index) {
      vm.navIndex = index;
      vm.init(index);
      vm.toMoreId = vm.navs[index].toMoreId;
      vm.toMoreName = vm.navs[index].toMoreName;
      if (vm.navIndex == 0) {
        vm.moreFirstBtn = false;
      } else {
        vm.moreFirstBtn = true;
      }
    },
    tabMove() {
      vm.navWidth = document.getElementsByClassName("tab")[0].clientWidth;
      vm.navIndex++;
      if (vm.navIndex >= 4 && vm.navIndex <= 6) {
        document.getElementsByClassName("nav")[0].scrollLeft =
          (vm.navIndex - 3) * vm.navWidth;
      } else if (vm.navIndex > 6) {
        document.getElementsByClassName("nav")[0].scrollLeft = 0;
        vm.navIndex = 0;
      } else {
        document.getElementsByClassName("nav")[0].scrollLeft =
          vm.navIndex * vm.navWidth;
      }
      if (vm.navIndex == 0) {
        vm.moreFirstBtn = false;
      } else {
        vm.moreFirstBtn = true;
      }
      vm.init(vm.navIndex);
      vm.toMoreId = vm.navs[vm.navIndex].toMoreId;
      vm.toMoreName = vm.navs[vm.navIndex].toMoreName;
    },
    // 商品列表
    init(index) {
      if (Object.keys(vm.goodsCacheData[index]) != 0) {
        vm.goodsData = vm.goodsCacheData[index][0];
        vm.goodsDataList = vm.goodsCacheData[index][1];
        return false;
      }

      vm.initAjax(index, 0, vm.goods_ids[index][0]);
      vm.initAjax(index, 1, vm.goods_ids[index][1]);
    },
    initAjax(index, i, id) {
      let params = {
        goods_id: id
      };
      vm.$http.get(URL.GoodList, { params }).then(res => {
        console.log(res);
        let data = res.data;
        if (!data) {
          vm.msgTxt = "暂无数据";
          return false;
        }
        if (res.status == "200" && data.length != 0) {
          vm.goodsLoadBtn = true;
          if (data.length % 3 != 0 && data.length > 2) {
            data = data.slice(0, data.length - (data.length % 3));
          }
          if (i == 0) {
            vm.goodsData = data;
          } else {
            vm.goodsDataList = data;
          }
          vm.goodsCacheData[index][i] = data;
        } else {
          if (i == 0) {
            vm.goodsData = [];
          } else {
            vm.goodsDataList = [];
          }
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
    // 跳转商品
    toGoods(id, name) {
      tjjApp.web.jump2good({
        goodsId: id,
        goodsName: name,
        activityName: "618大促活动"
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      tjjApp.web.initPv();
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
      vm.options.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style>
html,
body {
  background: #f0163d;
}
/* 返回顶部 */
.toTop {
  bottom: 1.66rem !important;
}
/* bottom-nav站位高度 */
.bottom-nav {
  width: 100%;
  height: 1.64rem;
}
</style>
<style scoped>
.container,
#nav,
#goods {
  background: #f0163d;
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
.banner {
  margin-bottom: 0.1rem;
}
/* 菜单 */
#nav {
  width: 100%;
  height: 2.24rem;
}
.nav {
  width: calc(100% - 1.07rem);
  height: 2.24rem;
  float: left;
  overflow-x: auto;
  overflow-y: hidden;
}
.nav-box {
  width: calc(100% / 4 * 7);
  height: 2.24rem;
}
.tab {
  display: block;
  float: left;
  height: 2.24rem;
  width: calc(100% / 7);
  background: linear-gradient(#d9011c, #cf0e47);
}
.tab-icon {
  display: block;
  width: 100%;
  height: 1.24rem;
  background-position: center bottom;
  background-repeat: no-repeat;
}
.tab-name {
  display: block;
  text-align: center;
  font-size: 0.3rem;
  font-family: FZZDXJW--GB1-0;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
}
.tab-active {
  background: linear-gradient(#e10122, #e10122);
}
.next {
  width: 1.07rem;
  height: 2.24rem;
  float: left;
  background: linear-gradient(#e10122, #e10122);
  position: relative;
}
.next-icon {
  width: 0.52rem;
  height: 0.52rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  position: absolute;
  background: url(../../assets/images/icon/jt_icon.png) center center no-repeat;
  background-size: 0.52rem;
}
/* 商品 */
#goods {
  width: 100%;
  overflow: hidden;
}
.goods {
  width: 100%;
  padding: 0 0.1rem;
  overflow: hidden;
}
.goods-list {
  display: block;
  width: calc(calc(100% - 0.32rem) / 3);
  float: left;
  margin-right: 0.16rem;
  margin-bottom: 0.13rem;
  overflow: hidden;
  background: #fff;
  height: 4.76rem;
}
.goods-list:nth-of-type(3n) {
  margin-right: 0;
}
.good-img {
  height: 3.5rem;
}
.good-title {
  width: 100%;
  height: 0.54rem;
  line-height: 0.54rem;
  font-family: MicrosoftYaHei;
  font-size: 0.38rem;
  font-weight: normal;
  font-stretch: normal;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.07rem;
}
.good-price {
  width: 100%;
  height: 0.6rem;
}
.good-price-new {
  font-family: Impact;
  font-size: 0.6rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #fe1d45;
  float: left;
  margin-left: 0.16rem;
}
.good-price-new font {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.39rem;
}
.good-price-old {
  font-family: MicrosoftYaHei;
  font-size: 0.25rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #978c8c;
  float: left;
  margin-left: 0.13rem;
  text-decoration: line-through;
  margin-top: 0.35rem;
}
.good-price-go {
  width: 1.5rem;
  height: 0.4rem;
  line-height: 0.4rem;
  text-align: center;
  background-image: linear-gradient(-4deg, #fa4464 0%, #ff153f 100%),
    linear-gradient(#d00227, #d00227);
  background-blend-mode: normal, normal;
  border-radius: 0.1rem;
  float: right;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.29rem;
  font-weight: normal;
  font-stretch: normal;
  color: #fff;
  margin-right: 0.06rem;
  margin-top: 0.2rem;
}
/* 更多 */
.bottomNav {
  margin-bottom: 2rem;
}
/* 吸顶菜单 */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
.zw-height {
  height: 2.24rem;
}
</style>

