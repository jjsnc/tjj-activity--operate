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
        @click="selectStyle (item, $index)"
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
	          <span class="good-price-new"><span class="mony">￥</span>{{goods.group_price}}</span>
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
          select: "热销爆款",
          active: true,
          position: 0
        },
        {
          select: "留住青春",
          active: false,
          position: 0
        },
        {
          select: "留住美貌",
          active: false,
          position: 0
        },
        {
          select: "留住心动",
          active: false,
          position: 0
        }
      ],
			dpitems_top:[
				{src:require('../../assets/images/beauty/dp01.png'),dpid:'103899'},
				{src:require('../../assets/images/beauty/dp02.png'),dpid:'104423'},
				{src:require('../../assets/images/beauty/dp03.png'),dpid:'104045'}
			],
			dpitems_down:[
				{src:require('../../assets/images/beauty/dp04.png'),dpid:'94279'},
				{src:require('../../assets/images/beauty/dp05.png'),dpid:'15196'},
				{src:require('../../assets/images/beauty/dp06.png'),dpid:'106415'}
			],
			gmoredatas:[
				{ids:'332',names:'美妆'},
				{ids:'332',names:'美妆'},
				{ids:'332',names:'美妆'},
				{ids:'332',names:'美妆'},
			],
			gmore:require('../../assets/images/beauty/beauty_12.jpg'),
      navfixed: false,
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],
      goodimglist:[
				require('../../assets/images/beauty/m01.png'),
				require('../../assets/images/beauty/m02.png'),
				require('../../assets/images/beauty/m03.png'),
				require('../../assets/images/beauty/m04.png')
      ],
//       goods_id: [
//         "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//         "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
//       ],
      goods_id: [
        "4868193,5903924,5553963,4406682,6050793,3977630,5108885,4616753,4947298,5617720,1549831,1139100,1105224,3917630,4377362,1717141,2598095,1318282,5126522,1516354,5605093,1483915,2396024,3006114,2585009,2579971,4351579,1084188,2653911,5920626,4021160,1628924,1022879,4651770,1785606,1889456,1477571,3025015,2653872,3177727,1767372,1630668,4560021,4449226,6002063,4317735,2760935,1014682,4373058,1424615,1421423,1435207,1856365,2210928,3295213,3560959,3082413,1847385,2207503,1826106",
        "3611691,1769948,3927881,4331169,5863606,2177525,4584991,3909162,6049345,2499380,6092912,4679920,3810738,1643526,475458,5605093,4541264,1104084,4030062,706818,2811155,3686040,1285785,3059401,5718039,48694,3010702,3432148,917124,902304,1820281,1806793,4163865,2736539,3856253,2576996,4648087,917157,3982169,2405926,3988784,3432137,2537647,960810,4800538,4497830,3049515,3908582,1072341,1893441,930882,4198546,3863396,3638940,4265756,1771493,2382553,3616549,5693419,3077913",
        "2772157,2811985,1891396,3996192,3638435,4955070,40849,4086783,2964599,4549623,55095,3725535,3616543,2574331,49011,1393707,5934432,2707838,2602526,4272914,3977667,3148016,3155018,2222199,3553563,3021957,7233,2487790,2803321,5553226,930239,902304,4703192,3910363,21692,19694,3141087,3982169,3520283,829103,2731012,5936890,2729913,190117,1075802,4577527,917134,3456657,5677115,3893873,46903,289370,3841372,204859,3977510,67704,3594489,3520712,3017271,2801563",
        "2537549,4800538,5066245,1770099,39970,2876230,2726329,2352,1000,4876420,6309478,938534,902709,5553189,4678116,5618569,17232,1786845,4367745,3103390,1658937,1783728,1511508,8275,2501492,3432137,5028249,2537645,1766414,3571000,3864,3812027,6049383,1027653,4564210,107779,4584920,1525858,26106,2214050,4585038,1472144,184611,4648087,3616543,2487708,45962,4291010,5051904,1753968,1766649,3884906,3601315,903205,61121,2811155,4584999,5473031,11680,1723147",
      ],
      headerimg: require("../../assets/images/beauty/beauty_01.jpg"),
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
    background-color: #f90c5a;
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
  background-color: #f90c5a;
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
    background-color: #f90c5a;
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