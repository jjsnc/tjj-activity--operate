<template>
  <div id="xbct">
    <div>
      <img v-lazy='headerimg' />
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
	          <span class="good-price-old">￥{{goods.shop_price}}</span>
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
          select: "家庭百宝箱",
          active: true,
          position: 0
        },
        {
          select: "提前放“价”",
          active: false,
          position: 0
        },
        {
          select: "清凉来“席”",
          active: false,
          position: 0
        },
        {
          select: "泳动一夏",
          active: false,
          position: 0
        }
      ],
			dpitems_top:[
				{src:require('../../assets/images/baibao/dp01.png'),dpid:'84892'},
				{src:require('../../assets/images/baibao/dp02.png'),dpid:'105436'},
				{src:require('../../assets/images/baibao/dp03.png'),dpid:'13444'},
				{src:require('../../assets/images/baibao/dp04.png'),dpid:'32457'},
				{src:require('../../assets/images/baibao/dp05.png'),dpid:'14217'},
				{src:require('../../assets/images/baibao/dp06.png'),dpid:'5021'},
			],
			dpitems_down:[
				{src:require('../../assets/images/baibao/dp07.png'),dpid:'30796'},
				{src:require('../../assets/images/baibao/dp08.png'),dpid:'15254'},
				{src:require('../../assets/images/baibao/dp09.png'),dpid:'9570'},
				{src:require('../../assets/images/baibao/dp10.png'),dpid:'95474'},
				{src:require('../../assets/images/baibao/dp11.png'),dpid:'92826'},
				{src:require('../../assets/images/baibao/dp12.png'),dpid:'103763'},
			],
			gmoredatas:[
				{ids:'406',names:'百货'},
				{ids:'406',names:'百货'},
				{ids:'406',names:'百货'},
				{ids:'406',names:'百货'}
			],
			gmore:require('../../assets/images/baibao/baibao_12.jpg'),
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goodimglist:[
				require('../../assets/images/baibao/b01.png'),
				require('../../assets/images/baibao/b02.png'),
				require('../../assets/images/baibao/b03.png'),
				require('../../assets/images/baibao/b04.png')
      ],
//       goods_id: [
//         "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//       ],
      goods_id: [
        "5996818,6035745,5974334,6262203,5752556,4091928,6284686,6234637,5163114,5593562,5701591,5649174,5902160,6005868,5944505,6097159,5879443,6164606,6223448,6040264,6073802,6035869,6307307,6169553,6019965,6412128,5988747,6464589,5583267,5915746,6224064,6296181,6322534,6296219,6284724,6134342,5668144,5323897,5510954,5984198,6213222,6284628,6315317,6412147,6004932,4929468,6075887,5233588,5224782,2575175,4948360,4957461,5343896,5434015,4196307,5541626,5575528,3375141,6228475,5894909",
        "2585110,3225,29377,2536592,1381767,3158920,16229,4114448,1506909,2363506,1838068,2484045,915001,25643,3155097,2965714,4326312,426905,4968731,2882850,910609,1469897,1312488,4638711,5191374,2743290,1834820,3194644,3520656,6061848,3928806,5531560,4534604,1074085,6040232,2505515,3910795,2591971,2576271,1666482,1192559,2851057,4230039,2591955,1369795,2538548,3202194,3861732,1437077,3616525,1491224,2531857,2494963,4065346,1869405,2589101,1866131,1661049,5209024,1601899",
        "5148151,4691395,4099811,5276928,2542492,129674,1112674,2620774,1758251,3605901,3263808,5015117,394059,98226,1125050,2807910,2884412,114228,4548750,4516706,2140771,2108780,2827577,5012874,3542672,2633951,2494964,1601613,4919468,37746,5904703,4363745,906485,1282243,2542831,4964102,2466997,4474580,4691415,3354123,1624537,1408921,1514589,1739053,2588812,4099701,3443612,6362269,2530993,2494952,1513911,2827577,1136906,5156499,2713683,4979014,262316,1482776,3156818,2692976",
        "6103802,6425121,6103815,6350314,2577732,3430886,2785847,6121389,2787755,6103750,6453675,20649,5205899,4152148,4227014,6297803,4263737,4078012,6103729,4051155,4237092,3937301,2594654,5861695,1442635,1557151,6378936,889912,2787796,5828653,5646813,59794,2809488,4207361,4515498,3085723,21018,3633235,3194983,2774833,6103787,4205845,10559,3193208,4080869,5632069,5861696,3562847,4382111,8502,17282,4146362,928143,3535969,4458016,5929057,5853484,5716514,5892304,6032225",
      ],
      headerimg: require("../../assets/images/baibao/baibao_01.jpg"),
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
  border-right-color: #a92204;
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
  border-radius: 0.18rem;
}
.good-price-go {
	position: absolute;
	height:  7.79rem;;
	z-index: 2;
	top: 0;
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
  height: 1.2rem;
}

.good-price-new {
  display: inline-block;
  float: left;
    font-family: MicrosoftYaHei;
  font-size: 0.77rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #ff3333;
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
  letter-spacing: -0.05rem;
  color: #a18f96;
  opacity: 0.6;
  text-decoration: line-through;
  margin-top: 0.44rem;
}

.spike-goods-icon{
  position: absolute;
  width: 1.03rem;
  height: 0.9rem;
  left: 0.1rem;
  top: 0;
}
	.bottom-nav {
	width: 100%;
	height: 1.64rem;
	}
.mony{
	letter-spacing: -0.3rem;
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
	margin:0.1rem 0 0 0 ;
	float: left;
}
.sollc .sol_down img{
	width:3.83rem;
	height: 4.81rem;
	margin:0.1rem 0 0 0 ;
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