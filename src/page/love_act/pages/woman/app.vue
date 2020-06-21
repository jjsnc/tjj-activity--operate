<template>
  <div id="xbct">
    <div>
      <img :src="headerimg">
    </div>
    <div :class="zwf == true ? 'zwf_on' :'zwf_off'"></div>
    <nav :class="navfixed == true ? 'fixed' :''" id="navs">
      <span
        v-for="(item,$index) in items"
        @click="selectStyle (item, $index) "
        :key="'C-'+$index"
        :class="{'active':item.active,'unactive':!item.active}"
      >
        <div
          class="nei"
          :class="{'nonei': $index == shows, 'nonei': $index == shows - 1}"
        >{{item.select}}</div>
      </span>
    </nav>
    <div class="goods">
      <div
        class="good"
        v-for="(goods,$i) in goodlists[shows]"
        :key="$i"
        @click="jump2good(goods.goods_id)"
      >
        <div class="goods-top">
          <img v-lazy="goods.img320_url" class="good-img" alt>
          <img src="../../assets/images/man/icon.png" class="good-icon" alt>
          <h3 class="good-title">{{goods.goods_name}}</h3>
        </div>
        <div class="good-price">
          <span class="good-price-new">{{goods.group_price}}</span>
          <span class="good-price-old">
            <font>￥</font>
            {{goods.shop_price | numFilter}}
          </span>
          <a href="javascript:;" class="good-price-go">{{buttons}}</a>
        </div>
      </div>
    </div>
    <ToTop></ToTop>
    <div class="shares" v-if="!is_wx" @click="share()">
      <img src="../../assets/images/woman/gshare.png">
    </div>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import url from "./../../assets/js/api";
var that = null;
export default {
  components: {
    ToTop
  },
  async created() {
    that = this;
    this.getgoodlist(0);
    // this.getsecondKillGoods();
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
    let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
    if (xcx_user) {
      this.iswx();
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    window.addEventListener("scroll", this.isdown);
  },
  data: function() {
    return {
      items: [
        {
          select: "美妆个护",
          active: true,
          position: 0
        },
        {
          select: "时尚女鞋",
          active: false,
          position: 0
        },
        {
          select: "精选商品",
          active: false,
          position: 0
        },
        {
          select: "时髦女装",
          active: false,
          position: 0
        },
        {
          select: "内衣配饰",
          active: false,
          position: 0
        }
      ],
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goods_id: [
        "2862755,1329,2529900,1969,4235700,3010702,5231,2958290,3312,4566873,4036466,4564210,17895,3918754,911954,3059392,204859,94,190529,3864,23447,2755683,2567301,1660837,3897549,962714,4564132,103206,1461119,4511,131515,2013630,3095687,926499,1488240,459798,1449550,35093,1784343,1847,1270764,3168,2572656,2537645,930428,1464905,778016,3626342,5188,175582,103,2641162,4361834,2534967,1198030,1781933,1781933,7385,1317,4335305",
        "2985169,4264853,2852992,1609766,4687523,2579925,4689405,3020909,4408375,2807515,183,4592551,4133003,3901657,4747609,3649548,3906905,2601354,4192703,4698151,1042239,3900106,4011295,2985284,4673817,2324758,3464947,1646434,1598930,1645309,2461236,2602605,2984801,2538775,3702709,3131394,7799,4584679,2984850,2603648,4293643,1913109,2512922,4549923,4458552,3464950,3155738,3326225,3118900,4567492,2535268,4508973,3546128,4389506,2702392,4244595,3377158,4538034,3864042,4364225,3315786,2659073,2318857,2572514,4651729,2522932,2597557,3547903,2326877,2315515",
        "4217670,782622,3021979,2892301,4133219,2571398,4950912,3182979,1566434,2316336,2539403,1990931,86491,2858009,2678618,4421425,4438165,4619650,356378,55720,3649662,3770,4558263,2996088,3986950,1641482,1528916,4253713,3392403,3149723,2736696,1155537,3414734,75520,24991,2827018,4227181,8615,3059533,3660109,2570209,4600281,4282787,2855091,2570006,31793,1124343,4438251,1021478,1284720,2807194,4663795,4344304,2631203,4613778,4693614,4567421,2685924,2458854,2827014,241916,4085208,2594186,4230199,3449559,4547862,4064430,4532608,2562031,4663749,4600185,901124,4452818,3155336",
        "3271969,3599486,3222329,4589490,4693776,4337876,3082919,4678338,3956827,3670602,4569742,3465084,2601062,4122792,3969118,2533919,2192040,3920920,3380840,4688321,3566204,4457063,2539434,2603084,4434079,2729919,4230336,2604376,4439941,3921314,4613661,3082894,4687991,1071663,4217687,4344490,4619318,3969363,2994366,4419131,4360571,4045413,2665614,4300575,4291474,4548717,2499512,4219803,3873358,2929009,1313503,4563855,3675206,4448412,2990343,4291696,4608930,4613958,4619346,4245342,4696742,4590246,4045397,2646080,4608886,4437532,4270320,4439957,4646385,4663721,4554833,4381564,4567408,4585095,4352981,4679713,4688001,4603578,4433831,4599664,4653880,4554841",
        "2574329,1875375,3644892,1656760,2723578,2501941,2537409,1223129,195353,65864,12069,2811869,3003902,2587647,39313,2860726,1026420,15236,1044904,2475608,1019508,1628037,185893,2652736,2603653,3085965,1646889,2716552,3466776,16216,4354635,2922,4830872,119593,3514912,3839121,14908,1762647,3141652,3661909,64173,2851951,3690292,2826718,2724451,2535210,2669689,1050182,2768213,1752771,4433844,2811574,1074982,2735251,3830207,2497628,2643761,2887531,1732659,4354865,20155,3144938,733394,3990397,4674710,4663901,4548664,4339743,3884917,4403745,4628451,4561488,3325937,2468133,4693639,4674702,4944022,4679506,4200003,4679339,4538425,4526633"
      ],
      // goods_id: [
      //   "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298"
      // ],
      headerimg: [require("../../assets/images/woman/woman_01.jpg")],
      is_wx: false,
      buttons: "立即抢",
      shows: 0
    };
  },
  filters: {
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(1);
      return realVal;
    }
  },
  methods: {
    getgoodlist(index) {
      if (!that.goodlists[index]) {
        that.$http
          .get(url.GoodList, {
            params: {
              goods_id: that.goods_id[index]
            }
          })
          .then(res => {
            let ress = res.data;
            let nums = ress.length < 2 ? 0 : ress.length % 2;
            that.$set(that.goodlists, index, ress.slice(0, ress.length - nums));
          })
          .catch(function(error) {
            that.$set(that.goodlists, index, null);
            console.log(error);
          });
      }
    },
    selectStyle(item, index) {
      this.getgoodlist(index);
      this.items.forEach(function(item, index) {
        Vue.set(item, "active", false);
      });
      Vue.set(this.items[index], "active", true);
      this.shows = index;
    },
    iswx() {
      this.is_wx = true;
    },
    jumpToShopHome(id) {
      tjjApp.web.startShopHome(id);
    },
    jump2good(id) {
      tjjApp.web.jump2good(id);
    },
    jump2onegood(id, num) {
      if (num > 0) {
        tjjApp.web.jump2good(id);
      }
    },
    toSecondsDetail(gmoredata) {
      tjjApp.web.toCATE({
        id: gmoredata.ids,
        name: gmoredata.names
      });
    },
    numFn(rem) {
      return rem * 23.4375;
    },
    isdown() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (!this.navfixed) {
        if (document.querySelector("#navs")) {
          this.offsetTops = document.querySelector("#navs").offsetTop;
        }
      }
      let offsetTop = this.offsetTops;
      scrollTop > offsetTop
        ? (this.navfixed = this.zwf = true)
        : (this.navfixed = this.zwf = false);
    },
    share() {
      tjjApp.web.share({
        title: document.title,
        shareUrl: 'https://a.taojiji.com/a/a'
      });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.isdown);
  }
};
</script>
<style scoped>
#xbct {
  background-color: #fecae0;
}

img {
  width: 100%;
  display: block;
}

nav {
  width: 100%;
  font-size: 0.44rem;
  letter-spacing: 0px;
  height: 1.2rem;
  overflow: hidden;
  background: #fecae0;
}

.fixed {
  position: fixed;
  top: 0;
  z-index: 999;
}

.zwf_off {
  width: 100%;
  height: 1.2rem;
  display: none;
}

.zwf_on {
  width: 100%;
  height: 1.2rem;
  display: block;
}

nav span:last-child {
  margin-right: 0px;
}

nav span {
  width: 20%;
  float: left;
  text-align: center;
  background: #feb3d1;
  height: 1.2rem;
  line-height: 0.6rem;
  color: #f04184;
}

nav .active {
  background-color: #f04184;
  color: #ffffff;
}

.nei {
  height: 0.6rem;
  margin-top: 0.3rem;
  border-right-width: 0.05rem;
  border-right-style: solid;
  border-right-color: #fff;
}

.nonei {
  height: 0.6rem;
  margin-top: 0.3rem;
  border-right-color: #feb3d1;
}

.active .nei {
  border-right-color: #f04184;
}

.goods {
  width: 100%;
  overflow: hidden;
  padding: 0.23rem 0.23rem 0;
  background-color: #fecae0;
}

.good {
  width: calc(calc(100% - 0.18rem) / 2);
  background: #fff;
  position: relative;
  float: left;
  margin-right: 0.18rem;
  margin-bottom: 0.16rem;
  height: 7.79rem;
}

.good:nth-of-type(2n) {
  margin-right: 0;
}

.good:last-child {
  margin-right: 0;
}

span:last-child div {
  border-right-color: #feb3d1;
}

.good-more {
  width: 100%;
  height: 100%;
}

.good-top {
  width: 100%;
  height: 5.68rem;
  overflow: hidden;
  position: relative;
}

.good-img {
  width: 100%;
  height: 5.68rem;
}

.good-icon {
  position: absolute;
  top: 0;
}

.good-title {
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

.good-price {
  width: 100%;
  padding: 0.2rem 0.2rem 0;
  height: 1.11rem;
}

.good-price-new {
  display: inline-block;
  float: left;
  font-family: SourceHanSansCN-Bold;
  font-size: 0.76rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #f04184;
  margin-right: 0.2rem;
}

.good-price-old {
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

.good-price-go {
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

.shares {
  position: absolute;
  right: 0.15rem;
  top: 0.18rem;
  width: 1.83rem;
  height: 0.54rem;
}
</style>