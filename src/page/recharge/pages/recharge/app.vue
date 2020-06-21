<template>
  <div class="container">
    <!-- 这是一个遮罩层 点击吊起登录 -->
    <div class="toLogin" @click="$.login()" v-if="!user_id"></div>
    <div class="recharge_top">
      <!-- <img src="../../assets/images/share.png" v-if="wx" @click="share()" alt class="share" srcset /> -->

      <!-- 输入手机号提醒 -->
      <p class="tips" :style="{color:(tips_state==true?'#FF430A':'#A9A9A9')}">{{tips}}</p>

      <!-- 输入框 -->
      <p class="input_box">
        <input class="phone_num" @blur="bl()" @focus="onfo" type="tel" v-model="phone_num" />
        <img v-show="close_state" @click="close()" src="../../assets/images/close.png" alt />
      </p>

      <!-- 配图 -->
      <div class="recharge_img">
        <img :src="bannerImg" alt srcset />
      </div>

      <!-- 话费列表 -->
      <div class="price_lists">
        <div
          class="price_list"
          v-for="(item,key) in price_list"
          :key="key"
          @click="choose_price(key,item.select,item.denomination)"
          :class="{'select_price':item.select, active:choose_index == key}"
        >
          <img
            class="label"
            v-if="(item.type==2&&item.denomination!=parseInt(item.discount)&&(!item.select))||(item.type==3&&item.denomination!=parseInt(item.discount)&&(!item.select))"
            src="../../assets/images/lable.png"
            alt
            srcset
          />
          <img
            class="label"
            v-if="(item.type==2&&item.denomination!=parseInt(item.discount)&&item.select)||item.type==0&&item.denomination!=parseInt(item.discount)&&item.select"
            src="../../assets/images/lable1.png"
            alt
            srcset
          />
          <p class="price">
            <span>{{item.denomination}}</span>元
          </p>
          <p
            class="des"
            v-if="item.type!=2&&item.type!=3"
            :class="(item.type==1)?'no_bt':'bt'"
          >{{item.type==1?"优惠价"+item.discount:"补贴价"+item.discount }}元</p>
          <p
            class="des"
            v-if="item.type==2&&item.denomination!=parseInt(item.discount)"
            :class="(item.type==1)?'no_bt':'bt'"
          >{{item.type==1?"优惠价"+item.discount:"补贴价"+item.discount }}元</p>
          <p class="des" v-if="item.type==3" :class="(item.type==1)?'bt':'no_bt'">今日已抢完</p>
        </div>

        <!-- <div class="price_list" >
            <img class="label" src="../../assets/images/lable1.png" alt="" srcset="">
            <p class="price" > <span>150</span> 元</p>
            <p class="des" >补贴价130元</p>
        </div>-->
      </div>
      <!-- 选择充值方式 -->
      <div>
        <p class="way">请选择充值方式</p>
        <ul class="pay">
          <li @click="choose_pay_platform(1)">
            <img class="ali icon" v-if="phone&&check_price" src="../../assets/images/ali1.png" />
            <img v-else class="ali icon" src="../../assets/images/ali.png" />
            支付宝
            <img
              v-if="phone&&check_pay==1&&check_price"
              src="../../assets/images/choose.png"
              class="check"
            />
            <img  v-if="phone&&check_pay!=1" src="../../assets/images/unbuy.png" class="check" />
             <img v-if="!phone||(phone&&!check_price)"  src="../../assets/images/no.png" class="check" /> 
          </li>
          <li @click="choose_pay_platform(3)" v-if="wx==true">
            <img v-if="phone&&check_price" class="wx icon" src="../../assets/images/wx1.png" />
            <img v-else class="wx icon" src="../../assets/images/wx.png" />微信支付
            <img
              v-if="phone&&check_pay==3&&check_price"
              src="../../assets/images/choose.png"
              class="check"
            />
            <img  v-if="phone&&check_pay!=3" src="../../assets/images/unbuy.png" class="check" />
             <img v-if="!phone||(phone&&!check_price)" src="../../assets/images/no.png" class="check" /> 
          </li>
        </ul>
      </div>
      <!-- 充值记录 -->
      <div class="recharge_list" @click="toPage()">
        <span>充值记录</span><img class="arrow" src="../../assets/images/arrow.png" />
      </div>
      <!-- <div class="recharge_list1" >充值记录1<img class="arrow" src="../../assets/images/arrow.png"></div>  -->
    </div>
    <div>
      <img
        class="start_recharge"
        v-show="check_pay>0&&choose_index>=0"
        @click="pay()"
        src="../../assets/images/buy.png"
      />
      <img
        class="start_recharge"
        v-show="check_pay<0||choose_index<0"
        @click="no_pay()"
        src="../../assets/images/no_buy.png"
      />
    </div>
    <msgBox :msgTxt="msgTxt"></msgBox>
    <myAlert :alertObj="alertObj"></myAlert>
  </div>
</template>
<script>
let vm = null;
import { getPath } from "@/assets/js/common/utils";
// import { Dialog } from "vant";
import URL from "../../assets/js/api";
import myAlert from "@/components/myAlert";
// import msgBox from "../../components/msg";
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
let params = getPath();

export default {
  data() {
    return {
      // 头部组件传参
      tips: "请输入手机号码", //顶部提示
      bannerImg: "",
      first: true,
      flag:1,
      id:"",
      wx: false, //微信不可支付
      msgTxt: "",
      phone_num: "",
      phone: false,
      num: "",
      last: "",
      num_state: false,
      add: true,
      user_id: "",
      token: "",
      uuid: "",
      choose_index: -1,
      tips_state: false,
      close_state: false,
      check_price: false, //判断是否可以点击话费
      check_pay: 1, //判断是否可以点击支付
      price_list: [
        {
          denomination: "10",
          id: "1001",
          type: "2",
          discount: "10",
          select: false
        },
        {
          denomination: "20",
          id: "1001",
          type: "2",
          discount: "20",
          select: false
        },
        {
          denomination: "30",
          id: "1001",
          type: "2",
          discount: "30",
          select: false
        },
        {
          denomination: 50,
          id: "1001",
          type: "2",
          discount: "50",
          select: false
        },
        {
          denomination: 100,
          id: "1001",
          type: "2",
          discount: "100",
          select: false
        },
        {
          denomination: "200",
          id: "1001",
          type: "2",
          discount: "200",
          select: false
        }
      ],
      start_list: [],
      alertObj: {}
    };
  },
  created() {
    this.getInfo();
    let _this = this;
     setTimeout(function(){
        _this.$.initPv({
        pageName: "huafei"
      });
      },1000)
 this.tips = "请输入手机号码";

   

    //this.price_list = res.data;
    
  },
  methods: {
    // 点击分享功能
    share(){
        this.$.share({
        imgUrl: require("../../assets/images/share.jpg"),
        title: '淘集集，你的话费充值管家',
        miniPath: '/packageA/pages/activity/paybill/paybill',
        shareUrl: '/packageA/pages/activity/paybill/paybill',
        native:1
      })
      this.$.eventData({
        elementId: "share",
        pageName: "huafei"
      });
    
    
    },
   
    bl() {
      // 失去焦点
      if (0 < this.phone_num.length && this.phone_num.length < 13) {
        if (this.last.length == 11) {
          this.tips = "请输入手机号码";
          this.tips_state = false;
        } else {
          this.tips = "请输入正确的手机号";
          this.tips_state = true;
        }
      }
    },
    onfo() {
      this.tips_state = false;
     this.tips = "请输入手机号码";
    },
    close() {
      //删除所有的数字
      (this.phone_num = ""), (this.num = "");
      this.last = "";
      this.num_state = false;
      this.close_state = false;
      this.tips = "请输入手机号码";
      this.price_list=this.start_list;
      this.choose_index=-1;
      (this.tips_state = false), (this.phone = false);
    },

    // 路由跳转
    toPage(page, btn) {
       this.$.eventData({
                  elementId: "list",
                  pageName: "huafei",
                })
    // alert("/detailList/user_id/" + this.user_id+'/token/'+this.token+'/uuid/'+this.uuid+'/os/'+this.getQueryString('os'))
      this.$router.push("/detailList/user_id/" + this.user_id+'/token/'+this.token+'/uuid/'+this.uuid+'/os/'+this.getQueryString('os'));
    },
    //吊起改手机号的优惠补贴信息
    getInfo(){
         let params = {
          uuid: this.getQueryString('uuid') || ""
        };
        
      this.$http.get(URL.getRechargeList, { params }).then(res => {
        console.log(res.data);
        var req = res
        res = res.data;
        if (res.result == 1) {
            this.bannerImg = res.imageUrl?res.imageUrl:require("../../assets/images/bannerImg.jpg")
          if (res.is_wxpay == true) {
            //可以微信支付
            this.wx = true;
          } else {

          }
          if ( Array.isArray(res.data)&&res.data.length>1) {
            this.price_list = res.data;
            this.start_list = res.data;
           
            //话费列表是有数据
          } else {
             this.start_list=this.price_list
             this.$.errorLogUpload(3, 21, params, '', req.request.responseURL, res.data, req.config.method, '未输入手机号码数据为空'+res.message, req.status);
            //话费
          }
          //接口请求成功
        } else {
          //上传日志
            this.start_list=this.price_list
            this.$.errorLogUpload(3, 21, params, '', req.request.responseURL, res, req.config.method, '未输入手机号码接口返回不是1'+res.message, req.status);

        }
      });
    },
    getInfoUser() {
       let params = {
          uuid: this.getQueryString('uuid') || "",
          user_id:this.user_id,
          token:this.token,
          mobile:this.last,
        };


      // var res = {
      //   result: 1,
      //   message: "",
      //   data: [
      //     {
      //       denomination: "10",
      //       id: "1001",
      //       type: "0",
      //       discount: "4.8",
      //       select: true
      //     },
      //     {
      //       denomination: "20",
      //       id: "1002",
      //       type: "1",
      //       discount: "15.8",
      //       select: true
      //     },
      //     {
      //       denomination: "100",
      //       id: "1003",
      //       type: "2",
      //       discount: "100",
      //       select: false
      //     },
      //     {
      //       denomination: "101",
      //       id: "1003",
      //       type: "2",
      //       discount: "100",
      //       select: false
      //     },
      //     {
      //       denomination: "200",
      //       id: "1004",
      //       type: 3,
      //       discount: "198",
      //       select: false
      //     },
      // 
       this.$http.get(URL.getRechargeList+'/showLoading/1', { params }).then(res => {
        console.log(res.data);
        var  req = res;
        res = res.data;
        if (res.result == 1) {
          if(res.code!=0){
            this.tips='暂不支持此号码充值';
            this.tips_state = true;
            this.check_price=false;
          }else{

          
          if ( Array.isArray(res.data)&&res.data.length>1) {
            this.price_list = res.data;
            this.check_price = this.price_list.some(item => {
              return item.select == true;

            });
         
           for(var i =0;i<this.price_list.length;i++){
             if(this.price_list[i].denomination==50&&this.price_list[i].select){
                this.choose_index=i;
                this.id=this.price_list[i].id;
                this.$.eventData({
                  elementId: "dangwei",
                  pageName: "huafei",
                  dangweiType:50,
                })
//return ;
             }
           }
            this.check_pay =
        localStorage.getItem("pay_platform") && this.wx == true
          ? localStorage.getItem("pay_platform")
          : 1;
           localStorage.setItem("pay_platform", this.check_pay);
            //话费列表是有数据
          } else {
           
            this.$.errorLogUpload(3, 21, params, '', req.request.responseURL, res.data, req.config.method, '输入手机号码数据为空'+res.message, req.status);
          
            //话费
          }
          }
          //接口请求成功
        } else {
            
            this.$.errorLogUpload(3, 21, params, '', req.request.responseURL, res, req.config.method, '输入手机号码接口返回不是1'+res.message, req.status);
            

          //上传日志
        }
      });
      
      

    },
    choose_price(index, state,price) {
      if (state) {
        console.log(index);
        this.choose_index = index;
        this.id=this.price_list[index].id;
         this.$.eventData({
                  elementId: "dangwei",
                  pageName: "huafei",
                  dangweiType:price,
                })
      } else {
        console.log("无法选择");
      }
      //选择价格
    },
    choose_pay_platform(index) {
      if (this.check_price) {
        localStorage.setItem("pay_platform", index);
        this.check_pay = index;
        console.log(index);
        return;
      }
    },
    no_pay() {
      if (this.choose_index < 0 && this.phone) {
        if (!this.check_price) {
          //this.msgTxt ="请选择充值面额"
        } else {
          this.msgTxt = "请选择充值面额";
        }
      }
    },

    //充值支付
    pay() {
       
      if(this.flag==1){
        this.flag=0;
           if (this.phone) {
              this.$.eventData({
                        elementId: "liji",
                        pageName: "huafei",
                      })
        let  pay_id = this.check_pay;
         let params = {
                    uuid: this.getQueryString('uuid') || "",
                    user_id:this.user_id,
                    token:this.token,
                    mobile:this.last,
                    recharge_id:this.id,
                    payment_id:this.check_pay,
                    version: this.getQueryString('version') || "",
                  };
          this.$http.get(URL.rechargeCheck, { params }).then(res => {
              let   checkData = res.data;
             // alert(checkData.result)
              if(checkData.result==1){
                     if(checkData.data.status==2){
                     this.alertObj = {
                       show: true,
                       message:
                        "确认给<span style='color:#ff430a;font-weight:600'  >" +
                        this.phone_num +
                        "</span>充值"+checkData.data.info.denomination+"元吗?话费充值立即生效，无法取消",
                    btns: [
                      {
                        title: "取消",
                        callBack: () => {
                         
                         this.flag=1;
                        }
                      },
                      {
                        title: "确定",
                        fontColor: "#ff430a",
                        callBack: () => {
                          this.flag=1;
                            this.$.eventData({
                              elementId: "check",
                              pageName: "huafei",
                            })
                            this.$http.get(URL.createOrder, { params }).then(result => {
                            var result_q=result ;
                            var result = result.data;
                            if(result.result==1){
                                this.$.pay({
                                orderNo: result.data.orderNo,
                                orderName: result.data.orderName,
                                payType:pay_id,
                                orderPrice: result.data.orderAmount,
                                //   linkUrl: "http://172.10.152.110:3033",
                                linkUrl: "",
                                jumpAppPayResult: 0,
                                paySource: 0
                              });
                            }else{
                             this.$.errorLogUpload(3, 21, params, '', result_q.request.responseURL, result, result_q.config.method, '创建订单result不等于1', result_q.status)

                              this.msgTxt = result.message

                            }
                            
                            
                        })
                        }}]
              }
              }else if(checkData.data.status==1){
                  this.alertObj = {
                       show: true,
                       message:
                        "已超出每月可享受补贴次数～请确认是否以优惠价<span style='color:#ff430a;font-weight:600' ' >("+checkData.data.info.discount+"元)</span>充值",
                    btns: [
                      {
                        title: "取消",
                        callBack: () => {
                         
                          this.flag=1;
                        }
                      },
                      {
                        title: "确定",
                        fontColor: "#ff430a",
                        callBack: () => {
                         console.log("chaochu2ci");
                         console.log(this);
                              this.flag=1;
                              this.alertObj = {
                               show: true,
                               message:
                                "确认给<span style='color:#ff430a;font-weight:600' ' >" +
                                this.phone_num +
                                "</span>充值"+checkData.data.info.denomination+"元吗?话费充值立即生效，无法取消",
                         btns: [
                      {
                        title: "取消",
                        callBack: () => {
                          this.flag=1;
                         
                        }
                      },
                      {
                        title: "确定",
                        fontColor: "#ff430a",
                        callBack: () => {
                            this.$.eventData({
                              elementId: "check",
                              pageName: "huafei",
                            })

                            this.$http.get(URL.createOrder, { params }).then(result => {
                              var res_q = result;
                             var result = result.data;
                            if(result.result==1){
                                this.$.pay({
                                orderNo: result.data.orderNo,
                                orderName: result.data.orderName,
                                payType: pay_id,
                                orderPrice: result.data.orderAmount,
                                //   linkUrl: "http://172.10.152.110:3033",
                                linkUrl: "",
                                jumpAppPayResult: 0,
                                paySource: 0
                              });
                            }else{
                             this.$.errorLogUpload(3, 21, params, '', res_q.request.responseURL, result, res_q.config.method, '创建订单result不等于1', res_q.status)
                             

                              this.msgTxt = result.message

                            }
                            
                            
                        })
                        }}]
              }
                        
                        }}]
              }
              }else{
                 this.msgTxt="暂不支持此号码充值";
                 this.flag=1;
              }
                  
              }else{
                  this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, res, res.config.method, '检查面额返回result不等于1', res.status);
              }
           
             
          })
         
      
      } else {
      }
      }else{

      }
     

      //
    },
    setInputRange(index){
      this.$nextTick(() => {
        setTimeout(()=>{
             let inputEle = document.getElementsByClassName('phone_num')[0];
            inputEle.setSelectionRange(index, index)
            },0)
       
      })
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
     // alert(1)
      //已登录状态吊起列表
      if (user_id && token && uuid) {
        this.user_id = user_id;
        this.token = token;
        this.uuid = uuid;
           if (this.phone_num.length < 1) {
        this.phone_num = window.localStorage.getItem("tjj_phone") || "";
        this.first = false;
      }
      } else {
        //未登录唤起登录  同时添加事件监听点击触发登录
        //this.$.login();
      }
    };
 // this.$.checkLogin();
 isLogin('119245344693211704', 'c1e726cfc40a020_', '7df6a842-c1c2-42a3-a29f-90211cf1c613');
  //  this.$.checkLogin();
    // if (xcx_user) {
    //   vm.options.shareBtn = false;
    //   let user_id = xcx_user.user_id;
    //   let token = xcx_user.token;
    //   window.isLogin(user_id, token, "wechat");
    // } else {
    //   this.$.checkLogin();
    // }
    window.filterInput = (val, old) => {
      // 这里过滤的是除了英文字母和数字的其他字符
      var num = val.replace(/\s*/g, "");
      num = num.replace(/[^0-9]/, "");

      //console.log(num,old);
      if (num.length >= 11) {
        num = num.slice(0, 11);``
      }

      if (num.length <= 3) {
        this.num = num.slice(0, 3);
        this.phone_num = this.num;
        this.setInputRange(this.inputIndex)
        this.num_state = false;
      }
      this.last = "";
      if (3 <= num.length && num.length < 7) {
        if (this.add) {
          console.log("zengjia ");
          this.num = num.slice(0, 3) + " " + num.slice(3);
          this.phone_num = this.num;
          console.log('??????????');
          console.log(this.inputIndex)
          let _toIndex = this.inputIndex == 4 ? this.inputIndex+1 : this.inputIndex;
          console.log(_toIndex);
          this.setInputRange(_toIndex)
        } else {
          console.log("jian");
          if (num.length == 3) {
            this.num = num.slice(0, 3);
            this.phone_num = this.num;
          } else {
            this.num = num.slice(0, 3) + " " + num.slice(3, num.length);
            this.phone_num = this.num;
          }
          this.setInputRange(this.inputIndex)
        }
      }
      console.log(num.length,8888888, this.add)
      if (7 <= num.length && num.length < 11) {
        if (this.add) {
          console.log("zengjia ");
          this.num =
            num.slice(0, 3) + " " + num.slice(3, 7) + " " + num.slice(7);
          this.phone_num = this.num;
          console.log('!!!!!!!!!!!!!!!!!!!!!');
          console.log(this.inputIndex)
          let _toIndex = this.inputIndex == 4 ? this.inputIndex+1 :  this.inputIndex == 9 ? this.inputIndex + 1 : this.inputIndex;
          console.log(_toIndex);
          this.setInputRange(_toIndex)
        } else {
          if (num.length == 7) {
            this.num = num.slice(0, 3) + " " + num.slice(3, 7);
            this.phone_num = this.num;
          } else {
            this.num =
              num.slice(0, 3) +
              " " +
              num.slice(3, 7) +
              " " +
              num.slice(7, num.length);
            this.phone_num = this.num;
          }
          this.setInputRange(this.inputIndex)
        }

        this.phone_num = this.num;
      }
      this.num_state = false;

      if (num.length == 11) {
        this.last = num;
        document.activeElement.blur();
        this.num_state = true;
        this.num =
          num.slice(0, 3) +
          " " +
          num.slice(3, 7) +
          " " +
          num.slice(7, num.length);
        this.phone_num =
          num.slice(0, 3) +
          " " +
          num.slice(3, 7) +
          " " +
          num.slice(7, num.length);
        this.num_state = false;
        var re = /^1\d{10}$/; //正则表达式
        if (re.test(num)) {
          //判断字符是否是11位数字
          if (re.test(num) && old.length < 13 && old.length != 11) {
            console.log("zhixing");
            console.log("号码手机" + this.last);
            localStorage.setItem("tjj_phone", this.last);
            this.phone = true;
            this.getInfoUser();
            if(this.user_id&&this.token){

            }else{
              //吊起登陆 
               //this.$.login();
            }
          } else {
            //  this.tips="11111111111";
            //  this.num_state=false;
          }
        } else {
          this.tips = "请输入正确的手机号";
          this.tips_state = true;
        }

        //
      }
    };
  },
  //

  watch: {
    phone_num(val, old) {
      let inputEle = document.getElementsByClassName('phone_num')[0];
      let inputIndex = inputEle.selectionStart;
      this.inputIndex = inputIndex;
      // setTimeout(()=>{
      // inputEle.setSelectionRange(0);

      // },0)
      // inputEle.setSelectionRange(0);
      // console.log(inputEle.setSelectionRange(0),88888)
      
      if (!val) {
        console.log("@@@@")
        //this.close();
        return;
      }
      var val = val.replace(/\s*/g, "");
      val = val.replace(/[^0-9]/, "");
      
      
      if (val.length > 11) {
        this.phone_num = this.num;
        var isMore = true;
      }

      if (this.phone) {
       

        if (this.phone_num.length >= 13) {
        } else {
         
          this.phone = false;
          this.choose_index = -1;
          this.price_list = this.start_list;
          this.check_pay = "";
         
          
        }
      } else {
        if (this.phone_num.length >= 13) {
        } else {
          this.phone = false;
          this.choose_index = -1;
          this.check_pay = "";
          this.price_list = this.start_list;
        }
      }
      if (val.length > 0) {
        this.close_state = true;
      } else {
        this.close_state = false;
      }

      if (!this.num_state && val.length <= 11) {
        this.$nextTick(() => {
          if (!old) {
            var oldValue = "";
          } else {
            var oldValue = old;
          }
          console.log(val.length, oldValue.length)
          if (val.length > oldValue.replace(/\s*/g, "").length) {
            // alert("+++++")
            this.add = true;
          } else if(val.length < oldValue.replace(/\s*/g, "").length) {
            this.add = false;
            // alert("-----")
          }
          this.num_state = true;
          // console.log('~~~~~~~~~~~~~~~~~~~',this.phone_num,this.phone_num.length,inputEle.selectionStart);
          // if(inputIndex < this.phone_num.length){
          //   console.log('setting')
            // inputEle.setSelectionRange(inputIndex, inputIndex)
          // }
          if (!isMore) {
            filterInput(val, oldValue);
            
          }
          // if(this.num.length>3){
          //   this.phone_num = this.num.slice( 0 , 3 ) + '         ' +  this.num.slice( 3 )
          // }
        });
      }
    }
  },
  components: {
    myAlert
    // msgBox
  }
};
</script>
<style>
html,
body {
  /* background: #e10011; */
}
</style>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  background: rgba(238, 44, 7, 1);
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
.toLogin {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 999;
  top: 0;
}
.recharge_top {
  width: 3.55rem;
  min-height: 5rem;
  position: relative;
  margin: 0.12rem auto 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.1rem;
  padding: 0.15rem 0.15rem 0.15rem 0.15rem;
}

@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {
   .recharge_top {
    min-height: 5.19rem;
  }

}

@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px){
    .recharge_top {
    min-height: 5.19rem;
  }
}

@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait){
    .recharge_top {
    min-height: 5.19rem;
  }
}

@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : landscape){
  .recharge_top {
    min-height: 5.19rem;
  }
  }
@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : portrait) {
 .recharge_top {
    min-height: 5.19rem;
  
  }
}
@media (min-height: 670px) {
  .recharge_top {
    min-height: 5.99rem;
    
  
  }
}
@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {
   .recharge_top {
    min-height: 5.19rem;
  }

}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .recharge_top{
    min-height: 6.29rem;
   
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
   .recharge_top{
    min-height: 6.19rem;
  }
}

/* iPhone XR */

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
   .recharge_top{
    min-height: 6.19rem;
  }
}

/* iPhone XS Max */

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
   .recharge_top{
    min-height: 6.29rem;
   
  }
}
@media only screen and (min-device-width: 393px) and (max-device-height: 818px) and

(-webkit-device-pixel-ratio: 2.75) {
    .recharge_top{
     min-height: 6.19rem;
   
  }

}
.tips {
  width: 80%;
  height: 0.13rem;
  font-size: 0.13rem;
  font-family: PingFangSC;
  font-weight: 400;
  color: #a9a9a9;
  margin-bottom: 0.18rem;
  margin-top: 0.03rem;
}
.share {
  position: absolute;
  right: 0.15rem;
  width: 0.2rem;
  height: 0.2rem;
}
.input_box {
  position: relative;
}
.input_box img {
  width: 0.16rem;
  height: 0.16rem;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
}
.phone_num {
  padding: 0;
  margin: 0;
  width: 80%;
  font-size: 0.26rem;
  font-weight: 500;
  display: block;
  border: 0rem;
  caret-color: rgba(205, 205, 205, 0.3);
}
::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
    color: #6a6f77;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
    color: #6a6f77;
}
input::-webkit-input-placeholder {
    color: #6a6f77;
}

.recharge_img {
  width: 100%;
  margin: 0.13rem 0 0.24rem;
  padding-top: 0.2rem;
  border-top: 0.008rem solid #ededed;
}
.recharge_img img {
  width: 3.25rem;
  height: 0.54rem;
  
  display: block;
}
.price_lists {
  min-height: 1rem;
  overflow-y: hidden;
  margin-bottom: 0.14rem;
}
.price_lists .price_list {
  width: 1.02rem;
  height: 0.7rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.04rem;
  border: 0.008rem solid rgba(205, 205, 205, 1);
  float: left;
  margin-right: 0.09rem;
  margin-bottom: 0.09rem;
  padding-top: 0.17rem;
  font-size: 0.13rem;
  
  font-weight: 400;
  color: rgba(172, 172, 172, 1);
  line-height: 0.13rem;
  position: relative;
}
.android  .price_list{
   border: .12px  solid rgba(205, 205, 205, 1);
}
.price_lists .active {
  border: 0.008rem solid rgba(255, 67, 10, 1);
  background: rgba(255, 248, 244, 1);
}
.android .active {
  border: .12px solid rgba(255, 67, 10, 1);
  background: rgba(255, 248, 244, 1);
}
.price_lists .price_list:nth-child(3n) {
  margin-right: 0rem; 
}
.price {
  text-align: center;
  margin-bottom: 0.07rem;
  height: 0.2rem;
  line-height: .2rem;
}
.price span {
  font-weight: 200;
}
.select_price .price {
  color: #444444;
}
.price_lists .price_list .select_price .des {
  color: #666;
  font-size: .12rem;
}
.price_lists .price_list  .des {
  line-height: .13rem;
  font-size: .12rem;
}
.select_price .bt {
  color: #ff430a;
}
.select_price .no_bt {
  color: #666666;
}
.active .des {
  color: #ff430a;
}
.active .price {
  color: #ff430a;
}
.price span {
  font-size: 0.2rem;
  line-height: 0.2rem;
  margin-right: .01rem;
  font-weight: 600;
}
.des {
  height: 0.13rem;
  margin: 0 auto;
  text-align: center;
}
.label {
  width: 0.4rem;
  height: 0.12rem;
  position: absolute;
  right: -0.01rem;
  top: -0.008rem;
}
.way {
  width: 2.05rem;
  height: 0.21rem;
  font-size: 0.15rem;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.21rem;
  margin-bottom: 0.07rem;
}
.pay{
  min-height: 1rem;
}
.pay li {
  width: 100%;
  height: 0.52rem;
  border-top: 0.008rem solid #e5e5e5;
  font-size: 0.15rem;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 0.52rem;
  position: relative;
  padding-left: 0.32rem;
}
.pay li:nth-of-type(1) {
  border-top: 0rem solid #e5e5e5;
}
.pay .icon {
  top: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: auto;
}
.ali {
  width: 0.2rem;
  height: 0.2rem;
  margin-right: 0.12rem;
}
.wx {
  width: 0.22rem;
  height: 0.2rem;
  margin-right: 0.11rem;
}
.pay .check {
  position: absolute;
  height: 0.2rem;
  width: 0.2rem;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
}
.recharge_list {
  text-align: center;
  width: 100%;
  height: 0.13rem;
  font-size: 0.13rem;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(117, 117, 117, 1);
  line-height: 0.13rem;
  margin-top: 0.01rem;
}
.arrow {
  width: 0.06rem;
  height: 0.09rem;
  margin-left: 0.02rem;
  margin-top: -0.037rem;
}
.android .arrow{
  margin-top: -0.021rem;
}
.recharge_list1 {
  position: absolute;
  bottom: 0.2rem;
  text-align: center;
  width: 100%;
  height: 0.13rem;
  font-size: 0.13rem;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(117, 117, 117, 1);
  line-height: 0.13rem;
}
.start_recharge {
  width: 100%;
  margin-top: 0.13rem;
  display: block;
}
</style>

