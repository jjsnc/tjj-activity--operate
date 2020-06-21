<template>
	<div>
		<div class="headers"><img v-lazy='headerimg' /></div>
		<div class="bg">
			<div class="goods-list">
				<div v-for="(goods,$index) in goodlists" class="goods" :key="$index" @click="jump2good(goods.goodsId,goods.goodsName)">
					<img v-lazy="goods.img640Url" />
					<div class="name">{{goods.goodsName}}</div>
					<div class="xian"><div></div></div>
					<div class="zfb-price-name">支付宝专属价:<span class="zfb-price-qian">¥</span><span class="zfb-price-zheng">{{goods.minGroupPrice | Zheng}}</span><span class="zfb-price-xiao">{{goods.minGroupPrice | Xiao}}</span></div>
					<div class="zc-price-name">正 常 支 付 价:<span class="zc-price-qian">¥</span><span class="zc-price-zheng-a">10</span><span class="zc-price-xiao-a"></span></div>
					<div class="buy"><div>抢</div></div>
				</div>
			</div>
		</div>
		<div class="dianzi"></div>
	</div>
</template>
<script>
	import  url  from "./../assets/js/api.js";
	var that = null;
	export default {
		created() {
			that = this;
			let result = [];
			for(var i=0;i<this.goodsIds.length;i+=20){
			    result.push(this.goodsIds.slice(i,i+20));
			}
			this.count_page = result.length - 1;
			this.goods_id = result;
		},
		mounted() {
			this.initPv();
			this.getgoodslist(this.page)
			window.addEventListener('scroll', this.isdown);
		},
		data: function() {
			return {
				headerimg:require('../assets/images/alipay_header.jpg'),
//				goodsIds:[335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276],
				goodsIds:[5158720,6558139,7959898,8039580,8091505,8191316,8191706,8188463,8186860,8194698,8185869,8191978,8186654,8186627,8191428,8186935,8186631,8186666,8191326,8191426,8191419,8186640,8191353,8186768,8186946,8186674,8190848,8188898,8191349,8191711,8188900,8190817,8190851,8187487,8190919,8187492,8190842,8191342,8191960,8190794,8187529,8188681,8188915,8187777,8191336,8186622,8186857,8190791,8195694,8190800,8191333,8188931,8188938,8188586,8188940,8199545,8187335,8188941,8188945,8189633,8188948,8187772,8189632,8188955,8187771,8188774,8188957,8188673,8188962,8191330,8189631,8188783,8187752,8188980,8190899,8189629,8191313,8189628,8189634,8191301,8189037,8191914,8188787,8189635,8191299,8191296,8191911,8189040,8188822,8191908,8191287,8190894,8189044,8191283,8190892,8191695,8191226,8189095,8190888,8191209,8199538,8190884,8189098,8189158,8190882,8195620,8191187,8199533,8191139,8190921,8191133,8195061,8195622,8191079,8199527,8195065,8191700,8191691,8191010,8190861,8191901,8190860,8191685,8191670,8189481,8196846,8195068,8191895,8189595,8191894,8189592,8195084,8191892,8191571,8190642,8194467,8189591,8191890,8191889,8191884,8196059,8195102,8190852,8191875,8195133,8195170,8194540,8191866,8195265,8190914,8198573,8197787,8198590,8198594,8195671,8195647,8195231],
				goodlists:[],
				goods_id:[],
				page:0,
				count_page:1,
				flag: false
			};
		},
		filters: {
	    	Zheng(num){
	    		let t = '.'; 
			  	let ab_str = String(num);
			  	let m_a = ab_str.split('.');
			  	if(m_a[1]){
			  		
			  	}
			  	else{
                   m_a[1]=0;
                   t = '';
                }
			  	return m_a[0] + t;
	    	},
	    	Xiao(num){
			  	let ab_str = String(num);
			  	let m_a = ab_str.split('.');
			  	if(m_a[1]){}
			  	else{
                   m_a[1]= '';
                }
			  	return m_a[1];
	    	}
		},
		methods: {
			isdown(){
		      let scrollTop =
		        window.pageYOffset ||
		        document.documentElement.scrollTop ||
		        document.body.scrollTop;
		      let clientHeight = 0;
		      if (document.body.clientHeight && document.documentElement.clientHeight) {
		        clientHeight = Math.min(
		          document.body.clientHeight,
		          document.documentElement.clientHeight
		        );
		      } else {
		        clientHeight = Math.max(
		          document.body.clientHeight,
		          document.documentElement.clientHeight
		        );
		      }
		
		      let scrollHeight = Math.max(
		        document.body.scrollHeight,
		        document.documentElement.scrollHeight
		      );
		      if (scrollHeight - clientHeight <= scrollTop + 700 && this.flag) {
		      	this.flag = false;
		        // 下拉加载
		       	this.getgoodslist(this.page)
		      }
			},
			getgoodslist(page){
				    let goodlists = this.goods_id[page].join(',');
		            let params = {
		                ids: goodlists
		            };
				      this.$http
			          .post(url.GoodList , params)
			          .then(res => {
			          	    if(res.data.status == 1){
			          	    	if(res.data.data){
			          	    		let ress = res.data.data;
									ress.map((e,i)=>{
										that.goodlists.push(e)
									})
			          	    	}else{
			          	    		errorLogUpload({
						            logLevel: 3,
						            errType: 21,
							            apiError: {
							                params: JSON.stringify(params),
							                uri: window.location.href,
							                apiUri: url.GoodList,
							                data: res.data,
							                message: 'data不存在 page = ' + page,
							                method: 'post',
							                code: res.status
							            }
						        	})
			          	    	}
								this.flag = true;
								if(this.page < this.count_page){
									this.page++;	
								}else{
									this.flag = false
								}
			          	}else{
          				        errorLogUpload({
						            logLevel: 3,
						            errType: 21,
						            apiError: {
						                params: JSON.stringify(params),
						                uri: window.location.href,
						                apiUri: url.GoodList,
						                data: res.data,
						                message: 'status不为1 page=' + page,
						                method: 'post',
						                code: res.status
						            }
						        })
		          	   			this.flag = true
			          	   }
				      })
			          .catch(error => {
			          	this.flag = true;
			            console.log(error);
			          });
			},
			initPv() {
		        this.$.initPv({
		        	pageName:'zfbjian'
		        });
		    },
		    jump2good(id,name){
				this.$.jump2good({
			        goodsId: id,
			        goodsName: name,
			        activityName: '支付宝10-8活动',
			        pageName:'zfbjian',
			        elementId:'good_detail'
			     });
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
	.headers img{
		width:12rem;
		height: 7.05rem;
	}
	.goods-list{
	  display: flex;
	  overflow: hidden;
	  flex-wrap: wrap;
	  background-color: #fd2d30;
	  margin-left: 0.17rem;
	  padding: 0.04rem 0 0.57em;
	}
	.bg{
		background-color: #fd2d30;
		 min-height: 30rem;
	}
	.goods{
		width: 5.76rem;
		height: 8.41rem;
	    position: relative;
	    margin-top: 0.12rem;
	    margin-right: 0.15rem;
	    background-color: #ffffff;
	}
	.goods img{
		height: 5.57rem;
	}
	.goods .name{
		width: 5.27rem;
		height: 0.53rem;
		margin-left: 0.12rem;
		margin-top: 0.14rem;
		margin-bottom: 0.14rem;
		line-height: 0.5rem;
		font-size: 0.39rem;
	    font-weight: normal;
	    font-stretch: normal;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    color: #000000;
		font-family: SourceHanSansCN-Regular;
	}
	.xian div{		
		width: 5.24rem;
	    border: 0.02rem dashed #ccc;
		height:0.02rem;
		margin-left: 0.12rem;
		margin-bottom: 0.49rem;
	}
	.zfb-price-name{
		height: 0.33rem;
		font-family: SourceHanSansCN-Normal;
		font-size: 0.35rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.23rem;
		color: #000000;
	    letter-spacing: 0.01rem;
	    text-indent: 0.16rem;;
	}
	.zfb-price-qian{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.44rem;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #fb0f06;		
	}
	.zfb-price-zheng{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.91rem;
		font-weight: normal;
		letter-spacing: 0px;
		color: #fb0f06;
	}
	.zfb-price-xiao{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.63rem;
		font-weight: normal;
		letter-spacing: 0px;
		color: #fb0f06;
	}
	
	
	.zc-price-name{
		margin-top: 0.5rem;
		height: 0.33rem;
		font-family: SourceHanSansCN-Normal;
		font-size: 0.35rem;
		font-weight: normal;
		font-stretch: normal;
		line-height: 0.23rem;
		color: #695f5f;
		text-indent: 0.16rem;;
	}
	.zc-price-qian{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.44rem;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: -0.01rem;
		color: #695f5f;
	}
	.zc-price-zheng{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.91rem;
		font-weight: normal;
		letter-spacing: -0.01rem;
		color: #695f5f;
	}
	.zc-price-zheng-a{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.6rem;
		font-weight: normal;
		letter-spacing: -0.01rem;
		color: #695f5f;
	}
	.zc-price-xiao{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.63rem;
		font-weight: normal;
		letter-spacing: -0.01rem;
		color: #695f5f;
	}
	.zc-price-xiao-a{
		font-family: SourceHanSansCN-Bold;
		font-size: 0.42rem;
		font-weight: normal;
		letter-spacing: -0.01rem;
		color: #695f5f;
	}
	.buy{
		width: 1.46rem;
		height: 1.46rem;
		background-color: #f24216;
		border-radius:100%;
	    overflow: hidden;
	    position: absolute;
    	right: 0.16rem;
    	bottom: 0.26rem;
	}
	.buy div{
		width: 1.46rem;
		height: 1.46rem;
		font-family: SourceHanSansCN-Bold;
		line-height: 1.46rem;
		font-size: 0.98rem;
		text-align: center;
		font-weight: normal;
		font-stretch: normal;
		color: #ffffff;
	}
</style>