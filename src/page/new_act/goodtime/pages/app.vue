<template>
	<div id="xbct">
		<div><img :src='headerimg' /></div>
		<div><img :src='topad[0]' /></div>
			<div class="goods">
				<div class="good" v-for="(onegood,$k) in onegoodlist" :key="'poi'+$k" @click="jump2onegood(onegood.goods_id,onegood.num)" >
					<img class="g-img" v-lazy="onegood.img320_url" alt="">
					<img class="yjs" :src='onegood.num == 0 ?bstatus[1] : bstatus[0]'  />
			        <p class="name">{{onegood.goods_name}}</p>
			        <p class="price"><span>￥<i>{{onegood.group_price}}</i></span><del>￥<i>{{onegood.shop_price}}</i></del><span class="goto">{{buttons}}</span></p>
			   </div>
			 </div>
		<div><img :src='topad[1]' /></div>
			<div class="goods">
				<div class="good" v-for="(goods,$i) in goodlists[0]" @click="jump2good(goods.goods_id)" :key="'E-'+$i">
					<img class="g-img" v-lazy="goods.img320_url" alt="">
					<img class="yjs" :src='astatus[0]'  />
			        <p class="name">{{goods.goods_name}}</p>
			        <p class="price"><span>￥<i>{{goods.group_price}}</i></span><del>￥<i>{{goods.shop_price}}</i></del><span class="goto">{{buttons}}</span></p>
			   </div>
			 </div>
		<div><img :src='topad[2]' /></div>					
		<div class="sollc">
			<div class="sol_top">
				<img v-for="(dpit,$index) in shoptop" :src='dpit.src' @click="jumpToShopHome(dpit.dpid)" :key="'A-'+$index">
			</div>
			<div class="sol_down">
				<img v-for="(dpit,$index) in shopdown" :src='dpit.src' @click="jumpToShopHome(dpit.dpid)" :key="'B-'+$index">
			</div>
		</div>
		<div><img :src='topad[3]' /></div>
		<div class="sollc">

		</div>
		<div class="goods">
			<div class="good" v-for="(goods,$i) in goodlists[1]" @click="jump2good(goods.goods_id)" :key="'D-'+$i">
				<img class="g-img" v-lazy="goods.img320_url" alt="">
		        <p class="name">{{goods.goods_name}}</p>
		        <p class="price"><span>￥<i>{{goods.group_price}}</i></span><del>￥<i>{{goods.shop_price | numFilter}}</i></del><span class="goto">{{buttons}}</span></p>
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
			this.getgoodlist(1);
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
		},
		data: function() {
			return {
				offsetTops: 0,
				tabwz: [],
				goodlists: [],
				goods_id:[
					"4928884,4523269,4964110,4953813,4725629,4953823",
					"3227523,3422319,3951431,3084647,3085299,2733499,713147,331274,1745022,3347722,1002228,98226,2028538,41194,2800317,1715617,1720766,958698,23282,1858252,1670254,906485,1758208,1519936,937316,1533744,8739,399976,1402848,2532032"
				],
//				goods_id:[
//					"118,121,122,123,128,130",
//					"23,29,30,37,38,39,42,43,44,45,46,47,63,67,71,84,91,93,94,96,97,101,103,109,112,113,114"
//					],
				headerimg:[require('../assets/images/hsg_01.jpg')],
				topad:[
					require('../assets/images/hsg_02.jpg'),
					require('../assets/images/hsg_03.jpg'),
					require('../assets/images/hsg_04.jpg'),
					require('../assets/images/hsg_05.jpg')
				],
				shoptop:[
					{src:require('../assets/images/1.png'),dpid:'27835'},
					{src:require('../assets/images/2.png'),dpid:'15254'},
					{src:require('../assets/images/3.png'),dpid:'102009'}
				],
				shopdown:[
					{src:require('../assets/images/4.png'),dpid:'11687'},
					{src:require('../assets/images/5.png'),dpid:'10939'},
					{src:require('../assets/images/6.png'),dpid:'10472'}
				],
				is_wx:false,
				buttons:'立即购买',
				shows:0,
				astatus:[
					require('../assets/images/myzy.png'),
					require('../assets/images/ysw.png')
				],
				bstatus:[
					require('../assets/images/onez.png'),
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
//				        "num": "0"
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
					{ids:'329',names:'家纺'}
				]
			};
		},
		filters: {
		  numFilter(value) {
		    let realVal = parseFloat(value).toFixed(1)
		    return realVal
		  }
		},
		watch: {
		    goodlists() {
		        this.$forceUpdate();
		    },
		    onegoodlist(){
		    	this.$forceUpdate();
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
				that.$http.get(url.homegoodtime)
					.then((res) => {
						let ress = JSON.parse(res.data).data;
						console.log(ress);
						that.onegoodlist = ress;
					})
					.catch(function(error) {
						console.log(error);
					});			
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
			}
		}
	};
</script>
<style>
	/*html {
		background-color: #2fb8b0;
		
	}	*/
</style>
<style scoped>
	#xbct {
		background-color: #2fb8b0;
		height: auto;
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
		background-color: #2fb8b0;
	    padding: 0.1rem .2rem;
	    min-height: 3rem;
	    overflow: hidden;
	    clear: both;
	    justify-content: space-between;
	    display: flex;
	    flex-wrap: wrap;		
	}

	.good {
	    width: 5.75rem;
	    height: 6.22rem;
	    float: left;
	    background: #fff;
	    margin-bottom: 0.1rem;
        position: relative;
	}
    .good .name {
        margin: 0.17rem 0 0.17rem;
        font-size: 0.41rem;
	    font-family: FZLTXHK--GBK1-0;
	    font-weight: normal;
	    font-stretch: normal;
	    color: #000000;
	    padding: 0 0.341rem;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
    }
    .good .g-img {
        width: 5.75rem;
        height: 4.79rem;
        margin-top: 0.01rem;
        margin: 0 auto;
        display: block;
    }
	.price {
		letter-spacing: -0.1px;
	    padding: 0 0.241rem;
	    color: #109991;
	    font-size: 0.35rem;
    }
	.price span i {
	    font-size: 0.49rem;
	    font-weight: bold;
	    letter-spacing: -0.01rem;
	     font-style:normal;
	     font-family: "Microsoft YaHei" ! important; 
	}
	.price del {
	    font-size: 0.3rem;
	    letter-spacing: -0.1rem;
	    font-style:normal;
	    margin-left: 0.17066rem;
	    color: rgba(0,0,0,0.4);
	    letter-spacing: -0.04rem;
	}
	.price del i {
	    font-size: 0.3rem;
	    letter-spacing: -0.04rem;
	    font-style:normal;
	    text-decoration: line-through;
	}
	.goto {
	    width: 1.87rem;
	    height: 0.47rem;
	    background-color:#109991;
	    display: inline-block;
	    float: right;
	    font-family: FZLTZHUNHK--GBK1-0;
	    font-size: 0.36rem;
	    font-weight: normal;
	    line-height: 0.5rem;
	    font-stretch: normal;
	    letter-spacing: 0px;
	    color: #ffffff;
	    text-align: center;
	}
    nav span:nth-last-child(1)::after{
        display: none;
    }
    nav .active:after{
    	display: none;
    }
	.sollc {
		overflow: auto;
	     background-color: #109991;
	}
	.sollc .sol_top{
		width:12rem;
	}
	.sollc .sol_down{
		width:12rem;
	}	
	.sollc .sol_top img{
		width:3.73rem;
		height: 3.73rem;
		margin:0.1rem 0 0 0.18rem ;
	    border-radius: 5px;
		float: left;
	}
	.sollc .sol_down img{
		width:3.73rem;
		height: 3.73rem;
		margin:0.18rem 0 0.18rem 0.18rem ;
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
        height: 6.22rem;
        z-index: 111;
        top: 0;
    }
    .gmore{
    }
</style>