<template>
  <div id="xbct">
    <div>
      <img :src='headerimg'>
    </div>
	<div class="sollc">
		<div class="sol_top">
			<img v-for="(dpit,$index) in dpitems_top" :src='dpit.src' @click="jumpToShopHome(dpit.dpid,1)"  :key="$index">
		</div>
		<div class="sol_down">
			<img v-for="(dpit,$index) in dpitems_down" :src='dpit.src' @click="jumpToShopHome(dpit.dpid,1)" :key="$index">
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
	      <img :src="goodimglist[shows]">
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
      <img :src="gmore">
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
          select: "爆款扫货",
          active: true,
          position: 0
        },
        {
          select: "约会数码",
          active: false,
          position: 0
        },
        {
          select: "艺术车厢",
          active: false,
          position: 0
        },
        {
          select: "惠聚电器",
          active: false,
          position: 0
        }
      ],
			dpitems_top:[
				{src:require('../../assets/images/digital/dp01.png'),dpid:'27848'},
				{src:require('../../assets/images/digital/dp02.png'),dpid:'105776'},
				{src:require('../../assets/images/digital/dp03.png'),dpid:'80779'}
			],
			dpitems_down:[
				{src:require('../../assets/images/digital/dp04.png'),dpid:'37654'},
				{src:require('../../assets/images/digital/dp05.png'),dpid:'97424'},
				{src:require('../../assets/images/digital/dp06.png'),dpid:'21880'}
			],
			gmoredatas:[
				{ids:'340',names:'手机'},
				{ids:'340',names:'手机'},
				{ids:'340',names:'手机'},
				{ids:'340',names:'手机'}
			],
			gmore:require('../../assets/images/digital/digital_12.jpg'),
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goodimglist:[
				require('../../assets/images/digital/d01.png'),
				require('../../assets/images/digital/d02.png'),
				require('../../assets/images/digital/d03.png'),
				require('../../assets/images/digital/d04.png')
      ],
//       goods_id: [
//         "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//       ],
      goods_id: [
        "5858932,2485754,3550111,3974025,3766074,3494964,5062698,5414210,1145206,5158692,6450927,5954364,3117766,5062730,5045346,6453978,5622240,28322,1051421,37716,898089,5054962,1669640,6172,3487075,3586378,5303229,5605163,1475097,5427618,4865209,5309750,1819300,5393094,3883064,6506318,182282,3978212,4605,1452334,2744011,1301868,958320,1743912,1778343,1437952,5009140,2594629,4226851,3049597,2397882,977603,2537609,3453959,3421216,2442810,6258634,607,5897317,2502639",
        "1219265,1185940,2482582,4377106,3263,2864794,4414455,1188505,1169835,1395578,5422333,4783400,5388196,6237288,1604448,1798338,3107482,1470233,1328308,4195176,1296551,2577781,1258176,2039243,5278026,2408581,1078098,1118206,1185729,3756616,2539142,904983,1653838,2347261,2563463,4140182,2481468,12732,2671955,991233,1664440,3753281,2898958,5213461,5346716,3206483,1630371,1101666,5953559,763543,2299427,65888,4803,4470237,4452738,1568367,3456764,2414949,1136498,1125455",
        "1872655,6380244,5490998,5485717,6094668,3766074,6450927,6453978,6371697,5865129,6127286,5239614,903689,1674700,5063034,5267919,5687753,1303310,41545,3457501,5414374,2693978,5392448,179189,2736870,3380742,974526,2756365,3073156,5062723,6274557,6382065,325551,2736797,4864115,6380256,5250413,13018,3413972,1033167,3145322,1725038,2822086,4682166,2593596,5236993,6380191,3625700,3905173,5386700,2811689,5346818,3662577,1075653,2562921,1772778,4440270,2554230,5658833,4599835",
        "5592282,5775269,4415065,1622569,4072474,43523,4552,2853853,1564680,4987159,4222188,1712779,2562031,1437952,2681633,4304886,3503246,5027849,4845651,3410403,2644297,516744,3168042,1452334,2736768,5592268,2581678,2865378,5218165,5351466,1021478,515633,4641053,982086,1120715,4226851,3421216,2442810,4142615,3176303,3407985,2829874,1060286,1585875,5516249,1178598,10114,3284776,3768832,4904027,1409579,4754363,4039044,4662490,9154,2502639,4617300,5549178,4792534,5483476",
      ],
      headerimg: require("../../assets/images/digital/digital_01.jpg"),
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
    background-color: #f90c28;
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
  background-color: #f90c28;
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
    background-color: #f90c28;
}
.sollc .sol_top{
	width:12rem;
}
.sollc .sol_down{
	width:12rem;
}	
.sollc .sol_top img{
	width:3.83rem;
	height: 4.81rem;
	margin:0.1rem 0 0 0.1rem ;
	float: left;
}
.sollc .sol_down img{
	width:3.83rem;
	height: 4.81rem;
	margin:0.1rem 0 0.1rem 0.1rem ;
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