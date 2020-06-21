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
	import  url  from "./../../assets/js/api.js";
	var that = null;
	export default {
		created() {
			that = this;
			let result = [];
			for(var i=0;i<this.goodsIds.length;i+=30){
			    result.push(this.goodsIds.slice(i,i+30));
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
				headerimg:require('./../../assets/images/alipay_header.jpg'),
//				goodsIds:[200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276],
				goodsIds:[8418279,8190807,7214402,8423046,8420162,8186768,8186640,8425729,8430699,8418271,8427003,8427001,8425855,8188681,8416510,5551731,8188774,8422201,8417228,7190555,8191428,8420153,8191711,8418301,8191700,8425492,8422935,8419395,8420752,8430812,8430798,8416519,8418232,8422929,8430808,8425660,8422455,8422905,8422895,8428046,8215408,8427992,8421448,7040837,8375794,8430793,8191426,8215667,8418283,8195622,8188586,8415162,8188783,8425497,8430829,8422920,8430816,8430167,8425722],
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
		height: 4.48rem;
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