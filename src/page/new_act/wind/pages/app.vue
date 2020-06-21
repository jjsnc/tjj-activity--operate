<template>
	<div id="xbct">
		<div><img :src='headerimg' /></div>
		<div :class="zwf == true ? 'zwf_on' :'zwf_off'"></div>
		<nav :class="navfixed == true ? 'fixed' :''" id="navs">
			<span v-for="(item,$index) in items" @click="selectStyle (item, $index) " :key="'A-'+$index" :class="{'active':item.active,'unactive':!item.active}">{{item.select}}</span>
		</nav>
		<div><img :src='hotbd'  class="list0" id='list0' /></div>
		<div v-for="(img,$i) in imgs" :key="'B-'+$i"><img :src='img' @click="jump2good(hot_top[$i])"/></div>
		<div v-for="(goodlist,$j) in goodlists" :key="'C-'+$j">
		<img :src='topad[$j]' v-bind:id="['list']+($j+1)" v-bind:class="['list']+($j+1)" />
			<div class="goods">
				<div v-for="(goods,$k) in goodlist" :key="'D-'+$k"  class="good" @click="jump2good(goods.goods_id)">        
					<img v-lazy="goods.img320_url" alt="">
			        <p class="name">{{goods.goods_name}}</p>
			        <p class="price"><span>￥<i>{{goods.group_price}}</i></span><del>￥<i>{{goods.shop_price}}</i></del><span class="goto">{{buttons}}</span></p>
		   		</div>
			</div>
		</div>
		<div @click="toSecondsDetail()" :style="{ display : is_wx ? 'none' : '' }"><img :src='mores' /></div>
	<ToTop></ToTop>
	</div>
</template>
<script>
	import tjjApp from "@/assets/js/common/app_xcx.js";
	import send from "@/assets/js/common/sendData.js";
	import ToTop from "@/components/toTop.vue";
	import { GoodList } from "./../assets/js/api.js";
	import {scroller} from 'vue-scrollto/src/scrollTo';
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
								that.$set(that.goodlists, index, ress.slice(0,ress.length))
						})
						.catch(function(error) {
							console.log(error);
						});
				});
			aa();
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
						{select:'热销榜单',active:true,position:0},
						{select:'抖音网红同款',active:false,position:0},
						{select: '精选风扇',active:false,position:0},
						{select: '精选灭蚊灯',active: false,position: 0},
						{select: '更多好物',active: false,position: 0}　　　　　　
						],
				navfixed: false,
				zwf: false,
				offsetTops: 0,
				tabwz: [],
				goodlists: [],
				goods_id:[
					"2744011,4049726,2883516,3553116,4015104,4047119",
					"2883529,3325428,3436152,2674889,2784845",
					"2681633,1899314,2734977,2604859,4247739,2490603",
					"3550111,2892413,2892409,4272432,2892343,182282,3111711,3143903,62675,1301868,2618555,4624,2784845,2389541,1761365,1437952,1060273,3036936,1853008,3734040,982086,2575482,282897,1861764,977603,10114,2709521,918332,8469,6126,2617842,2397161,4101648,1622569,2853853,1120715,3772508,3085638,944053,127288,3658966,2884685,1452334,34369,2594629,2736931,3023525,2618660,1504701,2562031,4226851,4072474,607,3032443,1927842,3141246,3086645,3176303,4061636,2502607,3824848,9154"
				],
//				goods_id:[
//					"1215147,1215959,1215809,1215811,1214979,1214975",
//					"1215959,1215147,1215809,1215811,1214979,1214975",
//					"1215809,1215147,1215959,1215811,1214979,1214975",
//					"1215959,1215147,1215809,1215811,1214979,1214975"
//					],
				headerimg:[require('../assets/images/flwq_01.jpg')],
				hotbd:[
					require('../assets/images/flwq_02.jpg')				
				],
				imgs:[
					require('../assets/images/flwq_03.jpg'),
					require('../assets/images/flwq_04.jpg'),
					require('../assets/images/flwq_05.jpg')
				],
				topad:[
					require('../assets/images/flwq_06.jpg'),
					require('../assets/images/flwq_07.jpg'),
					require('../assets/images/flwq_08.jpg'),
					require('../assets/images/flwq_09.jpg')
				],
				mores:[
					require('../assets/images/flwq_10.jpg')
				],
				is_wx:false,
				hot_top:[
					'4072474','2892409','4039044'
				],
				buttons:'立即抢'
			};
		},
		watch:{
		      goodlists() {
      	        this.$nextTick(() => {
			        this.Tabfz();
		        })
		      }			
		},
		methods: {
			selectStyle(item, index) {
				this.Tabfz();
				this.jumpToTab(index)　　　　
			},
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if(!this.navfixed) {
					if(document.querySelector('#navs')){
						this.offsetTops = document.querySelector('#navs').offsetTop;
					}
				}
				let offsetTop = this.offsetTops;
				scrollTop > offsetTop ? this.navfixed = this.zwf = true : this.navfixed = this.zwf = false;
				for (var i = 0; i < this.items.length; i++) {
					if(this.items[i].position){
				        if (scrollTop >= this.items[i].position-this.numFn(1.55)) {
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
					if(document.querySelector('#list' + index)){
						Vue.set(item, 'position', document.querySelector('.list' + index).offsetTop);
					}
				});					
			},
			iswx(){
				this.is_wx = true
			},
			jumpToTab(index) {
                firstScrollTo('#list'+index,{
                    offset: this.numFn(-1.5)
                });
			},
			jumpToShopHome(id){
      			tjjApp.web.startShopHome(id);
			},
			toSecondsDetail(){
				tjjApp.web.toCATE({ id : 351, name: "电器" });
			},
			jump2good(id){
				tjjApp.web.jump2good(id);
			},
			numFn(rem){
				return rem*23.4375;
			}
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
	nav {
		width: 100%;
		font-size: 0.49rem;
		letter-spacing: 0px;
		height: 1.5rem;
		background: #d9dcce;
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
		width: 20%;
		float: left;
		text-align: center;
		background: #5461f9;
		height: 1.5rem;
		line-height: 1.5rem;
		color: #fff;
	}
	nav .active {
		background-color: #3909f4;
	}
	.goods{
		width: 100%;
	    background-color: #2978f0;
	    padding: 0 .4rem;
	    min-height: 3rem;
	    overflow: hidden;
	    clear: both;
	    justify-content: space-between;
	    display: flex;
	    flex-wrap: wrap;		
	}

	.good {
	    width: 7.43rem;
	    height: 10.35rem;
	    float: left;
	    background: #fff;
	    margin-bottom: 0.4rem;
        border: 0.04rem solid #d2d6df;
	}
    .good .name {
        margin: 0.34133rem 0 0.46rem;
        font-size: 0.618rem;
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
    .good img {
        width: 7.366rem;
        height: 7.27rem;
        margin-top: 0.01rem;
        margin: 0 auto;
        display: block;
    }
	.price {
	    padding: 0 0.341rem;
	    letter-spacing: -1px;
	    color: #ff2645;
	    font-style: normal;
	    font-size: 0.61rem;
    }
	.price span i {
	    font-size: 0.981rem;
	    font-style: normal;
	    font-weight: bold;
	}
	.price del {
	    font-size: 0.32rem;
	    font-style: normal;
	    margin-left: 0.17066rem;
	    color: rgba(0,0,0,0.4);
	}
	.price del i {
		font-style: normal;
	    font-size: 0.512rem;
	    text-decoration: line-through;
	}
	.goto {
	    width: 2.64533rem;
	    height: 0.96rem;
	    background-color:#ff2645;
	    border-radius: 4px;
	    display: inline-block;
	    float: right;
	    font-family: FZLTZHUNHK--GBK1-0;
	    font-size: 0.554666rem;
	    font-weight: normal;
	    font-stretch: normal;
	    letter-spacing: 0px;
	    color: #ffffff;
	    text-align: center;
	    line-height: 0.96rem;
	}
    nav span:nth-last-child(1)::after{
        display: none;
    }
    nav .active:after{
    	display: none;
    }
	nav span:after {
	    content: "丨";
	    color: #fff;
	    position: absolute;
	    font-weight: 100;
	}
</style>