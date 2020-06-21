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
            {{goods.shop_price}}
          </span>
          <a href="javascript:;" class="good-price-go">{{buttons}}</a>
        </div>
      </div>
    </div>
    <ToTop></ToTop>
    <div class="shares" v-if="!is_wx" @click="share()">
      <img src="../../assets/images/man/mshare.png">
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
          select: "流行男鞋",
          active: true,
          position: 0
        },
        {
          select: "数码电器",
          active: false,
          position: 0
        },
        {
          select: "男士护肤",
          active: false,
          position: 0
        },
        {
          select: "精选商品",
          active: false,
          position: 0
        },
        {
          select: "热卖男装",
          active: false,
          position: 0
        }
      ],
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      // goods_id: [
      //   "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298"
      // ],
      goods_id: [
        "4282051,4564253,2618106,2863960,4326046,2715668,4673726,2735234,20201,3793953,2656311,4421206,2865899,2807108,2656013,3183558,4673797,10195,2829246,2871559,2984666,2702469,4567406,2826400,4421185,83357,2684855,2604115,4170171,2779982,4124411,4293785,596258,4393470,3480668,2870450,3379,4193944,4141138,3263332,4723406,98490,3901570,2871615,4582522,2848257,4424013,3648571,2243947,61813,2863991,70916,1819719,2351162,7150,1439696,3122899,2910199,2269657,3721588,779102,17845,4174938,2864129,2863990,905018,19081,3762406,4831282,1710103,2881421,4204351",
        "195823,197820,4072474,1528949,918332,2892409,1345740,181194,888699,3550111,2604859,1145206,1622569,2389541,958320,127288,1761365,2471634,2604859,930416,2397882,982086,3107482,933671,43523,1756987,1258176,19551,2744011,815554,1945991,4552,1778343,1649373,2736780,1783860,4624,3464405,6126,453910,37716,585673,1013179,2671948,390822,3023525,1788739,2537891,3438866,1246572,1242141,4101648,2602093,186468,331524,3306330,1452334,1788739,1559127,1171360",
        "909374,4436315,953722,1932,2575199,849162,465202,4358803,835780,4572934,3866483,909912,3331818,2792486,1059226,4025793,6613,4135372,2574853,3006128,819,3682174,4027496,3247833,1155,2460358,134805,100680,2668584,4382639,4398987,3589929,2574331,4554,3589165,4389450,57045,11794,1925,973959,4505330,4519527,192616,52294,1112896,191326,2656672,2542805,3628667,1432317,2700907,3208539,4365735,2370523,2163478,997215,53834,1832820,43459,1739257,1529461,4460451,2672504,309646,4679808,4196230",
        "2267806,2644924,1604448,2163150,4258406,479803,4695520,1437952,772518,2863991,2655558,2574817,1653838,1301868,12069,3910294,20288,4599829,1767549,42421,4203344,1136516,4254022,3084974,2671955,1060273,1664821,1379290,2602907,1555242,3122899,3077954,2884289,3721588,2534112,2883516,4345493,4602593,2864127,2856786,4597357,3666143,2729780,172339,1637099,4347263,2671354,2500148,4334183,2098389,902702,3858914,1246416,2207433,3247833,2985256,3538356,1138697,3758807,4178753,4048747,890251,4540116,4457142,4866747,4448544",
        "4687772,4254022,4084497,2644924,4221539,4673864,4227188,3434870,1764482,4679991,4602593,1793360,1379290,3077954,4346669,4345493,1183681,3910294,2717643,2667749,630444,2604200,4021942,4041643,2618086,4597357,4687952,128870,2580444,4125657,4084618,2457732,2170236,2490221,2749428,3691959,4599739,8059,4597368,3260455,4673360,3695058,2652228,2322493,4666334,4332587,4138287,4676635,4025836,4595281,2497638,123774,3532789,1071425,4685087,2663837,4324331,3172187,3984493,3172556,3909764,4243081,2674692,4045124,3990574,2715356,2847471,2689990,4548735,2418092,4597304,3464390,3653648,3229884,2497649,4434211"
      ],
      headerimg: [require("../../assets/images/man/man_01.jpg")],
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
          .catch(error => {
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
      //分享
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
  background-color: #d6edfe;
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
  background: #d6edfe;
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
  background: #b4d5fe;
  height: 1.2rem;
  line-height: 0.6rem;
  color: #418df0;
}

nav .active {
  background-color: #418df0;
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
  border-right-color: #b4d5fe;
}

.active .nei {
  border-right-color: #418df0;
}

.goods {
  width: 100%;
  overflow: hidden;
  padding: 0.23rem 0.23rem 0;
  background-color: #d6edfe;
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
  border-right-color: #b4d5fe;
}

span:after {
  clear: both;
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