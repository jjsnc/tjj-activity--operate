<template>
  <div class="qkcart">
  	<div class="nolll" v-if="nologinn" @click="nologins"></div>
    <div class="bgcolor">
      <div v-for="(img,$i) in banner" :key="'A-'+$i" class="banner">
        <img v-lazy="img" />
      </div>
      <div class="time-count" v-if="!is_kaijiang">
        <div class="time-icon">
          <img :src="pr_icon" />
        </div>
        <div class="time-text-a">中奖后，您购物车里的商品将由淘集集买单，最高33元！</div>
        <div class="time-text-b">未抽中，也有100%大奖等着你！</div>
        <div class="time-djs">
          <div class="time-djs-kj">
            <div class="time-djs-kj-top">开奖</div>
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
        <div class="m-32"></div>
      </div>
      <!-- 分享券列表 -->
      <div class="buy-count" v-if="(c_is_share || c_is_buy) && !is_kaijiang">
        <div class="m-18"></div>
        <div class="share-count-title">
          <img :src="icon_happy" />
          <span>已获得{{coucount}}张抽奖券</span>
        </div>
        <div class="m-24"></div>
        <div class="share-count-share">
          <div class="share-count-share-text">分享给好友，我和他各得一张抽奖券</div>
          <div class="share-count-share-button" @click="go_share">去分享</div>
        </div>
        <div class="m-12"></div>
        <div class="share-count-share">
          <div class="share-count-share-text">完成下单，再得一张（一天仅一次）</div>
          <div class="share-count-share-button" @click="go_buy">去下单</div>
        </div>
        <div class="m-24"></div>

        <div v-for="(coups,$i) in coups_buy" :key="'B-'+$i">
          <div class="share-count-tickets">
            <img :src="tickets" />
            <div class="share-count-tickets-title">抽奖券</div>
            <div class="share-count-tickets-number">编号：{{coups.id}}</div>
            <div class="share-count-tickets-opentime">开奖时间： {{userInfos.openTime}}</div>
            <div class="share-count-tickets-stats">{{coups.status | coupstats}}</div>
          </div>
          <div class="m-14"></div>
        </div>
        <div v-for="(coups,$i) in coups_share" :key="'W-'+$i">
          <div class="share-count-tickets">
            <img :src="tickets" />
            <div class="share-count-tickets-title">抽奖券</div>
            <div class="share-count-tickets-number">编号：{{coups.id}}</div>
            <div class="share-count-tickets-opentime">开奖时间： {{userInfos.openTime}}</div>
            <div class="share-count-tickets-stats">{{coups.status | coupstats}}</div>
          </div>
          <div class="m-14"></div>
        </div>
        <div class="share-count-bottom">已放入 我的 - 优惠券 - 抽奖券</div>
        <div class="m-24"></div>
      </div>
      <!-- 没有任何券 -->
      <div class="buy-count" v-if="(!c_is_share && !c_is_buy) && !is_kaijiang">
        <div class="m-18"></div>
        <div class="share-count-title">
          <img :src="icon_weep" />
          <span>我暂未获得抽奖券</span>
        </div>
        <div class="m-24"></div>
        <div class="share-count-share">
          <div class="share-count-share-text">分享给好友，我和他各得一张抽奖券</div>
          <div class="share-count-share-button" @click="go_share">去分享</div>
        </div>
        <div class="m-12"></div>
        <div class="share-count-share">
          <div class="share-count-share-text">完成下单，再得一张（一天仅一次）</div>
          <div class="share-count-share-button" @click="go_buy">去下单</div>
        </div>
        <div class="m-16"></div>
      </div>
      <!-- 开奖之后 -->
      <div class="time-count" v-if="is_kaijiang">
        <div class="time-icon">
          <img :src="pr_icon" />
        </div>
        <div class="time-text-a">中奖后，您购物车里的商品将由淘集集买单，最高33元！</div>
        <div class="time-text-c">{{is_zhongjiang | couponTitle}}</div>
        <div class="m-30"></div>

        <div v-for="(coups,$i) in couponList" :key="'E-'+$i">
          <div class="share-count-tickets">
            <img :src="tickets" />
            <div class="share-count-tickets-title">抽奖券</div>
            <div class="share-count-tickets-number">编号：{{coups.id}}</div>
            <div class="share-count-tickets-opentime">开奖时间： {{userInfos.openTime}}</div>
            <div class="share-count-tickets-stats" :style="{color:coups.status==1?'#FF346C':'#FFFFFF'}">{{coups.status | coupstats}}</div>
          </div>
          <div class="m-12"></div>
        </div>
        <div
          class="time-give"
          :style="{background:btn_color}"
          @click="cart_clear()"
          :class="btn_stats == 3 ? 'time-give yllll' : 'time-give'"
        >{{ btn_stats | couponButton}}</div>
        <div v-if="is_zhongjiang">
          <div class="m-14"></div>
          <div class="buy-count-ts" @click="kjgo_sha">{{ btn_stats | couponbottom}}</div>
        </div>

        <div class="m-30"></div>
      </div>
      <!-- 中奖人 -->
      <div class="user-count" v-if="is_kaijiang && !is_zhongjiang">
        <div class="m-24"></div>
        <div class="title-count-user">
          <img :src="icon_tuijianwei" />TA们刚刚中奖了!
          <img :src="icon_tuijianwei" />
        </div>

        <div class="luck-user" v-for="(luck,$i) in lucklist" :key="'C-'+$i">
          <div class="user-head-img">
            <img :src="luck.userIcon" />
          </div>
          <div class="user-center">
            <div class="user-name">{{luck.user}}</div>
            <div class="user-text">
              共清空{{luck.num}}件商品，赚得
              <font>¥{{luck.price}}</font>
            </div>
          </div>
          <div class="user-time">{{luck.time}}秒前</div>
        </div>
      </div>
      <!--商品列表-->
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
            @click="toGoods(goods.goodsId, goods.goodsName, goods.totalStock)"
          >
            <div class="goods-img">
              <img :src="goods.img640Url" />
            </div>
            <div class="goods-name">{{ goods.goodsName }}</div>
            <div class="goods-bottom">
              <div class="goods-bottom-price">
                <font>¥</font>{{goods.minGroupPrice}}</div>
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
      <!--<div class="rules" @click="show_rule"><img :src="rule" /></div>-->
      <div class="rules" @click="show_rule">
        <img :src="rule" />
      </div>
    </div>
    <van-popup v-model="rule_show" duration="0" style="background: none">
      <div class="close" @click="not_show(0)">
        <img :src="close_icon" />
      </div>
      <div class="rule-detail">
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

    <van-popup v-model="lottery_show" duration="0" style="background: none">
      <div class="close" @click="not_show(1)">
        <img :src="close_icon" />
      </div>
      <div class="lottery">
        <img :src="tanchuang" />
        <div class="lottery-title" :style="{top:isPop!=2?'1rem':'0.64rem'}" v-html="Popup_title"></div>
        <div class="lottery-bz" v-if="isPop!=2?false:true">*下单任务一天仅限完成一次</div>
        <div class="lottery-yhq">抽奖券</div>
        <div class="lottery-yhq-a">清空购物车</div>
        <div class="lottery-button" @click="get_coupon">{{Popup_button}}</div>
      </div>
    </van-popup>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
//  //清空购物车主页面
//  clear_clearPage: `${fissileUrl}/Clear/clearPage/showLoading/1`,
//  //立即清空购物车
//  clear_clearCart: `${fissileUrl}/Clear/clearCart/showLoading/1`,
//  //TA们刚刚中奖了
//  clear_clearScroll: `${fissileUrl}/Clear/clearScroll/showLoading/1`,
//  //清空购物车分享页面
//  clear_sharePage: `${fissileUrl}/Clear/sharePage/showLoading/1`,
//  //清空购物车分享领券接口
//  clear_getShare: `${fissileUrl}/Clear/getShare/showLoading/1`,
//  //清空购物车去下单
//  clear_click: `${fissileUrl}/Clear/click/showLoading/1`,
//  //下单领券
//  clear_getOrder: `${fissileUrl}/Clear/getOrder/showLoading/1`,
//  //抽奖券列表
//  clear_couponList: `${fissileUrl}/Clear/couponList/showLoading/1`,
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
      icon_happy: [require("./../../assets/images/qkcart/icon_happy@2x.png")],
      icon_weep: [require("./../../assets/images/qkcart/icon_weep@2x.png")],
      tickets: [require("./../../assets/images/qkcart/tickets@2x.png")],
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
      rule_show: false,
      lottery_show: false,
      lottery_title: 0,
      Popup: 0,
      nologinn:true,
      Popup_title: "",
      Popup_button: "",
      join_man: 1356797,
      userInfos: [],
      cartdata: { result: 1, message: "请求成功", data: "领取成功" },
      luckdog: {},
      lucklist: [],
      coups_share: [],
      coups_buy: [],
      couponList: [],
      is_zhongjiang: false,
      btn_color: "",
      btn_stats: 0,
      is_kaijiang: false,
      c_is_share: false,
      c_is_buy: false,
      UserInfo: [],
      msgTxt: null,
      goodsIdData: "",
      goodsData: [],
      isPop: 0,
      Popup_buttonstats:1,
      havegoods:false,
      havecop:false,
      coucount:1,
      qgm:'去购买',
      ysq:'已售完'
    };
  },
  created() {
    that = this;
    // that.getUserInfo();
    that.initPv()
    that.get_GoodsList();
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
		if (user_id) {
		that.nologinn = false;
		that.UserInfo.user_id = user_id;
		this.getUserInfo();
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
		that.$.checkLogin();
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
    coupstats(stats) {
      let t = "";
      let countDown = 0;
      if (that.userInfos.countDown) {
        countDown = that.userInfos.countDown;
      }
      switch (stats) {
        case 0:
          if (countDown <= 0) {
            t = "未中奖";
          } else {
            t = "未开奖";
          }
          break;
        case 1:
          if (countDown <= 0) {
            t = "已中奖";
          } else {
            t = "未开奖";
          }
          break;
        default:
          t = "未中奖";
          break;
      }
      return t;
    },
    couponTitle(params) {
	  let t = "很遗憾未中奖，送你100%中奖机会!";
	  if(!that.havecop){
		t = " 活动已结束，送你100%中奖机会"
	  }
      if (params) {
        t = "恭喜！！你的购物车即将被清空";
      }
      return t;
    },
    couponButton(stats) {
      let t = "";
      switch (stats) {
        case 2:
          t = "立即清空购物车";
          break;
        case 3:
          t = "已领取";
          that.btn_color = '#C3C3C3'
          break;
        default:
          t = "100%好礼免费领";
          break;
      }
      return t;
    },
    couponbottom(stats) {
      let t = "";
      if (stats == 2) {
        t = "*请在24小时内完成清空，逾期失效";
      } else if (stats == 3) {
        t = "*请在购物车中使用平台优惠券进行支付";
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
        	that.getUserInfo()
        }
      });
    },
    show_rule() {
      that.rule_show = true;
    },
    show_lottery(id) {
      switch (id) {
        case 0:
          break;
        case 1:
          that.Popup_title = "送你一张抽奖券，分享给好友<br />打开后即可开大奖！";
          that.Popup_button = "领取抽奖券";
          that.Popup_buttonstats = 1;
          that.lottery_show = true;
          break;
        case 2:
          that.Popup_title =
            "已有" +
            that.join_man +
            "人参与，快去下单吧，<br>中奖概率 <span>翻倍</span>！";
          that.Popup_button = "抽奖券+1";
          that.Popup_buttonstats = 2;
          that.lottery_show = true;
          break;
        default:
          break;
      }
    },
    not_show(val) {
      if (val == 0) {
        that.rule_show = false;
      } else {
        that.lottery_show = false;
      }
    },
    get_coupon() {
      that.lottery_show = false;
      that.go_sha();
    },
    getUserInfo() {
      let err = "getUserInfo";
      that.$http
        .get(this.$api.clear_clearPage)
        .then(res => {
          if (res.data.result == 1) {
            if (res.data.data) {
              that.clear_main(res.data.data);
            } else {
              that.catch_throw(err);
              that.msgTxt = '网络开小差了~请重试'
            }
          } else {
            that.catch_throw(err);
            that.msgTxt = '网络开小差了~请重试'
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
          that.catch_throw(err);
          that.msgTxt = '网络开小差了~请重试'
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
    clear_main(data) {
      console.log(data);
      that.userInfos = data;
      console.log(that.userInfos);
      that.join_man = data.popNum > 999999 ? '999999+' : data.popNum; //人数大于999999 显示999999+
      if (data.countDown > 0) {
        //未开奖
        that.couplist(false, data);
        that.countDownInit(data.countDown);
        that.show_lottery(data.isPop);
        that.isPop = data.isPop;
      } else {
        //已开奖
        that.couplist(true, data);
        that.luckdog_list();
      }
    },
    cart_clear() {
      if (that.btn_stats == 2) {
        if (that.UserInfo.user_id) {
          //立即清空购物车
          that.$http
            .get(this.$api.clear_clearCart)
            .then(res => {
              if (res.data.result == 1) {
                that.btn_stats = 3;
                that.msgTxt = "领取成功";
                that.eventQingkong();
              } else {
                that.msgTxt = "领取失败，请重试";
                errorLogUpload({
				            logLevel: 3,
				            errType: 21,
				            apiError: {
				                params: '',
				                uri: window.location.href,
				                apiUri: res.request.responseURL,
				                data: res.data,
				                message: '用户领取失败',
				                method: 'get',
				                code: 200
				            }
				        })
              }
            })
            .catch(error => {
              that.msgTxt = "领取失败，请重试";
            });
        } else {
          if (this.$.xcx()) {
            this.$wx.jump2login();
          } else {
            this.$.login();
          }
        }
      } else if (that.btn_stats == 3) {
      } else {
        //100好礼 跳转签到
        that.eventFree();
        that.$router.push("/sign" + this.getPath());
      }
    },
    luckdog_list() {
      let err = "luckdog";
      that.$http
        .get(this.$api.clear_clearScroll)
        .then(res => {
          if (res.data.result == 1) {
            if (res.data.data) {
              let data = res.data.data;
              data.map((el, i) => {
                that.lucklist.push(el);
              });
            } else {
              that.catch_throw(err);
            }
          } else {
            that.catch_throw(err);
          }
        })
        .catch(error => {
          that.catch_throw(err);
        });
    },
    couplist(is_kaijiang, data) {
      if (is_kaijiang) {
        let is_zhongjiang = false; //是否中奖
        let is_lingquan = false; //是否领取
        let btn_stats = 0;
        if (data.button) {
          if (data.button == 3) {
            is_lingquan = true;
          }
          btn_stats = data.button;
        }
        if(data.couponList.length > 0){
        	that.havecop = true
        }
        if (data.couponList) {
          data.couponList.map((el, i) => {
            if (el.status == 1) {
              is_zhongjiang = true;
            }
          });
        }
        that.btn_color = is_lingquan ? "#C3C3C3" : "#FFBC01";
        that.btn_stats = btn_stats;
        that.couponList = data.couponList;
        that.is_zhongjiang = is_zhongjiang;
        that.is_kaijiang = is_kaijiang;
      } else {
        if (data.couponList.length > 0) {
          let have_share = false;
          let have_buy = false;
          data.couponList.map((el, i) => {
            console.log(el);
            if (el.type == 1 || el.type == 2) {
              have_share = true;
              that.coups_share.push(el);
            } else if (el.type == 0) {
              have_buy = true;
              that.coups_buy.push(el);
            }
          });
		  that.coucount = data.couponList.length;
          that.c_is_share = have_share;
          that.c_is_buy = have_buy;
          console.log(this.coups_share);
        } else {
          // console.log(11111111)
          // console.log(this.userInfos)
          // console.log(11111111)
        }
      }
    },
    catch_throw(param) {
      let data;
      switch (param) {
        case "luckdog":
          data = that.luckdog.data;
          data.map((el, i) => {
            this.lucklist.push(el);
          });
          break;
        case "getUserInfo":
          let data = 1566129600 - Date.parse(new Date()) / 1000;
          if (data > 0) {
            that.countDownInit(data);
          } else {
            that.is_kaijiang = true;
          }
          break;
        default:
          break;
      }
    },
    go_buy() {
      that.eventBuy();
      if (that.UserInfo.user_id) {
        that.$http
          .get(this.$api.clear_click)
          .then(res => {
            if (res.data.result == 1) {
//            that.$router.push("/index" + this.getPath());
               let msUrl = window.location.host=="activity.taojiji.com"?"https://fissile.taojiji.com":"https://fissile.tjjshop.cn"
		        //    window.location.href = 'https://fissile.tjjshop.cn/flashSale/view/v1_0_0/home/referPage/808/os/'+this.getQueryString("os")+'/user_id/'+this.getQueryString("user_id")+'/uuid/'+this.getQueryString("uuid")+'/token/'+this.getQueryString("token")
		           window.location.href = msUrl+'/flashSale/view/v1_0_0/home/referPage/808'+this.getPath();
            } else {
              that.msgTxt = res.data.message;
            }
          })
          .catch(error => {
            that.msgTxt = "领取失败，请重试";
            errorLogUpload({
			            logLevel: 3,
			            errType: 21,
			            apiError: {
			                params: '',
			                uri: window.location.href,
			                apiUri: res.request.responseURL,
			                data: res.data,
			                message: '用户下单任务领取失败',
			                method: 'get',
			                code: 200
			            }
			        })            
          });
      } else {
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
      }
    },
    // 分享
    go_share() {
      that.eventShare();
      
      if (that.UserInfo.user_id) {
        if (this.$.xcx()) {
          let params = {
            shareActivity: 1,
            title: "快来帮我免费清空购物车，你我各得一张抽奖券！",
            shareUrl:
              "/pages/webview/webview?linkId=" +
              "https://" +
              window.location.host +
              "/project/anniversary/view/qk_wechat/share_id/" +
              this.UserInfo.user_id,
            imgUrl: require("./../../assets/images/share/bg1@2x.png")
          };
          wx.miniProgram.navigateTo({
            url:
              "/pages/activity/share808/share808?shareActivity=" +
              params.shareActivity +
              "&title=" +
              params.title +
              "&shareUrl=" +
              encodeURIComponent(params.shareUrl) +
              "&imgUrl=" +
              params.imgUrl
          });
          console.log(params)
        } else {
          that.$.share({
            title: "快来帮我免费清空购物车，你我各得一张抽奖券！",
            shareType: 0,
            shareUrl:
              "https://" +
              window.location.host +
              "/project/anniversary/view/qk_wechat" +
              this.UserInfo.user_id,
            miniPath:
              "https://" +
              window.location.host +
              "/project/anniversary/view/qk_wechat/share_id/" +
              this.UserInfo.user_id,
            imgUrl:require("./../../assets/images/share/bg1@2x.png")
          });
        }
      } else {
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
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
          	that.havegoods = true
            that.msgTxt = data.message;
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
          that.havegoods = true
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
      })
      .catch(error => {that.havegoods = true});
    },
    go_sha() {
    	that.eventLingqu()
      if (that.Popup_buttonstats == 1) {
        that.go_share(123);
      } else {
        that.go_buy(123);
      }
    },
    kjgo_sha() {
      let stats = that.stats;
      switch (stats) {
        case 2:
          break;
        case 3:
          break;
        default:
          // t = '100%好礼免费领'
          that.eventFree()
          that.$router.push("/sign" + this.getPath());
          break;
      }
    },
    nologins(){
			if (this.$.xcx()) {
				this.$wx.jump2login();
			}else{
				this.$.login();
			} 
    },
    // 清空购物车-点击商品&去购买按钮（底部商品区）
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
    },
    // 清空购物车-2个弹框中点击“领取抽奖券”&“抽奖券+1”
    eventLingqu() {
    	console.log('清空购物车-2个弹框中点击“领取抽奖券”&“抽奖券+1”')
      this.$.eventData({
        pageName: "zhounian_05",
        elementId: "lingqu"
      });
    },
    // 清空购物车-点击“去分享”
    eventShare(num) {
    	if(num){}else{
    		console.log('清空购物车-点击“去分享”')
	      this.$.eventData({
	        pageName: "zhounian_05",
	        elementId: "share"
	      });
	    }
    },
    // 清空购物车-点击“去下单”
    eventBuy(num) {
    	if(num){}else{
    		console.log('清空购物车-点击“去下单”')
    		this.$.eventData({
	        pageName: "zhounian_05",
	        elementId: "buy"
	      });
    	}
    },
    // 清空购物车-点击“立即清空购物车”
    eventQingkong() {
    	console.log('清空购物车-点击“立即清空购物车”')
      this.$.eventData({
        pageName: "zhounian_05",
        elementId: "qingkong"
      });
    },
    // 清空购物车-点击“100%好礼免费送”
    eventFree() {
    	console.log('清空购物车-点击“100%好礼免费送”')
      this.$.eventData({
        pageName: "zhounian_05",
        elementId: "100free"
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
.banner img {
  height: 100%;
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
	color: #333333;
  float: left;
}
.time-djs-kj-top {
  width: 1.35rem;
  height: 0.4512rem;
  font-size: 0.44rem;
  font-family: PingFangSC-Semibold;
  text-align: justify;
  text-align-last: justify;
  line-height: 0.44rem;
  color:#333333
}
.time-djs-kj-bottom {
  width: 1.416rem;
  height: 0.4512rem;
  margin-top: 0.0639rem;
  font-size: 0.44rem;
  font-family: PingFangSC-Semibold;
  text-align: justify;
  line-height: 0.44rem;
  color:#333333
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

/*分享抽奖券栏*/
.share-count {
  width: 11.484rem‬;
  height: auto;
  margin: 0 0.32rem 0.252rem;
  background: #ffffff;
  border-radius: 0.16rem;
}

.share-count-title {
  width: auto;
  height: 0.6397rem;
  margin-left: 0.5118rem;
  font-weight: bold;
  float: left;
}
.share-count-title span {
  width: auto;
  font-family: PingFangSC-Semibold;
  height: 0.5118rem;
  font-size: 0.5118rem;
  color: #333333;
  letter-spacing: 0.03rem;
  text-align: center;
  line-height: 0.5118rem;
  margin: 0.0839rem 0 0.0639rem 0.3838rem;
  float: left;
}
.share-count-title img {
  width: 0.6397rem;
  height: 0.6397rem;
  float: left;
}
.share-count-title:after {
  clear: both;
  content: "";
  visibility: hidden;
}
.share-count-share {
  width: 10.4603rem;
  background: #f2f2f2;
  border-radius: 0.4478rem;
  margin-left: 0.5118rem;
  float: left;
}
.share-count-share-text {
  width: auto;
  font-family: PingFangSC-Regular;
  font-size: 0.4478rem;
  color: #333333;
  letter-spacing: 0;
  margin-left: 0.5118rem;
  line-height: 0.99rem;
  float: left;
}
.share-count-share-button {
  width: 2.0472rem;
  border-radius: 0.64rem;
  background: #ffbc01;
  font-family: PingFangSC-Semibold;
  font-size: 0.4478rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.99rem;	
  float: right;
}
.share-count-share:after {
  clear: both;
  content: "";
  visibility: hidden;
}

.share-count-tickets {
  width: 9.4367rem;
  height: 2.8789rem;
  margin: 0 1.0236rem;
  position: relative;
}
.share-count-tickets-title {
  position: absolute;
  width: auto;
  height: 0.4478rem;
  top: 0.5118rem;
  left: 0.5118rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.4478rem;
  color: #a15300;
  letter-spacing: 0;
  line-height: 0.4478rem;
}
.share-count-tickets-number {
  position: absolute;
  width: 5.6703rem;
  height: 0.5118rem;
  top: 1.2795rem;
  left: 0.5118rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.5118rem;
  color: #a15300;
  letter-spacing: 0;
  font-weight: bold;
  line-height: 0.5118rem;
}
.share-count-tickets-opentime {
  position: absolute;
  height: 0.3518rem;
  top: 2.0152rem;
  left: 0.5118rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.3518rem;
  color: #a15300;
  letter-spacing: 0;
  line-height: 0.3518rem;
}
.share-count-tickets-stats {
  position: absolute;
  height: 0.5757rem;
  top: 1.1515rem;
  right: 0.6717rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.5757rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  font-weight: bold;
  line-height: 0.5757rem;
}

.share-count-bottom {
  margin-left: 1.024rem;
  height: 0.384rem;
  font-family: PingFangSC-Regular;
  font-size: 0.384rem;
  color: #999999;
  letter-spacing: 0;
  line-height: 0.384rem;
}

/**/
.buy-count {
  width: 11.484rem‬;
  height: auto;
  margin: 0 0.32rem 0.252rem;
  background: #ffffff;
  border-radius: 0.32rem;
  padding-bottom: 0.32rem;
}
.buy-count-bottom {
  margin-left: 1.024rem;
  height: 0.384rem;
  font-family: PingFangSC-Regular;
  font-size: 0.384rem;
  color: #999999;
  letter-spacing: 0;
  line-height: 0.384rem;
}

.time-text-c {
  margin-top: 0.96rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.576rem;
  color: #ff346c;
  letter-spacing: 0;
  text-align: center;
  font-weight: bold;
  line-height: 0.576rem;
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

.yllll{
	box-shadow: 0 0.062rem 0.2rem 0 rgba(195,195,195,1);
}

/**/
.buy-count-ts {
  height: 0.384rem;
  font-family: PingFangSC-Regular;
  font-size: 0.384rem;
  color: #999999;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.384rem;
}

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

.user-count {
  width: 11.484rem‬;
  height: auto;
  margin: 0 0.32rem 0.252rem;
  background: #ffffff;
  border-radius: 0.16rem;
  padding-bottom: 0.32rem;
}
.title-count-user {
  height: 0.576rem;
  width: auto;
  margin-left: 2.752rem;
  margin-bottom: 0.768rem;
  overflow: hidden;
  font-family: PingFangSC-Semibold;
  font-size: 0.576rem;
  color: #333333;
  letter-spacing: 0;
  font-weight: bold;
  text-align: center;
  line-height: 0.699rem;
  display: flex;
}
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
  line-height: 0.699rem;
  font-weight: bold;
  display: flex;
}
.title-count-goods img {
  margin: 0.1rem 0.192rem 0 0.192rem;
  width: 0.448rem;
  height: 0.448rem;
}
.title-count-user img {
  margin: 0.1rem 0.192rem 0 0.192rem;
  width: 0.448rem;
  height: 0.448rem;
}
.luck-user {
  height: 1.408rem;
  margin-left: 0.512rem;
  margin-bottom: 0.64rem;
  display: flex;
}
.user-head-img {
  width: 1.408rem;
  height: 1.408rem;
}
.user-head-img img {
  border-radius: 0.704rem;
}
.user-name {
  font-family: PingFangSC-Semibold;
  font-size: 0.448rem;
  margin-top: 0.144rem;
  margin-bottom: 0.112rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.448rem;
  font-weight: bold;
  height: 0.448rem;
}
.user-center {
  margin-left: 0.32rem;
  width: 7.488rem;
}
.user-text {
  font-family: PingFangSC-Regular;
  margin-top: 0.144rem;
  margin-bottom: 0.144rem;
  font-size: 0.448rem;
  color: #333333;
  letter-spacing: 0;
  line-height: 0.448rem;
}
.user-text font {
  color: #ff346c;
}
.user-time {
  height: 0.384rem;
  font-family: PingFangSC-Regular;
  font-size: 0.384rem;
  color: #757575;
  text-align: right;
  line-height: 0.384rem;
  margin-top: 0.512rem;
}
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
  line-height: 0.6rem;
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
  margin-left: 0.128rem;
  margin-right: 0.128rem;
}
.goods-bottom-price {
  font-family: PingFangSC-Semibold;
  width: 2.78rem;
  height: auto;
  margin-top: 0.13rem;
  font-size: 0.512rem;
  color: #ff346c;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 0.576rem;
}
.goods-bottom-price font {
  font-size: 0.32rem;
}
.goods-bottom-button {
  width: 2.112rem;
  height: auto;
  background: #ffbc01;
  border-radius: 0.416rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.384rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 0.832rem;
}

/*弹窗*/
.lottery {
  width: 10.08rem;
  height: 12.928rem;
  position: relative;
  overflow: hidden;
}
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
  color: #757575;
  letter-spacing: 0;
  text-align: justify;
  line-height: 0.896rem;
  margin-top: 0.96rem;
  margin-left: 0.768rem;
}
.lottery-title {
  font-family: PingFangSC-Semibold;
  font-size: 0.512rem;
  color: #ffffff;
  letter-spacing: 0.0128rem;
  text-align: center;
  line-height: 0.96rem;
  height: 1.92rem;
  min-width: 8.7rem;
  position: absolute;
  top: 0.64rem;
  left: 0.864rem;
}
.lottery-title >>> span {
  font-family: PingFangSC-Semibold;
  font-size: 0.768rem;
  color: #ffffff;
}
.lottery-yhq {
  font-family: PingFangSC-Semibold;
  font-size: 0.512rem;
  color: #a33e00;
  letter-spacing: 0;
  line-height: 0.512rem;
  position: absolute;
  top: 5.664rem;
  left: 4.672rem;
}
.lottery-yhq-a {
  font-family: PingFangSC-Regular;
  font-size: 0.416rem;
  color: #a33e00;
  letter-spacing: 0;
  line-height: 0.416rem;
  position: absolute;
  top: 6.4rem;
  left: 4.672rem;
}
.lottery-button {
  background: #ffbc01;
  border-radius: 0.704rem;
  font-family: PingFangSC-Semibold;
  font-size: 0.64rem;
  color: #ffffff;
  letter-spacing: 0;
  width: 6.88rem;
  height: 1.408rem;
  text-align: center;
  box-shadow: 0 0.062rem 0.2rem 0 rgba(255,188,1,1);
  line-height: 1.408rem;
  position: absolute;
  bottom: 0.96rem;
  left: 1.6rem;
}
.lottery-bz {
  font-family: PingFangSC-Light;
  font-size: 0.352rem;
  color: #ffffff;
  text-align: center;
  line-height: 0.384rem;
  height: 0.384rem;
  width: 4.416rem;
  position: absolute;
  top: 2.944rem;
  left: 2.816rem;
}
.close {
  width: 0.72rem;
  height: auto;
  margin-right: 0.1rem;
  float: right;
  background: none;
}

.goods-img{
	width: 5.28rem;
	height:5.28rem
}
.rule-detail-p span{
	font-weight: bold;
	color: #333333;
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
.goods-img img{
	width: 5.28rem;
	height:5.28rem	
}
</style>

