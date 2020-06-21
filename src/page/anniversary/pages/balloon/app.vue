<template>
	<div id="ballon">
		<div class="nolll" v-if="show" @click="toindex"></div>
			<div class="playbox" :style="{display:box_display}" @click="pike" >
				<img v-for="(img,$i) in imgs" :src="img" class="play_bg" @click.prevent="" :key="'A-'+$i">
				<div class="lamp">
				</div>
				<div class="time-djss"><img :src="time_img" /><span>{{t}}</span></div>
				<div v-for="(tnb,$i) in timenumber" v-if="ksm" class="timenumber" :key="'B-'+$i">
					<img :src="tnb.img" @click.prevent="" :class="tnb.clas">
				</div>
				<div id="myList">
					<div v-for="(cpy,$i) in Company" :class="cpy.Company_state" :id="cpy.oDiv_id" :style="{top:cpy.oDiv_top,left:cpy.oDiv_left,width:cpy.oDiv_width,opacity:cpy.opac,zIndex:cpy.oDiv_zindex}" :key="'C-'+$i" @click="touchs($i,$event)">
						<!--<div class="people" :style="{display:cpy.oDiv_display }"></div>-->
						<img :src="cpy.oDiv_img" :style="{opacity:cpy.opac}"   @click.prevent=""/>
					</div>
				</div>
				<div id="xiaoguolist">
					<div v-for="(clk,$i) in Clk" :class="clk.oDiv_class" :style="{left:clk.oDiv_x,top:clk.oDiv_y,opacity:clk.oDiv_alpha,color:clk.oDiv_color,zIndex:clk.oDiv_zindex}" :key="'D-'+$i">{{clk.oDiv_el}}</div>
				</div>
				<div id="feibaolist">
					<div v-for="(fbs,$i) in Fbs" class="feibiao" :style="{'--top':fbs.oDiv_y,'--left':fbs.oDiv_x,transform:'rotate('+fbs.tan+'deg)'}" :key="'E-'+$i"></div>
				</div>
			</div>
			<van-popup v-model="show" duration="0"  style="background: none" > 
				<div class="sss">
						<img :src="popghongbao" />
						<div class="miane"><img :src="miane[coups]" /></div>
						<div class="buttons" @click="toindex"><img :src="popbtn" /></div>
				</div>
	        </van-popup>
	        <div style="display: none;"><img :src="popghongbao" /></div>
	        <msgBox :msgTxt="msgTxt"></msgBox>
	</div>
</template>
<script>
import URL from "./../../assets/js/api";
	let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
	let session = window.sessionStorage;
	var that = null;
	var timerain;
	var timemsg;
	var opencoup;
	export default {
		name: "ballon",
		created() {
			that = this
			that.initPv()
			let clientWidth = document.body.clientWidth;
			this.coefficient = 12/clientWidth;
			that.box_display = 'block'
		},
		mounted() {
			window.isLogin = (user_id, token, uuid) => {
		      if (user_id) {
			      that.UserInfo.user_id = user_id;
			      that.UserInfo.token = token;
			      that.UserInfo.uuid = uuid;
		      	  that.get_prize()
		      	  that.box_display = 'block'
//			      that.getiswan()
//			      that.djs()
		      } else {
				if(xcx_user){
					this.$wx.jump2login();
				}else{
					this.$.login();
				}
		      }
		    };
	        if (xcx_user) {
		      let user_id = xcx_user.user_id;
		      let token = xcx_user.token;
		      window.isLogin(user_id, token, "wechat");
		    } else {
		      that.$.checkLogin();
		    }
		},
		data(){
			return {
				pikeBtn: true,
				t: 0,
				imgs: [require('./../../assets/images/balloon/youxidi.png')],
				titles: [1],
				//游戏显示
				box_display:'none',
				//顶部提示信息
				Company:[],
				//气球个数
				alls:0,
				time_img:[require('./../../assets/images/balloon/daojishidi.png')],
				//倒数三秒
				timenumber:[
					{
						img:[require('./../../assets/images/balloon/1.png')],
						clas:'djs1 on'
					},
					{
						img:[require('./../../assets/images/balloon/2.png')],
						clas:'djs2 on'
					},
					{
						img:[require('./../../assets/images/balloon/3.png')],
						clas:'djs3 on'
					},
				],
				//气球
				ComImg:[
					require('./../../assets/images/balloon/qiqiu1.png'),
					require('./../../assets/images/balloon/qiqiu2.png'),
					require('./../../assets/images/balloon/qiqiu3.png'),
					require('./../../assets/images/balloon/qiqiu4.png'),
					require('./../../assets/images/balloon/qiqiu5.png')
				],
				//点击信息
				Clk:[],
				qq:false,
				nexts:'',
				feibiao:[require('./../../assets/images/balloon/feibiao.png')],
				coefficient:0,
				Fbs:[],
				show:false,
				popbtn: [require('./../../assets/images/balloon/buttons.png')],
				popghongbao:[require('./../../assets/images/balloon/hongbao.png')],
				miane:[
					   require('./../../assets/images/balloon/a1.png'),
					   require('./../../assets/images/balloon/a2.png'),
					   require('./../../assets/images/balloon/a3.png'),
					   require('./../../assets/images/balloon/a4.png'),
					   require('./../../assets/images/balloon/a5.png')
				],
				coups:4,
				msgTxt:null,
				UserInfo:[],
				ksm:false
			};
		},
		methods: {
			djs() {
				let t = 3;
				that.t = t;
				that.box_display = 'block'
				that.ksm = true
				let time = setInterval(function() {
					that.t--;
					if(that.t <= 0) {
						that.timenumber = []
						clearInterval(time)
						that.rain()
					}
				}, 1000)
			},
			rain() {
			    let t = 10;
			    that.t = t;
			    timerain = setInterval(function() {
			        that.t--
			        if (that.t < 1) {
			            clearInterval(timerain)
			            clearInterval(comein)
			            that.jiesuan()
			            //all:总红包数
			        }
			    }, 1000) 
			    let comein = setInterval(function() {
			        that.build()
			        that.alls++
			    }, 800) //200ms生成一个红包
			},
			build() {
				let oDiv = {}
//				oDiv.oDiv_top = (-Math.floor(Math.random() * 40) + 20) + '%'
				let arr = ["6.2rem","9.62rem","12.75rem"];
				let id = Math.floor((Math.random()*arr.length));
				if(this.nexts == id){
				   if(id == 0){
				   		id = 1
				   }else if (id == 1){
				   		id = 2
				   }else{
				   		id = 0
				   }
				}
				this.nexts = id;
				oDiv.oDiv_left = '12rem'
				oDiv.oDiv_top = arr[id];
			    oDiv.oDiv_width = '2.25rem'
			    oDiv.oDiv_img = that.ComImg[that.randomNum(0,4)]
			    oDiv.opac = 1
			    oDiv.oDiv_id = this.alls;
			    oDiv.oDiv_zindex = 1
			    oDiv.oDiv_display = 'none'
			    oDiv.Company_state = 'redpacket on'
			    oDiv.oDiv_stt = 'running'
				this.Company.push(oDiv)
			},
			touchs(e,v){
//				that.Company[e].oDiv_img = that.ComImg[5]
				this.pikeBtn = false;
		       	that.Company[e].Company_state = 'redpacket off'
	       		that.Company[e].oDiv_zindex = 0;
	       		that.Company[e].oDiv_display = 'block'
	       		that.Company[e].oDiv_stt = 'paused'
	       		that.Company[e].oDiv_left = (v.clientX*this.coefficient-1.5) + "rem"
		        let xia = setInterval(function() {
					that.Company[e].opac = that.Company[e].opac - 0.25
					if(that.Company[e].opac <= 0){
						that.Company[e].oDiv_width = 0
						clearInterval(xia)
					}
		        },100)
			},
			pike(e){
<<<<<<< HEAD
				if(e.clientY*this.coefficient > 5.5 && e.clientY*this.coefficient < 17){
					let oDiv = {}
					let bDiv = {}
					if(this.pikeBtn){
//						let oDiv_x = (e.clientX*this.coefficient) -0.479;
//						let oDiv_y = (e.clientY*this.coefficient) -0.295;
//						oDiv.oDiv_class = 'miss'
//					    oDiv.oDiv_x = oDiv_x  +'rem'
//					    oDiv.oDiv_y = oDiv_y  +'rem'
//					    oDiv.oDiv_alpha = 1
//					    oDiv.oDiv_zindex = 5
//					    this.Clk.push(oDiv)
					}else{
						let oDiv_x = (e.clientX*this.coefficient) -3;
						let oDiv_y = (e.clientY*this.coefficient) -3;
						oDiv.oDiv_class = 'people'
					    oDiv.oDiv_x = oDiv_x  +'rem'
					    oDiv.oDiv_y = oDiv_y  +'rem'
					    oDiv.oDiv_alpha = 1
					    oDiv.oDiv_zindex = 5
					    this.Clk.push(oDiv)
					}
					bDiv.oDiv_x = e.clientX*this.coefficient - 0.2  +'rem'
					bDiv.oDiv_y = e.clientY*this.coefficient - 0 +'rem'
					let a = that.getTanDeg(e.clientX,e.clientY);
					bDiv.tan = -a;
				    this.Fbs.push(bDiv)
					this.pikeBtn = true;					
=======
				let oDiv = {}
				let bDiv = {}
				if(this.pikeBtn){
					let oDiv_x = (e.clientX*this.coefficient) ;
					let oDiv_y = (e.clientY*this.coefficient) ;
					oDiv.oDiv_class = 'miss'
				    oDiv.oDiv_x = oDiv_x  +'rem'
				    oDiv.oDiv_y = oDiv_y  +'rem'
				    oDiv.oDiv_alpha = 1
				    oDiv.oDiv_zindex = 5
				    this.Clk.push(oDiv)
				}else{
					let oDiv_x = (e.clientX*this.coefficient) -3;
					let oDiv_y = (e.clientY*this.coefficient) -3;
					oDiv.oDiv_class = 'people'
				    oDiv.oDiv_x = oDiv_x  +'rem'
				    oDiv.oDiv_y = oDiv_y  +'rem'
				    oDiv.oDiv_alpha = 1
				    oDiv.oDiv_zindex = 5
				    this.Clk.push(oDiv)
>>>>>>> zfb_act
				}
			},
			randomNum(minNum,maxNum){ 
			    switch(arguments.length){ 
			        case 1: 
			            return parseInt(Math.random()*minNum+1,10); 
			        break; 
			        case 2: 
			            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
			        break; 
		            default: 
		                return 0; 
		            break; 
			    }
			},
			get_prize(){
				that.eventEnd();
				let params = {
					'user_id': that.UserInfo.user_id,
					'uuid': that.UserInfo.uuid,
					'token':  that.UserInfo.token,
				}
		        that.$http
		          .get(URL.prickballoon_get_rewards, {
		            params: {
						user_id: that.UserInfo.user_id,
						uuid: that.UserInfo.uuid,
						token:  that.UserInfo.token,
		            }
		          })
		          .then(res => {
		          	that.Fbs = [];
		          	that.Clk = [];
		          	that.Company = [];
		          	if(res.data.result == 1){
		          		if(res.data.data.id){
		          			that.getiswan(res.data.data.id)
		          			that.djs();
		          		}else{
		          			errorLogUpload({
					            logLevel: 3,
					            errType: 21,
					            apiError: {
					                params: params,
					                uri: window.location.href,
					                apiUri: res.request.responseURL,
					                data: res.data,
					                message: 'data.id不存在',
					                method: 'get',
					                code: 200
					            }
					        })
		          			that.msgTxt = '网络开小差了，请重试';
		          		}
		          	}else if(res.data.result == '-43'){
						//已经玩过了
		          		that.msgTxt = res.data.message;
					    timemsg = setTimeout(function() {
					    	that.toindex()
				        },3000)
		          	}else{
		          		//未知情况
		          		errorLogUpload({
					            logLevel: 3,
					            errType: 21,
					            apiError: {
					                params: params,
					                uri: window.location.href,
					                apiUri: res.request.responseURL,
					                data: res.data,
					                message: 'data.result不为1',
					                method: 'get',
					                code: 200
					            }
					        })
					    that.msgTxt = res.data.message;
					    timemsg = setTimeout(function() {
					    	that.toindex()
				        },3000)
		          	}
		          })
		          .catch(error => {
		          		console.log(error)
		          		that.msgTxt = '网络开小差了，请重试';
					    timemsg = setTimeout(function() {
					    	that.toindex()
				        },3000)
		         });
			},
			getiswan(id){
				switch (id){
//	        		case '65':
//	        			that.coups = 0
//	        			break;
//	    			case '66':
//	    				that.coups = 1
//	    				break;
//	    			case '67':
//	    				that.coups = 2
//	    				break;
//	    			case '68':
//	    				that.coups = 3
//	    				break;
//	    			case '69':
//	    				that.coups = 4
//	    				break;
//	        		default:
//	        			that.coups = 0
//	        			break;
	        			
	        		case '170':
	        			this.coups = 0
	        			break;
	    			case '172':
	    				this.coups = 1
	    				break;
	    			case '174':
	    				this.coups = 2
	    				break;
	    			case '175':
	    				this.coups = 3
	    				break;
	    			case '177':
	    				this.coups = 4
	    				break;
	        		default:
	        			this.coups = 0
	        			break;
	        	}
      		},
      		jiesuan(){
			    opencoup = setTimeout(function() {
			    	that.show = true
		        },2000)
      		},
			toindex(){
				//跳转主会场
				that.eventUse()
				// that.$router.push('/index' + this.getPath());
//				that.$router.back(-1);
				if(window.history.length <= 1){
					that.$router.push('/index' + this.getPath());
				}else{
					that.$router.back(-1)
				}
			},
		    // 进入页面发起埋点pv
		    initPv() {
		      this.$.initPv({
		        pageName: "zhounian_04"
		      });
		    },
		    // 扎气球结束埋点
		    eventEnd() {
		      this.$.eventData({
		        pageName: "zhounian_04",
		        elementId: "end"
		      });
		    },
		    // 扎气球使用优惠券
		    eventUse() {
		      this.$.eventData({
		        pageName: "zhounian_04",
		        elementId: "use"
		      });
		    },
		    //计算正切值和角度
		    getTanDeg(x,y) {
		    	let mx = x - 167;
		    	let my = y - 553;
		    	let tan = mx/my;
		    	let result = Math.atan(tan) / (Math.PI / 180);
		        result = Math.round(result);
		        return result;
		    },
		},
	    watch: {
	        Company(v) {
	        	let t = []
	        	if(v.length > 8){	
	        		let list=document.getElementById("myList");
					list.removeChild(list.childNodes[0]);}
	        },
	        Clk(v){
	        	let t = []
	        	if(v.length > 8){	
	        		let list=document.getElementById("xiaoguolist");
					list.removeChild(list.childNodes[0]);}	        	
	        },
	        Fbs(v){
	        	let t = []
	        	if(v.length > 8){	
	        		let list=document.getElementById("feibaolist");
					list.removeChild(list.childNodes[0]);}
	        }
	    },
	  destroyed() {
	    clearTimeout(timerain)
	    clearTimeout(timemsg)
	    clearTimeout(opencoup)
	  }
	};
</script>
<style scoped>
	#xbct {
		background: #080205;
	}
	
	img {
		width: 100%;
	}
	
	*{
	   -webkit-backface-visibility: hidden;
	   -moz-backface-visibility: hidden;
	   -ms-backface-visibility: hidden;
	   backface-visibility: hidden;
       -webkit-transform: translate3d(250px,250px,250px)
	   rotate3d(250px,250px,250px,-120deg)
	   scale3d(0.5, 0.5, 0.5);
	}
	/*单位各种样式*/
	.redpacket {
		position: absolute;
	}
	.redpacket img {
		width: 100%;
	}
	.redpacket.on {
		animation: reddown 1 3s linear forwards;
		animation-play-state:running
	}
	.off {
	    width: 2.5rem;
	    height: 2.5rem;
	    /*background: url('./../../assets/images/balloon/qiqiubaozha.png');*/
	    background-size:auto 2.5rem;
	    animation:reddown 1 3s linear forwards,disappear 1 1s linear forwards;
	    animation-play-state: paused;
	    animation: none!important; 
	}
	.bi{
	    width: 2.5rem;
	    height: 2.5rem;
	    background: url('./../../assets/images/balloon/qiqiubaozha.png');
	    background-size:auto 2.5rem;
		 animation:run 1s steps(7) 0s 1 both
	}
		/*倒数三秒提示*/
	.playbox .timenumber {
		position: absolute;
		font-weight: bold;
		top: 8.8rem;
		left: 0;
		color: #ffe0b1;
		width: 100%;
		height: 6.8rem;
	}
	.playbox .timenumber>img {
		width: 1rem;
		margin: 0 auto;
		opacity: 0;
	}
	.playbox .timenumber>img.djs3 {
		animation-delay: 0s;
		opacity: 1;
	}
	.playbox .timenumber>img.djs2 {
		animation-delay: 1s;
	}
	.playbox .timenumber>img.djs1 {
		animation-delay: 2s;
	}
	.playbox .timenumber .on {
		animation: djs 1 1s linear forwards;
	}
		@keyframes djs {
		0%,
		40% {
			opacity: 1;
			transform: scale(1);
		}
		90%,
		100% {
			opacity: 0;
			transform: scale(3);
		}
	}
	/*游戏盒子*/
	.playbox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	    text-align: center;
	    margin: 0 auto;
		z-index: 10;
		height: 100%;
		background: rgb(210,10,32);
	}

	/*点击特效*/
	/*.heart{
		position: fixed;
		font-size: 1rem;
		color: red;
		pointer-events: none;
		animation: upup 1 1s linear forwards;
<<<<<<< HEAD
		}
=======
		}*/
	

>>>>>>> zfb_act
	/*飞行效果*/
	@keyframes reddown {
		to {
			transform: translate3d(-1000%, 0, 0);
		}
	}
	
	/*MISS*/
	@keyframes miss {
		to{
			background-position: -1500% 0;
		}
	}
	
	/*气球消失效果*/
	@keyframes disappear {
		0%,
		10% {
			opacity: 1;
		}
		90%,
		100% {
			opacity: 0;
		}
	}	

	/*点击屏幕*/
	/*@keyframes upup {
            0%   {transform: translateY(0px);opacity: 1;transform: scale(1);}
            25%  {transform: translateY(-5px);opacity: 0.8;transform: scale(2);}
            50%  {transform: translateY(-10px);opacity: 0.4;transform: scale(3);}
            100% {transform: translateY(-15px);opacity: 0;transform: scale(4);}
	}	*/

.time-djss{
	width: 1.45rem;
	height: 1.45rem;
    position: fixed;
    top: 4.38rem;
    right: 0.44rem;
    z-index: 11;
}
.time-djss span{
	position: absolute;
    top: 0.25rem;
    right: 0;
	width: 1.5rem;
	height: 0.8rem;
	font-family: YuppySC-Regular;
	font-size: 0.8rem;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0;
	color: #ffffff;
	text-align: center;
}

/*.feibiao{
	position: fixed;
	width: 1.50rem;
	height: 4.08rem;
	z-index: 11;
	left: 5.24rem;
	bottom: 0;
	transform: perspective(300)
}*/
.feibiao{
	width: 0.93rem;
	height: 3.1rem;
     position: fixed;
	z-index: 999;
	left: 5.24rem;
	bottom: 0;
     pointer-events: none;
    background: url('./../../assets/images/balloon/feibiao.png') no-repeat;; 
    background-size:auto 0.93rem;
    animation:bill 0.1s steps(1) 0s 1 both,jian 1 0.1s linear forwards;
    --top:10rem;
    --left:10rem
}

/*.feibiao img{
	transform: rotateX(40deg) rotateZ(10deg) scale(0.6) translate(-200%,-500%);
	animation: supers 1.5s steps(9) 0s 10 both;
}*/

.people{
    width: 6rem;
    height: 6rem;
     position: fixed;
     z-index: 999;
     pointer-events: none;
    background: url('./../../assets/images/balloon/qiqiubaozha.png');
    background-size:auto 6rem;
    animation:run 1s steps(7) 0.2s 1 both;
}
	.miss{
	    width: 0.96rem;
	    height: 0.59rem;
	     position: fixed;
	     z-index: 999;
	     pointer-events: none;
	    background: url('./../../assets/images/balloon/zi.png');
	    background-size:auto 0.59rem;
	    animation:miss 1s steps(15) 0.2s 1 both;
	}
.lamp{
    width: 9.38rem;
    height: 3.29rem;
    position: fixed;
    top: 2.2rem;
    left: 1.3rem;
    z-index: 10;
     pointer-events: none;
    background: url('./../../assets/images/balloon/r-lamp.png');
    background-size:9.38rem 3.29rem;
    animation:lamps 1s infinite linear ;
}

@keyframes lamps{
	0%{
		background: url('./../../assets/images/balloon/r-lamp.png');
    	background-size:9.38rem 3.29rem;
	}
	50%{
		background: url('./../../assets/images/balloon/y-lamp.png');
   	 	background-size:9.38rem 3.29rem;
	}
	100%{
		background: url('./../../assets/images/balloon/r-lamp.png');
    	background-size:9.38rem 3.29rem;
	}
}

@keyframes bill {
	0%{
		
	}
	99%{
		
    transform: scale(0.8,1.5);
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}

@keyframes run {
	0%{
		opacity: 0;
	}
	1%{
		opacity: 1;
	}
	99%{
		background-position: -700% 0;
		opacity: 1;
	}
	100%{
		opacity: 0;
	}
}

@keyframes jian{
	from{
		top: 17rem;
		left: 5.24rem;
	}
	to{
		top: var(--top);
		left: var(--left);
	}
}
@keyframes zhuanquan{
	from {transform: rotate(0deg)}
	to {transform: rotate(360deg)}
}
.sss{
	width: 8.89rem;
	height: 9.66rem;
	position: relative;
}
.buttons{
	position: absolute;
	left: 1.94rem;
	bottom: 0.94rem;
	width: 4.91rem;
	height: 1.42rem;
}
.miane{
	position: absolute;
    left: 3.1rem;
    bottom: 4.3rem;
    width: 2.39rem;
    height: 2.15rem;
}
.nolll{
	position: fixed;
	width: 12rem;
	height: 30rem;
	z-index: 99999;
}
</style>