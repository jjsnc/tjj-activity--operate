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
    this.getgoodlist(0);
    this.initPv();
  },
  data: function() {
    return {
      items: [
        {
          select: "热销榜单",
          active: true,
          position: 0
        },
        {
          select: "时尚女鞋",
          active: false,
          position: 0
        },
        {
          select: "潮流男鞋",
          active: false,
          position: 0
        },
        {
          select: "网红包配",
          active: false,
          position: 0
        }
      ],
			dpitems_top:[
				{src:require('../../assets/images/shoe/dp01.png'),dpid:'71656'},
				{src:require('../../assets/images/shoe/dp02.png'),dpid:'78901'},
				{src:require('../../assets/images/shoe/dp03.png'),dpid:'109001'},
				{src:require('../../assets/images/shoe/dp04.png'),dpid:'102376'},
				{src:require('../../assets/images/shoe/dp05.png'),dpid:'87850'},
				{src:require('../../assets/images/shoe/dp06.png'),dpid:'71654'},
			],
			dpitems_down:[
				{src:require('../../assets/images/shoe/dp07.png'),dpid:'5942'},
				{src:require('../../assets/images/shoe/dp08.png'),dpid:'104072'},
				{src:require('../../assets/images/shoe/dp09.png'),dpid:'15222'},
				{src:require('../../assets/images/shoe/dp10.png'),dpid:'100617'},
				{src:require('../../assets/images/shoe/dp11.png'),dpid:'50438'},
				{src:require('../../assets/images/shoe/dp12.png'),dpid:'14226'},
			],
			gmoredatas:[
				{ids:'328',names:'鞋包'},
				{ids:'328',names:'鞋包'},
				{ids:'328',names:'鞋包'},
				{ids:'328',names:'鞋包'}
			],
			gmore:require('../../assets/images/shoe/shoe_12.jpg'),
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goodimglist:[
				require('../../assets/images/shoe/s01.png'),
				require('../../assets/images/shoe/s02.png'),
				require('../../assets/images/shoe/s03.png'),
				require('../../assets/images/shoe/s04.png')
      ],
//       goods_id: [
//         "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//       ],
      goods_id: [
        "6564545,20201,2537409,2843152,4094935,1414116,2243947,4072490,3962733,4570080,596258,5571683,5408292,1609766,4094881,2656311,2811519,3196387,3463719,2881448,4692829,20288,5809831,5839499,1061990,3480668,1756681,5592170,5861439,2735234,2192931,1645309,2827018,1377542,2892301,6278019,2985256,10195,5353736,2883887,5249847,3122899,2579925,5662735,119593,2827014,15236,4600314,5562737,5687972,6094651,2871559,6297601,5416887,5983980,906826,3901570,2603734,6278445,5385414,5896199,5620341,6278022,4438068,4048762,5384416,5207043,5571617,2618106,3115,5683979,29,6260836,5944562,5951670,4931875,1269459,2826400,609,2371867,2522932,2512922,4316966,4977,4815933,3943564,3166998,4308028,1219273,2603648",
        "6005209,2512905,6378616,5451178,5569541,5196158,5304345,5108094,5842275,5915776,6372790,5944306,5946054,5480023,5049179,5901469,1335262,1158413,4035358,6111548,6061014,31262,4011075,3906850,2826473,6111562,4584679,2892301,4894360,4132996,6346106,4687523,4549798,3778902,5571672,3030521,5411951,3649594,3649548,4925894,4084084,6346099,5571590,4244595,5421017,3405713,3438304,5740,3649011,5652019,3955942,6057585,6061184,3961431,4295483,6061217,4673817,6111482,3464947,3906918,3546682,3377488,3464950,3926095,2807194,3546128,4282998,183,2324758,5654514,5072246,4364427,4452694,4458552,1646434,5944356,2864124,4751122,5695589,3010685,3864042,4160565,4549923,2318857,3580519,3428498,2535268,2535213,3315786,2807515,3033941,4593250,4651729,4567549,6278428,5617724",
        "2753363,5296308,2517542,4162022,4457142,60587,2701946,6042744,6278609,2413772,4564253,6346084,5480063,1239904,4678513,3078022,2864139,5769972,906826,5384709,5501632,6111574,6054367,2001,3793953,779102,2601589,931261,4981989,4489631,83357,1269459,5561630,4641016,5076044,3263332,11527,3870300,1710103,5107964,5669546,4193944,5864452,2870450,5723502,2654261,6278445,4326046,4882821,3923161,2539587,3423538,6232620,5817129,6371068,3153163,6278451,2724458,6336310,2702380,4810344,4116129,5571745,2807230,5562737,2807080,5951670,3702300,1219273,3382520,2460294,1113583,1099093,906851,5576946,5088645,4861256,4289835",
        "1538276,2537409,4316,2724450,827863,2574329,4077252,4099,2528120,3702288,1608028,759735,4025172,5544201,49442,5620322,2583343,2811869,975989,4701723,5620362,2678543,151681,2735203,4457258,908679,3055580,986178,4561488,15648,1068344,6479425,5177195,15810,1759866,2583021,2600131,3344668,4406770,6253129,983738,4049961,6479456,3590048,21410,5163087,5571728,5879503,986546,15701,6040396,2442686,5224961,6027,5644206,6042600,4945,928797,4238911,1320392,927860,6253237,5000049,1094024,31242,5501627,6040437,19474,3948918,60684,5617670,5489517,5764879,5481556,5571786,2622449,598648,2535218,5058986,5250495,5480967,3195897,5854231,5464093,5854359,5571563,1369939,5250494,5617706,1335683,5250496,5481581,6253210,4124421,5000013,1655735,2702473,6245248,5480980,6479465",
      ],
      headerimg: require("../../assets/images/shoe/shoe_01.jpg"),
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
    background-color: #fa580d ;
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
img {
  width: 100%;
  display: block;
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
  background-color: #fa580d ;
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
    background-color: #fa580d ;
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