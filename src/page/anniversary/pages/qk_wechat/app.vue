<template>
  <div class="qkcart">
  	<div class="nolll" v-if="nologinn" @click="nologins"></div>
    <div class="bgcolor">
      <div v-for="(img,$i) in banner" :key="'A-'+$i" class="banner">
        <img v-lazy="img" />
      </div>
      <!--分享后点开的小程序页面 -->
      <div class="time-count">
        <div class="time-icon">
          <img :src="pr_icon" />
        </div>
        <div class="time-text-a">中奖后，您购物车里的商品将由淘集集买单，最高33元！</div>
        <div class="time-text-b">未抽中，也有100%大奖等着你！</div>
        <div class="time-djs">
          <div class="time-djs-kj">
            <div class="time-djs-kj-top">开&nbsp;&nbsp;&nbsp;奖</div>
            <div class="time-djs-kj-bottom">倒计时</div>
          </div>
          <div class="time-djs-show">
            <div class="time-djs-show-day">
              <img :src="time_img" />
              <span class="time-day">{{day | Ten}}</span>
            </div>
            <div class="time-djs-show-hh-a">
              <img :src="time_img" />
              <span class="time-day">{{day | Bitr}}</span>
            </div>
            <span class="time-djs-show-day-text">天</span>
            <div class="time-djs-show-hh-a">
              <img :src="time_img" />
              <span class="time-day">{{hour | Ten}}</span>
            </div>
            <div class="time-djs-show-hh-b">
              <img :src="time_img" />
              <span class="time-day">{{hour | Bitr}}</span>
            </div>
            <span class="time-djs-show-day-text">时</span>
            <div class="time-djs-show-hh-a">
              <img :src="time_img" />
              <span class="time-day">{{minute | Ten}}</span>
            </div>
            <div class="time-djs-show-hh-b">
              <img :src="time_img" />
              <span class="time-day">{{minute | Bitr}}</span>
            </div>
            <span class="time-djs-show-day-text">分</span>
            <div class="time-djs-show-hh-a">
              <img :src="time_img" />
              <span class="time-day">{{second | Ten}}</span>
            </div>
            <div class="time-djs-show-hh-b">
              <img :src="time_img" />
              <span class="time-day">{{second | Bitr}}</span>
            </div>
            <span class="time-djs-show-day-text">秒</span>
          </div>
        </div>
        <div class="m-40"></div>
        <div
          class="time-give"
          :style="{background:button_bgcolor}"
          @click="getCoupon"
          :class="buttonstats == 3 ? 'time-give yllll':'time-give'"
        >{{button_text}}</div>
        <div class="m-30"></div>
      </div>
      <div class="goods-model">
        <div class="title-count-goods">
          <img :src="icon_tuijianwei" />精品推荐
          <img :src="icon_tuijianwei" />
        </div>
        <div class="goods-model-list">
          <div
            class="goods-model-list-goods"
            v-for="(goods,$i) in dataSlice(goodsData)"
            :key="'G-'+$i"
            @click="toGoods(goods.goodsId, goods.goodsName,goods.totalStock)"
          >
            <div class="goods-img">
              <img :src="goods.img640Url" />
            </div>
            <div class="goods-name">{{ goods.goodsName }}</div>
            <div class="goods-bottom">
              <div class="goods-bottom-price">
                <font>¥</font>
                {{ goods.minGroupPrice }}
              </div>
              <div class="goods-bottom-button go_buy" v-if="goods.totalStock">
              		<span>去购买</span>
              </div>
              <div class="goods-bottom-button nobuy" v-else>
              		<span>已售完</span>
              </div>
            </div>
          </div>
          
          <div v-if="havegoods" style="width: 11rem;font-size: 0.6rem;text-align: center;">网络开小差了~请重试</div>
        </div>
      </div>

      <div class="rules" @click="show_rule">
        <img :src="rule" />
      </div>
    </div>
    <van-popup v-model="rule_show" duration="0" style="background: none">
      <div class="close" @click="not_show()">
        <img :src="close_icon" />
      </div>
      <div class="rule-detail" @click="not_show()">
        <div class="rule-detail-title">清空购物车攻略</div>
        <div class="rule-detail-p">
          <span>一、开奖时间</span>
          <br />8月18日 晚8点
          <br /><span>二、奖品是什么</span>
          <br />开奖后，您购物车里的商品将由淘集集买
          <br />单，最高33元。我们会给您的账户发放满
          <br />33.01元减33元的平台优惠券，有效期为自
          <br />领取起，24小时内生效
          <br /><span>三、如何参与活动</span>
          <br />通过参加任务，可以获得抽奖券，一人可获
          <br />得多张（最多不超过20张）
          <br />1）分享活动页面给好友，好友参与后，您
          <br />和好友各得一张抽奖券；
          <br />2）在活动页中点击“去下单”，任意支付
          <br />一笔订单，再得一张抽奖券（每天仅限1次）
          <br />
        </div>
      </div>
    </van-popup>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
import { countDown } from "@/assets/js/common/utils";
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
let session = window.sessionStorage;
var that;
export default {
  data() {
    return {
      banner: [require("./../../assets/images/qkcart/bg1@2x.png")],
      pr_icon: [require("./../../assets/images/qkcart/prize@2x.png")],
      time_img: [require("./../../assets/images/qkcart/icon_daojishi@2x.png")],
      rule: [require("./../../assets/images/qkcart/rule@2x.png")],
      icon_tuijianwei: [
        require("./../../assets/images/qkcart/icon_tuijianwei@2x.png")
      ],
      head_imgs: [require("./../../assets/images/qkcart/7.jpg")],
      goods_imgs: [require("./../../assets/images/qkcart/goods.jpg")],
      tanchuang: [require("./../../assets/images/qkcart/tanchuang1@2x.png")],
      close_icon: [require("./../../assets/images/qkcart/close@2x.png")],
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      nologinn:true,
      rule_show: false,
      button_text: "领取抽奖券",
      button_bgcolor: "#FFBC01",
      goodsIdData: "",
      goodsData: [],
      share_id: "",
      UserInfo: [],
      buttonstats:1,
      is_kaijiang:false,
      havegoods:false,
      msgTxt:null,
      qgm:'去购买',
      ysq:'已售完'
    };
  },
  created() {
    that = this;
    that.get_GoodsList();
    that.initPv();
    window.isLogin = (user_id, token, uuid) => {
      if (user_id) {
      	that.nologinn = false;
        let stt = window.location.pathname;
        let arr=stt.split('/');
        let ins = 0;
        arr.map((el, i) => {
            if(el == 'share_id'){
            	ins = i+1;	
            };
        });
        console.log(arr[ins])
        let share_id = arr[ins];
        if (share_id) {
          that.share_id = share_id;
          that.UserInfo.user_id = user_id;
          that.UserInfo.token = token;
          that.UserInfo.uuid = uuid;
          that.getUserInfo(user_id, token, uuid, share_id);
        }
      } else {
        if (this.$.xcx()) {
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
      this.$.checkLogin();
    }
  },
  filters: {
    Ten(time) {
      let t = parseInt((time % 100) / 10);
      return t;
    },
    Bitr(time) {
      let t = parseInt(time % 10);
      return t;
    },
    Buttons(stats) {
      let t = "";
      switch (stats) {
        case 1:
          t = "100%好礼免费领";
          break;
        case 2:
          t = "领取抽奖券";
          break;
        case 3:
          t = "已领取";
          break;
        default:
          t = "100%好礼免费领";
          break;
      }
      return t;
    }
  },
  methods: {
    countDownInit(time) {
      countDown(time, function(val) {
        that.day = val.day;
        that.hour = val.hour;
        that.minute = val.minute;
        that.second = val.second;
        if(val.day == 0 && val.hour == 0 && val.minute == 0 && val.second == 0){
        	 that.getUserInfo(that.UserInfo.user_id, that.UserInfo.token, that.UserInfo.uuid, that.share_id);
        }
      });
    },
    show_rule() {
      that.rule_show = true;
    },
    not_show() {
      that.rule_show = false;
    },
    wechat_coupon() {
      that.button_text = "已领取";
      that.button_bgcolor = "#C3C3C3";
      that.buttonshad = "0 0.062rem 0.2rem 0 rgba(195,195,195,1)";
    },
    getUserInfo(user_id, token, uuid, share_user_id) {
      that.$http
        .get(this.$api.clear_sharePage, {
          params: {
            user_id: user_id,
            token: token,
            uuid: uuid,
            share_user_id: share_user_id
          }
        })
        .then(res => {
          if (res.data.result == 1) {
            if (res.data.data) {
              if (res.data.data.button == 3) {
                that.button_text = "已领取";
                that.button_bgcolor = "#C3C3C3";
                that.buttonstats = 3;
              } else if (res.data.data.button == 2) {
                that.button_text = "领取抽奖券";
                that.buttonstats = 2;
              } else if (res.data.data.button == 1) {
                that.button_text = "100%好礼免费领";
                that.buttonstats = 1;
              } else if (res.data.data.button == 4) {
                //跳转情况购物车
                that.$router.push("/qkcart" + this.getPath());
              }
              that.get_GoodsList();
              if(res.data.data.countDown > 0){
              	that.countDownInit(res.data.data.countDown);
              	that.is_kaijiang = false;
              }else{
              	that.is_kaijiang = true;
              	that.$router.push("/qkcart" + this.getPath());
              }
            } else {
            	that.msgTxt = '网络开小差了~请重试';
	            errorLogUpload({
				            logLevel: 3,
				            errType: 21,
				            apiError: {
				                params: '',
				                uri: window.location.href,
				                apiUri: res.request.responseURL,
				                data: res.data,
				                message: 'data为空',
				                method: 'get',
				                code: 200
				            }
				        })              	
            }
          } else {
          	that.msgTxt = '网络开小差了~请重试';
	            errorLogUpload({
				            logLevel: 3,
				            errType: 21,
				            apiError: {
				                params: '',
				                uri: window.location.href,
				                apiUri: res.request.responseURL,
				                data: res.data,
				                message: 'resule不为1',
				                method: 'get',
				                code: 200
				            }
				        })           	
          }
        })
        .catch(error => {that.msgTxt = '网络开小差了~请重试';});
    },
    getCoupon() {
      if (that.buttonstats == 2) {
        that.$http
          .get(this.$api.clear_getShare, {
            params: {
              share_user_id: that.share_id
            }
          })
          .then(res => {
            if (res.data.result == 1) {
              that.button_text = "已领取";
              that.button_bgcolor = "#C3C3C3";
              that.buttonstats = 3;
            } else {
            	that.msgTxt = res.data.message;
	            errorLogUpload({
				            logLevel: 3,
				            errType: 21,
				            apiError: {
				                params: '',
				                uri: window.location.href,
				                apiUri: res.request.responseURL,
				                data: res.data,
				                message: 'result不为1',
				                method: 'get',
				                code: 200
				            }
				        })             	
            }
          })
          .catch(error => {
          	that.msgTxt = res.data.message;
          });
      } else if (that.buttonstats == 1) {
        //跳转签到
        that.$router.push("/sign" + this.getPath());
      }
    },
    get_GoodsList() {
      that.$http
        .get(this.$api.goods_list, {
          params: {
            activity_id: "1",
            coordinate: "1-3-1"
          }
        })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.result == "1") {
            that.goodsIdData = data.data.goods_ids;
            that.get_GoodsInfo();
          } else {
            that.msgTxt = data.message;
            that.havegoods = true
            errorLogUpload({
			            logLevel: 3,
			            errType: 21,
			            apiError: {
			                params: '',
			                uri: window.location.href,
			                apiUri: res.request.responseURL,
			                data: res.data,
			                message: 'result不为1，获取商品坐标失败',
			                method: 'get',
			                code: 200
			            }
			        })             
          }
        })
        .catch(error => {that.havegoods = true});
    },
    get_GoodsInfo() {
      let params = {
        page: 1,
        pageSize: 20,
        goodsIds: that.goodsIdData,
        stockNullShow:1,
        orderType:0
      };
      this.$http.post(this.$api.goods_info, params).then(javaRes => {
        let javaData = javaRes.data;
        console.log(javaData.data);
        if (javaData.status == "1") {
          that.goodsData = javaData.data.slice(0,20);
          that.loading = true;
        } else {
          that.msgTxt = javaData.message;
            errorLogUpload({
			            logLevel: 3,
			            errType: 21,
			            apiError: {
			                params: '',
			                uri: window.location.href,
			                apiUri: javaRes.request.responseURL,
			                data: javaRes.data,
			                message: 'status不为1，获取商品列表失败',
			                method: 'get',
			                code: 200
			            }
			        })             
        }
      });
    },
    // 数据截取
    dataSlice(data) {
      let dataLength = data.length;
      let yNum = dataLength % 2;
      if (yNum != 0 && dataLength > 1) {
        data = data.slice(0, dataLength - yNum);
      }
      return data;
    },
    nologins(){
			if (this.$.xcx()) {
				this.$wx.jump2login();
			}else{
				this.$.login();
			}    	
    },
    // 跳转商品 name传值 埋点开关
    toGoods(id,name,num) {
       if(num){
				this.$.jump2good({
	        goodsId: id,
	        goodsName: name,
	        elementId: "good_detail",
	        pageName: "zhounian_05"
	      });
       }else{
          that.msgTxt ="该商品已售罄"
       }
    },
		// 进入页面发起埋点pv
    initPv() {
      this.$.initPv({
        pageName: "zhounian_05"
      });
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
  display: block;
}
.banner {
  height: 8rem;
}
.qkcart {
  background: #480866;
}
.bgcolor {
  padding-bottom: 1rem;
  background: #480866;
}
/*倒计时栏目*/
.time-count {
  width: 11.484rem‬;
  height: auto;
  margin: 0 0.32rem 0.252rem;
  background: #ffffff;
  border-radius: 0.32rem;
}
.time-icon {
  width: 1.92rem;
  margin-left: 0.516rem;
}
.time-text-a {
  width: 10.5rem;
  height: 0.4512rem;
  font-size: 0.4158rem;
  color: #333333;
  margin-top: 0.639rem;
  margin-left: 0.516rem;
  margin-right: 0.48rem;
}
.time-text-b {
  font-size: 0.4158rem;
  color: #333333;
  margin-left: 0.516rem;
  margin-top: 0.319rem;
}

.time-djs {
  height: 0.959rem;
  margin-top: 0.959rem;
  margin: 0.959rem 0.516rem 0 0.516rem;
  float: left;
}
.time-djs-kj {
	font-weight: bold;
  float: left;
}
.time-djs-kj-top {
  width: 1.416rem;
  height: 0.4512rem;
  font-size: 0.44rem;
  font-family: PingFangSC-Semibold;
  text-align: justify;
  line-height: 0.44rem;
}
.time-djs-kj-bottom {
  width: 1.416rem;
  height: 0.4512rem;
  margin-top: 0.0639rem;
  font-size: 0.44rem;
  font-family: PingFangSC-Semibold;
  text-align: justify;
  line-height: 0.44rem;
}
.time-djs-show {
  float: left;
  margin-left: 0.7916rem;
  width: 7.836rem;
}
.time-djs-show-day {
  width: 0.6397rem;
  height: 0.9596rem;
  position: relative;
  float: left;
}
.time-djs-show-day-text {
  width: 0.3838rem;
  height: 0.3838rem;
  font-size: 0.3838rem;
  font-family: PingFangSC-Regular;
  margin-top: 0.5752rem;
  margin-left: 0.0959rem;
  float: left;
}
.time-djs-show-hh-a {
  width: 0.6397rem;
  height: 0.9596rem;
  margin-left: 0.1rem;
  position: relative;
  float: left;
}
.time-djs-show-hh-b {
  width: 0.6397rem;
  height: 0.9596rem;
  margin-left: 0.1279rem;
  position: relative;
  float: left;
}
.time-djs:after {
  clear: both;
  content: "";
  visibility: hidden;
}
.time-day {
  position: absolute;
  width: 50%;
  height: 100%;	
  top: 0.1919rem;
  left: 0.1599rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.5757rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.5757rem;
}

/**/
.time-give {
  width: 10.464rem;
  height: 1.408rem;
  margin: 0 auto;
  background: #ffbc01;
  border-radius: 0.704rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.64rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  font-weight: bold;
  line-height: 1.408rem;
  box-shadow: 0 0.062rem 0.2rem 0 rgba(255,188,1,1);
}

/**/

.rules {
  position: absolute;
  right: 0;
  width: 1.92rem;
  top: 0.32rem;
  height: 0.67rem;
}

.m-12 {
  clear: both;
  height: 0.384rem;
}
.m-14 {
  clear: both;
  height: 0.448rem;
}
.m-16 {
  clear: both;
  height: 0.512rem;
}
.m-18 {
  clear: both;
  height: 0.576rem;
}
.m-20 {
  clear: both;
  height: 0.64rem;
}
.m-24 {
  clear: both;
  height: 0.768rem;
}
.m-30 {
  clear: both;
  height: 0.96rem;
}
.m-32 {
  clear: both;
  height: 1.024rem;
}
.m-40 {
  clear: both;
  height: 1.28rem;
}
/*商品头部标题*/
.title-count-goods {
  height: 0.8rem;
  width: auto;
  margin-left: 3.6rem;
  margin-bottom: 0.64rem;
  margin-top: 0.768rem;
  overflow: hidden;
  font-family: PingFangSC-Semibold;
  font-size: 0.576rem;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
  font-weight: bold;
  line-height: 0.699rem;
  display: flex;
  
}
/*商品头部小图标*/
.title-count-goods img {
  margin: 0.1rem 0.192rem 0 0.192rem;
  width: 0.448rem;
  height: 0.448rem;
}
/*商品样式*/
.goods-model {
  width: 11.484rem‬;
  height: auto;
  margin: 0 0.32rem 0.252rem;
  overflow: hidden;
  background: #ffffff;
  border-radius: 0.32rem;
  padding-bottom: 0.32rem;
}
.goods-model-list {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}
.goods-model-list-goods {
  width: 5.28rem;
  height: 7.744rem;
  overflow: hidden;
  margin-left: 0.32rem;
  margin-bottom: 0.64rem;
}
.goods-name {
  font-family: PingFangSC-Regular;
  font-size: 0.384rem;
  height: 1.024rem;
  font-weight: normal;
  font-stretch: normal;
  min-height: 1.2rem;
  line-height: 0.57rem;
  letter-spacing: 0px;
  margin-left: 0.128rem;
  margin-right: 0.128rem;
  margin-top: 0.32rem;
  color: #333333;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods-bottom {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
}
.goods-bottom-price {
  font-family: PingFangSC-Semibold;
  width: 2.944rem;
  height: 0.512rem;
  margin-top: 0.13rem;
  font-size: 0.512rem;
  color: #ff346c;
  letter-spacing: 0;
  font-weight: bold;
  line-height: 0.576rem;
}
.goods-bottom-price font {
  font-size: 0.32rem;
}
.goods-bottom-button {
  width: 2.112rem;
  height: 0.832rem;
  background: #ffbc01;
  border-radius: 0.6rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.384rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.832rem;
}
/*弹窗*/
.rule-detail {
  width: 9.44rem;
  height: 16.8rem;
  background: #ffffff;
  border-radius: 0.32rem;
  overflow: hidden;
}
.rule-detail-title {
  font-family: PingFangSC-Medium;
  font-size: 0.64rem;
  color: #333333;
  letter-spacing: 0;
  font-weight: bold;
  text-align: center;
  line-height: 0.64rem;
  margin: 0.96rem auto;
}
.rule-detail-p {
  width: 7.904rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.416rem;
  color: #333333;
  letter-spacing: 0;
  text-align: justify;
  line-height: 0.896rem;
  margin-top: 0.96rem;
  margin-left: 0.768rem;
}
.rule-detail-p span{
	font-weight: bold;
}
.goods-img{
	width: 5.28rem;
	height:5.28rem
}
.close {
  width: 0.72rem;
  height: auto;
  margin-right: 0.1rem;
  float: right;
  background: none;
}
.go_buy{
	background:#ffbc01;
	color:#ffffff
}
.nobuy{
	background:#c7c7c7;
	color:#ffffff;
}
.nolll{
	position: fixed;
	width: 12rem;
	height: 30rem;
	z-index: 9999;
}
.yllll{
	box-shadow: 0 0.062rem 0.2rem 0 rgba(195,195,195,1);
}
</style>

