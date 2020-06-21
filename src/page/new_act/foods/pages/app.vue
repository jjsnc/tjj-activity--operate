<template>
	<div id="xbct">
		<div v-for="(img,$i) in imgs"><img :src='img'  :style="{'margin-bottom':'0.1rem'}"></div>
		<div class="sollc">
			<div class="sol_top">
				<img v-for="(dpit,$index) in dpitems_top" :src='dpit.src' @click="jumpToShopHome(dpit.dpid)"  :key="$index">
			</div>
			<div class="sol_down">
				<img v-for="(dpit,$index) in dpitems_down" :src='dpit.src' @click="jumpToShopHome(dpit.dpid)" :key="$index">
			</div>
		</div>
		<nav :class="navfixed == true ? 'fixed' :''" id="navs">
			<span v-for="(item,$index) in items" @click="selectStyle (item, $index) " :class="{'active':item.active,'unactive':!item.active}" :key="$index">{{item.select}}</span>
		</nav>
		<div :class="zwf == true ? 'zwf_on' :'zwf_off'"></div>
		<div v-for="(goodlist,$i) in goodlists" v-bind:class="['list']+$i" v-bind:id="['list']+$i" :key="$i">
			<div v-for="(goods,$j) in goodlist" class="good2" @click="jump2good(goods.goods_id)" :key="$j">
				<img  v-lazy="goods.img320_url" alt="">
				<p class="name2">{{goods.goods_name}}</p>
				<p class="price2"><span class="prcs">￥{{goods.group_price}}</span><del><i class="del">￥{{goods.shop_price}}</i></del><span class="goto2">{{buttons}}</span></p>
			</div>
			<div class="good2" :style="{ display : $i < 4 || is_wx ? 'none' : '' }" @click="toSecondsDetail()"><img class="mores" :src="more_imgs" alt=""></div>
		</div>
		<div class="moore" :style="{ display : is_wx ? 'none' : '' }" @click="toSecondsDetail()"><img :src="more_down_imgs" alt=""></div>
	<ToTop></ToTop>
	</div>
</template>
<script>
	import tjjApp from "@/assets/js/common/app_xcx.js";
	import send from "@/assets/js/common/sendData.js";
	import ToTop from "@/components/toTop.vue";
	import { GoodList } from "./../assets/js/api.js";
	import {scroller} from 'vue-scrollto/src/scrollTo'
	const firstScrollTo = scroller();
	var that = null;
	export default {
		components: {ToTop},
		name: "xbct",
		async created() {
			that = this;
			this.goods_id.forEach(function(goods_id, index) {　　　　　　　　　　
					that.$http.get(GoodList, {params: {'goods_id': goods_id}})
						.then((res) => {
								let ress = res.data;
								let nums = index > 3 && !that.is_wx ? ( ress.length % 2 ? 0 : 1 ) : ress.length % 2; 					
								that.$set(that.goodlists, index, ress.slice(0,ress.length-nums))
						})
						.catch(function(error) {
							console.log(error);
						});
				});
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
			window.addEventListener('scroll', this.handleScroll);
		},
		data: function() {
			return {
				items: [
						{select:'聚食惠',active:true,position:0},
						{select:'热销榜',active:false,position:0},
						{select: '农副水果',active:false,position:0},
						{select: '休闲零食',active: false,position: 0},
						{select: '茶香四溢',active: false,position:0}　　　　　　　
						],
				navfixed: false,
				zwf: false,
				offsetTops: 0,
				tabwz: [],
				goodlists: [],
				dpitems_top:[
						{src:require('../assets/images/1.jpg'),dpid:'85272'},
						{src:require('../assets/images/2.jpg'),dpid:'103618'},
						{src:require('../assets/images/3.png'),dpid:'77074'},
						{src:require('../assets/images/4.jpg'),dpid:'101111'},
						{src:require('../assets/images/5.jpg'),dpid:'34982'},
						{src:require('../assets/images/6.jpg'),dpid:'93799'},
						],
				dpitems_down:[
						{src:require('../assets/images/7.jpg'),dpid:'89476'},
						{src:require('../assets/images/8.jpg'),dpid:'77430'},
						{src:require('../assets/images/9.jpg'),dpid:'4107'},
						{src:require('../assets/images/10.jpg'),dpid:'106101'},
						{src:require('../assets/images/11.jpg'),dpid:'8916'},
						{src:require('../assets/images/12.jpg'),dpid:'99197'},
						],
				goods_id:[
					"2566616,2566890,2579910,2593470,1768192,2566129,2503581,875793,2685866,1779336,1527527,2594609,2539966,2006054,2685891,2501954,2449766,2833597,2555359,3041601,2608686,2598464,2822103,1670100,2707201,2563193,2693973,2594193,3561900,1802,3367246,913657,2828026,1516449,1491097,2592882,1117418,2593425,2886088,3050375,2839263,1139183,2714057,2685924,50130,1120279,2875101,2522019,2176856,67615",
					"80987,63728,956037,1121414,60669,1106328,1159814,1160467,1139701,89039,2898241,927420,1759952,1208420,16302,424,2883421,2076,940695,2863164,186373,1742738,2828026,2839263,2897141,2447298,2539296,2685924,2539921,1136353,1418140,105258,703051,69933,29077,2459,2486914,1802691,1566434,8137,2250355,2771542,591905,1115119,204327,389,1114571,854156,2771426,2664860",
					"1236922,2526891,2452485,3416112,717638,3213657,1020973,2320458,1475398,1134781,1758445,5617,2490232,2608688,936362,940695,1655335,2577070,1231324,1106401,1124578,2821575,1135658,2579446,1742738,1447589,3071153,1760904,1694749,1030177,2541447,2221039,1715113,1218470,1287530,2690971,19637,3832,1667784,1982890,1042952,1236971,1092947,1121414,948592,1255612,1023270,2170,1657439,544",
					"1628884,2539950,1160467,1372539,110886,2539296,1765303,1764648,2469079,2553349,2936383,2522025,1159814,1759952,2897141,2447298,580431,16742,2680329,1994184,3562562,2685874,2936392,143139,8163,1743231,1208420,204327,1114571,1572977,2737471,1654164,1172606,2858978,3042943,1765615,441938,2449673,1281017,1566434,2771426,2639764,1735067,2539910,2362180,1846161,80987,1106328,927420,1766406",
					"2508829,955765,986050,1623257,2603657,2523482,475419,1073853,2619508,1750068,1772534,2816839,1123592,1029522,1110777,2574347,33401,1903694,11842,1355465,1490094,928414,1849923,1021168,1506991,2871640,2621400,1453958,1598877,1709298,1155477,924236,1755721,912573,2601606,1534597,2884236,2579397,11972,2207809,78172,1565320,3005967,2579416,1995478,2415485,9284,9291,22815,520399"
						],
//		         goods_id:[
//		           "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
//		           "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
//		           "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
//		           "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
//		           "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
//		         ],
				imgs:[
					require('../assets/images/sztjj_01.jpg'),
					require('../assets/images/sztjj_02.jpg'),
					require('../assets/images/sztjj_03.jpg')
				],
				more_imgs:require('../assets/images/sztjj_05.png'),
				more_down_imgs:require('../assets/images/sztjj_06.jpg'),
				is_wx:false,
				buttons:'立即购买>'
			};
		},
		methods: {
			selectStyle(item, index) {
				this.Tabfz();
				this.jumpToTab(index)　　　　
			},
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(!this.navfixed) {
					this.offsetTops = document.querySelector('#navs').offsetTop;
				}
				let offsetTop = this.offsetTops;
				scrollTop > offsetTop ? this.navfixed = this.zwf = true : this.navfixed = this.zwf = false;
				for (var i = 0; i < this.items.length; i++) {
					if(this.items[i].position){
				        if (scrollTop >= this.items[i].position-20) {
	      					this.items.forEach(function(item, index) {　　　　　　　　　　
								Vue.set(item, 'active', false);　　　　　　　　
							});
							Vue.set(this.items[i], 'active', true);　
				        }						
					}
				}
			},
			Tabfz() {　　　　　
				this.items.forEach(function(item, index) {
					if(document.querySelector('.list' + index).offsetTop){
						Vue.set(item, 'position', document.querySelector('.list' + index).offsetTop);
					}
				});
			},
			iswx(){
				this.is_wx = true
			},
			jumpToTab(index) {
				firstScrollTo('#list'+index);
			},
			jumpToShopHome(id){
      			tjjApp.web.startShopHome(id);
			},
			toSecondsDetail(){
				tjjApp.web.toCATE({ id : 361, name: "食品" });
			},
			jump2good(id){
				tjjApp.web.jump2good(id);
			}
		}
	};
</script>

<style scoped>
	#xbct {
		background: #fa783c;
	}
	img {
	  width: 100%;
	  display: block;
	}
	nav {
		width: 100%;
		font-size: 0.49rem;
		letter-spacing: 0px;
		padding: 0.1rem;
		height: 1rem;
		margin: 0 0 0.4rem 0;
		background: #fa783c;
	}
	.fixed {
		position: fixed;
		background-color: #f56328;
		top: 0;
		z-index: 999;
	}
	.zwf_off {
		width: 100%;
		height: 1.4rem;
		display: none;
	}
	.zwf_on {
		width: 100%;
		height: 1.4rem;
		display: block;
	}
	nav span:last-child {
		margin-right: 0px;
	}
	nav span {
		width: 19.6%;
		float: left;
		text-align: center;
		background: #f74e0b;
		margin-right: 1px;
		height: 0.78rem;
		line-height: 0.78rem;
		color: #fff;
	}
	nav .active {
		background-color: #c8430b;
	}
	.good2 img {
		width: 7.654690116266666rem;
		height: 7.654690116266666rem;
		margin-top: 0.01rem;
		margin: 0 auto;
		display: block;
	}
	
	.good2 img:last-child {
		width: 7.65rem;
		height: 9.35rem;
		margin-top: 0.01rem;
		margin: 0 auto;
		display: block;
	}
	
	.good2 .name2 {
		margin: 0.25rem 0 0;
		font-size: 0.4rem;
	    line-height: 0.5486rem;
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
	.good2 {
		margin-left: 0.24rem;
		position: relative;
		width: 7.654690116266666rem;
		height: 9.35rem;
		float: left;
		background: #fff;
		margin-bottom: 0.192rem;
	}
	.good2::after {
		content: "";
		display: block;
		clear: both;
	}
	.name2::after {
		content: "";
		display: block;
		clear: both;
	}
	.list0::after,.list1::after,.list2::after,.list3::after,.list4::after {
		content: "";
		display: block;
		clear: both;
	}
	.list0,.list1,.list2,.list3,.list4 {
		width: auto;
		height: auto;
		background-color: #fa783c;
	}
	.price2 {
		padding: 0 0.2rem 0.4rem 0.2rem;
	}
	.price2 i {
		color: #978c8c;
		font-size: 0.33rem;
	}
	.goto2 {
		width: 2rem;
		height: 0.47rem;
		border-radius: 4px;
		line-height: 0.5486rem;
		font-family: MicrosoftYaHei;
		font-size: 0.346729rem;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
		text-align: center;
		float: right;
		margin-top: 0.3rem;
		background-color: #f34f08;
	}
	.goto2 {
		content: "";
		display: block;
		clear: both;
	}
	.prcs {
		color: #f34f08;
		font-size: 0.48rem;
		font-weight: bold;
		letter-spacing: -0.01rem;
	}
	.mores {
		width: 7.65rem;
		height: 9.35rem;
	}
	.sollc {
		overflow: auto;
	    border-radius: 10px;
	    background-color: #f56328;
	}
	.sollc .sol_top{
		width:32rem;
	}
	.sollc .sol_down{
		width:32rem;
	}	
	.sollc .sol_top img{
		width:5.1rem;
		height: 5.1rem;
		margin:0.1rem 0 0 0.1rem ;
	    border-radius: 5px;
		float: left;
	}
	.sollc .sol_down img{
		width:5.1rem;
		height: 5.1rem;
		margin:0.1rem 0 0.1rem 0.1rem ;
	    border-radius: 5px;
		float: left;
	}	
	.sollc::after,.sol_top::after,.sol_down::after{
		content: "";
		display: block;
		clear: both;
	}
</style>