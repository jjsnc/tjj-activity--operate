<template>
  <div>
    <div class="headers">
      <img :src="headerimg" @load="jiazhun()"/>
    </div>
    <!--:class="fixeds?'fixed':''"-->
    <div class="sss"  :class="fixeds?'fixed':''" v-if="havetab">
    	<div class="tabs">
    		<div class="tab" :style="{width:span_width*tabslth + 'rem'}">
	    			<span v-for="(tab,$i) in tabList" :key="tab.id" @click="cktab(tab.id)" :style="{width:span_width + 'rem'}">
	    				<div class="tab-imgs">
	    					<img :src="tab.timgs" />
	    				</div>
	    			</span>
    		</div>
    		<div class="tab" id="sss"  style="height:1rem;background-color: #A80D0D;line-height: 1rem;" :style="{width:span_width*tabslth + 'rem'}">
					<div class="tabtxt" :class="tab.active?'active':''" v-for="(tab,$i) in tabList" :key="tab.id" @click="cktab(tab.id)" :style="{width:span_width + 'rem'}">
	    				{{tab.name}}
					</div>
				</div>
    	</div>
    </div>
    <div class="zwf" v-if="fixeds && havetab">
    </div>
    <div class="bg">
      <div class="goods-list">
        <div
          v-for="(goods,$index) in goodlists"
          class="goods"
          :key="$index"
          @click="jump2good(goods.goodsId,goods.goodsName)"
        >
          <div class="yjs">
            <img :src="aflag" />
          </div>
         <div class="bflag">
            <img :src="bflag" />
             <!--兼容字体不能小于12浏览器-->
            <!--<div class="bflag-scale"><span class="ybt">已补贴<span>{{goods.base}}</span>件</span></div>-->
            <span class="ybt">已补贴<span>{{goods.base | Zhuan}}</span>件</span>
          </div>
          <img class="goodimgs" v-lazy="goods.img640Url" />
          <div class="name">{{goods.goodsName}}</div>
          <div class="xian">
            <div></div>
          </div>
          <div class="zfb-price-name">补贴价<span class="zfb-price-qian">¥</span>
            <span class="zfb-price-zheng">{{Number(goods.minGroupPrice) | Zheng}}</span><span class="zfb-price-xiao">{{Number(goods.minGroupPrice) | Xiao}}</span>
          </div>
          <div class="zc-price-name">市场价<span class="zc-price-qian"></span>
            <span class="zc-price-zheng-a"><del>¥{{Number(goods.shopPrice)}}</del></span>
          </div>
          <div class="buy">
            <div>抢</div>
          </div>
        </div>

      </div>
    </div>
    <div class="shares" v-if="!is_wx" @click="shares()">
      <img src="./../../assets/images/share.png">
    </div>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
import url from "./../../assets/js/api.js";
var that = null;
export default {
  created() {
	  that = this;
		//获取页面的pageid
		let stt = window.location.pathname;
		let arr=stt.split('/');
		let ins = 0;
		
		
		arr.map((el, i) => {
		    if(el == 'pageid'){
		    	ins = i+1;
		    };
		});

		if(arr[ins]){
			this.nowpageid = arr[ins];
			arr[ins] = arr[ins] +'';
			switch (arr[ins]){
				case '1':
				  this.pagename = 'butie_ly';
				  this.activityName = '疯狂补贴-粮油';
					break;
				case '2':
				  this.pagename = 'butie_xs'
				  this.activityName = '疯狂补贴-休闲食品';
					break;
				case '3':
				  this.pagename = 'butie_gs'
				  this.activityName = '疯狂补贴-果蔬';
					break;
				case '4':
				  this.pagename = 'butie_zh'
				  this.activityName = '疯狂补贴-综合';
					break;
				default:
				  this.pagename = 'butie_ly'
				  this.activityName = '疯狂补贴-粮油';
					break;
			}
		}
		
		//PV
    var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      this.is_wx = true;
      this.initPv(true);
    } else {
      this.initPv(false);
    }
		//分类列表
		this.getPageAll()
		
  },
  mounted() {

    window.addEventListener("scroll", this.isdown);
  },
  data: function() {
    return {
      headerimg: require("@/assets/images/common/loading_pic.png"),
      defaultimg: require("./../../assets/images/banner.jpg"),
      aflag: require("./../../assets/images/aflag.png"),
      bflag: require("./../../assets/images/hotnum.png"),
      zwtshare:require("./../../assets/images/zwtshare.jpg"),
      goodlists: [],
      goodsList: "",
      page: 1,
      totalPage: 1,
      flag: false,
      is_wx: false,
      msgTxt: null,
      tabList:[],
      fixeds:false,
      offsetTop:0,
      span_width:2.18,
   		tabslth:7,
   		havetab:false,
   		scollbarbegin:false,
   		pageTitle:'',
   		shareTitle:'',
   		sharetxt:'',
   		shareImg:'',
   		uup:0,
   		tabidlist:{},
   		nowtab:0,
   		//页面id配置
   		nowpageid:1,
   		pagename:'butie_ly',
   		activityName:'',
   		tabName:'',
      hasOffsetTop:false,//是否拿到tag高度
    };
  },
  filters: {
    Zheng(num) {
      //alert(num)
      let ab_str = String(num);

      let m_a = ab_str.split(".");
      if (m_a[1]) {
      } else {
        m_a[1] = 0;
      }
      return m_a[0];
    },
    Xiao(num) {
    	let t = ".";
      let ab_str = String(num);
      let m_a = ab_str.split(".");
      if (m_a[1]) {
      	m_a[1] = "." + m_a[1];
      } else {
        m_a[1] = "";
      }
      return m_a[1];
    },
    Zhuan(value){
		 let num;
		 if(value > 9999){//大于9999显示x万
		    num=(Math.floor(value/1000)/10) + '万';
		 }else if( value < 9999 && value>-9999){
		    num=value
		 }else if(value<-9999){//小于-9999显示-x万
		    num = -(Math.floor(Math.abs(value)/1000)/10)+'万'
		 }
		 return num;
    }
  },
  methods: {
    isdown() {
	    	//滚动监听相关参数
	    	//当前位置到页面顶部的距离scrollTop
	      let scrollTop =
	        window.pageYOffset ||
	        document.documentElement.scrollTop ||
	        document.body.scrollTop;
	      //网页可见区域高度clientHeight
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
	      
				//吸顶相关逻辑

//				if(this.offsetTop < 300 || !this.fixeds){
//					//1.防止底部刷新时初次获取吸顶为0
//					//2.未吸顶时重新获取sss的位置
//					let sss = document.getElementById("sss");
//					this.offsetTop = sss.offsetTop;
//				}
				
        if((this.offsetTop < 300 || !this.fixeds) && this.tabList.length){
            //1.防止底部刷新时初次获取吸顶为0
            //2.未吸顶时重新获取位置
            let sss = document.getElementById("sss");
            if(sss){
            	console.log(this.offsetTop, sss.offsetTop);
            	this.offsetTop = sss.offsetTop;
            }
            this.hasOffsetTop = true;
            // console.log(this.offsetTop);
        }


			  if(this.scollbarbegin){
//			  	console.log(scrollTop , this.offsetTop)
			  	this.fixeds = scrollTop > this.offsetTop;
			  }

//	  		if(this.fixeds){
//	  			console.log("scr:" + scrollTop);
//	  			console.log("tioff:" + this.offsetTop)
//	  		}
	      //页面是否到达底部相关逻辑
	      let scrollHeight = Math.max(
	        document.body.scrollHeight,
	        document.documentElement.scrollHeight
	      );
	      if (
	        scrollHeight - clientHeight <= scrollTop + 300 &&
	        this.flag &&
	        this.totalPage >= this.page
	      ) {
	        this.flag = false;
	        // 下拉加载
	        if(this.page != 1){
	        	this.get_GoodsInfos(this.page);	
	        }
	      }

	      this.scollbarbegin = true
    },
    jiazhun(){
				//测试
				if(document.getElementsByClassName('headers')[0] && document.getElementsByClassName('tab')[0]){
					
					this.offsetTop = document.getElementsByClassName('headers')[0].offsetHeight+document.getElementsByClassName('tab')[0].offsetHeight;
				}
    },
//  get_GoodsInfo(page) {
//  	let goodss = '99'
//  	
//  	for (var i = 100; i < 150; i++) {
//  		goodss += "," + i;
//  	}
//  	
//  	console.log(goodss)    	
//
//  	//java商品列表
//    let params = {
//      page: page,
//      pageSize: 100,
//      goodsIds: goodss,
//      stockNullShow: 0,
//      orderType: 0
//    };
//    this.$http
//      .post(url.goods_info, params)
//      .then(javaRes => {
//        let javaData = javaRes.data;
//        console.log(javaData);
//        if (javaData.status == 1) {
//          that.totalPage = javaData.totalPage;
//          if (javaData.totalPage >= page) {
//            that.goodlists = that.goodlists.concat(javaData.data);
//            that.flag = true;
//            that.page++;
//          }
//        } else {
//          errorLogUpload({
//            logLevel: 3,
//            errType: 21,
//            apiError: {
//              params: "",
//              uri: window.location.href,
//              apiUri: javaRes.request.responseURL,
//              data: javaRes.data,
//              message: "status不为1，获取商品列表失败",
//              method: "get",
//              code: 200
//            }
//          });
//        }
//      })
//      .catch(error => {
//        this.flag = true;
//        throw error;
//      });
//  },
    caltabs(){
    	//获取tab长度
    	let length = this.tabList.length;
    	this.tabslth = length;
    	if(length <= 1){
    		//长度为一，没有设置tab隐藏tab栏
    		this.havetab = false;
    	}else if(length > 1 && length <= 5){
    		//长度位1到5 平均分
    		this.span_width = 12/length;
    		this.havetab = true;
    		this.$nextTick(() => {
    			
    			this.jiazhun();
    		})
    	}else{
    		//长度大于5 露出五个半
    		this.span_width = 2.18;
    		this.havetab = true;
    		this.$nextTick(() => {
    			
    			this.jiazhun();
    		})
    	}

    },
//  getGoodsId() {
//    this.$http
//      .get(url.api_goodlist)
//      .then(res => {
//        console.log(res.data);
//        if (res.data.result == 1) {
//          if (res.data.goodsList) {
//            that.goodsList = res.data.goodsList;
//            that.get_GoodsInfo(1);
//          }
//          if (res.data.bannerUrl) {
//            that.headerimg = res.data.bannerUrl;
//          } else {
//            that.headerimg = that.defaultimg;
//          }
//        } else {
//          that.headerimg = that.defaultimg;
//        }
//      })
//      .catch(e => {
//        that.msgTxt = "网络错误，请稍后再试";
//        that.headerimg = that.defaultimg;
//        throw e;
//      });
//  },
    get_GoodsInfos(page) {
    	//java商品列表
    	//当前tab
    	let nowtab = this.nowtab;
    	//入参
    	
    	if(this.tabidlist[nowtab]){
	      let params = {
	      	//请求页码；
	        page: page,
	        //每页商品数量
	        pageSize: 20,
	        //所有商品id，以“,”（英文逗号）分割；
	        goodsIds: this.tabidlist[nowtab],
	        //是否显示无库存商品，0：不显示无库存商品，1：显示无库存商品；
	        stockNullShow: 0,
	        //排序类型，0：原始排序----传入的goodsIds的顺序，1：无库存商品沉底-----在传入的goodsIds顺序的基础上将无库存商品置于最后，仅存在于stockNullShow字段为1时，2：销量排序；
	        orderType: 0
	      };
     	
	      this.$http
	        .post(url.goods_info, params)
	        .then(javaRes => {
	        	//接收参数
	          let javaData = javaRes.data;
	          //判读请求返回状态是否成功
	          if (javaData.status == 1) {
	          	//获取页面总页数
	            that.totalPage = javaData.totalPage;
	            //判断接口的页面总页数是否大于等于当前页数
	            if (javaData.totalPage >= page) {
	            	//填充商品列表
	              that.goodlists = that.goodlists.concat(javaData.data);
	              //打开分页开关
	              that.flag = true;
	              //页数自增
	              that.page++;
	            }
	          } else {
	          	//错误上报
							this.errup(params,'status不为1，获取商品列表失败',javaRes.request.responseURL,javaRes.data,'get');
	            //
	          }
	        })
	        .catch(error => {
	        	//打开分页开关
	          this.flag = true;
	          throw error;
	        });
        }
    },
    getPageAll(tabid){
    	//声明一个入参集
    	let getparam = {};
    	//判断是否传入tabid
    	if(tabid){
    		//有tabid 非第一次请求，用来获取tab的商品id集合
	    	getparam = {
	    		//tab栏id
	    		tabid:tabid,
	    		//页面id
	        pageid: this.nowpageid
	    	}
    	}else{
    		//无tabid 第一次请求，仅请求pageid。用来获取所有的tabid，title，banner等参数
	    	getparam = {
	    		//页面id
	        pageid: this.nowpageid
	    	}
    	}
			//发送请求
      this.$http
    	  .get(url.api_goodlists, {
          params: getparam
        })
        .then(res => {
        	//判断请求返回参数状态是否为1 为1返回正常
          if (res.data.result == 1) {
          	//接收参数
          	let datas = res.data.data;
						//判断出参是否有tabid 有则为请求tab中的商品id。无则请求页面参数
          	if(tabid){
	          	//设置为当前tab
	          	this.nowtab = tabid;
	          	//校验入参和出参的tabid是否相同
	          	if(datas.tabid == tabid){

			          	//获取商品id
			            if (datas.goodsList) {
			            	this.tabidlist[tabid]= datas.goodsList;
			            }
			            //获取之后请求商品列表
			            this.get_GoodsInfos(1)

	            }
          	}else{
	            //获取头图
	            if (datas.banner) {
	              that.headerimg = datas.banner;
	            } else {
	              that.headerimg = that.defaultimg;
	            }

	            //获取页面title
	            if(datas.pageTitle){
	            	that.pageTitle = datas.pageTitle;
	            	//修改页面title
	            	this.changeTitle(datas.pageTitle);
	            }

	            //获取分享标题
	            if(datas.shareTitle){
	            	that.shareTitle = datas.shareTitle;
	            }

	            //获取分享图片
	            if(datas.shareImg){
	            	that.shareImg = datas.shareImg;
	            }

	            //分类列表
	            if(datas.tabList){
	            	let onetab = 0;
								datas.tabList.map((v,i)=>{
									let arr = {};
									arr.id = v.tabid;
									arr.timgs  = v.img;
									arr.name   = v.name;
									arr.active = false
									if(i == 0){
										arr.active = true
										onetab = v.tabid
										//埋点需要的参数
										this.tabName = v.name
									}
									this.tabList.push(arr)
								})
								this.getPageAll(onetab)
	            }
          	}
          	//tab栏计算
          	this.caltabs()
          } else {
          	//接口返回出现异常，使用默认数据
	          if(!tabid){
	          	that.msgTxt = "无商品数据";
		          that.headerimg = that.defaultimg;
		          that.shareTitle = '淘集集，全场一元起';
		          that.shareImg = that.zwtshare;
		          this.errup(getparam,'result不为1，获取页面信息失败',res.request.responseURL,res.data,'get');
	          }else{
	          	that.msgTxt = "无商品数据";
	          	this.errup(getparam,'result不为1，获取tab信息失败',res.request.responseURL,res.data,'get');
	          }
          }
        })
//      .catch(e => {
//      	//出现异常，使用默认数据
//        that.msgTxt = "网络错误，请稍后再试";
//        if(!tabid){
//	          that.headerimg = that.defaultimg;
//	          that.shareTitle = '淘集集，全场一元起';
//	          that.shareImg = that.zwtshare;          	
//        }
//        throw e;
//      });
    },
    cktab(i){
    	//点击tab
    	//当前点击的tab与当前显示的tab不同时
    	if(this.nowtab != i){
    		
    		this.page = 1
    		//清空商品列表重新填充
    		this.goodlists = []

    		this.nowtab = i;
				this.tabList.forEach(function(item, index) {
					  if(item.id != i){
					  	Vue.set(item, 'active', false);
					  }else{
					  	that.tabName = item.name
					  	Vue.set(item, 'active', true);
					  }
				});
				
				//点击的tab是否存有商品id
				if(this.tabidlist[i]){
					//存有商品id，直接使用商品id请求商品列表
					this.get_GoodsInfos(1)
				}else{
					//没有商品id，调用接口获取此tab的商品id
					this.getPageAll(i)
				}
			}

    },
    shares(){
    	that.eventshare()
    	//分享功能
      that.$.share({
        title: that.shareTitle,
        shareType: 0,
        shareUrl:"https://" + window.location.host + "/project/butie_ly/view/index/pageid/"+this.nowpageid,
        miniPath:"https://" + window.location.host + "/project/butie_ly/view/index/pageid/"+this.nowpageid,
        imgUrl:that.shareImg
      });
    },
    initPv(is_wx) {
    	//埋点PV
      this.$.initPv({
        pageName: this.pagename,
        funType: is_wx ? "xcx" : "h5"
      });
    },
    jump2good(id, name) {
    	//埋点商品详情
      this.$.jump2good({
        goodsId: id,
        goodsName: name,
        activityName: this.activityName,
        pageName: this.pagename,
        elementId: "good_detail",
        funType: that.is_wx ? "xcx" : "h5",
        tabName: this.tabName
      });
    },
    eventshare(){
    	//分享埋点
			this.$.eventData({
        pageName: this.pagename,
        elementId: "share", 
	      funType: that.is_wx ? "xcx" : "h5"
      });
    },
    //错误日志上报
    errup(params,message,apiUri,data,method){
	    errorLogUpload({
	      logLevel: 3,
	      errType: 21,
	      apiError: {
	        params: params,
	        uri: window.location.href,
	        apiUri: apiUri,
	        data: data,
	        message: message,
	        method: method,
	        code: 200
	      }
	    });
    }
  },
  destroyed() {
  	//页面结束销毁滚动监听
    window.removeEventListener("scroll", this.isdown);
  }
};
</script>
<style>
html,
body {
  background-color: #A80D0D;
}
</style>
<style scoped lang="scss">
img {
  width: 100%;
  display: block;
}
.headers img {
  width: 12rem;
  height: auto;
}
.goods-list {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  background-color: #A80D0D;
  margin-left: 0.256rem;
  padding: 0.04rem 0 0.57em;
}
.bg {
  background-color: #A80D0D;
  min-height: 15rem;
}
.goods {
  width: 5.61rem;
  height: 8.9rem;
  position: relative;
  margin-top: 0.256rem;
  margin-right: 0.256rem;
  background-color: #ffffff;
  border-radius: 0.128rem;
}
.goods .goodimgs {
  height: 5.61rem;
  border-top-left-radius:0.128rem;
	border-top-right-radius:0.128rem;
}
.goods .name {
  width: 5.1rem;
  height: 1.09rem;
  margin-left: 0.19rem;
  margin-top: 0.27rem;
  margin-bottom: 0.16rem;
  line-height: 0.55rem;
  font-size: 0.38rem;
  font-weight: normal;
  font-stretch: normal;
  overflow: hidden;
  /*white-space: nowrap;*/
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  
  font-weight: bold;
	font-family: PingFangSC-Medium;
	color: #0E0E0D;
	letter-spacing: 0.01rem;


  text-overflow: ellipsis;
}
.xian div {
  width: 5.24rem;
  height: 0.02rem;
  margin-left: 0.12rem;
  margin-bottom: 0.2rem;
}
.zfb-price-name {
  height: 0.33rem;
  margin-left: 0.04rem;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.23rem;
  color: #F53A18;
  letter-spacing: 0.01rem;
  text-indent: 0.16rem;
}
.zfb-price-qian {
  font-family: PingFangSC-Semibold;
  font-weight: bold;
	margin-left: 0.1rem;
  font-size: 0.48rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #fb0f06;
}
.zfb-price-zheng {
	font-weight: bold;
  font-family: PingFangSC-Semibold;
  font-size: 0.864rem;
  font-weight: normal;
  letter-spacing: -0.02rem;
  color: #fb0f06;
}
.zfb-price-xiao {
  font-family: PingFangSC-Semibold;
  font-size: 0.48rem;
  font-weight: normal;
  letter-spacing: -0.02rem;
  color: #fb0f06;
}

.zc-price-name {
  margin-top: 0.5rem;
  margin-left: 0.04rem;
  height: 0.33rem;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.23rem;
  color: #695f5f;
  text-indent: 0.16rem;
}
.zc-price-qian {
  font-family: PingFangSC-Semibold;
	margin-left: 0.15rem;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-zheng {
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-zheng-a {
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-xiao {
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-xiao-a {
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.buy {
  width: 1.8rem;
  height: 1.28rem;
  background-color: #f24216;
  border-radius: 0.672rem;
  overflow: hidden;
  position: absolute;
  right: 0.208rem;
  bottom: 0.384rem;
}
.buy div {
  width: 1.8rem;
  height: 1.28rem;
  font-family: PingFangSC-Semibold;
  line-height: 1.32rem;
  font-size: 0.84rem;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
}
.yjs {
  position: absolute;
  margin-left: 0.12rem;
  width: 1.472rem;
  height: 1.728rem;
  z-index: 111;
  top: 0;
}

/*
 * 活动一期改版样式
 *
 * */
.sss{
		background-color: #A80D0D;
    height: 3rem;
    width: 100%;
    overflow: hidden;

}
.tabs{
		width: 100%;
    overflow-x: scroll;
    height: 3rem;
    overflow-y: hidden;
}
.tabs::-webkit-scrollbar {display:none}
.tab{
    width: 16.8rem;
    height: 2rem;
}
.tab>span{
    float: left;
    text-align: center;
    height: 2rem;
    z-index: 999;
    font-size: .42rem;
    font-weight: 400;
    font-stretch: normal;
    letter-spacing: 0;
    color: #fff;
}
.tab-imgs{
  width: 1.71rem;
  height: 1.71rem;
  margin: 0.3rem auto;
}

.fixed {
    position: fixed;
    top: -2rem;
    left: 0;
    z-index: 120;
}

.tabtxt{
    float: left;
    text-align: center;
    height: 1rem;
    z-index: 999;
    font-size: .44rem;
    font-weight: 400;
    font-stretch: normal;
    font-family: PingFangSC-Semibold;
    letter-spacing: 0;
    color: #ffb4ae;
}

.active{
	font-size: 0.54rem;
	color: #ffffff;
}
.zwf{
	height: 3rem
}
/*分享*/
.shares {
  position: absolute;
  right: 0.26rem;
  top: 0.36rem;
  width: 1.74rem;
  height: 0.8rem;
}

.bflag {
	position: absolute;
  width: 3.392rem;
  height: 0.64rem;
  z-index: 111;
  bottom: 3.29rem;
}
.bflag .ybt{
	position: absolute;
	font-size: 0.32rem;
	color: #ffffff;
	margin: 0.17rem 0 0 0.7rem;
	letter-spacing:0.01rem;
	/*line-height: 0.49rem;*/
	height: 0.49rem;
}
.bflag img{
	position: absolute;
	font-size: 0.24rem;
	height: 0.64rem;
}
.ybt span{
	font-family:  PingFangSC-Medium;
	font-size: 0.3rem;
	color: #fffcca;
}

.bflag-scale{
    position: absolute;
    width: 2.32rem * 2;
    height: 0.49rem * 2;
    transform: scale(0.5);
    transform-origin: 0 0;
    .ybt{
        margin: 0.1rem*2 0 0.12rem*2 0.51rem*2;
        font-size: 0.24rem *2;
        height: 0.49rem *2;
    }
    span{
        font-size: 0.6rem;
    }

}
</style>
