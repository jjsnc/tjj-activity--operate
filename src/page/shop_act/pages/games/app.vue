<template>
	<div id="xbct">
		<div v-for="(img,$i) in headerimg" :key="'A-'+$i"><img v-lazy='img'  @click.prevent="" /></div>
		<div class="games">
				<img v-for="(img,$i) in gameimg_top" v-lazy='img'  @click.prevent="" :key="$i" />
				<div class="t01"><img v-lazy='taobb[0]' /><span class="t01_1 textbb">淘侠客({{bb[0] || 0}}/1)</span></div>
				<div class="t02"><img v-lazy='taobb[1]' /><span class="t02_1 textbb">淘博士({{bb[1] || 0}}/1)</span></div>
				<div class="t03"><img v-lazy='taobb[2]' /><span class="t03_1 textbb">淘宝宝({{bb[2] || 0}}/1)</span></div>
		</div>
		<div class="games"> <img v-for="(img,$i) in gameimg_ctr" v-lazy='img'  @click.prevent="" :key="$i"/>
				<div class="t04"><img v-lazy='taobb[3]' /><span class="t04_1 textbb">淘大富({{bb[3] || 0}}/1)</span></div>
				<div class="t05"><img v-lazy='taobb[4]' /><span class="t05_1 textbb">淘小递({{bb[4] || 0}}/1)</span></div>		
		</div>
		<div class="rest">	<img v-for="(img,$i) in gameimg_btm" v-lazy='img'  @click.prevent="" :key="$i"/>
<!--			<div class="reset" @click="changeimg('bb','b06',1)"></div>-->
			<div class="flush" @click="flash(UserInfo.user_id)"><img src='../../assets/images/games/shuaxin.png' /></div>
			<div class="reset" @click="doDraw()"><img src='../../assets/images/games/hecheng.png' /></div>
		</div>
		<div><img v-lazy='goodimg[0]'  @click.prevent="" /></div>
		<div class="csx-goods">
	    	<div class="goods">
		      <div
		        class="good"
		        v-for="(goods,$g) in goodlists"
		        :key="$g"
		        @click="jump2good(goods.goods_id,goods.goods_name)"
		      >
		      	  <a
		            href="javascript:;"
		            class="spike-goods-over"
		            v-if="goods.num == 0 || !goods.num"
		          ></a>
		          <img class="spike-goods-icon" src="../../assets/images/icon/icon_618.png" alt>
		          <img v-lazy="goods.img320_url" class="good-img" alt>
		          <h3 class="good-title">{{goods.goods_name}}</h3>
		        <div class="good-price">
		          <span class="good-price-new"><span class="mony">￥</span>{{goods.group_price}}</span>
		          <a href="javascript:;" class="good-price-go">{{buttons}}</a>
		        </div>
		        
	      	</div>
	      	<div @click="csxtz()"><img src="../../assets/images/games/more.png" /></div>
	      </div>
		</div>

		<van-popup v-model="show" style="background-color: none" @click="not_show()">
			<div :class="open_tlb?'lmd':''" @click="close_show(indx)">
				<div v-if="!open_tlb">
					<img :class="open_sty" v-lazy='open_windows' @click.prevent=""/>
					<span class="nums" v-if="!isrul">
						{{nums}}
					</span>
				</div>
				<div v-if="open_tlb" class="cjbg">
			        <div class="re-box">
			            <div class="re-item">
			                <div class="re-item-front" :class="flagDraw?'front':''">
			                    <img src="../../assets/images/games/b06.png" @click.prevent=""/>
			                </div>
			                <div class="re-item-back" :class="flagDraw?'back':''">
			                    <img :src="coupimg[couindex]"  @click.prevent=""/>
			                </div>
			            </div>
			        </div>
		        </div>
			</div>
		</van-popup>
		<msgBox :msgTxt="msgTxt"></msgBox>
	<ToTop></ToTop>
  <div class="shares" v-if="!is_wx" @click="shareClick">
  	<img src="../../assets/images/games/share.png">
  </div>
	
  <div class="rules" @click="changeimg('ruls','ruler_detail',0)">
  	<img src="../../assets/images/games/gamerules.png">
  </div>
  <div style="display: none;"><img src="../../assets/images/games/ruler_detail.png"></div>
    <div class="sh"  @click="flashDraw(3)">
  </div>
<div class="bottom-nav"></div>
<bottomNav></bottomNav>
</div>
	
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import url from "./../../assets/js/api";
	let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
	let session = window.sessionStorage;
	var that = null;
	export default {
		name: "xbct",
		created() {
			that = this;
		},
		mounted() {
			this.initPv();
		    this.getNowTime();
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
		      if (user_id) {
			      this.UserInfo.user_id = user_id;
			      this.UserInfo.token = token;
			      this.UserInfo.uuid = uuid;
			      this.getuserInfo(this.UserInfo.user_id);
		      } else {
				tjjApp.web.login();
		      }
		    };
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
				show: false,
				headerimg:[
					require('../../assets/images/games/tza_01.jpg'),
				],
				gameimg_top:[
					require('../../assets/images/games/tza_02.jpg'),
				],	
				gameimg_ctr:[
					require('../../assets/images/games/tza_03.jpg'),
				],	
				gameimg_btm:[
					require('../../assets/images/games/tza_04.jpg'),
				],
				goodimg:[
					require('../../assets/images/games/tza_05.jpg'),
				],
				taobb:[
					require('../../assets/images/games/t01.png'),
					require('../../assets/images/games/t02.png'),
					require('../../assets/images/games/t03.png'),
					require('../../assets/images/games/t04.png'),
					require('../../assets/images/games/t05.png')
				],
				getbb:{
					"t_baobao":require('../../assets/images/games/t_baobao.png'),
					"t_boshi":require('../../assets/images/games/t_boshi.png'),
					"t_dafu":require('../../assets/images/games/t_dafu.png'),
					"t_xiake":require('../../assets/images/games/t_xiake.png'),
					"t_xiaodi":require('../../assets/images/games/t_xiaodi.png')					
				},
				character:[
					'淘侠客'	,'淘博士','淘宝宝','淘大富','淘小递'
				],
				ruledetail:[
					require('../../assets/images/games/ruler_detail.png')
				],
				goodlists: [],
				open_windows:[],
				is_wx:false,
				open_sty:'',//ruls:游戏规则 bb:淘人物  coup：优惠券          sty
				nums:0,
				bb:[0,0,0,0,0],
				shows:0,
				buttons:"立即抢",
				bshow:0,
				msgTxt:null,
				flagDraw:false,
				DrawRequestFlag:true,
				UserInfo:{
					user_id:'',
					uuid:'',
					token:''
				},
				open_tlb:false,
				isClose:true,
				ind:[],
				indx:1,
				button_stats:true,
				bstatus:[
					require('../../assets/images/icon/over.png')
				],
				isrul:false,
				coupimg:[
					require('../../assets/images/games/c01.png'),
					require('../../assets/images/games/c02.png'),
					require('../../assets/images/games/c03.png')
				],
				couindex:2,
				zyimg:[
			        require('../../assets/images/games/t_baobao.png'),
			        require('../../assets/images/games/t_boshi.png'),
			        require('../../assets/images/games/t_dafu.png'),
			        require('../../assets/images/games/t_xiake.png'),
			        require('../../assets/images/games/t_xiaodi.png'),
			        require('../../assets/images/games/c.png'),
			        require('../../assets/images/games/c01.png'),
			        require('../../assets/images/games/c02.png'),
			        require('../../assets/images/games/c03.png'),
			        require('../../assets/images/games/ruler_detail.png')
				]
			};
		},
		methods: {
			iswx(){
				this.is_wx = true
			},
			is_show(){   
				this.show = true
			},
			not_show(){
				if(this.isClose){
					this.show = false
				}	
			},
			close_show(index){
				if(this.isrul){
					this.not_show();
				}else{
					if(index<=4){
						this.indx++;
						this.getbps(index);
					}else{
						this.not_show();
					}
				}
			},
			jump2good(id,name){
				tjjApp.web.jump2good({
			        goodsId: id,
			        goodsName: name,
			        activityName: '618大促活动'
			     });
			},
			numFn(rem){
				return rem*23.4375;
			},
			changeimg(sty,params,num){
				if(sty == "ruls"){
					this.isrul = true
				}
				this.open_tlb = false; //关闭淘老板
				this.open_sty = sty;
				this.open_windows = require('../../assets/images/games/'+params+'.png');
				if(num){
					this.nums = num;
				}
				this.is_show();
			},
			getbps(index){
				this.open_sty = 'bb';
				if(this.ind[index]){
					if(this.ind[index].num){
						this.open_windows = require('../../assets/images/games/'+this.ind[index].name+'.png');
						this.nums = this.ind[index].num;
						this.is_show();
					}else{
						if(index>=4){
							this.not_show();	
						}else{
							this.close_show(index+1);
						}
					}
				}else{
					if(index>=4){
							this.not_show();	
					}else{
							this.close_show(index+1);
						}
				}
			},
		    getNowTime(){
		        that.$http
		          .get(url.GetTaoGoodList)
		          .then(res => {
		            let ress = res.data.data;
		            if(ress.length != 0){
		            	let nums = ress.length < 2 ? 0 : ress.length % 2;
		            	that.goodlists = ress.slice(0, ress.length - nums);
		            }else{
		            	errorLogUpload({
							            logLevel: 3,
							            errType: 21,
							            apiError: {
							                params: '',
							                uri: window.location.href,
							                apiUri: res.request.responseURL,
							                data: res.data,
							                message: 'data为空',
							                method: res.config.method,
							                code: res.status
							            }
							        })
	            	}
		          })
		          .catch(error => {
		            console.log(error);
		          });
		    },
		    getLocalTime(nS) {     
			   return new Date(parseInt(nS) * 1000).toLocaleDateString();     
			},
			flash(user_id){
				if(this.UserInfo.user_id){
					this.ind = [];
			    	this.open_sty = '';
			    	this.open_windows = []; 
			    	this.nums = 0;
			    	this.indx = 1;
			    	this.open_tlb = false;
			    	this.getuserInfo(user_id);
				}else{
					tjjApp.web.login();
				}
			},
		    getuserInfo(user_id){
		        that.$http
		          .get(url.GetUserCount, {
		            params: {
		              user_id: user_id
		            }
		          })
		          .then(res => {
		          	let data = res.data;
		          	this.isrul = false;
		          	if(data.data){
		          		if(data.data.user_id){
			          			if(user_id == data.data.user_id){
					          		let list   = data.data.list;
					          		let detail = data.data.detail;
					          		this.bb = [list['t_xiake'],list['t_boshi'],list['t_baobao'],list['t_dafu'],list['t_xiaodi']];
					          		for (let i in detail) {
									    let o = {};
									    o["name"] = i;
									    o["num"]  = detail[i]
									    that.ind.push(o);
									}
					          		this.istrw();
					          		this.getbps(0);
					          	}else{
					          		errorLogUpload({
								            logLevel: 3,
								            errType: 21,
								            apiError: {
								                params: user_id,
								                uri: window.location.href,
								                apiUri: res.request.responseURL,
								                data: res.data,
								                message: '传入的userid与返回的userid不匹配',
								                method: res.config.method,
								                code: res.status
								            }
								        })
					          	}
		          		}else{
		          			errorLogUpload({
							            logLevel: 3,
							            errType: 21,
							            apiError: {
							                params: user_id,
							                uri: window.location.href,
							                apiUri: res.request.responseURL,
							                data: res.data,
							                message: '没有返回userid',
							                method: res.config.method,
							                code: res.status
							            }
							        })
		          		}
		          		
		          	}else{
			          		errorLogUpload({
						            logLevel: 3,
						            errType: 21,
						            apiError: {
						                params: user_id,
						                uri: window.location.href,
						                apiUri: res.request.responseURL,
						                data: res.data,
						                message: '接口没数据',
						                method: res.config.method,
						                code: res.status
						            }
						        })		          		
		          	}
		          })
		          .catch(error => {
		            console.log(error);
		          });		    	
		    },
		    tanwindow(params,index){
				this.open_tlb = false; //关闭淘老板
				this.open_sty = "bb";
				this.open_windows = require('../../assets/images/games/'+params+'.png');
				if(num){
					this.nums = num;	
				}
				this.is_show();
		    },
			doDraw(){
				if(this.UserInfo.user_id){
					let isJQ = true;
					for(let i = 0 ;i <= this.bb.length ;i++){
						if(this.bb[i] < 1){
							isJQ = false;	
						}
					}
					if(isJQ){
						this.isyhj();
						this.doDrawRequest();
					}else{
						this.msgTxt = '合成失败继续集卡';
					}
				}else{
					tjjApp.web.login();
				}
			},
			doDrawRequest(){
				if(this.UserInfo.user_id){
					if(this.button_stats){
						//设置按钮间隔
						this.timeout();
						if(this.DrawRequestFlag){
							this.DrawRequestFlag = false;
							this.$http.get(url.GetDraw, {
					            params: {
					              user_id: this.UserInfo.user_id ,
					              uuid:this.UserInfo.uuid,
					              token:this.UserInfo.token
					            }
					          })
					          .then(res => {
					          		let ress = res.data;
						          	this.DrawRequestFlag = true;
						          	
						          	let pamm = {
					              	  user_id: this.UserInfo.user_id ,
						              uuid:this.UserInfo.uuid,
						              token:this.UserInfo.token
						          	}
						          	
						          	if(ress.result){
						          		switch(ress.result) {
									     case 1:
									     	if(ress.data.award_info.length != 0){
									     		this.flashDraw(ress.data.award_info)
									       		this.getuserInfo(this.UserInfo.user_id)
									     	}else{
									     		errorLogUpload({
										            logLevel: 3,
										            errType: 21,
										            apiError: {
										                params: JSON.stringify(pamm),
										                uri: window.location.href,
										                apiUri: res.request.responseURL,
										                data: res.data,
										                message: '抽奖成功未返回优惠券',
										                method: res.config.method,
										                code: res.status
										            }
										        })
									     	}
									        break;
									     case 100019:
									        this.msgTxt = '合成失败';
									        break;
									     case 100021:
									     	this.msgTxt = '今日奖品已经抽完';
									        break;
									     default:
									     	this.msgTxt = '合成失败~';
									     	errorLogUpload({
										            logLevel: 3,
										            errType: 21,
										            apiError: {
										                params: JSON.stringify(pamm),
										                uri: window.location.href,
										                apiUri: res.request.responseURL,
										                data: res.data,
										                message: ress.result,
										                method: res.config.method,
										                code: res.status
										            }
										        })
										}
						          	}else{
						          		errorLogUpload({
								            logLevel: 3,
								            errType: 21,
								            apiError: {
								                params: JSON.stringify(pamm),
								                uri: window.location.href,
								                apiUri: res.request.responseURL,
								                data: res.data,
								                message: '接口未返回结果',
								                method: res.config.method,
								                code: res.status
								            }
								        })
						          	}
					          })
					          .catch(error => {
						          	this.DrawRequestFlag = true;
						            console.log(error);
					          });	
						}
					}else{
						return "请等待";
					}
					
				}else{
					tjjApp.web.login();
				}
			},
			flashDraw(award_info){
				this.open_tlb = true; //点击的是淘老板 开启
				this.isClose = false;//状态为不可关闭
				this.flagDraw = false;
				this.open_sty = 'bb';
				this.nums = 1;
				this.couindex = award_info-1;
				this.show = true;
				let t1 = window.setTimeout(()=>{
					this.flagDraw = true;
					this.open_sty = 'coup';
					this.show = true;
					this.isClose = true; //状态为可关闭
					window.clearTimeout(t1);
				},500);
			},
			timeout(){
				this.button_stats = false;
				let t2 = window.setTimeout(()=>{
					this.button_stats = true;
					window.clearTimeout(t2);
				},2000);
			},
		    // 分享
		    shareClick() {
		      tjjApp.web.share({
		        title: document.title,
		        shareUrl: 'https://a.taojiji.com/a/a'
		      });
		    },
		    initPv() {
		      tjjApp.web.initPv();
		    },
		    csxtz(){
				if (session.getItem("toSuper")) {
					window.location.href = session.getItem("toSuper");
				}
		    },
		    istrw() {
		      let imgs = [
		        require('../../assets/images/games/t_baobao.png'),
		        require('../../assets/images/games/t_boshi.png'),
		        require('../../assets/images/games/t_dafu.png'),
		        require('../../assets/images/games/t_xiake.png'),
		        require('../../assets/images/games/t_xiaodi.png'),
		        require('../../assets/images/games/c.png')
		      ]
		      for (let img of imgs) {
		        let image = new Image()
		        image.src = img
		        image.onload = () => {
		          this.count++
		        }
		      }
		    },
		    isyhj() {
		      let imgs = [
		        require('../../assets/images/games/c01.png'),
		        require('../../assets/images/games/c02.png'),
		        require('../../assets/images/games/c03.png')
		      ]
		      for (let img of imgs) {
		        let image = new Image()
		        image.src = img
		        image.onload = () => {
		          this.count++
		        }
		      }
		    }
		},
		destroyed() {
	  	}
	};
</script>
<style>
	.van-popup{
		background: none !important;
	}
	
</style>
<style scoped>
	#xbct {
		background: #ff5450;
	}
	img {
	  width: 100%;
	  display: block;
	  vertical-align:buttom;
	  vertical-align:middle;
	  vertical-align:top;
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
	.games{
	position: relative;
    z-index: 1;
	}
	.t01{
	position: absolute;
    width: 2.84rem;
    height: 3.63rem;
    top: 0.34rem;
    left: 1.37rem;		
	}
	.t02{
		position: absolute;
    width: 2.84rem;
    height: 3.63rem;
    top: 0.34rem;
    left: 4.58rem;		
	}
	.t03{
		position: absolute;
    width: 2.84rem;
    height: 3.63rem;
    top: 0.34rem;
    left: 7.75rem;		
	}
	.t04{
		position: absolute;
    width: 2.84rem;
    height: 3.63rem;
    top: 0;
    left: 2.69rem;		
	}
	.t05{
		position: absolute;
    width: 2.84rem;
    height: 3.63rem;
    top: 0;
    left: 6.41rem;		
	}
	
	.t01_1{
		position: absolute;
    width: 2.23rem;
    height: 0.36rem;
    bottom: 0.25rem;
    left: 0.4rem;	
	}
	.t02_1{
		position: absolute;
    width: 2.23rem;
    height: 0.36rem;
    bottom: 0.25rem;
    left: 0.4rem;	
	}
	.t03_1{
		position: absolute;
    width: 2.23rem;
    height: 0.36rem;
    bottom: 0.25rem;
    left: 0.4rem;	
	}
	.t04_1{
		position: absolute;
    width: 2.23rem;
    height: 0.36rem;
    bottom: 0.25rem;
    left: 0.4rem;	
	}
	.t05_1{
		position: absolute;
    width: 2.23rem;
    height: 0.36rem;
    bottom: 0.25rem;
    left: 0.4rem;	
	}
	.textbb{
		font-family: AlibabaPuHuiTiB;
		font-size: 0.34rem;
		font-weight: 600;
		font-stretch: normal;
		line-height: 0.64rem;
		letter-spacing: 0px;
		color: #ff0027;			
		text-align: center;
	}
	.sh {
  position: absolute;
  right: 0.22rem;
  top: 4.27rem;
  width: 1.92rem;
  height: 0.67rem;
	}
	
	.shares {
  position: absolute;
  right: 0.22rem;
  top: 0.27rem;
  width: 1.92rem;
  height: 0.67rem;
	}
	.rules {
  position: absolute;
  right: 0.22rem;
  top: 1.03rem;
  width: 1.92rem;
  height: 0.67rem;
	}
	.ruls{
		width: 10rem;
		height: 20rem;
	}
	.coup{
		width: 12rem;
	}
	.bb{
		width: 12rem;
	}
	.rest{
		position: relative;
	}
	.reset{
    position: absolute;	
		width: 4.5rem;
		height: 1.6rem;
    left: 3.6rem;
    top: 0.55rem;
	}
	.nums{
    position: fixed;
    top: 11.04rem;
    left: 7rem;
    max-height: 100%;
    overflow-y: auto;
		font-family: AlibabaPuHuiTiB;
		font-size: 0.46rem;
		font-weight: 600;
		font-stretch: normal;
		line-height: 0.64rem;
		letter-spacing: 0px;
		color: #ff0027;
	}
	.csx-goods{
		background-image:url('../../assets/images/games/csx_bg.jpg');
	background-size: 100%;
}
	
.goods {
  width: 100%;
  overflow: hidden;
  padding: 0.23rem 0.7rem 0;
}

.good {
  width: 5.17rem;
  background: #fff;
  position: relative;
  float: left;
  margin-right: 0.18rem;
  margin-bottom: 0.16rem;
  height: 6.8rem;
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


.good-img {
  width: 100%;
  width: 5.17rem;
  height: 5.17rem;
}


.good-title {
  width: 100%;
  height: 0.6rem;
  line-height: 0.5rem;
  bottom: 0;
  left: 0;
  font-family: FZLTXHK--GBK1-0;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  color: #000000;
  padding: 0.1rem 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.good-price {
  width: 100%;
  padding: 0.2rem 0.1rem 0;
  height: 0.73rem;
}

.good-price-new {
  display: inline-block;
  float: left;
  font-family: 853-CAI978;
  font-size: 0.79rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #ff0000;
}


.good-price-go {
  width: 1.81rem;
  height: 0.79rem;
  line-height: 0.85rem;
  text-align: center;
  float: right;
  background-color: #ff0000;
  border-radius: 0.1rem;
  font-family: FZLTZHUNHK--GBK1-0;
  font-size: 0.45rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
}
.mony{
	font-size: 0.79rem;;
	font-weight: normal;
	font-stretch: normal;
	line-height: 0.79rem;;
	letter-spacing: -0.2rem;
	color: #ff0000;
}

.re-item {
	width: 4.57rem;
	height: 7.14rem;
    margin: 50px auto;
    cursor: pointer;
    position: relative;
    perspective: 500;
    -webkit-perspective: 500;
}
.re-item img {
	width: 4.57rem;
	height: 7.14rem;
}
.re-item-front,
.re-item-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-perspective: 1000;
    backface-visibility: hidden;
    -webkit-transition: all 1.5s;
    -moz-transition: all 1.5s;
    -ms-transition: all 1.5s;
    -o-transition: all 1.5s;
    box-shadow: rgba(50, 50, 50, 0.2) 0 0 15px;
    overflow: hidden;
}
.re-item-back {
    position: relative;
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
}
.front {
    transform: rotateY(-180deg);
    -webkit-transform: rotateY(-180deg);
}
.back {
    transform: rotateY(-360deg);
    -webkit-transform: rotateY(-360deg);
}
.cjbg{
	width: 12rem;
	
}
.van-popup{
	background-size: 100%;
	background-image: url("../../assets/images/games/c.png");
	background-repeat:no-repeat;
    background-position: center;
}
.lmd{
    margin-top: -1rem;
	margin-left: 0.2rem;
}
.spike-goods-over {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6) url("../../assets/images/icon/over.png") center
    center no-repeat;
  background-size: 2.94rem 1.64rem;
}
.flush{
    position: absolute;	
	width: 1.73rem;
	height: 1.73rem;
	left: 1.47rem;
    top: 0.47rem;
    animation: goBig 3s infinite linear alternate;
    
}
.spike-goods-icon{
  position: absolute;
  width: 1.03rem;
  height: 0.9rem;
  left: 0.1rem;
  top: 0;
}

/*  */
@keyframes goBig {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(1);
  }
}
</style>