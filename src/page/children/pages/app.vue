<template>
  <div class="container">
    <headerBanner :options="options" @sendMsg="getMsg"></headerBanner>
    <!-- 秒杀 -->
    <img class="spike-img" src="../assets/images/top_03.jpg" alt>
    <div id="spike">
      <div class="spike-box">
        <a
          href="javascript:;"
          class="spike"
          v-for="(el, index) in spikeData"
          :key="index"
          @click="toGoods(el.goods_id, el.num)"
        >
          <img v-lazy="el.img320_url" alt class="spike-left">
          <img src="../assets/images/icon.png" alt class="spike-icon">
          <div class="spike-right">
            <h2 class="spike-title">{{ el.goods_name }}</h2>
            <div class="spike-hot">
              <div class="spike-hot-img"></div>
              <span class="spike-txt">热搜指数</span>
              <div class="spike-star">
                <a
                  href="javascript:;"
                  class="spike-star-a"
                  :class="{'spike-star-a-hot': index == spikeData.length - 1 && item == 5}"
                  v-for="(item, key) in starArr"
                  :key="key"
                ></a>
              </div>
            </div>
            <div class="spike-border"></div>
            <div class="spike-price">
              <span class="spike-price-new">
                <font>￥</font>
                {{ el.group_price | numFilter }}
              </span>
              <span class="spike-price-old">
                <font>￥</font>
                {{ el.shop_price | numFilter }}
              </span>
              <span class="spike-go" v-if="el.num">立即秒 ></span>
              <span class="spike-go spike-go-over" v-else>已售罄 ></span>
            </div>
          </div>
        </a>
      </div>
    </div>
    <!-- 买即送 -->
    <img class="top-img" src="../assets/images/top_04.jpg" alt>
    <div id="mai">
      <div class="mai">
        <div
          class="goods"
          v-for="(el, index) in maiData"
          :key="index"
          @click="toGoods(el.goods_id, -1)"
        >
          <div class="goods-top">
            <img v-lazy="el.img320_url" class="goods-img" alt>
          </div>
          <h3 class="goods-title">{{ el.goods_name }}</h3>
          <div class="goods-price">
            <span class="goods-price-new">
              <font>￥</font>
              {{ el.group_price }}
            </span>
            <span class="goods-price-old">
              <font>￥</font>
              {{ el.shop_price }}
            </span>
            <a href="javascript:;" class="goods-price-go">立即抢</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 店铺 -->
    <img class="top-img" src="../assets/images/top_05.jpg" alt>
    <div id="shop">
      <div class="shop-box">
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
      >{{ el.name }}</a>
    </div>
    <div v-if="fixed" id="zw_height"></div>
    <!-- 商品 -->
    <div id="goods">
      <div
        class="goods"
        v-for="(el, index) in goodsData"
        :key="index"
        @click="toGoods(el.goods_id, -1)"
      >
        <div class="goods-top">
          <img v-lazy="el.img320_url" class="goods-img" alt>
        </div>
        <h3 class="goods-title">{{ el.goods_name }}</h3>
        <div class="goods-price">
          <span class="goods-price-new"><font>￥</font>{{ el.group_price }}</span>
          <span class="goods-price-old">
            <font>￥</font>
            {{ el.shop_price }}
          </span>
          <a href="javascript:;" class="goods-price-go">立即抢</a>
        </div>
      </div>
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
import headerBanner from "@/components/headerBanner";
import URL from "./../assets/js/api";
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("../assets/images/top_01.jpg"),
      },
      // 秒杀
      spikeData: [],
      starArr: [1, 2, 3, 4, 5],
      // 买即送
      maiData: [],
      maiIds: "4521669, 5112923, 5113189, 5112795",
      // maiIds: "113,114,118,121",
      // 店铺
      shopData: [
        {
          id: 76167,
          name: "思雅鞋坊",
          img: require("../assets/images/shop_01.jpg")
        },
        {
          id: 77107,
          name: "淘吉吉母婴店",
          img: require("../assets/images/shop_02.jpg")
        },
        {
          id: 10403,
          name: "歌叮豆童装专卖店",
          img: require("../assets/images/shop_03.jpg")
        },
        {
          id: 104835,
          name: "小悦悦童装",
          img: require("../assets/images/shop_04.jpg")
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
        { name: "梦想童装", id: 315, toMoreName: "服饰" },
        { name: "梦想童鞋", id: 328, toMoreName: "鞋包" },
        { name: "梦想用品", id: 332, toMoreName: "美妆" }
      ],
      navIndex: 0,
      fixed: false,
      toMoreId: null,
      toMoreName: null,
      goodsData: [],
      goodsCacheData: {},
      goods_ids: [
        "915001,2965714,2325854,2882850,3033231,4518555,2881616,4452974,2535148,1987886,3516030,2299057,2303381,4463862,2505087,1658645,1702628,2882843,2898296,2624043,4114448,2859589,2884150,2538814,3206662,2570263,12486,2387696,2597667,2538738,4362193,2226403,2568035,2179152,1516433,2898290,1328062,2231860,2884104,3901710,3643150,2500054,3690430,3668714,2804911,2091952,2445654,2859717,2589102,2070682,2650419,427397,2570286,2556558,4410359,3482978,2538817,3832726,2155490,42432",
        "4275796,4312323,2536592,2308178,4312733,2979607,1344881,4326312,39069,2567362,1526798,3752747,4093085,2618410,20114,2807177,1510806,4038787,1792847,4238448,4199025,811747,2884157,1551693,1075689,2574855,2876165,1164714,2618407,2534979,2578768,4372880,4326308,2593606,2564195,2542826,81387,2542818,10634,2504012,1469897,3616589,1164559,4228172,1491224,2459498,11478,2536557,243956,820275,4221684,1803398,2304427,4210703,2512302,2188652,24390,299757,4230820,833689",
        "2690945,447862,1666482,3225,2160151,3225056,16229,1555029,171333,910609,2528751,2368486,614294,21271,3364593,187839,216828,3746622,2585559,5867,25643,2384532,3835229,35412,3910795,3886050,2083519,2265177,4058304,4228212,1037802,1299654,129843,1740104,3844458,1676234,2340727,2243652,2439353,1024486,2358812,9512,43121,880739,152967,70316,2396884,1951477,1436898,3592264,507349,42813,494552,2723550,36803,36711,2585556,2345283,3202194,4208732"
      ],
      // goods_ids: [
      //   "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      // ],
      msgTxt: null
    };
  },
  created() {
    vm = this;
    for (let i = 0; i < vm.navs.length; i++) {
      vm.goodsCacheData[i] = [];
    }
    vm.tabInit(0);
    vm.maiInit();
    vm.spikeInit();
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
    // 秒杀数据
    spikeInit(){
      vm.$http.get(URL.GetGoodsSkillCategory).then(res => {
        let data = JSON.parse(res.data);
        console.log(data);
        if (!data) {
          vm.spikeData = [];
          return false;
        }
        if (data.result == 1) {
          vm.spikeData = data.data;
        } else {
          vm.spikeData = [];
          vm.msgTxt = res.statusText;
        }
      });
    },
    // 买即送数据
    maiInit() {
      let params = {
        goods_id: vm.maiIds
      };
      vm.$http.get(URL.GoodList, { params }).then(res => {
        console.log(res);
        let data = res.data;
        if (!data) {
          vm.maiData = [];
          return false;
        }
        if (res.status == "200" && data.length != 0) {
          if (data.length % 2 != 0 && data.length > 1) {
            data = data.slice(0, data.length - 1);
          }
          vm.maiData = data;
        } else {
          vm.maiData = [];
          vm.msgTxt = res.statusText;
        }
      });
    },
    // 菜单
    tabClick(index) {
      vm.navIndex = index;
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
        if (!data) {
          vm.goodsData = [];
          return false;
        }
        if (res.status == "200" && data.length != 0) {
          if (data.length % 2 != 0 && data.length > 1) {
            data = data.slice(0, data.length - 1);
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
    toGoods(id, num) {
      if (num == 0 || !num) {
        vm.msgTxt = "已售罄";
        return false;
      }
      tjjApp.web.jump2good(id);
    },
    // 组件通信
    getMsg(data) {
      console.log(data);
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
  components: {
    ToTop,
    msgBox,
    headerBanner
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style>
html,
body {
  background: #ffaad1;
}
</style>
<style scoped>
.container,
section,
#spike,
#mai,
#shop,
#type,
#nav,
#goods {
  background: #ffaad1 !important;
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
/* 秒杀 */
.spike-img {
  margin-bottom: 0.2rem;
}
#spike {
  width: 100%;
  overflow: hidden;
}
.spike-box {
  width: calc(100% - 0.48rem);
  overflow: hidden;
  margin: 0 auto;
  background: #ff6bab;
  border-radius: 0.2rem;
}
.spike {
  display: block;
  width: calc(100% - 0.4rem);
  height: 4.3rem;
  margin: 0.2rem auto 0.17rem;
  background: #fff;
  position: relative;
  overflow: hidden;
}
.spike-icon{
  position: absolute;
  width: 1.63rem;
  height: .52rem;
  left: 0;
  top: .2rem;
}
.spike:last-child {
  margin-bottom: 0.2rem;
}
.spike-left {
  width: 4.5rem;
  height: 4.3rem;
  float: left;
  margin-right: 0.35rem;
}
.spike-right {
  width: 5.7rem;
  height: 4.3rem;
  float: left;
}
.spike-title {
  width: 100%;
  font-family: SourceHanSansCN-Bold;
  font-size: 0.5rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.3rem;
  height: 1.3rem;
  letter-spacing: 0px;
  color: #4f4f4f;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.spike-hot {
  width: 4.2rem;
  height: 0.6rem;
  background: #fff1f1;
  border-radius: 0.2rem;
}
.spike-hot-img {
  width: 0.6rem;
  height: 0.6rem;
  background: red url(../assets/images/icon_fdj.png) center center no-repeat;
  background-size: 0.33rem;
  border-radius: 0.6rem;
  float: left;
}
.spike-txt {
  display: inline-block;
  float: left;
  font-family: FZY3JW--GB1-0;
  font-size: 0.37rem;
  height: 0.6rem;
  line-height: 0.6rem;
  font-weight: normal;
  font-stretch: normal;
  color: #ff4978;
  margin: 0 0.1rem 0 0.2rem;
}
.spike-star {
  width: 1.5rem;
  height: 0.28rem;
  margin-top: 0.16rem;
  float: left;
}
.spike-star-a {
  display: block;
  width: 0.28rem;
  height: 0.28rem;
  background: #000;
  margin-right: 0.025rem;
  float: left;
  background: url(../assets/images/star.png) center center no-repeat;
  background-size: 0.28rem 0.28rem;
}
.spike-star-a:last-child {
  margin-right: 0;
}
.spike-star-a-hot {
  background: url(../assets/images/star_over.png) center center no-repeat;
  background-size: 0.28rem 0.28rem;
}
.spike-border {
  width: 100%;
  height: 0.5rem;
  margin-bottom: 0.7rem;
  border-bottom: 0.02rem dashed #bfbfbf;
}
.spike-price {
  width: 100%;
  height: 0.66rem;
}
.spike-price-new {
  display: inline-block;
  float: left;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.64rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #ff4978;
  margin-right: 0.2rem;
  margin-top: 0.04rem;
}
.spike-price-new font {
  font-size: 0.4rem;
}
.spike-price-old {
  display: inline-block;
  float: left;
  font-size: 0.37rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #aaa;
  text-decoration: line-through;
  margin-top: 0.26rem;
}
.spike-go {
  width: 2.6rem;
  height: 0.66rem;
  display: inline-block;
  float: right;
  background: #ff4978;
  border-radius: 0.05rem;
  font-family: SourceHanSansCN-Normal;
  font-size: 0.44rem;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.66rem;
  letter-spacing: 0px;
  color: #fff;
}
.spike-go-over {
  background: #aaa;
}
/* 买即送 */
.top-img {
  margin: 0.28rem 0 0.2rem;
}
#mai {
  width: 100%;
  overflow: hidden;
}
.mai {
  width: calc(100% - 0.48rem);
  overflow: hidden;
  margin: 0 auto;
  background: #ff6bab;
  border-radius: 0.2rem;
  padding: 0.26rem 0.25rem 0;
}
.mai .goods {
  width: calc(calc(100% - 0.26rem) / 2);
  margin-bottom: 0.26rem;
  margin-right: 0.26rem;
}
.mai .goods:nth-of-type(2n) {
  margin-right: 0;
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
  margin-bottom: 0.6rem;
}
.shop-box {
  width: calc(100% - 0.58rem);
  overflow: hidden;
  margin: 0 auto;
  background: #ff6bab;
  border-radius: 0.2rem;
  padding: 0.25rem 0.29rem 0;
}
.shop {
  display: block;
  width: calc(calc(100% - 0.26rem) / 2);
  overflow: hidden;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
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
  height: 1.13rem;
  overflow: hidden;
  background: #feb4d1 !important;
}
#zw_height {
  width: 100%;
  height: 1.13rem;
}
.nav {
  display: block;
  width: calc(100% / 3);
  height: 1.13rem;
  line-height: 1.13rem;
  background: #ff6bab;
  float: left;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.57rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  text-align: center;
  color: #fff;
}
.nav-active {
  color: #ff6bab;
  background: #fff;
}
/* 商品 */
#goods {
  width: 100%;
  overflow: hidden;
  padding: 0.24rem 0.24rem 0;
}
.goods {
  width: calc(calc(100% - 0.22rem) / 2);
  background: #fff;
  float: left;
  margin-right: 0.22rem;
  margin-bottom: 0.24rem;
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
  height: 5.4rem;
  overflow: hidden;
  position: relative;
}
.goods-img {
  width: 100%;
  height: 5.4rem;
}
.goods-icon {
  width: 0.84rem;
  height: 0.94rem;
  position: absolute;
  left: 0.2rem;
  top: 0;
}
.goods-title {
  width: 100%;
  height: 1.3rem;
  line-height: 1.3rem;
  font-family: SourceHanSansCN-Normal;
  font-size: 0.59rem;
  font-weight: normal;
  font-stretch: normal;
  color: #000;
  padding: 0 0.34rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-price {
  width: 100%;
  padding: 0 0.2rem 0;
  height: 1.11rem;
}
.goods-price-new {
  display: inline-block;
  float: left;
  font-family: SourceHanSansCN-Bold;
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #ff4978;
  margin-right: 0.1rem;
}
.goods-price-new font {
  font-size: 0.39rem;
  float: left;
  margin-top: 0.34rem;
}
.goods-price-old {
  display: inline-block;
  float: left;
  font-family: MicrosoftYaHei;
  font-size: 0.43rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #000;
  opacity: 0.4;
  text-decoration: line-through;
  margin-top: 0.33rem;
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
  margin-top: .06rem;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
</style>
