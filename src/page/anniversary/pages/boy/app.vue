<template>
  <div class="boy-page">
    <jjsnc-sticky :pos="scrollY">
      <jjsnc-scroll
        :scroll-events="scrollEvents"
        @scroll="scrollHandler"
        ref="scroll"
        :data="activeGoodsList"
        :options="options"
        @pulling-up="onPullingUp"
      >
        <!-- banner -->
        <img
          class="share"
          src="./../../assets/images/icon/share.png"
          @click="shareMini('share/boy.jpg','男神服饰1元秒杀 先到先得')"
        />
        <div class="header" style="heighwear-sectiont:712px">
          <!-- 头部图片区域 -->
          <section class="item">
            <img src="./images/boy3_01.jpg" height="490" />
          </section>
          <!-- 步骤区域 -->
          <section>
            <img src="./images/boy3_02.jpg" height="92" />
          </section>
          <!-- 领取红包区域 -->
          <section class="receive-area">
            <div
              class="left item"
              :class="'status-'+couponList[0].status"
              v-if="couponList[0]"
              @click.stop="receiveCoupon(couponList[0].status,'1')"
            >
              <div class="content">
                <span class="icon">￥</span>
                <span class="price">{{parseFloat(couponList[0].discount)}}</span>
                <span class="text">现金券</span>
              </div>
            </div>
            <div
              class="right item"
              :class="'status-'+couponList[1].status"
              v-if="couponList[1]"
              @click.stop="receiveCoupon(couponList[1].status,'2')"
            >
              <div class="content">
                <span class="icon">￥</span>
                <span class="price">{{parseFloat(couponList[1].discount)}}</span>
                <span class="text">现金券</span>
              </div>
            </div>
          </section>
        </div>
        <!-- 穿搭攻略 -->
        <section class="section wear-section" style="height:519px">
          <h1 class="title-1">穿搭攻略</h1>
          <div class="content">
            <h3 class="title-3"></h3>
            <ul class="list">
              <li class="item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/1593a6b5b379e2c1cc-html5.html"
                >
                  <img src="./images/1Leisure.jpg" width="100%" height="100%" />
                </a>
              </li>
              <li class="item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/153989256ffa0798bd-html5.html"
                >
                  <img src="./images/2-Business.png" width="100%" height="100%" />
                </a>
              </li>
              <li class="item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/15d6cc4a102485698e-html5.html"
                >
                  <img src="./images/3-motion.jpg" width="100%" height="100%" />
                </a>
              </li>
              <li class="item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/15f8b7dabf869b4bdd-html5.html"
                >
                  <img src="./images/4-Japan.jpg" width="100%" height="100%" />
                </a>
              </li>
            </ul>
          </div>
        </section>
        <!-- 流行解读 -->
        <section class="section popular-section" style="height:492px">
          <h1 class="title-1">流行解读</h1>
          <div class="content">
            <ul class="top-list">
              <div class="left-area">
                <li class="man-wear item">
                  <a
                    href="https://modeup.taojiji.com/taojiji/pages/2019/07/1567583bae9f1d85a4-html5.html"
                  >
                    <img src="./images/man-wear.jpg" width="100%" height="100%" />
                  </a>
                </li>
              </div>
              <div class="right-area">
                <li class="man-shoes item">
                  <a
                    href="https://modeup.taojiji.com/taojiji/pages/2019/07/17e0431aa0f91699e2-html5.html"
                  >
                    <img src="./images/man-shoes.jpg" width="100%" height="100%" />
                  </a>
                </li>
                <li class="beauty-makeup item">
                  <a
                    href="https://modeup.taojiji.com/taojiji/pages/2019/07/11943e3392318b73fe-html5.html"
                  >
                    <img src="./images/beauty-makeup.jpg" width="100%" height="100%" />
                  </a>
                </li>
              </div>
            </ul>
            <ul class="botton-list">
              <li class="underwear item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/1547df271fe61f6eb4-html5.html"
                >
                  <img src="./images/underwear.jpg" width="100%" height="100%" />
                </a>
              </li>
              <li class="luggage-bags item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/1187a0f72c2f332e85-html5.html"
                >
                  <img src="./images/luggage-bags.jpg" width="100%" height="100%" />
                </a>
              </li>
              <li class="accessories item">
                <a
                  href="https://modeup.taojiji.com/taojiji/pages/2019/07/116061701c89fc9c38-html5.html"
                >
                  <img src="./images/accessories.jpg" width="100%" height="100%" />
                </a>
              </li>
            </ul>
          </div>
        </section>
        <!-- header -->
        <jjsnc-sticky-ele ele-key="11">
          <jjsnc-scroll-nav-bar :current="current" :labels="labels" @change="changeHandler"></jjsnc-scroll-nav-bar>
        </jjsnc-sticky-ele>
        <section class="category-section section">
          <ul class="list">
            <li
              class="item"
              v-for="(item, index) in activeGoodsList"
              :key="index"
              @click.stop="gotoDetails(item)"
            >
              <img class="my-img" v-lazy="item.img640Url" width="100%" height="178px" />
              <h1 class="name">{{item.goodsName}}</h1>
              <div class="botton-area">
                <div class="new-price">
                  <span class="icon">￥</span>
                  <span class="number">{{item.minGroupPrice}}</span>
                </div>
                <div class="old-orice">￥{{item.shopPrice}}</div>
                <div class="btn" v-if="item.totalStock>0">立即抢</div>
                <div class="btn end-btn" v-else>已售完</div>
              </div>
            </li>
          </ul>
        </section>
      </jjsnc-scroll>
      <!-- fixed header -->
      <template slot="fixed">
        <jjsnc-scroll-nav-bar
          ref="mySticky"
          :current="current"
          :labels="labels"
          @change="changeHandler"
        ></jjsnc-scroll-nav-bar>
      </template>
      <!-- 返回顶部 -->
      <!-- <div class="go-to-top" @click.stop="goToTop" v-show="scrollY>1000">
        <img class="my-img" src="./images/top.png" width="38px" height="38" />
      </div>-->
    </jjsnc-sticky>
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
      isLoadData: {}, //判断是否加载更多
      labels: [
        "风格会场",
        "新品会场",
        "男装",
        "男鞋",
        "美妆",
        "内衣",
        "箱包配饰"
      ],
      labelsObj: {
        风格会场: "16-1",
        新品会场: "16-2",
        男装: "16-3",
        男鞋: "16-4",
        美妆: "16-5",
        内衣: "16-6",
        箱包配饰: "16-7"
      },
      page: {}, // 不同分类的分页数据
      current: "风格会场",
      activeNumber: "16-1", // 当前激活分类的编号
      activeGoodsIdList: [], //当前goodsId
      activeGoodsList: [], // 当前渲染的数据列表
      goodsIdListObj: {}, // 存放所有数据goodsId 数据
      goodsListObj: {}, // 存放所有数据
      couponList: [], // 优惠券数据
      pageSize: 20, // 分页加载数据数量
      msgTxt: null,
      user_id: getQueryString("user_id"),
      token: getQueryString("token"),
      uuid: getQueryString("uuid")
    };
  },
  created() {
    this.$.initPv({
      pageName: "zhounian_15"
    });
      document.getElementsByTagName("html")[0].style.backgroundColor = "rgb(227, 82, 56);";
      document.getElementsByTagName("body")[0].style.backgroundColor = "rgb(227, 82, 56);";

  },
  mounted() {
    let self = this;
    window.isLogin = (user_id, token, uuid) => {
      self.user_id = user_id;
      self.token = token;
      self.uuid = uuid;
      if (user_id) {
        this.getGoodsId();
        this.getCouponList();
      } else {
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
    receiveCoupon(status, num) {
      let self = this;
      if (status == 3) {
        this.$refs.scroll.scrollTo(0, -1736, 1000, "ease");
      } else if (status == 2) {
        self.msgTxt = "无库存";
      } else if (status == 1) {
        self.shareClick();
        let params = {
          user_id: self.user_id,
          token: self.token,
          uuid: self.uuid,
          activity_id: 1, // 主会场所有请求的固定参数都是1
          coordinate: "16-8",
          num: num
        };
        setTimeout(() => {
          this.$http
            .get(this.$api.categoryShare, { params })
            .then(res => {
              let result = res.data;
              if (result.result == 1) {
                self.couponList[num - 1].status = 3;
                self.msgTxt = "领取成功";
              } else {
                self.msgTxt = "领取失败";
                 self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.categoryShare, result, 'get', result.message, result.result)
              }
            })
            .catch(e => {
              self.msgTxt = e || "服务异常";
            });
        }, 300);
      } else {
        self.msgTxt = "数据异常";
      }
    },
    // 跳转各个分会场
    goToType(type) {
      console.log(type);
    },
    // 跳转到商品详情
    gotoDetails(item) {
      let self = this;
      if (item.totalStock > 0) {
        this.$.jump2good({
          goodsId: item.goodsId,
          goodsName: item.goodsName,
          pageName: "zhounian_15",
          elementId: "good_detail",
          tabName: self.current
        });
      } else {
        self.msgTxt = "该商品已售罄";
      }
    },
    // 滚动位置
    scrollHandler({ y }) {
      this.scrollY = -y;
    },
    // 获取goodsId
    getGoodsId() {
      let self = this;
      let params = {
        user_id: self.user_id,
        token: self.token,
        uuid: self.uuid,
        activity_id: 1, // 主会场所有请求的固定参数都是1
        coordinate: self.activeNumber
      };
      this.$http.get(this.$api.goods_list, { params }).then(res => {
        let result = res.data;
        if (result.result == 1) {
          let { goods_ids } = result.data;
          self.activeGoodsIdList = goods_ids; // 存储所有id
          self.goodsIdListObj[self.activeNumber] = goods_ids;
          if(!!self.activeGoodsIdList){self.getGoodsList()};
        } else {
          console.log("php接口问题");
           self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.goods_list, result, 'get', result.message, result.result)
        }
      });
    },
    // 获取商品列表
    getGoodsList() {
      let self = this;
      let params = {
        user_id: self.user_id,
        token: self.token,
        uuid: self.uuid,
        page:
          self.page[self.activeNumber] || (self.page[self.activeNumber] = 1),
        pageSize: self.pageSize,
        goodsIds: self.activeGoodsIdList
      };
      if(!self.activeGoodsIdList){return}
      this.$http.post(this.$api.goods_info,  params ).then(res => {
        let result = res.data;
        self.isLoadData[self.activeNumber] = true;
        if (!self.goodsListObj[self.activeNumber]) {
          self.goodsListObj[self.activeNumber] = [];
        }
        if (result.status == 1) {
          if (self.goodsListObj[self.activeNumber].length == 0) {
            self.$set(self.goodsListObj, self.activeNumber, result.data);
            self.activeGoodsList = self.goodsListObj[self.activeNumber];
          } else {
            self.goodsListObj[self.activeNumber] = self.goodsListObj[
              self.activeNumber
            ].concat(result.data);
            self.activeGoodsList = self.goodsListObj[self.activeNumber];
          }
          if (
            result.data.length != 0 &&
            self.goodsListObj[self.activeNumber].length % self.pageSize == 0
          ) {
            self.isLoadData[self.activeNumber] = true;
            self.page[self.activeNumber]++;
          } else {
            self.isLoadData[self.activeNumber] = false;
          }
        } else {
          console.log("java接口问题");
           self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.goods_info, result, 'post', result.message, result.status)
        }
      });
    },
    // 获取优惠券列表
    getCouponList() {
      let self = this;
      let params = {
        user_id: self.user_id,
        token: self.token,
        uuid: self.uuid,
        activity_id: 1, // 主会场所有请求的固定参数都是1
        coordinate: "16-8"
      };
      this.$http
        .get(this.$api.categoryList, { params })
        .then(res => {
          let result = res.data;
          if (result.result == 1) {
            self.couponList = result.data.coupon_list;
          } else {
            console.log("php接口问题");
            self.$.errorLogUpload(3, 21, params, window.location.href, self.$api.categoryList, result, 'post', result.message, result.result)
          }
        })
        .catch(e => {
          self.msgTxt = e || "领取接口异常";
        });
    },
    // 导航切换
    changeHandler(cur) {
      if (this.current == cur) return;
      this.current = cur;
      this.activeNumber = this.labelsObj[cur];
      this.activeGoodsIdList = this.goodsIdListObj[this.activeNumber];
      this.activeGoodsList = this.goodsListObj[this.activeNumber];
      if (!this.activeGoodsIdList) {
        this.getGoodsId();
      } else {
        return;
      }
    },
    // 上拉加载更多
    onPullingUp() {
      if (!this.isLoadData[this.activeNumber]) {
        this.$refs.scroll.forceUpdate();
        return;
      } else {
        this.getGoodsList();
      }
    },
    // 分享
    shareClick() {
      if (this.$.xcx()) {
        this.$.share({
          title: "男神服饰1元秒杀 先到先得",
          shareActivity: 0,
          shareUrl: window.location.origin + "/project/anniversary/view/boy",
          imgUrl: require("./../../assets/images/share/boy.jpg")
        });
      } else {
        this.shareMini("share/boy.jpg", "男神服饰1元秒杀 先到先得");
      }
    },
    // 滚动到头部
    goToTop() {
      this.$refs.scroll.scrollTo(0, 0, 1000, "ease");
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
.boy-page {
  background: rgb(227, 82, 56);
  .go-to-top {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    z-index: 2;
    width: 1.216rem;
    height: 1.216rem;
  }
  .share {
    width: 2rem;
    position: absolute;
    right: 0.2rem;
    height: 1rem;
    z-index: 10;
    top: 0.5rem;
  }
  .header {
    font-size: 0;
    img {
      max-width: 100%;
      width: 100%;
      border: none;
    }
    .receive-area {
      position: relative;
      width: 96%;
      height: 4.16rem;
      margin: 0 auto;
      background: url("./images/coupon.png");
      background-size: contain;
      background-repeat: no-repeat;
      .item {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        background-size: contain;
        background-position: 0.1rem 0.6rem;
        background-repeat: no-repeat;
        .content {
          font-size: 0;
          display: inline-block;
          width: 4.247rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 1.6rem 0 0 0.5rem;
          > span {
            font-size: 0.6rem;
            display: inline-block;
            vertical-align: top;
          }
          .icon {
            font-size: 0.1rem;
            color: #eefd06;
          }
          .price {
            color: #eefd06;
            font-weight: bold;
          }
          .text {
            color: #fff;
            font-weight: bold;
            padding-left: 0.1rem;
          }
        }
        &.status-1 {
          background: url("./images/coupon-status-1.png");
          background-size: contain;
          background-position: 0.1rem 0.6rem;
          background-repeat: no-repeat;
        }
        &.status-2 {
          background: url("./images/coupon-status-2.png");
          background-size: contain;
          background-position: 0.1rem 0.6rem;
          background-repeat: no-repeat;
        }
        &.status-3 {
          background: url("./images/coupon-status-3.png");
          background-size: contain;
          background-position: 0.1rem 0.6rem;
          background-repeat: no-repeat;
        }
      }
      .left {
        left: 0;
      }
      .right {
        right: 0;
      }
    }
  }
  .wear-section {
    .title-1 {
      font-size: 0.86rem;
      color: rgb(255, 247, 1);
      text-align: center;
      padding: 0.4rem 0 0.6rem;
      font-weight: 400;
    }
    .content {
      width: 96%;
      margin: 0 auto;
      border-radius: 0.4rem;
      border: solid 0.05rem #fdc606;
      position: relative;
      padding: 1rem 0.15rem 0.2rem;
      .title-3 {
        position: absolute;
        top: -0.7rem;
        left: (50%);
        transform: translate(-50%);
        background: url("./images/subtitle.png") no-repeat;
        background-size: 7.7rem 1.44rem;
        width: 7.7rem;
        height: 1.44rem;
      }
      .list {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        .item {
          width: 5.41rem;
          height: 6.58rem;
          background-color: #ffffff;
          border-radius: 0.3rem;
          margin-bottom: 0.15rem;
          border-radius: 0.3rem;
          img {
            border-radius: 0.3rem;
          }
        }
      }
    }
  }
  .popular-section {
    padding-top: 1.3rem;
    position: relative;
    margin-bottom: 0.3rem;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .title-1 {
      position: absolute;
      left: 50%;
      top: 1rem;
      background: rgb(227, 82, 56);
      z-index: 1;
      transform: translate(-50%);
      font-size: 0.86rem;
      color: #fff701;
      text-align: center;
      font-weight: 400;
      display: inline-block;
      width: 4.5rem;
    }

    .content {
      width: 96%;
      margin: 0 auto;
      border-radius: 0.4rem;
      border: solid 0.05rem #fdc606;
      position: relative;
      padding: 1rem 0.15rem 0.2rem;
      .item {
        border-radius: 0.2rem;
        > img {
          border-radius: 0.2rem;
        }
      }
      .top-list {
        display: flex;
        justify-content: space-between;
        .left-area {
          width: 5.5rem;
          .man-wear {
            height: 8.85rem;
          }
        }
        .right-area {
          width: 5.5rem;
          .man-shoes {
            height: 4.31rem;
            margin-bottom: 0.2rem;
          }
          .beauty-makeup {
            height: 4.31rem;
          }
        }
      }
      .botton-list {
        display: flex;
        justify-content: space-between;
        padding-top: 0.15rem;
        .item {
          width: 3.69rem;
          height: 4.12rem;
        }
      }
    }
  }
  .category-section {
    padding-top: 0.7rem;
    .list {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      width: 96%;
      margin: 0 auto;
      .item {
        width: 5.71rem;
        background: #fff;
        margin-bottom: 0.18rem;
        .my-img {
          width: 100%;
          height: 5.57rem;
        }
        .name {
          font-size: 0.6rem;
          padding: 0.1rem 0 0.3rem 0.3rem ;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 5.5rem;
        }
        .botton-area {
          padding: 0 0.3rem 0.3rem 0.3rem;
          font-size: 0.5rem;
          font-size: 0;
          display: flex;
          justify-content: space-between;
          .new-price {
            display: inline-block;
            vertical-align: bottom;
            max-width: 2.3rem;
            color: #d1072d;
           align-self: flex-end;
            .icon {
              font-size: 0.375rem;
              display: inline-block;
              vertical-align: bottom;
            }
            .number {
              display: inline-block;
              vertical-align: bottom;
              font-size: 0.61rem;
              max-width: 1.9rem;;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .old-orice {
            width: 1rem;
            font-size: .3rem;
            display: inline-block;
            vertical-align: bottom;
            text-decoration: line-through;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0.4;
            align-self: flex-end;
          }
          .btn {
            display: inline-block;
            vertical-align: bottom;
            background-image: linear-gradient(#d1072d, #d1072d),
              linear-gradient(#ff2645, #ff2645);
            background-blend-mode: normal, normal;
            border-radius: 0.1rem;
            color: #fff;
            padding: 0.2rem 0.3rem;
            font-size: 0.45rem;
          }
          .end-btn {
            background: rgb(199, 199, 199);
            color: rgb(156, 156, 156);
          }
        }
      }
    }
  }
}
</style>

