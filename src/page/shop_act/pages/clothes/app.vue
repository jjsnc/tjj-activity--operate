<template>
  <div id="xbct">
    <div>
      <img v-lazy='headerimg'>
    </div>
	<div class="sollc">
		<div class="sol_top">
			<img v-for="(dpit,$index) in dpitems_top" v-lazy='dpit.src' @click="jumpToShopHome(dpit.dpid,1)"  :key="$index">
		</div>
		<div class="sol_down">
			<img v-for="(dpit,$index) in dpitems_down" v-lazy='dpit.src' @click="jumpToShopHome(dpit.dpid,1)" :key="$index">
		</div>
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
    <div class="tits">
	      <img v-lazy="goodimglist[shows]">
	    </div>
    <div class="goods">
	      <div
	        class="good"
	        v-for="(goods,$i) in goodlists[shows]"
	        :key="$i"
	         @click="jump2good(goods.goods_id,goods.goods_name)"
	      >
	        <div class="goods-top">
	        	<img class="spike-goods-icon" src="../../assets/images/icon/icon_618.png" alt>
	          <img v-lazy="goods.img320_url" class="good-img" alt>
	          <h3 class="good-title">{{goods.goods_name}}</h3>
	        </div>
	        <div class="good-price">
	          <span class="good-price-new"><span class="mony">￥</span> {{goods.group_price}}</span>
	          <span class="good-price-old">
	            <font>￥</font>
	            {{goods.shop_price}}
	          </span>
	          <img src="../../assets/images/icon/btn_go.png" class="good-price-go" />
	        </div>
      </div>
    </div>
		<div v-if="not_wx" @click="toSecondsDetail(gmoredatas[shows])">
      <img v-lazy="gmore">
    </div>    
    <ToTop></ToTop>
    <div class="bottom-nav"></div>
		<bottomNav></bottomNav>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import url from "./../../assets/js/api";
var that = null;
export default {
   created() {
    that = this;
    this.getgoodlist(0);
    this.initPv();
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
          select: "精选好货",
          active: true,
          position: 0
        },
        {
          select: "时髦女装",
          active: false,
          position: 0
        },
        {
          select: "型格男装",
          active: false,
          position: 0
        },
        {
          select: "内衣家居服",
          active: false,
          position: 0
        }
      ],
			dpitems_top:[
				{src:require('../../assets/images/clothes/dp01.png'),dpid:'55229'},
				{src:require('../../assets/images/clothes/dp02.png'),dpid:'77201'},
				{src:require('../../assets/images/clothes/dp03.png'),dpid:'26800'},
				{src:require('../../assets/images/clothes/dp04.png'),dpid:'8847'},
				{src:require('../../assets/images/clothes/dp05.png'),dpid:'5003'},
				{src:require('../../assets/images/clothes/dp06.png'),dpid:'10592'},
			],
			dpitems_down:[
				{src:require('../../assets/images/clothes/dp07.png'),dpid:'99704'},
				{src:require('../../assets/images/clothes/dp08.png'),dpid:'23673'},
				{src:require('../../assets/images/clothes/dp09.png'),dpid:'87856'},
				{src:require('../../assets/images/clothes/dp10.png'),dpid:'98613'},
				{src:require('../../assets/images/clothes/dp11.png'),dpid:'97892'},
				{src:require('../../assets/images/clothes/dp12.png'),dpid:'98341'},
			],
			gmoredatas:[
				{ids:'315',names:'服饰'},
				{ids:'315',names:'服饰'},
				{ids:'315',names:'服饰'},
				{ids:'315',names:'服饰'}
			],
			gmore:require('../../assets/images/clothes/clothes_12.jpg'),
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goodimglist:[
				require('../../assets/images/clothes/c01.png'),
				require('../../assets/images/clothes/c02.png'),
				require('../../assets/images/clothes/c03.png'),
				require('../../assets/images/clothes/c04.png')
      ],
//       goods_id: [
//         "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//       ],
      goods_id: [
        "5986412,5992930,5861415,6455796,4599829,5077944,6313987,6109805,5485197,5383942,4254022,6314924,3948864,5516943,2973378,6278243,6310954,6036490,6042075,5216648,4941351,6455736,5381786,4768281,4227188,4977843,2837961,326270,5648651,2602907,5796674,2509187,4957679,5376612,5045402,3662956,2862838,5017883,5658806,6102540,4663795,4230404,5099589,5227406,4613661,4871008,3990574,5987168,4619565,5481345,5971062,2856232,6044734,6264960,930291,5491204,5169168,5410762,5866093,1767314,5879206,5994276,5930138,4087947,5548383,4332587,3984493,2714653,4013866,5934785,2605203,5991403,5091998,5547906,6096202,1947708,6104655,6035731,5669227,5157563,4862899,4533199,4602573,6114443,5875651,5677886,5614177,5098789,2901814,6044321,6044336,5887323,5934670,5540498,6044154,6103042,5749911,5727363",
        "5166458,3222329,5846939,5861335,4677650,5605352,3670602,5658072,6109792,5677858,2595354,5986336,4950912,4438251,4217687,5233347,780264,5391470,5410748,4938289,4439941,5157440,4065783,6282098,4434079,5516956,5391514,2192040,5170865,5605313,5868773,4938304,4230748,5101779,5559849,5230766,5971068,5988754,4344490,4864173,2533919,6040439,5657982,4291696,4300575,3290985,5553676,5967772,5658035,5045432,5930791,5157482,5877471,5938837,5412149,6116686,5927986,5880916,5657951,6044207,5552518,5399028,6103192,5562072,6042104,5970198,5539504,6040464,5864778,5658055,6035692,6104296,5865069,6103881,5873773,6099688,5995287,6102473,5971069,5967761,5984074",
        "6104826,2644924,5585606,4931711,3434870,4679991,2532428,18262,3020582,5991631,3260455,2245404,2580444,1071425,1806033,2915741,4602593,3229884,1818002,3482309,86530,2717643,2604200,3465098,1802093,6093499,3003164,1764482,4346669,1797773,2616839,6101172,201989,2603062,4914181,4088202,4021942,3959807,1107552,5605358,4676635,5987315,6102909,2524218,4243081,2497638,1832685,5970666,4666334,5544750,6103249,6103050,4125670,2629615,4688733,6111759,5107742,5873552,5722665,3757348,6064240,4591266,4931925,5934323,6102934,5660957,5193178,5938675,5970634,2555225,6049607",
        "2498098,1333560,2851951,11092,6104252,6278943,6269128,4000564,2845784,2570006,5648658,4354865,5994276,5218114,20610,5967768,31716,11924,3117729,2450666,5658022,3537117,1255106,628,6035704,5397379,4433844,384203,5938615,308777,905501,5140110,6108356,5590519,6111824,681871,1741917,5040842,4679128,4060084,5110938,5216644,1261520,4986171,5986849,5896930,5669167,5098681,5676322,4991065,3990416,6093824,6093525,6035798,5605512,5360392,5864219,4191857,5211411,6042634,6108160,5998187,5938550,6111828,5917914,6049928,1646319",
      ],
      headerimg: require("../../assets/images/clothes/clothes_01.jpg"),
      is_wx: false,
      buttons: "立即抢",
      shows: 0,
	  	not_wx:true
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
    jumpToShopHome(id,shopTag) {
    	tjjApp.web.startShopHome({
        shopId: id,
        shopTag: shopTag
     });
    },
		jump2good(id,name){
				tjjApp.web.jump2good({
			        goodsId: id,
			        goodsName: name,
			        activityName: '618大促活动'
			     });
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
    initPv() {
	      tjjApp.web.initPv();
    },
    iswx(){
    	this.not_wx = false;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.isdown);
  }
};
</script>
<style scoped>
#xbct {
    background-color: #f9350d;
}

img {
  width: 100%;
  display: block;
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
nav {
  width: 100%;
  font-size: 0.44rem;
  letter-spacing: 0px;
  height: 0.79rem;
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
  height: 0.79rem;
  display: none;
}

.zwf_on {
  width: 100%;
  height: 0.79rem;
  display: block;
}

nav span:last-child {
  margin-right: 0px;
}

nav span {
  width: 25%;
  float: left;
  text-align: center;
  background: #a92204;
  height: 0.79rem;
  line-height: 0.6rem;
  color: #f7eaff;
}

nav .active {
  background-color: #ffc706;
  color: #f7360b;
}

.nei {
  height: 0.6rem;
  margin-top: 0.12rem;
}

.nonei {
  height: 0.6rem;
  margin-top: 0.12rem;
  border-right-color: #b4d5fe;
}

.active .nei {
  border-right-color: #418df0;
}

.goods {
  width: 100%;
  overflow: hidden;
  padding: 0.23rem 0.23rem 0;
  background-color: #f9350d;
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


.good-title {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  bottom: 0;
  left: 0;
  background: #ffffff;
  font-family: FZLTXHK--GBK1-0;
  font-size: 0.44rem;
  font-weight: normal;
  font-stretch: normal;
  color: #000000;
  padding: 0 0.34rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.good-price {
  width: 100%;
  padding: 0.2rem 0.2rem 0;
  height: 0.99rem;
}

.good-price-new {
  display: inline-block;
  float: left;
  font-family: SourceHanSansCN-Bold;
  font-size: 0.66rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #d1072d;
  margin-top: 0.1rem;
  margin-right: 0.2rem;
}

.good-price-old {
  display: inline-block;
  float: left;
  font-family: MicrosoftYaHei;
  font-size: 0.41rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #a18f96;
  opacity: 0.6;
  text-decoration: line-through;
  margin-top: 0.34rem;
}
.good-price-go {
	position: absolute;
	height:  7.79rem;;
	z-index: 2;
	top: 0;
}
.spike-goods-icon{
  position: absolute;
  width: 1.03rem;
  height: 0.9rem;
  left: 0.1rem;
  top: 0;
}
.mony{
	letter-spacing: -0.2rem;
	font-size: 0.42rem;
	margin-bottom: 0.1rem;
}
.shares {
  position: absolute;
  right: 0.15rem;
  top: 0.18rem;
  width: 1.83rem;
  height: 0.54rem;
}
.sollc {
	overflow: auto;
    border-radius: 10px;
    background-color: #f9350d;
}
.sollc .sol_top{
	width:23rem;
}
.sollc .sol_down{
	width:23rem;
}	
.sollc .sol_top img{
	width:3.83rem;
	height: 4.81rem;
	margin:0;
	float: left;
}
.sollc .sol_down img{
	width:3.83rem;
	height: 4.81rem;
	margin:0;
	float: left;
}	
.sollc::after,.sol_top::after,.sol_down::after{
	content: "";
	display: block;
	clear: both;
}
.tits{
	height: 1.5rem;
}
.tits img{
	width: 6rem;
	margin: 0 auto;
}
</style>