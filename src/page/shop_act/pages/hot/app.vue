<template>
	<div>
			<div v-for="(img,$i) in head_img" :key="'A-'+$i"><img v-lazy='img'  @click.prevent="" /></div>
			<div class="gooods-all-list">
				<div class="goods-item"
			        v-for="(goods,$g) in goodtoplists"
			        :key="$g"
			        @click="jump2good(goods.goods_id,goods.goods_name)"
					>
					<div class="pic-box">
						<img v-lazy="goods.img320_url" alt="">
					</div>
					<div class="goods-info">
						<p class="desc ellipsis">
							{{goods.goods_name}}
						</p>
						<span class="xian"></span>
						<span class="icon-price"></span>
						<span class="pric"><span class="rm">￥</span>{{goods.group_price}}<del>￥{{goods.shop_price}}</del></span>
						<span class="getInto">立即抢</span>
						<span class="no_top"><font>{{$g+1}}</font></span>
					</div>
				</div>

		  </div>
		  <div v-for="(img,$i) in page_img" :key="'B-'+$i"><img v-lazy='img'  @click.prevent="" /></div>
	      <div :class="zwf == true ? 'zwf_on' :'zwf_off'"></div>
	      <div :class="navfixed == true ? 'fixed' :''" id="navs">
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
		          	<i :class="{'icon-user': index == navIndex}"></i>
		            <span class="tab-name">{{ el.name }}</span>
		          </a>
		        </div>
	      	</div>
	      	<div class="next"  @click="tabMove"></div>
	      </div>	
    <div style="background-color: #d0353b">
    	<div style="clear: both"></div>
  	  <div class="lists lists0" style="display: block" >
	      	<div class="list" v-for="(goods,$g) in goodlists[navIndex]" :key="$g" @click="jump2good(goods.goods_id,goods.goods_name)">        
	      		<img class="spike-goods-icon" src="../../assets/images/icon/icon_618.png" alt>
	      		<img class="spike-goods-img" v-lazy="goods.img320_url" alt="">
	        <p class="name">{{goods.goods_name}}</p>
	        <p class="price"><span>￥<i>{{goods.group_price}}</i></span><del>￥<i>{{goods.shop_price}}</i></del><span class="goto">立即抢</span></p>
			</div>
      </div>
  </div>
        
      <div v-if="not_wx" v-for="(img,$i) in more_img" :key="'C-'+$i" @click="toSecondsDetail(navs[navIndex])"><img v-lazy='img'  @click.prevent="" /></div>
    	<ToTop></ToTop>
    	<div class="bottom-nav"></div>
		<bottomNav></bottomNav>
    	<msgBox :msgTxt="msgTxt"></msgBox>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import url from "./../../assets/js/api";
var that = null;
export default {
	name: "xbct",
	 created() {
		that = this;
	},
	mounted() {
			this.initPv();
			this.getGoodTopList(that.goods_top_pro);
			this.getgoodlist(0,that.goods_list_pro);
			window.addEventListener("scroll", this.isdown);
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
	},
	data: function() {
		return {
				msgTxt: null,
				head_img:[
					require('../../assets/images/hot/hot_01.jpg'),
					require('../../assets/images/hot/hot_02.jpg'),
					require('../../assets/images/hot/hot_03.jpg'),
				],
				page_img:[		
					require('../../assets/images/hot/hot_05.jpg')
				],
				more_img:[
					require('../../assets/images/hot/hot_07.jpg')
				],
				goods_top_pro:"2607701,2644924,1538276,1932,5752556,2863991,5393762,3763675,2608686",
				goods_top_dev:"123,154,118,121,122,123,128",
				goods_list_pro:[
					"726744,1437077,1464771,1519936,564,1139,2506,10860,17766,19252,31847,40082,59930,64869,79338,4186750,973366,1026886,1232737,1288706,1601899,1661049,1714613,1761368,1811599,1834820,1838068,1883713,1980620,2186364,2466464,2484045,2494963,2535014,2538548,2563478,2674371,2722510,2743290,2808283,3020965,3030251,3358691,3542672,3712246,3905984,3975931,4035090,4091928,4098775,4103502,4104569,4125551,4187719,4230039,4375985,4651173,4656835,4690890,4691415,4831436,4882351,4968204,5163114,5233605,5235502,5409269,5553261,5969050,6014960,6040232,6412157",
					"6109805,5986412,5925645,5925454,6455736,5873673,5669055,5658062,5614553,6310954,5540328,5537934,5517596,6314924,5393762,5040902,4995453,4334199,6313987,4217670,4199695,4138287,4084497,6455796,3913732,3392403,2566533,2499512,6103100,5991223,5971073,5657991,5618560,5467147,5416397,5385178,5230236,4567421,4016189,2542380,6083667,6048675,5383970,5190591,4125657,4084618,4603650,4995895,18529,5938631,5614571,5040826,4673864,2618086,32226,29747,6104271,5991029,3077954,2725738,2674692,934278,6044328,5970669,5668619,4991957,5873683,4437491,4304649,3585541,2528077,2182403,6112896,6103655,6094515,5490821,5043789,5970642,5948493,5668011,5659264,5614629,4158769,3980033,3362933,5058911,4496787,4377365,4350387,6042075,5927943,5622331,5606224,5592138,5590536,2858009,2655558,2574817,5138096,5380262,167984,46609,8707",
					"20201,2985256,4094881,20288,119593,1492,10195,1153,3115,53555,60587,61813,4977,596258,906826,1061990,1414116,1609766,1645309,2192931,2243947,2351162,2371867,1756681,2537409,2579925,2779982,2735234,2811519,2603734,2827014,2827018,2843152,2864139,2618106,2881448,3962733,5408292,5861439,5385414,5232130,2984666,3901570,5384614,4011075,2882834,3480668,5592170,5809831,4048762,4094935,4600314,4692829,2257092,5353736,5384416,3379,5416887,4170171,15236,5544201,1219273,2522932,2603648,4293643,5107964",
					"1139100,3006114,4983707,3010702,5677115,2571398,3117788,4566873,4429509,2570209,1676828,3117785,2826162,1435212,3364088,1284720,1664553,1484482,2487698,2029779,5077849,1051308,1660837,4659705,3021956,5501628,2598678,5675530,3414561,5888942,3918754,4559335,1249578,2729886,5830488,5399341,2507751,6308140,4184593,1675081,2653864,3103390,5013406,4564132,1042686,1155537,6049174,2468019,4335305,2729905,5990076,2537455,1735691,2614766,2519357,2375188,4556391,4798098,1798165,6049345",
					"6378945,5483014,6397232,6041909,6246487,4765632,6354194,4648729,4760063,5768749,4558676,6312833,4032399,5300146,4663381,3679237,4529382,6313775,3405760,3182696,3091890,2936383,2898241,2771542,2685924,2608686,2601114,2598464,6344545,6061854,2579910,4013004,2596131,2537810,2601163,2537808,2449876,2253531,2833597,2041964,1766727,1743231,1752579,1715684,1694749,1491743,1367160,1299924,1274860,1115119,929796,775548,477247,186373,143139,112591,67345,31453",
					"6044295,6258634,6248899,6493326,10172,27179,28322,65888,195823,220941,991233,977603,1080072,1106444,1149036,1395578,1219265,1325523,1630371,2005222,2347261,2585034,2743749,3206483,2736712,2736865,2784845,3487075,3117766,3348485,3586378,3766074,3421216,3848695,3951382,3825732,4195176,4212741,4226851,5132110,5156507,5374153,5431996,5393094,5485812,5622240,5879105,5900221"
				],
				goods_list_dev:[
					"154,118,121,122,123,128",
					"118,121,122,123,128",
					"121,154,118,121,122,123,128",
					"123,154,118,121,122,123,128",
					"128,154,118,121,122,123,128",
					"122,154,118,121,122,123,128"
				],
		        navs: [
		        	   {name: "百  货",toMoreId: 406,toMoreName: "百货",active:true},
				       {name: "服  饰",toMoreId: 315,toMoreName: "服饰",active:false},
				       {name: "鞋  包",toMoreId: 328,toMoreName: "鞋包",active:false},
				       {name: "美  妆",toMoreId: 332,toMoreName: "美妆",active:false},
				       {name: "食  品",toMoreId: 361,toMoreName: "食品",active:false},
				       {name: "手  机",toMoreId: 340,toMoreName: "手机",active:false}
				],
			  	navIndex: 0,
			  	navWidth: 0,
			  	goodtoplists:[],
			  	goodlists:[],
			  	shows:0,
			  	not_wx:true,
		  	    navfixed: false,
			    zwf: false,
			    offsetTops: 0,
			};
		},
		methods: {
		    tabclick(index) {
		      that.navIndex = index;
		      that.toMoreId = that.navs[index].toMoreId;
		      that.toMoreName = that.navs[index].toMoreName;
		      if(this.goodlists[index] == null){
		      	this.getgoodlist(index,that.goods_list_pro);
		      }
		    },
		    tabMove() {
		      that.navWidth = document.getElementsByClassName("tab")[0].clientWidth;
	          document.getElementsByClassName("nav")[0].scrollLeft = that.navWidth;
		    },
		    getGoodTopList(params) {
		        that.$http
		          .get(url.GoodList, {
		            params: {
		              goods_id: params
		            }
		          })
		          .then(res => {
		            let ress = res.data;
		            console.log(ress);
		            that.goodtoplists = ress;
		          })
		          .catch(error => {
		            console.log(error);
		          });
		    },
		    getgoodlist(index,params) {
		        that.$http
		          .get(url.GoodList, {
		            params: {
		              goods_id: params[index]
		            }
		          })
		          .then(res => {
		            let ress = res.data;
		             console.log(ress);
		            let nums = ress.length < 3 ? 0 : ress.length % 3;
		            that.$set(that.goodlists, index, ress.slice(0, ress.length - nums));
		          })
		          .catch(error => {
		            that.$set(that.goodlists, index, null);
		            console.log(error);
		          });
		    },
	        selectStyle(item, index) {
		      this.getgoodlist(index);
		      this.navs.forEach(function(item, index) {
		        Vue.set(item, "active", false);
		      });
		      Vue.set(this.navs[index], "active", true);
		      this.navIndex = index;
		      console.log(this.goodlists[index] == null)
		      if(this.goodlists[index] == null){
		      	this.getgoodlist(index,that.goods_list_pro);
		      }
		    },
		    jump2good(id,name){
				tjjApp.web.jump2good({
			        goodsId: id,
			        goodsName: name,
			        activityName: '618大促活动'
			     });
			},
			toShop(id, shopTag) {
		      tjjApp.web.startShopHome({
		        shopId: id,
		        shopTag: shopTag
		      });
		    },
		    initPv() {
		      tjjApp.web.initPv();
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
	        toSecondsDetail(gmoredata) {
		      tjjApp.web.toCATE({
		        id: gmoredata.toMoreId,
		        name: gmoredata.toMoreName
		      });
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
	background: #080205;
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
#nav {
  width: 100%;
  height: 1rem;
}
.nav {
  width: calc(100% - 1.07rem);
  height: 1rem;
  float: left;
  overflow-x: auto;
  overflow-y: hidden;
}
.nav-box {
  width: calc(100% / 5 * 6);
  height: 1rem;
}
.tab {
  display: block;
  float: left;
  height: 1rem;
  width: calc(100% / 6);
  background: #f9f9f9;
  position: relative;
}
.tab-name {
  display: block;
  text-align: center;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  height: 1rem;
  line-height: 1rem;
  color: #000;
}
.tab-active span{
  color: #f10e3c;
}
.icon-user{
	position: absolute;left: 0;z-index:5;
	background-image: url("../../assets/images/hot/active.png");
	background-size: 100% 100%;
	background-repeat: no-repeat; 
	background-position: 0 0; 
	margin-top: 0.2rem;
	margin-left: 0.1rem;
	width: 0.3rem; 
	height: 0.5rem;
}
.next {
  width: 1.07rem;
  height: 1rem;
  float: left;
	background-image: url("../../assets/images/hot/tab_bd.jpg");
	background-size: 100% 100%;
	background-repeat: no-repeat; 
	background-position: 0 0; 
}

.gooods-all-list{
    background: #d0353b;
    padding-bottom: 0.5rem;
}

.goods-item{
    width:11.37rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    margin: 0 auto 0.3rem auto;
    height:4.39rem;
	box-shadow: 0.14rem 0.21rem 0.05rem 0rem 
	rgba(179, 16, 19, 0.65);
}
.pic-box{
    width:4.34rem;
    height: 3.99rem;
    overflow: hidden;
    text-align: center;
    line-height: 100%;
    position: relative;
}

.pic-box img{
    width:4.34rem;
    height: 3.99rem;
    overflow: hidden;
    text-align: center;
    line-height: 100%;
    position: relative;
    margin: 0.134rem;
}
.goods-info{
    flex: 1;
    height: 4.39rem;
    padding: 0.2773rem;
    overflow: hidden;
    position: relative;
}

.goods-info .desc{
    color:#000;
    width: 80%;
    font-size: 0.51rem;
    overflow: hidden;
 	font-family: FZLTHJW--GB1-0;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.xian{
	width: 8.4rem;
	height: 0.01rem;
    padding-left: 6.8rem;
    overflow: hidden;
    position: relative;
	border-bottom: 0.02rem dashed #d3d3d3;
}
.getInto{
    width: 2.8rem;
    height: 0.73rem;
    line-height: 0.73rem;
    text-align: center;
    color: #fff;
    font-size:0.45rem; 
    position: absolute;
    bottom: 0.32rem;
    right: 0.32rem;
    	background-image: linear-gradient(
		#f10e3c, 
		#f10e3c), 
	linear-gradient(90deg, 
		#f00e34 0%, 
		#f80e58 55%, 
		#ff0d7c 100%);
	background-blend-mode: normal, 
		normal;
    border-radius: 0.36rem;
}
.no_top{
    width: 0.58rem;
    height: 1.08rem;
    color: #fff;
    position: absolute;
    top: 0rem;
    right: 0.22rem;
		background-image: url("../../assets/images/hot/notop.png");
		background-size: 100% 100%;
		background-repeat: no-repeat; 
		background-position: 0 0; 
}
font{
	    position: absolute;
	    left: 0.2rem;
	    top: 0.4rem;
	    font-family: SourceHanSansCN-Bold;
	font-size: 0.32rem;
	margin: 0 auto;
}

.icon-price{
    width: 1.27rem;
    height: 0.6rem;
    color: #fff;
    position: absolute;
    top: 2.68rem;
    right: 3.87rem;
		background-image: url("../../assets/images/hot/juj.png");
		background-size: 100% 100%;
		background-repeat: no-repeat; 
		background-position: 0 0; 
}
.pric{
    width: 3.7rem;
    height: 0.73rem;
    line-height: 0.73rem;
    text-align: center;
    color: #f20e3e;
		font-family: SourceHanSansCN-Bold;
    font-size:0.72rem; 
    position: absolute;
    bottom: 0.32rem;
    right: 3.52rem;
}
.rm{
		font-size:0.36rem; 
}
del{
		margin-left: 0.36rem;
    color: #aaaaaa;
		font-family: FZLTHJW--GB1-0;
    font-size:0.38rem; 
}
.list .spike-goods-img{
    display: block;
    width: 3.7rem;
    height: 3.78rem;
}
.lists{
    width: 11.44rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    min-height: 3rem;
    overflow: hidden;
    clear: both;
    justify-content: space-between;
    display: none;
    flex-wrap: wrap;
}
.lists .list{
    width:3.7rem;
    margin-left: 0.1rem;
    float: left;
        position: relative;
    background: #fff;
    height: 5.16rem;
    margin-bottom: 0.1rem;
}
.lists .list::after{
    overflow: hidden;
    clear: both;
}
.list .price {
		margin-top: 0.12rem;
		margin-left: 0.1rem;
		margin-right: 0.1rem;
    color: #ff2645;
    font-size: 0.3rem ;
    letter-spacing: -1px;
}
.list  .price span i {
    font-size: 0.52rem;
    font-weight: bold;
    
    font-style:normal
}
.list .name{
    font-size: 0.37rem;
    text-align: center;
    margin: 0.12rem 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.list  .goto{
    width: 1.18rem;
    margin-top:0.1rem ;
    height: 0.4rem;
    border-radius: 4px;
    font-size: 0.29rem ;
    line-height: 0.4rem;
}
.goto {
    display: inline-block;
    float: right;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    background:#ff2645
}
.lists .list0:nth-last-child(0){
    margin-left: 0.21rem;
}
del i{
    font-style:normal
}
.next:after {
    clear: both;
}
	.spike-goods-icon{
  position: absolute;
  width: 1.03rem;
  height: 0.9rem;
  left: 0.1rem;
  top: 0;
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 999;
      width: 12rem;
}

.zwf_off {
  width: 100%;
  height: 1rem;
  display: none;
}

.zwf_on {
  width: 100%;
  height: 1rem;
  display: block;
}
</style>