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
//				goodsIds:[335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276,335,357,388,396,419,180,435,232,527,275,200,439,536,276],
				goodsIds:[8422863,8424686,8426997,8439692,8424642,8417141,8200546,8191316,8419071,8439779,8425727,8439773,8195620,8186696,8186631,8187813,8195893,8430775,8439697,8187772,8427034,8186627,8417147,8422871,8422860,8427028,8427021,8433138,8418259,8423023,8421744,8426993,8423027,8420684,8419850,8191301,8420858,8191079,8430773,8419535,8417134,8439717,8444038,8425730,8420694,8235482,8422214,8417145,8417462,8419532,8424143,8439704,8420537,8414664,8439731,8422940,8417153,8430770,8420159,8430061,8422900,8422960,8191133,8439726,8419389,8191139,8191695,8187359,8186885,8186946,8422952,8430056,7392805,8422964,8417149,8422907,8417132,8194698,8422925,8189098,8430785,8430782,8430779,8430766,8191875,8430754,8424628,8191706,8423043,8423054,8422910,8417158,7990989,8420081,8439736,8423032,8191326,8420540,8422945],
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
		                page: 10
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