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
          select: "热销榜单",
          active: true,
          position: 0
        },
        {
          select: "健康好货",
          active: false,
          position: 0
        },
        {
          select: "休闲零食",
          active: false,
          position: 0
        },
        {
          select: "夏日果园",
          active: false,
          position: 0
        }
      ],
			dpitems_top:[
				{src:require('../../assets/images/food/dp01.png'),dpid:'81912'},
				{src:require('../../assets/images/food/dp02.png'),dpid:'93799'},
				{src:require('../../assets/images/food/dp03.png'),dpid:'104041'}
			],
			dpitems_down:[
				{src:require('../../assets/images/food/dp04.png'),dpid:'84179'},
				{src:require('../../assets/images/food/dp05.png'),dpid:'109366'},
				{src:require('../../assets/images/food/dp06.png'),dpid:'87787'}
			],
			gmoredatas:[
				{ids:'361',names:'食品'},
				{ids:'361',names:'食品'},
				{ids:'361',names:'食品'},
				{ids:'361',names:'食品'}
			],
			gmore:require('../../assets/images/food/food_12.jpg'),
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goodimglist:[
				require('../../assets/images/food/f01.png'),
				require('../../assets/images/food/f02.png'),
				require('../../assets/images/food/f03.png'),
				require('../../assets/images/food/f04.png')
      ],
//       goods_id: [
//         "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//       ],
      goods_id: [
        "4663381,1274860,1752579,186373,6313456,1898917,1715684,2771542,67345,2833597,31453,143139,16302,5606,6378945,1115119,929796,15295,6378979,3405760,4558676,2537808,2384143,3091890,112591,4986205,2601163,2076,1122032,4013004,2685924,58449,3182696,1299924,932065,2253531,60669,5416008",
        "6378866,6284964,6379151,6416991,6284985,1694749,4292265,5132248,6397157,5279291,6354194,4859271,6422167,4986217,3048824,14611,2291867,6392368,6362305,6421427,6392321,4765632,6317626,5997530,6328649,4026364,775548,2713076,2452485,1660117,3176954,1517095,1236971,4549607,6362306,4936709,2041964,6376435,1766727,1218076,6362445,1625942,1755722,2596131",
        "1535767,6397206,6397232,5960840,6284987,2339204,630,1367160,5860132,4162186,6397093,6284953,6041909,5352764,477247,5483014,5336924,63728,4879168,3532705,6284941,4760063,422,4720155,435,4032399,423,3679237,428,2898241,1644993,2865355,5491770,1491743,1743231,2602356,5831666,4648729,2936383,2598464,2579910,2535067,2537810,2602355,2608686,2449876",
        "6359580,4529382,6281661,6173687,2601114,6246487,6312833,1224667,4281368,1656709,6313775,5745673,6269359,5768749,5994116,4472755,6359449,6359459,6344972,4265851,5300146,4693929,2942950",
      ],
      headerimg: require("../../assets/images/food/food_01.jpg"),
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