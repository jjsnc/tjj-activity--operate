<template>
  <div id="box">
    <HeaderBanner :options="options" />
    <img src="./../../assets/images/sign/banner_2.jpg" alt />
    <div class="img-box">
      <img src="./../../assets/images/sign/buff.jpg" alt />
      <div id="sign-buff">
        <div class="sign-buff">
          <roll :roll="roll"></roll>
        </div>
      </div>
    </div>
    <img class="tab" src="./../../assets/images/sign/tab.jpg" alt />
    <div id="sign">
      <div class="sign">
        <div class="sign-left">
          <div
            class="sign-left-box"
            v-for="(el, index) in redEnvelopesData.slice(0, redEnvelopesData.length-1)"
            :key="index"
          >
            <div
              class="sign-left-box-list"
              :class="{'sign-left-box-list-has': el.state == 1 || el.state == 0 && stateBtn, 'sign-left-box-list-now': el.state == 0 && !stateBtn}"
              @click="redEnvelopesClick(el.state, Number(el.amount), index, redEnvelopesDataBtn)"
            >
              <img v-if="el.state == 1" v-lazy="require('./../../assets/images/sign/has.png')" alt />
              <img
                v-if="el.state == 0 && !stateBtn"
                v-lazy="require('./../../assets/images/sign/now.png')"
                alt
              />
              <img
                v-if="el.state == 0 && stateBtn"
                v-lazy="require('./../../assets/images/sign/has.png')"
                alt
              />
              <img
                v-if="el.state == -1"
                v-lazy="require('./../../assets/images/sign/future.png')"
                alt
              />
              <p class="sign-left-box-p">第{{ numArr[index] }}天</p>
              <span class="sign-left-box-day">
                {{ Number(el.amount) }}<font>元</font>
              </span>
              <span class="sign-left-box-go"></span>
            </div>
          </div>
        </div>
        <div class="sign-right">
          <div id="sign-right-box">
            <div
              class="sign-right-box"
              :class="{'sign-right-box-has': redEnvelopesData[6].state == 1 || redEnvelopesData[6].state == 0 && stateBtn,  'sign-right-box-now': redEnvelopesData[6].state == 0 && !stateBtn}"
              @click="redEnvelopesClick(redEnvelopesData[6].state, Number(redEnvelopesData[6].amount), 6, redEnvelopesDataBtn)"
            >
              <img
                v-if="redEnvelopesData[6].state == 1"
                v-lazy="require('./../../assets/images/sign/has.png')"
                alt
              />
              <img
                v-if="redEnvelopesData[6].state == 0 && !stateBtn"
                v-lazy="require('./../../assets/images/sign/now.png')"
                class="sign-right-img"
              />
              <img
                v-if="redEnvelopesData[6].state == 0 && stateBtn"
                v-lazy="require('./../../assets/images/sign/has.png')"
                class="sign-right-img"
              />
              <img
                v-if="redEnvelopesData[6].state == -1"
                v-lazy="require('./../../assets/images/sign/future.png')"
                class="sign-right-img"
              />
              <a href="javascript:;" class="sign-right-go"></a>
              <p class="sign-right-p">第七天</p>
              <span class="sign-right-day">
                <font>最高</font>88<font>元</font>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 菜单、内容 -->
    <div class="sign-nav-box-height" v-if="fixed"></div>
    <div class="sign-nav-box" id="nav" :class="{fixed:fixed}">
      <van-tabs type="card" @click="navClick" class="navs" id="sign-box">
        <van-tab v-for="(nav, index) in navs" :key="index" v-if="index <= 5" :title="nav.cate_name"></van-tab>
      </van-tabs>
    </div>
    <div class="goods-box">
      <div
        class="goods"
        v-for="(goods, index) in dataSlice(goodsData)"
        v-if="Number(goods.totalStock) != 0 || !!goods.totalStock"
        :key="index"
        @click="toGoods(goods.goodsId, goods.goodsName)"
      >
        <img class="goods-img-img" v-lazy="goods.img640Url" alt />
        <h3 class="goods-title">{{ goods.goodsName }}</h3>
        <div class="goods-price">
          <div class="price-box">
            <span class="price-new">￥</span>
            <span class="price-new-num">{{ Number(goods.minGroupPrice) }}</span>
            <span class="price-old">￥{{ Number(goods.shopPrice) }}</span>
          </div>
          <span class="goods-go">立即抢</span>
        </div>
      </div>
    </div>
    <!-- 弹窗  -->
    <van-popup v-model="show" position="center" transition id="hb-box">
      <div class="popup-box">
        <img :src="couponImg" alt />
        <a href="javascript:;" class="close" @click="show=false"></a>
        <div class="count-down">
          <p class="count-down-p count-down-txt">可使用时间倒计时</p>
          <p class="count-down-p count-down-num">{{ hour }}:{{ minute }}:{{ second }}</p>
        </div>
        <a href="javascript:;" class="popup-go" @click="popupGo"></a>
      </div>
    </van-popup>
    <div v-show="false" class="img-show">
      <img v-for="(img, index) in couponObj" :key="index" :src="img" alt />
    </div>
    <msgBox :msgTxt="msgTxt" />
    <!-- <div class="height-bottom"></div>
    <bNav></bNav> -->
  </div>
</template>
<script>
import roll from "./../../components/roll";
import { countDown } from "@/assets/js/common/utils";
// import bNav from "./../../components/bottomNav"; // 底部菜单模块
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
import { scroller } from "vue-scrollto/src/scrollTo";
const scrollerTo = scroller();
export default {
  components: {
    roll,
    // bNav
  },
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("./../../assets/images/sign/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("./../../assets/images/icon/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "2.15rem",
            height: ".93rem",
            right: "0.17rem",
            top: ".24rem"
          },
          shareXCX: true,
          shareXCXTitle: "免费送您88元大礼包 天天领天天享",
          shareXCXImg: "share/sign.jpg"
        }
      },
      // 滚字屏
      roll: { stopNum: 1, rullData: [] },
      msgTxt: null,
      // 菜单
      navs: Object.freeze([
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        },
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        },
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        },
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        },
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        },
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        },
        {
          bind_cate_id: "",
          cate_id: "",
          cate_name: ""
        }
      ]),
      goodsData: [],
      page: 1,
      totalPage: false,
      loading: false,
      show: false,
      hour: "24",
      minute: "00",
      second: "00",
      couponObj: {
        0.5: require("./../../assets/images/sign/0.5.png"),
        1: require("./../../assets/images/sign/1.png"),
        2: require("./../../assets/images/sign/2.png"),
        3: require("./../../assets/images/sign/3.png"),
        5: require("./../../assets/images/sign/5.png")
      },
      couponImg: null,
      numArr: ["一", "二", "三", "四", "五", "六"],
      redEnvelopesData: [
        {
          day: "",
          state: 0, // 状态(1:已领取 0:待领取 -1:不可领取)
          amount: 0.5
        },
        {
          day: "",
          state: 0,
          amount: 1
        },
        {
          day: "",
          state: 0,
          amount: 1
        },
        {
          day: "",
          state: 0,
          amount: 2
        },
        {
          day: "",
          state: 0,
          amount: 2
        },
        {
          day: "",
          state: 0,
          amount: 3
        },
        {
          day: "",
          state: 0,
          amount: ""
        }
      ],
      redEnvelopesDataBtn: false, // 假数据关闭
      scrollArr: [],
      stateBtn: false,
      tabName: null,
      cate_id: null,
      day: 0,
      user_id: null,
      token: null,
      uuid: null,
      fixed: false,
      fixed_top: 0,
      signBtn: true,
    };
  },
  created() {
    document.getElementsByTagName("html")[0].style.backgroundColor = "#f52a00";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#f52a00";
    vm = this;
    // alert("initPv");
    this.initPv();
    this.scrollTxt();
    this.initTab();
  },
  methods: {
    // 获取走字屏
    scrollTxt() {
      this.$http.get(this.$api.sign_scroll).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.scrollArr = data.data;
          vm.addObj(vm.scrollArr);
          vm.roll = {
            rollData: vm.scrollArr,
            stopNum: 1,
            waitTime: 2000,
            singleHeight: 0.76
          };
        } else {
          vm.roll = {
            rollData: [
              {
                txt: "连续签满7天  超大红包免费领"
              }
            ],
            stopNum: 1,
            waitTime: 2000,
            singleHeight: 0.6
          };
          // vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, '签到走字屏文案未获取到', res.status);
        }
      });
    },
    // 获取签到数据
    hasSign() {
      let params = {
        activity_id: 1,
        user_id: this.$.getQueryString('user_id') || this.user_id,
        token: this.$.getQueryString('token') || this.token,
        uuid: this.$.getQueryString('uuid') || this.uuid,
      };
      this.$http.get(this.$api.sign_signList, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == 1) {
          vm.redEnvelopesData = data.data;
          vm.redEnvelopesDataBtn = true;
        } else {
          vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        }
      });
    },
    // 数据对象增加键值对
    addObj(obj) {
      obj.map((el, index) => {
        el["txt"] = el["user"] + el["time"] + "秒前领取了" + el["price"] + "元";
      });
    },
    // 签到领现金
    redEnvelopesClick(status, amount, day, btn) {
      if (!this.redEnvelopesDataBtn) {
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
        return false;
      }
      // day分别对应领取了哪一天的红包
      this.day = day + 1;
      if (status == -1) {
        this.msgTxt = "红包未解锁，记得来签到哦~";
      } else if (status == 1) {
        this.msgTxt = "已领取";
      } else {
        if (this.stateBtn) {
          this.msgTxt = "已领取";
        } else {
          if(this.signBtn){
            this.signBtn = false;
            let params = {
              activity_id: 1,
              user_id: this.$.getQueryString('user_id') || this.user_id,
              token: this.$.getQueryString('token') || this.token,
              uuid: this.$.getQueryString('uuid') || this.uuid,
            };
            this.$http.get(this.$api.sign_sign, { params }).then(res => {
              let data = res.data;
              console.log(data);
              if (data.result == 1) {
                vm.signBtn = false;
                // 埋点
                vm.eventHong();
                vm.stateBtn = true;
                vm.show = true;
                // 首先按照接口返回值弹窗，返回值amount若有问题，就走本地传输的amount
                if (data.data.amount) {
                  vm.couponImg = vm.couponObj[Number(data.data.amount)];
                } else {
                  vm.couponImg = vm.couponObj[amount];
                }
                // 倒计时24小时
                vm.countDownInit(86399);
              } else {
                vm.signBtn = true;
                vm.msgTxt = data.message;
                vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
              }
            }).catch(error => {
              vm.signBtn = true;
            });
          }
        }
      }
    },
    // 优惠券-倒计时
    countDownInit(time) {
      countDown(time, function(val) {
        // console.log(val);
        vm.day = val.day;
        vm.hour = val.hour;
        vm.minute = val.minute;
        vm.second = val.second;
      });
    },
    // 优惠券-去使用
    popupGo() {
      this.show = false;
      // 埋点
      this.eventPopup();
      // 导航
      scrollerTo(".navs");
      countDown(1, function(val) {
        console.log("定时器关闭~._.~");
      });
    },
    // 菜单点击
    navClick(index, title) {
      this.page = 1;
      this.tabName = title;
      this.totalPage = false;
      this.cate_id = this.navs[index].cate_id;
      this.loading = false;
      this.goodsInfo();
    },
    // 获取商品详细信息
    goodsInfo() {
      let params = {
        cateId: vm.cate_id,
        page: vm.page
      };
      this.$http.get(this.$api.sign_goodsList, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.status == "1") {
          vm.loading = true;
          if (data.data.length == 0) {
            console.log("最后一页没数据");
            vm.loading = false;
          }
          if (data.data.length < 20) {
            vm.totalPage = true;
          }
          if (vm.page == 1) {
            vm.goodsData = [];
          }
          vm.goodsData = vm.goodsData.concat(data.data);
        } else {
          vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        }
      });
    },
    // 获取菜单
    initTab() {
      this.$http.get(this.$api.sign_tab).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.tabName = data.data.cateList[0].cate_name;
          vm.cate_id = data.data.cateList[0].cate_id;
          vm.navs = Object.freeze(data.data.cateList);
          vm.goodsInfo();
        } else {
          vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        }
      });
    },
    // 跳转商品 name传值 埋点开关
    toGoods(id, name) {
      console.log(this.tabName)
      this.$.jump2good({
        goodsId: id,
        goodsName: name,
        elementId: "good_detail",
        pageName: "zhounian_02",
        tabName: this.tabName
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      this.$.initPv({
        pageName: "zhounian_02"
      });
    },
    // 签到领现金-点击领红包-埋点
    eventHong() {
      console.log(this.day)
      this.$.eventData({
        pageName: "zhounian_02",
        elementId: "hongbao",
        dayNum: this.day
      });
    },
    // 签到领现金-已领取弹框-“去使用”按钮
    eventPopup() {
      this.$.eventData({
        pageName: "zhounian_02",
        elementId: "use"
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
    // 监听滚动
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      
      if (!this.fixed) {
        this.fixed_top = document.getElementById("nav").offsetTop;
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }

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
      if (
        scrollHeight - clientHeight <= scrollTop + 300 &&
        this.loading &&
        !this.totalPage
      ) {
        // 下拉加载
        console.log("下拉加载");
        this.page++;
        this.loading = false;
        this.goodsInfo();
      }
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      if (user_id) {
        this.user_id = user_id;
        this.token = token;
        this.uuid = uuid;
        this.hasSign();
      } else {
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
      }
    };
    window.addEventListener("scroll", this.handleScroll);
    if (xcx_user) {
      vm.options.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      this.$.checkLogin();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.height-bottom {
  width: 100%;
  height: 1.64rem;
}
/* iPhone X */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .height-bottom {
    padding-bottom: 34px;
  }
}
/* iPhone XR */
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .height-bottom {
    padding-bottom: 34px;
  }
}
/* iPhone XS Max */
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .height-bottom {
    padding-bottom: 34px;
  }
}
#box {
  background: #f52a00;
  -webkit-user-select: none;
  user-select: none;
}
.img-box {
  position: relative;
  width: 100%;
  overflow: hidden;
}
img {
  display: block;
  width: 100%;
  overflow: hidden;
}
.img-none {
  display: none;
}
.img-has {
  display: block;
}
.goods-box {
  width: 100%;
  overflow: hidden;
  padding: 0 0.22rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .24rem;
}
.goods {
  width: 5.7rem;
  overflow: hidden;
  background: #fff;
  margin-bottom: 0.11rem;
}
.icon {
  position: absolute;
  width: 0.82rem;
  height: 0.8rem;
  left: 0.07rem;
  top: 0;
  background: url("./../../assets/images/one/icon.png") center top no-repeat;
  background-size: 100%;
}
.goods-img-img {
  display: block;
  width: 5.7rem;
  height: 5.7rem;
  overflow: hidden;
}
.goods-title {
  width: 100%;
  height: 1rem;
  line-height: 0.9rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0;
  padding: 0 0.3rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.5rem;
  color: #585c63;
}
.goods-price {
  height: 0.66rem;
  width: 100%;
  margin-bottom: 0.46rem;
  position: relative;
}
.price-box {
  width: auto;
  height: 0.66rem;
  float: left;
  padding-left: 0.3rem;
}
.price-box span {
  font-family: SourceHanSansCN-Medium;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.06rem;
  display: inline-block;
  float: left;
}
.price-box .price-new {
  font-size: 0.39rem;
  color: #f10e3c;
  margin-top: 0.14rem;
}
.price-box .price-new-num {
  font-size: 0.79rem;
  color: #f10e3c;
}
.price-box .price-old {
  font-family: SourceHanSansCN-Regular;
  font-size: 0.39rem;
  color: #999;
  margin-left: 0.2rem;
  margin-top: 0.34rem;
  text-decoration: line-through;
}
.goods-go {
  float: right;
  background-color: #f10e3c;
  border-radius: 0.2rem;
  padding: 0.1rem 0.24rem;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.44rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  position: absolute;
  right: 0.3rem;
  top: 0;
}
.goods-go-over {
  background: #c7c7c7;
  color: #9b9b9b;
}
#more {
  width: 100%;
  height: 2.35rem;
  background: #f01a0b;
  overflow: hidden;
}
.more {
  display: block;
  width: 5.08rem;
  height: 1.07rem;
  overflow: hidden;
  background: url("./../../assets/images/one/more.png") center center no-repeat;
  background-size: 100%;
  margin: 0.54rem auto 0;
}
#sign-buff {
  width: 5.82rem;
  height: 0.76rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background: url("./../../assets/images/sign/tab_bg.png") center center no-repeat;
  background-size: 100%;
  overflow: hidden;
}
.sign-buff {
  width: 86%;
  height: 0.76rem;
  margin: 0 auto;
}
#sign {
  width: 100%;
  height: 8.28rem;
  overflow: hidden;
  padding: 0.37rem 0.22rem 0.41rem;
  background: #f52a00;
}
.sign {
  width: 100%;
  height: 7.5rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.sign-left {
  width: 8.26rem;
  height: 7.5rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 0.3rem;
}
.sign-left-box {
  width: 2.4rem;
  height: 3.3rem;
  margin-top: 0.3rem;
  overflow: hidden;
}
.sign-left-box:nth-of-type(4) {
  margin-bottom: 0.3rem;
}
.sign-left-box-list {
  width: 2.4rem;
  height: 3.3rem;
  overflow: hidden;
  position: relative;
  opacity: 0.8;
}
.sign-left-box img {
  height: 100%;
}
.sign-left-box-list-has {
  opacity: 0.5;
}
.sign-left-box-list-has .sign-left-box-p {
  color: #fe1e36;
}
.sign-left-box-list-now {
  opacity: 1;
}
.sign-left-box-p {
  position: absolute;
  width: 100%;
  height: 1.3rem;
  text-align: center;
  line-height: 1.3rem;
  left: 0;
  top: 0;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffeda7;
}
.sign-left-box-day {
  position: absolute;
  width: 100%;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.62rem;
  color: #fff;
  left: 0;
  top: 1.8rem;
  color: #fee286;
}
.sign-left-box-day font {
  font-size: 0.38rem;
}
.sign-left-box-go {
  position: absolute;
  width: 1.8rem;
  height: 0.64rem;
  left: 50%;
  margin-left: -0.9rem;
  top: 2.5rem;
}
.sign-right {
  width: 3rem;
  height: 7.5rem;
  background: #fff url("./../../assets/images/sign/7_bg.png") center center
    no-repeat;
  background-size: 100%;
  position: relative;
}
#sign-right-box {
  position: absolute;
  width: 2.71rem;
  height: 3.56rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.sign-right-box {
  position: relative;
  width: 100%;
  height: 3.56rem;
  opacity: 0.8;
}
.sign-right-box-has {
  opacity: 0.5;
}
.sign-right-box-now {
  opacity: 1;
}
.sign-right-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sign-right-go {
  position: absolute;
  width: 1.8rem;
  height: 0.64rem;
  left: 50%;
  margin-left: -0.9rem;
  top: 2.7rem;
}
.sign-right-p {
  position: absolute;
  width: 100%;
  line-height: 0.76rem;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffeda7;
  text-align: center;
  top: 0.3rem;
  left: 0;
}
.sign-right-day {
  position: absolute;
  width: 100%;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.74rem;
  color: #fff;
  left: 0;
  top: 1.94rem;
  color: #fee286;
}
.sign-right-day font {
  font-size: 0.45rem;
}
.sign-right-go {
  position: absolute;
  width: 1.8rem;
  height: 0.64rem;
  left: 50%;
  margin-left: -0.9rem;
  top: 2.73rem;
}
.popup-box {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.close {
  width: 0.85rem;
  height: 0.85rem;
  position: absolute;
  right: 1.88rem;
  top: 4.52rem;
}
.count-down {
  position: absolute;
  width: 4.5rem;
  height: 1.25rem;
  left: 2.39rem;
  top: 12.39rem;
}
.count-down-p {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.43rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
}
.count-down-txt {
  margin-top: 0.1rem;
}
.count-down-num {
  line-height: 0.4rem;
}
.popup-go {
  position: absolute;
  top: 13.6rem;
  left: 2rem;
  width: 7.2rem;
  height: 1.6rem;
}
.img-show {
  height: 0;
  overflow: hidden;
}
.sign-nav-box{
  width: 100%;
  overflow: hidden;
  height: 1.12rem;
}
.sign-nav-box-height{
  width: 100%;
  overflow: hidden;
  height: 1.12rem;
}
.fixed{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>
<style>
html,
body {
  /* background: #f52a00; */
}
#sign-box .van-tabs__nav--card {
  margin: 0;
  height: 1.12rem;
  background: #f52a00;
}
#sign-box .van-tabs__wrap {
  height: 1.12rem;
}
#sign-box .van-tabs__wrap--scrollable .van-tabs__nav {
  padding: 0;
  margin: 0 0.22rem;
  border: none;
  background: #fed15b;
  border-radius: 0;
  height: 1.32rem;
}
#sign-box .van-tabs__nav--card .van-tab {
  width: 2rem;
  margin: 0;
  height: 1.12rem;
  opacity: 0.8;
  font-family: Tianshi-Yanti;
  font-size: 0.5rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.12rem;
  color: #2d2d2d;
  border: none;
  padding: 0;
  text-align: center;
  background: none;
  letter-spacing: 0.26rem;
}
#sign-box .van-tabs__nav--card .van-tab:first-child {
  margin-left: 0.36rem;
}
#sign-box .van-tabs__nav--card .van-tab.van-tab--active {
  color: #f10e3c;
  background: none;
}
#sign-box .van-tabs__nav--card .van-tab.van-tab--active span {
  background: url("./../../assets/images/one/nav_active.png") 0.1rem center
    no-repeat;
  background-size: 0.3rem 0.5rem;
  letter-spacing: 0.26rem;
}
#sign-box {
  padding-top: 1.36rem;
  background: #f01a0b;
}
#sign-box .van-tabs__content {
  background: #f01a0b;
}
#sign-buff ul {
  width: 100%;
}
#sign-buff li {
  height: 0.76rem;
  width: 100%;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.36rem;
  font-stretch: normal;
  text-align: center;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
  font-weight: bold;
  color: #ffffff;
  opacity: 0.7;
}
#sign-buff li .title {
  display: inline-block;
  width: auto;
  overflow: hidden;
  height: 0.76rem;
  line-height: 0.76rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#hb-box {
  background: none;
  width: 100%;
}
</style>