<template>
  <div class="coupon-page">
    <jjsnc-sticky :pos="scrollY">
      <jjsnc-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler"
        ref="scroll"
        :data="activeCompleteCoupons"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <!-- banner -->
        <div class="header" style="height:452px">
          <!-- 头部图片区域 -->
          <section class="item" style="height:452px">
            <img src="./images/coupon-top.jpg" height="452px" />
          </section>

          <!-- 分享 -->
          <div class="my-share" @click.stop="shareMini('share/coupon.jpg','人人瓜分8.8亿现金红包，快来领取')"></div>
        </div>
        <!-- header -->
        <jjsnc-sticky-ele ele-key="_my_coupon_nav">
          <ul class="sticky-header">
            <jjsnc-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler"></jjsnc-scroll-nav-bar>
          </ul>
        </jjsnc-sticky-ele>
        <section class="category-section section">
          <ul class="list">
            <li class="item" v-for="(item, index) in activeCompleteCoupons" :key="index">
              <div class="left-area" @click.stop="gotoDetails(item)">
                <div class="img-box">
                  <img :src="item.img640Url" width="100%" height="100%" />
                </div>
                <div class="info-box">
                  <h1 class="name">{{item.goodsName}}</h1>
                  <div class="price">
                    <span>原价</span>
                    <span class="number">￥{{item.shopPrice}}</span>
                  </div>
                  <div class="now-proce">
                    <span class="text">钜惠价:￥</span>
                    <span class="number">{{item.minGroupPrice}}</span>
                  </div>
                </div>
              </div>
              <div class="right-area" @click.stop="receiveCoupon(item,index)">
                <div class="price-box">
                  <span class="icon">￥</span>
                  <span class="number">{{parseFloat(item.couponAmount)}}</span>
                </div>
                <div class="btn-box">
                  <a href="javascript:;" v-if="item.status==0" class="receive-btn">立即领取</a>
                  <a href="javascript:;" v-else-if="item.status==2" class="receive-btn status-2">已领取</a>
                  <a
                    href="javascript:;"
                    v-else-if="item.status==1 || item.status==3"
                    class="receive-btn status-1"
                  >已抢完</a>
                  <a href="javascript:;" v-else-if="item.status==4" class="receive-btn status-1">未开始</a>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </jjsnc-scroll>
      <!-- fixed header -->
      <template slot="fixed">
        <ul class="sticky-header">
          <li>
            <jjsnc-scroll-nav-bar
              ref="mySticky"
              :current="current"
              :labels="labels"
              @change="changeHandler"
            ></jjsnc-scroll-nav-bar>
          </li>
        </ul>
      </template>
    </jjsnc-sticky>
    <!-- 返回顶部 -->
    <!-- <div class="go-to-top" @click.stop="goToTop" v-show="scrollY>1000">
      <img class="my-img" src="./images/top.png" width="38px" height="38" />
    </div> -->
    <!-- 提示 -->
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
import jjsncSticky from "./components/sticky/sticky.vue";
import jjsncStickyEle from "./components/sticky/sticky-ele.vue";
import jjsncScroll from "./components/scroll/scroll.vue";
import jjsncScrollNavBar from "./components/scroll-nav-bar/scroll-nav-bar.vue";
import { getQueryString } from "@/assets/js/common/utils";
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
export default {
  data() {
    return {
      scrollEvents: ["scroll"],
      scrollY: 0,
      checkTop: true,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: "上拉加载更多",
      pullUpLoadNoMoreTxt: "",
      scrollbar: false,
      customPullDown: true,
      isLoadData: false, //判断是否加载更多
      labels: [
        "精选推荐",
        "潮流服饰",
        "家居百货",
        "时尚鞋包",
        "美妆个护",
        "休闲美食",
        "3C生活"
      ],
      labelsObj: {
        精选推荐: "11-1",
        潮流服饰: "11-2",
        家居百货: "11-3",
        时尚鞋包: "11-4",
        美妆个护: "11-5",
        休闲美食: "11-6",
        "3C生活": "11-7"
      },
      page: 1, // 不同分类的分页数据
      current: "精选推荐",
      activeNumber: "11-1", // 当前激活分类的编号
      activeGoodsIdList: '', //当前goodsId
      activeGoodsList: [], // 当前渲染的数据列表
      goodsIdListObj: {}, // 存放所有数据goodsId 数据
      goodsListObj: {}, // 存放所有数据
      activeCouponInfo: [], // 当前分类优惠券信息
      couponInfoObj: {}, // 存放所有分类优惠券信息
      activeCompleteCoupons: [], // 当前完整优惠券信息
      completeCouponsObj: {}, // 所有完整优惠券信息
      pageSize: 20,
      msgTxt: null,
      user_id: getQueryString("user_id"),
      token: getQueryString("token"),
      uuid: getQueryString("uuid")
    };
  },
  created() {
    this.$.initPv({
      pageName: "zhounian_18"
    });
     document.getElementsByTagName("html")[0].style.backgroundColor = "rgb(238, 16, 8)";
     document.getElementsByTagName("body")[0].style.backgroundColor = "rgb(238, 16, 8)";
    
  },
  mounted() {
    let self = this;
    window.isLogin = (user_id, token, uuid) => {
       self.user_id = user_id
       self.token = token
       self.uuid = uuid
      if (user_id && token) {
        self.getGoodsId();
      } else {
         self.$.errorLogUpload(3, 21, '', window.location.href, 'isLogin', {'user_id':user_id,'token':token,'uuid':uuid}, '', '登录参数缺失', '') 
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
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
  methods: {
    // 点击分享领取优惠券
    receiveCoupon(item, index) {
      // 埋点
      let self = this;
      this.$.eventGoods({
        elementId: "lingqu",
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        pageName: "zhounian_18",
        tabName: self.current
      });
      let status = item.status;
      if (status == 2) {
        self.msgTxt = "已经领取";
      } else if (status == 1 || status == 3) {
        self.msgTxt = "已经领完";
      } else if (status == 0) {
        let self = this;
        let params = {
          user_id: self.user_id,
          token: self.token,
          uuid: self.uuid,
          coupon_id: item.couponId,
          type: self.activeNumber
        };
        this.$http.get(this.$api.receiveCoupon, { params }).then(res => {
          let result = res.data;
          if (result.result == 1) {
            self.activeCompleteCoupons[index].status = 2;
            self.msgTxt = result.message;
          } else {
            self.msgTxt = result.message;
             self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.receiveCoupon, result, 'get', result.message, result.status) 
          }
        });
      } else if (status == 4) {
        self.msgTxt = "未开始";
      } else {
        self.msgTxt = "其他状态发生未知错误";
      }
    },
    // 跳转各个分会场
    goToType(type) {
      console.log(type);
    },
    // 跳转到商品详情
    gotoDetails(item) {
      let self = this;
      this.$.jump2good({
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        pageName: "zhounian_18",
        elementId: "good_detail",
        tabName: self.current
      });
    },
    // 滚动位置
    scrollHandler({ y }) {
      this.scrollY = -y;
    },
    // 获取goodsId
    getGoodsId() {
      let self = this;
      self.activeCompleteCoupons = []; //清空合并好的优惠券信息
      self.activeGoodsIdList= ''  //清空GoodsId信息
      self.activeCouponInfo=[] //清空优惠券信息
      self.activeGoodsList = []; //清空商品列表信息
      self.page = 1;
      let params = {
        user_id: self.user_id,
        token: self.token,
        uuid: self.uuid,
        activity_id: 1, // 主会场所有请求的固定参数都是1
        coordinate: self.activeNumber
      };
      this.$http.get(this.$api.coupon_list, { params }).then(res => {
        let result = res.data;
        if (result.result == 1) {
          let { goods_ids, coupon_info } = result.data;
          self.activeGoodsIdList = goods_ids; //当前分类goodsID
          self.activeCouponInfo = coupon_info; //存放当前分类的优惠券信息
          if(typeof(self.activeGoodsIdList)==='string' && !!self.activeGoodsIdList){self.getGoodsList(); }else{
            
              self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.coupon_list, result, 'get', 'goods_ids为空', result.result) 
          }
        } else {
          console.log("php接口问题");
           self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.coupon_list, result, 'get', result.message, result.result) 
        }
      });
    },
    // 获取java 商品列表
    getGoodsList() {
      let self = this;
      let params = {
        user_id: self.user_id,
        token: self.token,
        uuid: self.uuid,
        page: self.page,
        pageSize: self.pageSize,
        goodsIds: self.activeGoodsIdList
      };
      if(!self.activeGoodsIdList){ return }
      this.$http.post(this.$api.goods_info,  params ).then(res => {
        let result = res.data;
        self.isLoadData = true;
        if (result.status == 1) {
          self.activeGoodsList = self.activeGoodsList.concat(result.data);
          if (
            result.data.length != 0 &&
            self.activeGoodsList.length % self.pageSize == 0
          ) {
            self.isLoadData = true;
            self.page++;
          } else {
            self.isLoadData = false;
          }
          self.mergeCoupon();
          // java数据详情和优惠券信息合并成最终对象
        } else {
          self.isLoadData = false;
          console.log("java接口问题");
          self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.goods_info, result, 'post', result.message, result.status) 
         
        }
      });
    },
    // 合并优惠券信息列表数据
    mergeCoupon() {
      this.activeCompleteCoupons = [];
      this.activeGoodsList.forEach(item => {
        let goodsId = item.goodsId;
        if (this.activeCouponInfo[goodsId]) {
          let temp = Object.assign({}, item, this.activeCouponInfo[goodsId]);
          this.activeCompleteCoupons.push(temp);
        } else {
          console.log("这个item没有对应的优惠券信息");
        }
      });
    },
    // 导航切换
    changeHandler(cur) {
      if (this.current == cur) return;
      this.current = cur;
      this.activeNumber = this.labelsObj[cur];
      this.getGoodsId();
    },
    // 上拉加载更多
    onPullingUp() {
      if (!this.isLoadData) {
        this.$refs.scroll.forceUpdate();
        return;
      } else {
        this.getGoodsList();
      }
    },
    // 滚动到头部
    goToTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000, "ease");
    },
    //分享
    goToShare() {
      this.$.share({
        shareUrl: "https://a.taojiji.com/a/a",
        title: "人人瓜分8.8亿现金红包，快来领取"
      });
    }
  },
  computed: {
    options() {
      return {
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: false
      };
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false;
    }
  },
  components: {
    jjsncSticky,
    jjsncStickyEle,
    jjsncScroll,
    jjsncScrollNavBar
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.coupon-page {
  background: rgb(238, 16, 8);
  .go-to-top {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 2;
    width: 1.216rem;
    height: 1.216rem;
  }
  .header {
    font-size: 0;
    position: relative;
    .my-share {
      position: absolute;
      top: 0.1rem;
      right: 0.1rem;
      width: 2rem;
      height: 1.2rem;
      background: url("./images/share.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
    img {
      max-width: 100%;
      width: 100%;
      border: none;
    }
  }

  .category-section {
    padding-top: 0.7rem;
    .list {
      width: 96%;
      margin: 0 auto;
      .item {
        height: 4.41rem;
        background: url("./images/li-bg.jpg");
        background-size: 11.56rem 4.41rem;
        border-radius: 0.3rem 0.3rem 0 0;
        margin-bottom: 0.5rem;
        padding: 0.2rem 0.3rem;
        display: flex;
        .left-area {
          width: 7.725rem;
          display: flex;
          padding: 0.6rem  0 0 0.3rem;
          .img-box {
            width: 3.21rem;
            height: 3.21rem;
            background-color: #ffffff;
          }
          .info-box {
            font-size: 0.5rem;
            padding: 0.3rem 0 0 0.3rem;
            .name {
              width: 3.31rem;
              // height: 0.89rem;
              font-size: 0.37rem;
              letter-spacing: 0px;
              color: #000000;
              font-weight: bold;
              line-height: 0.5rem;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .price {
              font-size: 0.36rem;
              color: #000000;
              opacity: 0.57;
              padding: 0.3rem 0 0.1rem;
              .number {
                text-decoration: line-through;
              }
            }
            .now-proce {
              font-size: 0;
              .text {
                font-size: 0.36rem;
                color: #ff0d00;
                display: inline-block;
                vertical-align: top;
                padding-top: 0.65rem;
              }
              .number {
                display: inline-block;
                vertical-align: bottom;
                padding-top: 0.4rem;
                font-size: 0.65rem;
                // font-size: 0.5rem;
                color: #ff0d00;
                font-weight: bold;
                width: 1.9rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .right-area {
          width: 3.025rem;
          padding: 0.6rem 0 0 0;
          .price-box {
            padding-left: 0.2rem;
            font-size: 0;
            .icon {
              display: inline-block;
              font-size: 0.36rem;
              color: #ff0d00;
              font-weight: bold;
              vertical-align: top;
              padding-top: 1rem;
            }
            .number {
              display: inline-block;
              font-size: 0.85rem;
              // font-size: 1rem;
              color: #ff0d00;
              font-weight: bold;
              width: 2.1rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              vertical-align: bottom;
              padding-top: 0.6rem;
            }
          }
          .btn-box {
            padding-top: 0.4rem;
            text-align: center;
            .receive-btn {
              font-size: 0.48rem;
              color: #ffffff;
              background: #ff0d00;
              padding: 0.2rem 0.3rem;
              border-radius: 0.1rem;
              &.status-2 {
                background: rgb(255, 125, 97);
              }
              &.status-1 {
                background: rgb(201, 167, 134);
              }
            }
          }
        }
      }
      .item:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

