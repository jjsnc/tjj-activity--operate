<template>
  <div class="container">
    <headerBanner :options="options"></headerBanner>
    <!-- 菜单 -->
    <div id="nav" :class="{'fixed': fixed}">
      <div class="nav">
        <div class="nav-box">
          <a
            href="javascript:;"
            @click="tabclick(index)"
            class="tab"
            :class="{'tab-active': index == navIndex}"
            v-for="(el, index) in navs"
            :key="index"
          >
            <span
              class="tab-icon"
              :style="{backgroundImage: 'url('+ el.icon +')', backgroundSize: el.size}"
            ></span>
            <span class="tab-name">{{ el.name }}</span>
          </a>
        </div>
      </div>
      <div class="next" @click="tabMove">
        <a href="javascript:;" class="next-icon"></a>
      </div>
    </div>
    <div class="zw-height" v-if="fixed"></div>
    <!-- 商品 -->
    <div id="goods">
      <div class="goods">
        <a href="javascript:;" class="goods-list" v-for="(el, index) in couponData" :key="index">
          <img
            v-lazy="el.img320_url"
            class="goods-list-img"
            @click="toGoods(el.goods_id, el.goods_name)"
          >
          <div class="goods-list-good" @click="toGoods(el.goods_id, el.goods_name)">
            <h3 class="good-title">{{ el.goods_name }}</h3>
            <p class="good-price-old">
              钜惠价:
              <del>
                <font>￥</font>199
              </del>
            </p>
            <p class="good-price-new">
              钜惠价:
              <span>
                <font>￥</font>
                {{ el.group_price | price_point_no_zero }}
              </span>
            </p>
          </div>
          <div class="goods-list-yhq">
            <span class="goods-list-yhq-price">
              <font>￥</font>
              <font v-if="el.coupon.status != 10">{{ el.coupon.amount | price_point_no_zero }}</font>
              <font v-else>{{ index % 2 == 0 ? randomNum2 : (index % 3 == 0 ? randomNum3 : randomNum1)}}</font>
            </span>
            <a
              href="javascript:;"
              v-if="el.coupon.count == 0 && el.coupon.status != 1 || el.coupon.status == 10"
              class="goods-list-yhq-go goods-list-yhq-over"
              :id="el.coupon_id"
              @click="yhqOverClick"
            >已抢完</a>
            <a
              href="javascript:;"
              data-btn="1"
              v-if="el.coupon.status == 1"
              class="goods-list-yhq-go goods-list-yhq-has"
              :id="el.coupon_id"
              @click="yhqHasClick"
            >已领取</a>
            <a
              href="javascript:;"
              data-btn="1"
              v-if="el.coupon.status == 0 && el.coupon.count != 0"
              class="goods-list-yhq-go"
              :id="el.coupon_id"
              @click="yhqClick"
            >立即领取</a>
          </div>
        </a>
      </div>
    </div>
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
    <!-- 底部通栏 -->
    <div class="bottom-nav"></div>
    <bottomNav></bottomNav>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import URL from "./../../assets/js/api";
import WxMini from "@/assets/js/common/wx.mini";
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("../../assets/images/coupon/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("../../assets/images/coupon/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: ".53rem",
            height: "1.75rem",
            right: "0rem",
            top: "2.14rem"
          }
        }
      },
      //   菜单
      navs: [
        {
          name: "精选推荐",
          icon: require("../../assets/images/icon/tab_01.png"),
          size: ".51rem"
        },
        {
          name: "潮流服饰",
          icon: require("../../assets/images/icon/tab_02.png"),
          size: ".53rem .65rem"
        },
        {
          name: "家居百货",
          icon: require("../../assets/images/icon/tab_03.png"),
          size: ".74rem .55rem"
        },
        {
          name: "时尚鞋包",
          icon: require("../../assets/images/icon/tab_04.png"),
          size: ".74rem .62rem"
        },
        {
          name: "美妆个护",
          icon: require("../../assets/images/icon/tab_05.png"),
          size: ".61rem .66rem"
        },
        {
          name: "休闲美食",
          icon: require("../../assets/images/icon/tab_06.png"),
          size: ".69rem .64rem"
        },
        {
          name: "3C生活",
          icon: require("../../assets/images/icon/tab_07.png"),
          size: ".7rem .53rem"
        }
      ],
      navIndex: 0,
      navWidth: 0,
      // 优惠券信息
      couponData: [],
      // 吸顶菜单开关
      fixed: false,
      msgTxt: null,
      // 优惠券列表
      page: 1,
      size: 10,
      user_id: null,
      token: null,
      uuid: null,
      // 下拉加载
      loading: true,
      // 多次点击限制
      clickBtn: true,
      randomNum1: 1,
      randomNum2: 2,
      randomNum3: 3,
    };
  },
  created() {
    vm = this;
    vm.initPv();
  },
  methods: {
    // 菜单点击
    tabclick(index) {
      vm.loading = false;
      if (!vm.user_id) {
        if (tjjApp.web.xcx) {
          WxMini.jump2login();
        } else {
          tjjApp.web.login();
        }
        return false;
      }
      vm.navIndex = index;
      vm.page = 1;
      vm.couponData = [];
      vm.init(vm.navIndex, 1);
    },
    tabMove() {
      vm.loading = false;
      if (!vm.user_id) {
        if (tjjApp.web.xcx) {
          WxMini.jump2login();
        } else {
          tjjApp.web.login();
        }
        return false;
      }
      vm.navWidth = document.getElementsByClassName("tab")[0].clientWidth;
      vm.navIndex++;
      if (vm.navIndex >= 4 && vm.navIndex <= 6) {
        document.getElementsByClassName("nav")[0].scrollLeft =
          (vm.navIndex - 3) * vm.navWidth;
      } else if (vm.navIndex > 6) {
        document.getElementsByClassName("nav")[0].scrollLeft = 0;
        vm.navIndex = 0;
      } else {
        document.getElementsByClassName("nav")[0].scrollLeft =
          vm.navIndex * vm.navWidth;
      }
      vm.page = 1;
      vm.couponData = [];
      vm.init(vm.navIndex, 1);
    },
    // 优惠券列表
    init(index, page) {
      let params = {
        user_id: vm.user_id,
        tab_name: vm.navs[index].name,
        page: page || vm.page,
        size: vm.size
      };
      vm.$http.get(URL.GetCouponList, { params }).then(res => {
        let data = res.data;
        console.log(res);

        if (data.result == 1 && data.data.length != 0) {
          // 筛选coupon.status不为10的数据
          let xxData = [];
          data.data.list.map((el, i) => {
            if(el.coupon.status != 10){
              xxData.push(el);
            }
          })
          if(page == 1){
            vm.couponData = data.data.list;
          }else{
            vm.couponData = vm.couponData.concat(data.data.list);
          }
          if (
            data.data.count - vm.page * vm.size <= 0
          ) {
            vm.loading = false;
          } else {
            vm.loading = true;
            // if (data.data.list.length != 10 && Math.ceil(data.data.count / vm.size) > vm.page) {
            //   tjjApp.web.errorLogUpload(
            //     3,
            //     21,
            //     params,
            //     "",
            //     res.request.responseURL,
            //     data,
            //     res.config.method,
            //     "运营配置id个别无效",
            //     res.status
            //   );
            // }
          }
        } else if (data.result == 1 && data.data.length == 0) {
          vm.loading = false;
          vm.msgTxt = "暂无数据";
          tjjApp.web.errorLogUpload(
            3,
            21,
            params,
            "",
            res.request.responseURL,
            data,
            res.config.method,
            "data返回值为空",
            res.status
          );
        } else {
          vm.loading = false;
          vm.msgTxt = res.message;
          tjjApp.web.errorLogUpload(
            3,
            21,
            params,
            "",
            res.request.responseURL,
            data,
            res.config.method,
            "result返回值不为1",
            res.status
          );
        }
      });
    },
    // 优惠券领取
    yhqClick(e) {
      let clickBtn = e.target.getAttribute("click-btn");
      let dataBtn = e.target.getAttribute("data-btn");
      if (clickBtn != 1 && dataBtn == 1) {
        e.target.setAttribute("data-btn", 0);
        let id = e.target.id;
        let params = {
          user_id: vm.user_id,
          coupon_id: id,
          uuid: vm.uuid,
          token: vm.token
        };

        vm.$http.get(URL.GetCouponInfo, { params }).then(res => {
          let data = res.data;
          console.log(data);
          if (data.result == 1) {
            if (data.data.type == 1 || data.data.type == -2003) {
              // -2003 该优惠券已领取
              // 1 领取成功
              vm.msgTxt = "领取成功";
              e.target.classList.add("goods-list-yhq-has");
              e.target.innerText = "已领取";
              e.target.setAttribute("click-btn", 1);
              e.target.setAttribute("data-btn", 2);
            } else if (data.data.type == 	-2001) {
              // -2001 优惠券已领完
              vm.msgTxt = "已抢完";
              e.target.classList.add("goods-list-yhq-over");
              e.target.innerText = "已抢完";
              e.target.setAttribute("click-btn", 1);
              e.target.setAttribute("data-btn", 4);
            } else{
              vm.msgTxt = data.message;
              e.target.setAttribute("data-btn", 1);
            }
          } else if(data.result == -1) {
            vm.msgTxt = data.message;
            tjjApp.web.errorLogUpload(
              3,
              21,
              params,
              "",
              res.request.responseURL,
              data,
              res.config.method,
              "result返回值为-1",
              res.status
            );
            e.target.setAttribute("data-btn", 1);
          }else{
            vm.msgTxt = data.message;
            e.target.setAttribute("data-btn", 1);
          }
        }).catch(res => {
          e.target.setAttribute("data-btn", 1);
        });
      } else if (clickBtn == 1 && dataBtn == 2) {
        vm.msgTxt = "已领取";
      } else if (clickBtn == 1 && dataBtn == 4) {
        vm.msgTxt = "已抢完";
      }
    },
    // 优惠券已领取
    yhqHasClick() {
      vm.msgTxt = "已领取";
    },
    // 优惠券已抢完
    yhqOverClick() {
      vm.msgTxt = "已抢完";
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
      if (scrollHeight - clientHeight <= scrollTop + 300 && vm.loading) {
        // 下拉加载
        vm.page++;
        console.log(vm.page);
        vm.init(vm.navIndex);
        vm.loading = false;
      }
    },
    // 跳转商品
    toGoods(id, name) {
      tjjApp.web.jump2good({
        goodsId: id,
        goodsName: name,
        activityName: "618大促活动"
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      tjjApp.web.initPv();
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      let params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "首页"
      };
      send.sendPoint(params);
      if (user_id) {
        vm.user_id = user_id;
        vm.token = token;
        vm.uuid = uuid;
        vm.init(0);
      } else {
        tjjApp.web.login();
      }
    };
    
    window.addEventListener("scroll", this.handleScroll);
    if (xcx_user) {
      vm.options.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style>
html,
body {
  background: #f40d2f;
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
</style>
<style scoped>
.container,
#nav,
#goods {
  background: #f40d2f;
  -webkit-user-select: none;
  user-select: none;
}
img {
  width: 100%;
  display: block;
}
section {
  width: 100%;
  position: relative;
  overflow: hidden;
}
/* 菜单 */
#nav {
  width: 100%;
  height: 2.24rem;
}
.nav {
  width: calc(100% - 1.07rem);
  height: 2.24rem;
  float: left;
  overflow-x: auto;
  overflow-y: hidden;
}
.nav-box {
  width: calc(100% / 4 * 7);
  height: 2.24rem;
}
.tab {
  display: block;
  float: left;
  height: 2.24rem;
  width: calc(100% / 7);
}
.tab-icon {
  display: block;
  width: 100%;
  height: 1.24rem;
  background-position: center bottom;
  background-repeat: no-repeat;
}
.tab-name {
  display: block;
  text-align: center;
  font-size: 0.3rem;
  font-family: FZZDXJW--GB1-0;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  height: 1rem;
  line-height: 1rem;
  color: #fff;
}
.tab-active {
  background: linear-gradient(#e10122, #e10122);
}
.next {
  width: 1.07rem;
  height: 2.24rem;
  float: left;
  background: linear-gradient(#e10122, #e10122);
  position: relative;
}
.next-icon {
  width: 0.52rem;
  height: 0.52rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  position: absolute;
  background: url(../../assets/images/icon/jt_icon.png) center center no-repeat;
  background-size: 0.52rem;
}
/* 商品 */
#goods {
  width: 100%;
  padding: 0.4rem 0.2rem 0.1rem 0.33rem;
  overflow: hidden;
}
.goods {
  width: 100%;
  overflow: hidden;
}
.goods-list {
  display: block;
  width: 100%;
  height: 3.68rem;
  margin-bottom: 0.2rem;
  background: url(../../assets/images/coupon/coupon_bg.png) center center
    no-repeat;
  background-size: 100% 3.68rem;
  overflow: hidden;
}
.goods-list-img {
  width: 3.03rem;
  height: 2.98rem;
  margin: 0.21rem 0.3rem 0 0.22rem;
  float: left;
}
.goods-list-good {
  width: 3.7rem;
  float: left;
  /* overflow: hidden; */
  padding-top: 0.26rem;
}
.good-title {
  width: 100%;
  height: 1.3rem;
  line-height: 0.65rem;
  font-family: FZDHTJW--GB1-0;
  font-size: 0.42rem;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #1c1c1c;
  opacity: 0.86;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0.2rem;
}
.good-price-old {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.43rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #a8a7a7;
  opacity: 0.83;
  opacity: 0;
}
.good-price-old del {
  font-family: MonImpact;
  font-size: 0.5rem;
}
.good-price-old del font {
  font-size: 0.41rem;
}
.good-price-new {
  width: 4.4rem;
  height: 0.7rem;
  line-height: 0.7rem;
  font-family: SourceHanSansCN-Heavy;
  font-size: 0.47rem;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fb0018;
  opacity: 0.95;
}
.good-price-new span {
  font-size: 0.63rem;
  font-family: AkzidenzGroteskBQ-XBoldAlt;
}
.good-price-new span font {
  font-size: 0.45rem;
}
.goods-list-yhq {
  width: 3.46rem;
  height: 3.4rem;
  float: right;
  margin-right: 0.12rem;
  overflow: hidden;
}
.goods-list-yhq-price {
  margin-top: 0.5rem;
  width: 100%;
  height: 1.7rem;
  line-height: 1.7rem;
  text-align: center;
  font-family: MonImpact;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fb0018;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: top;
}
.goods-list-yhq-price font:nth-of-type(1) {
  font-size: 0.48rem;
  line-height: 1rem;
}
.goods-list-yhq-price font:nth-of-type(2) {
  font-size: 1.53rem;
}
.goods-list-yhq-go {
  background-image: linear-gradient(0deg, #dc0015 4%, #ff0f26 100%),
    linear-gradient(#d147ff, #d147ff);
  background-blend-mode: normal, normal;
  box-shadow: 0px 0.03rem 0.03rem 0px rgba(82, 82, 82, 0.22);
  border-radius: 0.1rem;
  width: 2.78rem;
  height: 0.68rem;
  line-height: 0.68rem;
  text-align: center;
  font-family: FZZDXJW--GB1-0;
  font-size: 0.48rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  margin: 0 auto;
  display: block;
}
.goods-list-yhq-has {
  background-image: linear-gradient(0deg, #0062dc 4%, #029ff9 100%),
    linear-gradient(#d147ff, #d147ff);
}
.goods-list-yhq-over {
  background-image: linear-gradient(0deg, #5c5c5c 4%, #acacac 100%),
    linear-gradient(#d147ff, #d147ff);
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
.zw-height {
  height: 2.24rem;
}
</style>

