<template>
	<div id="xbct">
		<div><img :src='headerimg' /></div>
		<div><img :src='topad[0]' /></div>
			<div class="goods">
				<div class="good" v-for="(onegood,$k) in onegoodlist" :key="'poi'+$k" @click="jump2onegood(onegood.goods_id,onegood.num)" >
					<img class="g-img" v-lazy="onegood.img320_url" alt="">
					<img class="yjs" :src='onegood.num == 0 ?gstatus[1] : gstatus[0]'  />
			        <p class="name">{{onegood.goods_name}}</p>
			        <p class="price"><span>￥<i>{{onegood.group_price}}</i></span><del>￥<i>{{onegood.shop_price}}</i></del><span class="goto">立即抢</span></p>
			   </div>
			 </div>   
		<div><img :src='topad[1]' /></div>
		<div class="sollc">
			<div class="sol_top">
				<img v-for="(dpit,$index) in shoptop" :src='dpit.src' @click="jumpToShopHome(dpit.dpid)" :key="'A-'+$index">
			</div>
			<div class="sol_down">
				<img v-for="(dpit,$index) in shopdown" :src='dpit.src' @click="jumpToShopHome(dpit.dpid)" :key="'B-'+$index">
			</div>
		</div>		
		
		<div :class="zwf == true ? 'zwf_on' :'zwf_off'"></div>
		<nav :class="navfixed == true ? 'fixed' :''" id="navs">
			<span v-for="(item,$index) in items" @click="selectStyle (item, $index) " :key="'C-'+$index" :class="{'active':item.active,'unactive':!item.active}">{{item.select}}</span>
		</nav>
		<div class="goods">
			<div class="good" v-for="(goods,$i) in goodlists[shows]" @click="jump2good(goods.goods_id)" :key="'D-'+$i">
				<img class="g-img" v-lazy="goods.img320_url" alt="">
		        <p class="name">{{goods.goods_name}}</p>
		        <p class="price"><span>￥<i>{{goods.group_price}}</i></span><del>￥<i>{{goods.shop_price | numFilter}}</i></del><span class="goto">立即抢</span></p>
		   </div>
		 </div> 
		 <div class="gmore" @click="toSecondsDetail(gmoredatas[shows])" :style="{ display : is_wx ? 'none' : '' }"><img :src="gmore" /></div>
	<ToTop></ToTop>
	</div>
</template>
<script>
	import tjjApp from "@/assets/js/common/app_xcx.js";
	import send from "@/assets/js/common/sendData.js";
	import ToTop from "@/components/toTop.vue";
	import url from "./../assets/js/api.js";
	import {scroller} from 'vue-scrollto/src/scrollTo';
	const firstScrollTo = scroller();
	var that = null;
	export default {
		components: {ToTop},
		name: "xbct",
		async created() {
			that = this;
			this.getgoodlist(0);
			this.getsecondKillGoods();
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
		        source:"首页"
		      };
		      send.sendPoint(params);
		    };
		    var windowUrl = window.location.href;
		    if (windowUrl.indexOf("uuid=wechat") > -1) {
		      this.iswx();
		      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
		      window.isLogin(user_id, 0, "wechat");
		    } else {
		      tjjApp.web.checkLogin();
		    }
		    window.addEventListener('scroll', this.isdown);
		},
		data: function() {
			return {
				items: [
						{select:'百货齐发',active:true,position:0},
						{select:'宠爱萌娃',active:false,position:0},
						{select:'春眠丝梦',active:false,position:0}
						],
				navfixed: false,
				zwf: false,
				offsetTops: 0,
				tabwz: [],
				goodlists: [],
				goods_id:[
					"2847227,4075611,4071720,4242,3117478,8939,1464771,244988,81734,4019658,11718,2692771,4060,3789648,726744,2154,3294184,2566544,91431,926668,3372476,1340444,3988184,1768436,1137709,4021663,3918025,3492173,3475638,2538117,23024,3373022,2979129,2862797,37205,2811963,1026886,368615,1484233,2596549,32510,926727,37386,4786,2225100,4206,1691662,721236,1848040,1585438,1863817,1645512,2340222,1436842,2606752,8613,118725,1717720,1398208,966931,1732128,1752678,20549,36583,1404612,2140104,2583848,187406,2539184,2577033,1922483,1832959,2566734,2168871,2607788,1751831,1759782,2210148,2140765",
					"2859589,3901710,4045134,2325854,1512648,2965714,2882843,2859555,1026285,3671030,2032680,2882850,2563506,2535146,5993,925286,2282770,2884150,3690430,914844,1250956,2851057,2538548,29377,1827829,1856090,2808185,2602926,2245705,189148,1873594,412122,1198956,172674,5233,36212,2563475,1917490,3861732,2585568,3616589,1551693,1493982,4093085,1510806,2308178,2459498,119621,20114,2564195,820275,299757,2542818,2576271,1075689,2564195,2504012,2884157,2574855,1164714,910609,1026641,152967,3616525,35412,29046,70316,447862,1037802,2585557,9512,1232736,3202194,36803,2500445,5867,2140541,2535005,2589101",
					"2494952,3905984,2588796,2111472,15616,114228,1755311,1408921,2236201,2675779,1179588,2247848,2578796,19401,1137518,3893886,394059,2542831,1136906,1028572,1098021,2545987,1624537,2883782,1086701,2349492,1334901,3341877,1832402,1904858,2633951,1117325,2975672,1029907,2492071,1305302,3337414,1340413,2384874,1913275,1519936,2532032,8739,2566585,3114,22740,1665351,2274445,113740,79338,5975,1072398,98226,1670254,37746,3085299,844529,405073,1512448,2597853,41194,1350068,54926,53063,1031133,1858252,2733499,1111167,1318573,924555,2577726,1340997,2735308,713147,1091610,2285310,2140771,2282973,1035461"
				],
//				goods_id:[
//					"1215147,1215959,1215809,1215811,1214979,1214975",
//					"1215959,1215147,1215809,1215811,1214979,1214975",
//					"1215809,1215147,1215959,1215811,1214979,1214975"
//					],
				headerimg:[require('../assets/images/jjxr_01.jpg')],
				topad:[
					require('../assets/images/jjxr_02.png'),
					require('../assets/images/jjxr_03.png')
				],
				shoptop:[
					{src:require('../assets/images/1.jpg'),dpid:'92204'},
					{src:require('../assets/images/2.jpg'),dpid:'74656'},
					{src:require('../assets/images/3.jpg'),dpid:'9570'}
				],
				shopdown:[
					{src:require('../assets/images/4.jpg'),dpid:'9105'},
					{src:require('../assets/images/5.jpg'),dpid:'15254'},
					{src:require('../assets/images/6.jpg'),dpid:'11687'}
				],
				ysw:[require('../assets/images/ysw.png')],
				is_wx:false,
				hot_top:[
					'6440523','5648583','6394665'
				],
				buttons:'立即抢',
				shows:0,
				gstatus:[
					require('../assets/images/one.png'),
					require('../assets/images/ysw.png')
				],
				onegoodlist:[
//						{
//				        "goods_id": "1214847",
//				        "img320_url": "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
//				        "goods_name": "雪翼雕冲云霄",
//				        "group_price": 66.00,
//				        "shop_price": "99.00",
//				        "num": "599"
//				      },
//				      {
//				        "goods_id": "1214847",
//				        "img320_url": "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
//				        "goods_name": "雪翼雕冲云霄",
//				        "group_price": 66.00,
//				        "shop_price": "99.00",
//				        "num": "599"
//				      },
//				      {
//				        "goods_id": "1214847",
//				        "img320_url": "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
//				        "goods_name": "雪翼雕冲云霄",
//				        "group_price": 66.00,
//				        "shop_price": "99.00",
//				        "num": "599"
//				      },
//				      {
//				        "goods_id": "1214847",
//				        "img320_url": "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
//				        "goods_name": "雪翼雕冲云霄",
//				        "group_price": 66.00,
//				        "shop_price": "99.00",
//				        "num": "599"
//				      }
				],
				gmore:[
					require('../assets/images/more.png'),
				],
				gmoredatas:[
					{ids:'406',names:'百货'},
					{ids:'317',names:'母婴'},
					{ids:'329',names:'家纺'}
				]
			};
		},
		filters: {

		  numFilter(value) {
		
		  // 截取当前数据到小数点后两位
		
		    let realVal = parseFloat(value).toFixed(1)
		
		    return realVal
		
		  }
		
		},
		methods: {
			getgoodlist(index){
				if(!that.goodlists[index]){
					that.$http.get(url.GoodList, {params: {'goods_id': that.goods_id[index]}})
						.then((res) => {
								let ress = res.data;
								let nums = ress.length%2;
								that.$set(that.goodlists, index, ress.slice(0,ress.length-nums))
						})
						.catch(function(error) {
							console.log(error);
						});					
				}
			},
			getsecondKillGoods(){　　　
				that.$http.get(url.SecondKill)
					.then((res) => {
						let ress = res.data.data;
						
						
						console.log(ress);
						that.onegoodlist = ress;
					})
					.catch(function(error) {
						console.log(error);
					});			
			},
			selectStyle(item, index) {
				this.getgoodlist(index);
　	      		this.items.forEach(function(item, index) {　　　　　　　　　　
					Vue.set(item, 'active', false);　　　　　　　　
				});
				Vue.set(this.items[index], 'active', true);
				this.shows=index;　　　　
			},
			iswx(){
				this.is_wx = true
			},
			jumpToShopHome(id){
      			tjjApp.web.startShopHome(id);
			},
			jump2good(id){
				tjjApp.web.jump2good(id);
			},
			jump2onegood(id,num){
				if(num > 0){
					tjjApp.web.jump2good(id);
				}
			},
			toSecondsDetail(gmoredata){
				tjjApp.web.toCATE({ id : gmoredata.ids, name: gmoredata.names });
			},
			numFn(rem){
				return rem*23.4375;
			},
			isdown(){
			    //到顶长
			    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
			    //当时长
			    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
			    //总高
			    var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
	            if(scrollTop+windowHeight==scrollHeight){
	        		
	          	}   
			}
		}
	};
</script>
<style>
	html {
		background-image:url('../assets/images/bg.jpg');
		height: auto;
	}	
</style>
<style scoped>
	#xbct {
		background-image:url('../assets/images/bg.jpg')
	}
	img {
	  width: 100%;
	  display: block;
	}
	nav {
		width: 100%;
		font-size: 0.725rem;
		letter-spacing: 0px;
		height: 1.5rem;
		background: #7a95ff;
	}
	.fixed {
		position: fixed;
		background-color: #bec5a5;
		top: 0;
		z-index: 999;
	}
	.zwf_off {
		width: 100%;
		height: 1.5rem;
		display: none;
	}
	.zwf_on {
		width: 100%;
		height: 1.5rem;
		display: block;
	}
	nav span:last-child {
		margin-right: 0px;
	}
	nav span {
		width: 33.3%;
		float: left;
		text-align: center;
		background: #7a95ff;
		height: 1.5rem;
		border-right:1px solid #7aa5ff;
		line-height: 1.5rem;
		color: #e1f7ff;
	}
	nav .active {
		background-color: #ffe04c;
		color:#5975e2;
	}
	.goods{
		width: 100%;
	    padding: 0.3rem .3rem;
	    min-height: 3rem;
	    overflow: hidden;
	    clear: both;
	    justify-content: space-between;
	    display: flex;
	    flex-wrap: wrap;		
	}

	.good {
	    width: 7.552rem;
	    height: 9.49rem;
	    float: left;
	    background: #fff;
	    margin-bottom: 0.3rem;
        position: relative;
	}
    .good .name {
        margin: 0.34133rem 0 0.59rem;
        font-size: 0.789rem;
	    font-family: FZLTXHK--GBK1-0;
	    font-weight: normal;
	    font-stretch: normal;
	    letter-spacing: -1px;
	    color: #000000;
	    padding: 0 0.341rem;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
    }
    .good .g-img {
        width: 7.552rem;
        height: 6.357rem;
        margin-top: 0.01rem;
        margin: 0 auto;
        display: block;
    }
	.price {
		letter-spacing: -0.1rem;
	    padding: 0 0.241rem;
	    color: #d1072d;
	    font-size: 0.61rem;
    }
	.price span i {
	    font-size: 0.74rem;
	    font-weight: bold;
	    letter-spacing: -0.01rem;
	     font-style:normal;
	     font-family: "Microsoft YaHei" ! important; 
	}
	.price del {
	    font-size: 0.32rem;
	    letter-spacing: -0.1rem;
	    font-style:normal;
	    margin-left: 0.17066rem;
	    color: rgba(0,0,0,0.4);
	    letter-spacing: -0.04rem;
	}
	.price del i {
	    font-size: 0.512rem;
	    letter-spacing: -0.1rem;
	    letter-spacing: -0.04rem;
	    font-style:normal;
	    text-decoration: line-through;
	}
	.goto {
	    width: 2.752rem;
	    height: 1rem;
	    background-color:#d1072d;
	    display: inline-block;
	    float: right;
	    font-family: FZLTZHUNHK--GBK1-0;
	    font-size: 0.554666rem;
	    font-weight: normal;
	    font-stretch: normal;
	    letter-spacing: 0px;
	    color: #ffffff;
	    text-align: center;
	    line-height: 1rem;
	}
    nav span:nth-last-child(1)::after{
        display: none;
    }
    nav .active:after{
    	display: none;
    }
	.sollc {
		overflow: auto;
	    border-radius: 10px;
	}
	.sollc .sol_top{
		width:16rem;
	}
	.sollc .sol_down{
		width:16rem;
	}	
	.sollc .sol_top img{
		width:5.035rem;
		height: 6.315rem;
		margin:0.1rem 0 0 0.23rem ;
	    border-radius: 5px;
		float: left;
	}
	.sollc .sol_down img{
		width:5.035rem;
		height: 6.315rem;
		margin:0.23rem 0 1.1rem 0.23rem ;
	    border-radius: 5px;
		float: left;
	}	
	.sollc::after,.sol_top::after,.sol_down::after{
		content: "";
		display: block;
		clear: both;
	}
	.yjs{
        position: absolute;
        height: 9.49rem;
        z-index: 111;
        top: 0;
    }
    .gmore{
    	margin: .2rem auto;
    	width: 3.264rem;
    	height: 0.853rem;
    }
</style>