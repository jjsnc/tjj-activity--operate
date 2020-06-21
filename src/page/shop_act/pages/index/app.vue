<template>
  <div>
    <headerBanner class="banner" :options="options" @sendMsg="getMsg"></headerBanner>
    <section>
      <img v-lazy="require('../../assets/images/index/top_01.jpg')" class="img-height-1" alt>
      <div class="count-down">
        <p class="count-down-txt">距离618巅峰大促结束仅剩:</p>
        <p class="count-down-time">{{ day }}天{{ hour }}时{{ minute }}分{{ second }}秒</p>
      </div>
    </section>
    <!-- 浮动图 -->
    <div id="float">
      <div class="float">
        <a
          href="javascript:;"
          class="float-a"
          :class="{
              'float-a-bottom-0': index > 4
            }"
          v-for="(el, index) in floatData"
          :key="index"
          @click="toPage(el.router)"
        >
          <img class="float-a-img" v-lazy="el.img" alt>
        </a>
      </div>
    </div>
    <!-- 菜单 -->
    <div id="nav" :class="{'fixed': fixed}">
      <div id="nav-box">
        <div class="nav">
          <div class="nav-box">
            <a
              href="javascript:;"
              class="nav-a"
              :class="{'nav-a-active': index == navIndex}"
              v-for="(el, index) in navs"
              :key="index"
              @click="navClick(index)"
            >{{ el.name }}</a>
          </div>
        </div>
        <a href="javascript:;" class="nav-icon" @click="openNav"></a>
        <div class="nav-popup" :class="{'nav-show': showBtn, 'nav-hide': hideBtn}">
          <div class="nav-popup-top">
            <span class="nav-popup-top-txt">选择频道</span>
            <a href="javascript:;" class="nav-popup-top-icon" @click="closeNav"></a>
          </div>
          <div class="nav-popup-list">
            <a
              href="javascript:;"
              class="nav-popup-list-a"
              :class="{'nav-popup-list-a-active': index == navIndex}"
              v-for="(el, index) in navs"
              :key="index"
              @click="navClick(index)"
            >{{ el.name }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="zw-height" v-if="fixed"></div>
    <div class="nav-tab scroll-to scroll-to-0">
      <a
        href="javascript:;"
        class="nav-tab-a"
        v-for="(el, index) in navTabs"
        :key="index"
        @click="toPage(el.router)"
      >
        <img v-lazy="el.img" alt>
      </a>
    </div>
    <!-- 限时秒杀 -->
    <img v-lazy="require('../../assets/images/index/section_01.jpg')" class="scroll-to scroll-to-1 img-height-2" alt>
    <div id="spike-nav">
      <a
        href="javascript:;"
        class="spike-nav-a"
        :class="{'spike-nav-a-active': index == spikeIndex}"
        v-for="(el, index) in spikeTabData"
        :key="index"
        @click="spikeClick(index, el.flash_sale_id)"
      >{{ el.title }}</a>
    </div>
    <div id="spike-goods">
      <div class="spike-goods-box" :style="{'width': spikeData.length * 3.9+'rem'}">
        <a href="javascript:;" class="spike-goods" v-for="(el, index) in spikeData" :key="index">
          <img class="spike-goods-icon" v-lazy="require('../../assets/images/icon/icon_618.png')" alt>
          <a
            href="javascript:;"
            class="spike-goods-over"
            v-if="el.num == 0 || !el.num"
            @click="toGoods(el.goods_id, el.goods_name, 'over')"
          ></a>
          <img
            class="spike-goods-img"
            v-lazy="el.img320_url"
            alt
            @click="toGoods(el.goods_id, el.goods_name, spikeIndex != 0?'notime':'')"
          >
          <h3
            class="spike-goods-title"
            @click="toGoods(el.goods_id, el.goods_name, spikeIndex != 0?'notime':'')"
          >{{ el.goods_name }}</h3>
          <div
            class="spike-goods-price"
            @click="toGoods(el.goods_id, el.goods_name, spikeIndex != 0?'notime':'')"
          >
            <span class="spike-goods-price-new">
              <font>￥</font>
              {{ el.group_price }}
            </span>
            <span class="spike-goods-price-old">
              <font>￥</font>
              {{ el.shop_price }}
            </span>
          </div>
        </a>
      </div>
    </div>
    <a href="javascript:;" class="more">
      <img
        class="more-img"
        v-lazy="require('../../assets/images/index/more.png')"
        alt
        @click="toPage('https://a.taojiji.com/index.php/MzzAct/xsmsAct0130/xsmsAct', 'href')"
      >
    </a>
    <!-- 9.9超值 -->
    <img v-lazy="require('../../assets/images/index/section_02.jpg')" class="scroll-to scroll-to-2 img-height-2" alt>
    <div class="goods-list">
      <a
        href="javascript:;"
        class="spike-goods goods-list-a"
        v-for="(el, index) in dataSlice(goods_all_datas[0])"
        :key="index"
        @click="toGoods(el.goods_id, el.goods_name)"
      >
        <img
          class="spike-goods-icon goods-list-icon-nine"
          v-lazy="require('../../assets/images/icon/icon_9.9.png')"
          alt
        >
        <img class="spike-goods-img" v-lazy="el.img320_url" alt>
        <h3 class="spike-goods-title">{{ el.goods_name }}</h3>
        <div class="spike-goods-price">
          <span class="spike-goods-price-new">
            <font>￥</font>
            {{ el.group_price }}
          </span>
          <span class="spike-goods-price-old">
            <font>￥</font>
            {{ el.shop_price }}
          </span>
        </div>
      </a>
    </div>
    <a href="javascript:;" class="more">
      <img class="more-img" v-lazy="require('../../assets/images/index/more.png')" alt @click="toPage('/nine')">
    </a>
    <!-- 热销榜单 -->
    <img v-lazy="require('../../assets/images/index/section_03.jpg')" class="scroll-to scroll-to-3 img-height-2" alt>
    <div class="goods-list">
      <a
        href="javascript:;"
        class="spike-goods goods-list-a"
        v-for="(el, index) in dataSlice(goods_all_datas[1])"
        :key="index"
        @click="toGoods(el.goods_id, el.goods_name)"
      >
        <a href="javascript:;" class="spike-goods-icon goods-list-icon-num">{{ index+1 }}</a>
        <img class="spike-goods-img" v-lazy="el.img320_url" alt>
        <h3 class="spike-goods-title">{{ el.goods_name }}</h3>
        <div class="spike-goods-price">
          <span class="spike-goods-price-new">
            <font>￥</font>
            {{ el.group_price }}
          </span>
          <span class="spike-goods-price-old">
            <font>￥</font>
            {{ el.shop_price }}
          </span>
        </div>
      </a>
    </div>
    <a href="javascript:;" class="more">
      <img class="more-img" v-lazy="require('../../assets/images/index/more.png')" alt @click="toPage('/hot')">
    </a>
    <!-- 类目会场 -->
    <img v-lazy="require('../../assets/images/index/section_04.jpg')" class="scroll-to scroll-to-4 img-height-2" alt>
    <div class="nav-tab">
      <a
        href="javascript:;"
        class="nav-tab-a type-tab-a"
        v-for="(el, index) in typeTabs"
        :key="index"
        @click="toPage(el.router)"
      >
        <img v-lazy="el.img" alt>
      </a>
    </div>
    <!-- 品类惊喜大狂欢 -->
    <img v-lazy="require('../../assets/images/index/section_05.jpg')" alt class="img-height-2">
    <!-- 类目会场商品列表 -->
    <div class="type-hc-list" v-for="(el, index) in typeDatas" :key="index" :class="{'div-margin-bottom': index == 5}">
      <img v-lazy="el.img" alt @click="toPage(el.router)" :class="'scroll-to scroll-to-'+(index+5)" class="img-height-3">
      <div class="shops">
        <a
          href="javascript:;"
          class="shops-a"
          v-for="(shop, shopIndex) in el.shopData"
          :key="shopIndex"
          @click="toShop(shop.id, 1)"
        >
          <img class="shops-a-img" v-lazy="shop.img" alt>
        </a>
      </div>
      <div class="goods-list goods-list-type">
        <a
          href="javascript:;"
          class="spike-goods goods-list-a"
          v-for="(good, goodIndex) in dataSlice(goods_all_datas[index+2])"
          :key="goodIndex"
          @click="toGoods(good.goods_id, good.goods_name)"
        >
          <img class="spike-goods-icon" v-lazy="require('../../assets/images/icon/icon_618.png')" alt>
          <img class="spike-goods-img" v-lazy="good.img320_url" alt>
          <h3 class="spike-goods-title">{{ good.goods_name }}</h3>
          <div class="spike-goods-price">
            <span class="spike-goods-price-new">
              <font>￥</font>
              {{ good.group_price }}
            </span>
            <span class="spike-goods-price-old">
              <font>￥</font>
              {{ good.shop_price }}
            </span>
          </div>
        </a>
      </div>
    </div>
    <!-- 弹窗  -->
    <van-popup v-model="show" position="bottom"></van-popup>
    <!-- 返回顶部按钮 -->
    <ToTop></ToTop>
    <!-- 提示文字 -->
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
import { countDown } from "@/assets/js/common/utils";
import { scroller } from "vue-scrollto/src/scrollTo";
let scrollTo = scroller();
let vm = null;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
let scrollTop = 0;
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("../../assets/images/index/banner.jpg"),
        shareBtn: true,
        share: {
          shareImg: require("../../assets/images/index/share.png"), // 分享按钮背景图
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "2.19rem",
            height: "0.92rem",
            right: "0.17rem",
            top: "0.19rem"
          }
        },
        // 其他自定义按钮，sendMsg为点击事件区别btn
        otherTab: [
          {
            otherTabImg: require("../../assets/images/index/strategy.png"),
            otherTabCssStyle: {
              width: "2.19rem",
              height: "0.92rem",
              right: "0.17rem",
              top: "1.11rem"
            },
            sendMsg: "tab1"
          }
        ]
      },
      // 浮动图
      floatData: [
        {
          img: require("../../assets/images/index/top_list_01.png"),
          router: "/coupon",
          name: "万券齐发"
        },
        {
          img: require("../../assets/images/index/top_list_02.png"),
          router: "/shoe",
          name: "鞋包会场"
        },
        {
          img: require("../../assets/images/index/top_list_03.png"),
          router: "/nine",
          name: "9块9超值"
        },
        {
          img: require("../../assets/images/index/top_list_04.png"),
          router: "/beauty",
          name: "美妆会场"
        },
        {
          img: require("../../assets/images/index/top_list_05.png"),
          router: "/hot",
          name: "热销榜单"
        },
        {
          img: require("../../assets/images/index/top_list_06.png"),
          router: "/digital",
          name: "3C会场"
        },
        {
          img: require("../../assets/images/index/top_list_07.png"),
          router: "/games",
          name: "免费淘好礼"
        },
        {
          img: require("../../assets/images/index/top_list_08.png"),
          router: "/baibao",
          name: "百货会场"
        },
        {
          img: require("../../assets/images/index/top_list_09.png"),
          router: "/food",
          name: "美食街"
        },
        {
          img: require("../../assets/images/index/top_list_10.png"),
          router: "/clothes",
          name: "服装步行街"
        }
      ],
      // 菜单
      navs: [
        {
          name: "特色趣玩",
          id: 1
        },
        {
          name: "限时秒杀",
          id: 2
        },
        {
          name: "9块9超值",
          id: 3
        },
        {
          name: "热销榜单",
          id: 4
        },
        {
          name: "类目会场",
          id: 5
        },
        {
          name: "服饰会场",
          id: 6
        },
        {
          name: "百货会场",
          id: 7
        },
        {
          name: "鞋包会场",
          id: 8
        },
        {
          name: "美妆个护",
          id: 9
        },
        {
          name: "食品会场",
          id: 10
        },
        {
          name: "数码会场",
          id: 11
        }
      ],
      navIndex: 0,
      navWidth: 0,
      showBtn: false,
      hideBtn: false,
      navTabs: [
        {
          img: require("../../assets/images/index/mfthl.png"),
          router: "/games"
        },
        {
          img: require("../../assets/images/index/wqqf.png"),
          router: "/coupon"
        }
      ],
      // 限时秒杀
      spikeIndex: 0,
      spikeTabData: [],
      spikeData: [],
      // 类目会场
      typeTabs: [
        {
          img: require("../../assets/images/index/hc_01.png"),
          router: "/clothes"
        },
        {
          img: require("../../assets/images/index/hc_02.png"),
          router: "/food"
        },
        {
          img: require("../../assets/images/index/hc_03.png"),
          router: "/baibao"
        },
        {
          img: require("../../assets/images/index/hc_04.png"),
          router: "/shoe"
        },
        {
          img: require("../../assets/images/index/hc_05.png"),
          router: "/beauty"
        },
        {
          img: require("../../assets/images/index/hc_06.png"),
          router: "/digital"
        }
      ],
      // 类目会场数据
      typeDatas: [
        // 服饰会场
        {
          img: require("../../assets/images/index/fen_01.jpg"),
          router: "/clothes",
          shopData: [
            {
              img: require("../../assets/images/index/fs_shop_01.png"),
              id: 96234,
              name: "弄潮儿"
            },
            {
              img: require("../../assets/images/index/fs_shop_02.png"),
              id: 8847,
              name: "燕子酷酷旗舰店"
            },
            {
              img: require("../../assets/images/index/fs_shop_03.png"),
              id: 55229,
              name: "喜多乐服饰"
            }
          ],
          goodData: []
        },
        // 百货会场
        {
          img: require("../../assets/images/index/fen_02.jpg"),
          router: "/baibao",
          shopData: [
            {
              img: require("../../assets/images/index/bh_shop_01.png"),
              id: 84892,
              name: "十月初四"
            },
            {
              img: require("../../assets/images/index/bh_shop_02.png"),
              id: 14217,
              name: "烟鬼烟具"
            },
            {
              img: require("../../assets/images/index/bh_shop_03.png"),
              id: 11687,
              name: "九狮鹿家纺旗舰店"
            }
          ],
          goodData: []
        },
        // 鞋包会场
        {
          img: require("../../assets/images/index/fen_03.jpg"),
          router: "/shoe",
          shopData: [
            {
              img: require("../../assets/images/index/xb_shop_01.png"),
              id: 5942,
              name: "誉享鞋贸"
            },
            {
              img: require("../../assets/images/index/xb_shop_02.png"),
              id: 71656,
              name: "巨优女鞋"
            },
            {
              img: require("../../assets/images/index/xb_shop_03.png"),
              id: 87850,
              name: "周小默鞋业"
            }
          ],
          goodData: []
        },
        // 美妆会场
        {
          img: require("../../assets/images/index/fen_04.jpg"),
          router: "/beauty",
          shopData: [
            {
              img: require("../../assets/images/index/mz_shop_01.png"),
              id: 103946,
              name: "魅力女人美妆店"
            },
            {
              img: require("../../assets/images/index/mz_shop_02.png"),
              id: 96589,
              name: "欧琪美妆专营店"
            },
            {
              img: require("../../assets/images/index/mz_shop_03.png"),
              id: 58856,
              name: "蔷薇美妆"
            }
          ],
          goodData: []
        },
        // 美食会场
        {
          img: require("../../assets/images/index/fen_05.jpg"),
          router: "/food",
          shopData: [
            {
              img: require("../../assets/images/index/ms_shop_01.png"),
              id: 4107,
              name: "佰优食品旗舰店"
            },
            {
              img: require("../../assets/images/index/ms_shop_02.png"),
              id: 17663,
              name: "冠林王子酒"
            },
            {
              img: require("../../assets/images/index/ms_shop_03.png"),
              id: 87513,
              name: "茶叶先生"
            }
          ],
          goodData: []
        },
        // 数码会场
        {
          img: require("../../assets/images/index/fen_06.jpg"),
          router: "/digital",
          shopData: [
            {
              img: require("../../assets/images/index/sm_shop_01.png"),
              id: 102271,
              name: "老司机车品"
            },
            {
              img: require("../../assets/images/index/sm_shop_02.png"),
              id: 80779,
              name: "爱自己"
            },
            {
              img: require("../../assets/images/index/sm_shop_03.png"),
              id: 21880,
              name: "锦汇数码"
            }
          ],
          goodData: []
        }
      ],
      // 倒计时
      day: null,
      hour: null,
      minute: null,
      second: null,
      // 弹窗提示信息
      msgTxt: null,
      // vant弹框组件
      show: false,
      // 吸顶菜单
      fixed: false,
      // 商品ID顺序：9块9超值、热销榜单、服饰会场、百货会场、鞋包会场、美妆个护、食品会场、数码会场
      goods_ids: [
        "6104826,5517596,3407084,6405008,6278225,6262203,6305252,6061854,6309995",
        "5516943,5540328,2863991,20201,77825,6467327,5399341,3679237,6285131",
        "6405052,3434870,5873673,6278243,2605208,5077944",
        "6439455,4943027,3475064,5163114,6397082,6467331",
        "6371068,5304345,5384709,5842275,2753363,2724458",
        "4596854,3420718,4075809,917109,953722,5398858",
        "6258299,6284985,6312461,6284987,6379151,6344545",
        "3117765,2694615,6327018,2892346,4414455,3137351"
      ],
      goods_all_ids:
        "6104826,5517596,3407084,6405008,6278225,6262203,6305252,6061854,6309995,5516943,5540328,2863991,20201,77825,6467327,5399341,3679237,6285131,6405052,3434870,5873673,6278243,2605208,5077944,6439455,4943027,3475064,5163114,6397082,6467331,6371068,5304345,5384709,5842275,2753363,2724458,4596854,3420718,4075809,917109,953722,5398858,6258299,6284985,6312461,6284987,6379151,6344545,3117765,2694615,6327018,2892346,4414455,3137351",
      // goods_ids: [
      //   "154,118,121,122,123,128,130,142,152",
      //   "118,121,122,123,128,130,142,152,154",
      //   "123,128,130,142,152,154",
      //   "128,130,142,152,154,118",
      //   "130,142,152,154,118,121",
      //   "142,152,154,121,118,130",
      //   "152,154,128,130,142,118",
      //   "154,128,130,142,152,118"
      // ],
      // goods_all_ids: "118,121,122,123,128,130,142,152,154",
      goods_all_datas: {},
      tabClickBtn: true,
    };
  },
  created() {
    vm = this;
    vm.goods_ids.map((el, index) => {
      vm.goods_all_datas[index] = [];
    });
    vm.initPv();
    vm.goodsInit();
    vm.spikeInit(null, 0);
    vm.countDownInit();
  },
  methods: {
    // 组件通信
    getMsg(data) {
      vm.$router.push("/strategy");
    },
    // 菜单关闭
    closeNav() {
      vm.showBtn = false;
      vm.hideBtn = true;
    },
    // 菜单打开
    openNav() {
      vm.showBtn = true;
      vm.hideBtn = false;
    },
    // 菜单点击
    navClick(index) {
      vm.tabClickBtn = false;
      vm.navWidth = document.getElementsByClassName("nav-a")[0].clientWidth;
      scrollTo(document.getElementsByClassName("scroll-to")[index], {
        offset: this.remFn(-1.28),
        onDone: function(element) {
          vm.navIndex = index;
          vm.tabClickBtn = true;
        }
      });
    },
    // 秒杀tab
    spikeClick(index, id) {
      vm.spikeInit(id, index);
    },
    // 秒杀init
    spikeInit(id, index) {
      let params = {
        flash_sale_id: id
      };
      console.log(params);
      vm.$http.get(URL.GetGoodsSkillCategory, { params }).then(res => {
        let data = res.data;
        console.log("秒杀init");
        console.log(data);
        if (data.code == 1) {
          vm.spikeIndex = index;
          // 配置时间档
          if (data.baseData.length >= 4) {
            vm.spikeTabData = data.baseData.slice(0, 4);
          } else {
            // 告警：运营配置时间档错误
            vm.spikeTabData = data.baseData;
            tjjApp.web.errorLogUpload(
              3,
              21,
              params,
              "",
              res.request.responseURL,
              data,
              res.config.method,
              "运营配置限时秒杀时间档少于4个",
              res.status
            );
          }
          // 秒杀数据
          if (data.goodsInfo.length >= 10) {
            vm.spikeData = data.goodsInfo.slice(0, 10);
          } else {
            // 友情提示：运营配置秒杀商品每档少于10个
            vm.spikeData = data.goodsInfo;
            tjjApp.web.errorLogUpload(
              3,
              21,
              params,
              "",
              res.request.responseURL,
              data,
              res.config.method,
              "友情提示：运营配置秒杀商品每档少于10个",
              res.status
            );
          }
        }
      });
    },
    // 列表商品
    goodsInit() {
      let params = null;
      params = {
        goods_id: vm.goods_all_ids
      };
      vm.$http.get(URL.GoodList, { params }).then(res => {
        console.log(res);
        let data = res.data;
        if (res.status == 200) {
          if (!data) {
            vm.msgTxt = "暂无数据";
            return false;
          }
          // 自动匹配数据
          vm.goods_ids.map((tag, num) => {
            data.map((el, index) => {
              if (tag.indexOf(el.goods_id) != -1) {
                vm.goods_all_datas[num].push(el);
              }
            });
          });
        } else {
          vm.msgTxt = res.statusText;
        }
      });
    },
    // 数据截取
    dataSlice(data) {
      if (data.length % 3 != 0 && data.length > 1) {
        data = data.slice(
          0,
          data.length > 9 ? 9 : data.length - (data.length % 3)
        );
      } else if (data.length % 3 == 0 && data.length > 9) {
        data = data.slice(0, 9);
      }
      return data;
    },
    // 倒计时
    countDownInit(time) {
      vm.$http.get(URL.CountDownUrl).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == 1) {
          let time = data.data.activity_end_time - data.data.curr_time;
          console.log(time);
          countDown(time, function(val) {
            // console.log(val);
            vm.day = val.day;
            vm.hour = val.hour;
            vm.minute = val.minute;
            vm.second = val.second;
          });
        }
      });
    },
    // 监听滚动
    handleScroll() {
      scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      vm.navWidth = document.getElementsByClassName("nav-a")[0].clientWidth;
      let goodsTop = document.getElementsByClassName("scroll-to");
      for (let i = 0; i < goodsTop.length; i++) {
        if (scrollTop >= goodsTop[i].offsetTop + vm.remFn(-1.28)) {
          this.navIndex = i;
          if (i <= 7 && vm.tabClickBtn) {
            document.getElementsByClassName("nav")[0].scrollLeft =
              i * vm.navWidth;
          }
        }
      }
      if (document.getElementById("nav").offsetTop && !this.fixed) {
        this.fixed_top = document.getElementById("nav").offsetTop;
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    },
    // 跳转店铺 shopTag:1 埋点开关
    toShop(id, shopTag) {
      tjjApp.web.startShopHome({
        shopId: id,
        shopTag: shopTag
      });
    },
    // 跳转商品 name传值 埋点开关
    toGoods(id, name, btn) {
      if (btn == "over") {
        vm.msgTxt = "已售罄";
        return false;
      }
      if (btn == "notime") {
        vm.msgTxt = "即将开抢敬请期待";
        return false;
      }
      tjjApp.web.jump2good({
        goodsId: id,
        goodsName: name,
        activityName: "618大促活动"
      });
    },
    // 进入页面发起埋点pv
    initPv() {
      tjjApp.web.initPv();
    },
    // 跳转
    toPage(page, btn) {
      if (btn == "href") {
        window.location.href = page;
      } else {
        this.$router.push(page);
      }
    },
    // rem换算成px
    remFn(num) {
      return num * 25;
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
  background: #ff4f56;
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
.zw-height,
.nav-tab {
  background: #ff4f56;
  -webkit-user-select: none;
  user-select: none;
}
img {
  width: 100%;
  display: block;
}
a {
  display: block;
}
section {
  width: 100%;
  position: relative;
  overflow: hidden;
}
/* 浮动图 */
#float {
  width: 100%;
  padding: 0 0.3rem;
  height: 5.63rem;
  margin-top: 0.2rem;
  overflow: auto;
}
.float {
  width: 14rem;
  height: 5.63rem;
}
/* 1.18 */
.float-a {
  width: 2.6rem;
  height: 2.6rem;
  float: left;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 0.3rem;
}
.float-a:nth-of-type(2n + 1) {
  animation: gosmall 3s infinite linear alternate;
}
.float-a:nth-of-type(2n) {
  animation: goBig 3s infinite linear alternate;
}
.float-a-img {
  height: 100%;
}
.float-a-bottom-0 {
  margin-bottom: 0;
}
/* 菜单 */
#nav {
  width: 100%;
  height: 1rem;
  background: #ff923a;
}
#nav-box {
  width: 100%;
  height: 1rem;
  position: relative;
}
.nav {
  width: calc(100% - 1.5rem);
  height: 1rem;
  float: left;
  overflow: auto;
  padding: 0 0.38rem;
}
.nav-box {
  width: 27.5rem;
  height: 1rem;
}
.nav-a {
  width: 2.5rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  float: left;
  font-family: Tianshi-Yanti;
  font-size: 0.51rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
}
.nav-a-active {
  background-image: linear-gradient(0deg, #ff7e00 1%, #ff3600 51%, #ff7e00 100%),
    linear-gradient(#ff3600, #ff3600);
  background-blend-mode: normal, normal;
  border-radius: 0.1rem;
}
.nav-icon {
  width: 1.5rem;
  height: 1rem;
  background: url(../../assets/images/index/upper.png) 0.3rem center no-repeat;
  background-size: 0.52rem 0.26rem;
  float: left;
}
.nav-popup {
  width: 100%;
  height: 0;
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  overflow: hidden;
}
.nav-popup-top {
  width: 100%;
  height: 1.07rem;
}
.nav-popup-top-txt {
  display: block;
  line-height: 1rem;
  font-size: 0.56rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #000;
  float: left;
}
.nav-popup-top-icon {
  width: 1.1rem;
  height: 1rem;
  background: url(../../assets/images/index/below.png) center center no-repeat;
  background-size: 0.52rem 0.26rem;
  float: right;
}
.nav-popup-list {
  width: 100%;
  overflow: hidden;
}
.nav-popup-list-a {
  width: 2.45rem;
  height: 0.96rem;
  font-size: 0.2rem;
  margin-right: 0.51rem;
  float: left;
  font-family: "Tianshi";
  font-size: 0.5rem;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0px;
  background: rgb(243, 243, 243);
  border-radius: 0.1rem;
  margin-bottom: 0.31rem;
  text-align: center;
  line-height: 0.96rem;
  color: rgb(255, 0, 29);
}
.nav-popup-list-a:nth-of-type(4n) {
  margin-right: 0;
}
.nav-popup-list-a-active {
  background: rgb(255, 146, 58);
  color: rgb(255, 0, 29);
}
.nav-show {
  animation: navShow 0.6s 1 forwards;
}
.nav-hide {
  animation: navHide 0.6s 1 forwards;
}
.nav-tab {
  width: 100%;
  overflow: hidden;
  padding: 0 0.16rem;
  margin-bottom: 0.3rem;
}
.nav-tab-a {
  width: calc(calc(100% - 0.16rem) / 2);
  height: 2.6rem;
  float: left;
}
.nav-tab-a:nth-of-type(2n) {
  float: right;
}
.nav-tab-a img {
  height: 100%;
}
/* 限时秒杀 */
#spike-nav {
  width: 100%;
  height: 1rem;
  overflow: hidden;
  margin-top: 0.1rem;
}
.spike-nav-a {
  width: calc(calc(100% - 0.12rem) / 4);
  height: 1rem;
  line-height: 1rem;
  float: left;
  margin-right: 0.04rem;
  font-family: AdobeHeitiStd-Regular;
  font-size: 0.58rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  text-align: center;
  background: #ff923a;
}
.spike-nav-a:last-child {
  margin-right: 0;
}
.spike-nav-a-active {
  background-image: linear-gradient(0deg, #ff7e00 1%, #ff3600 51%, #ff7e00 100%),
    linear-gradient(#ff0000, #ff0000);
  background-blend-mode: normal, normal;
}
#spike-goods {
  width: 100%;
  overflow: auto;
  padding: 0.1rem 0.2rem 0 0.15rem;
}
.spike-goods-box {
  height: 5rem;
  overflow: hidden;
}
.spike-goods {
  width: 3.8rem;
  overflow: hidden;
  height: 5rem;
  background: #fff;
  position: relative;
  border-radius: 0.1rem;
  float: left;
  margin-right: 0.1rem;
}
.spike-goods-icon {
  position: absolute;
  width: 1.03rem;
  height: 0.9rem;
  left: 0.1rem;
  top: 0;
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
.spike-goods-img {
  width: 100%;
  height: 3.8rem;
}
.spike-goods-title {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-family: PingFang-SC-Bold;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  color: #333;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  padding: 0 0.28rem 0 0.32rem;
}
.spike-goods-price {
  height: 0.68rem;
  width: 100%;
  background: url(../../assets/images/index/go.png) right center no-repeat;
  background-size: 1.98rem 0.68rem;
  padding-left: 0.08rem;
}
.spike-goods-price-new,
.spike-goods-price-old {
  display: inline-block;
  font-family: PingFang-SC-Heavy;
  font-size: 0.5rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #ff3333;
  float: left;
}
.spike-goods-price-new font {
  font-size: 0.22rem;
}
.spike-goods-price-old {
  text-decoration: line-through;
  color: #000;
  opacity: 0.4;
  font-family: PingFang-SC-Regular;
  font-size: 0.22rem;
  margin-left: 0.06rem;
  margin-top: 0.24rem;
}

.count-down {
  position: absolute;
  width: 6.39rem;
  height: 1.53rem;
  left: 0;
  right: 0;
  top: 4.6rem;
  margin: auto;
  background: url(../../assets/images/index/count_down.png) center center
    no-repeat;
  background-size: 6.39rem 1.53rem;
  overflow: hidden;
}
.count-down-txt {
  width: 100%;
  font-family: Tianshi-Yanti;
  font-size: 0.42rem;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0;
  color: #f7001d;
  text-align: center;
  margin-top: 0.2rem;
}
.count-down-time {
  width: 100%;
  font-family: Tianshi-Yanti;
  font-size: 0.62rem;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0;
  color: #f7001d;
  text-align: center;
}
.txt {
  width: 100%;
  height: 1rem;
  position: absolute;
  left: 0;
  top: 4rem;
  line-height: 1rem;
  text-align: center;
}

/* 动画 */
@keyframes navShow {
  0% {
    height: 0;
  }
  100% {
    height: 5rem;
  }
}
@keyframes navHide {
  0% {
    height: 5rem;
  }
  100% {
    height: 0;
  }
}
@keyframes goBig {
  0% {
    transform: scale(0.846);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.846);
  }
}
@keyframes gosmall {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.846);
  }
  100% {
    transform: scale(1);
  }
}
/* 吸顶 */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
.zw-height {
  height: 1rem;
}
/* 更多 */
.more {
  width: 100%;
  height: 1.9rem;
  overflow: hidden;
  position: relative;
}
.more-img {
  width: 4.12rem;
  height: 0.98rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
/* 商品列表 */
.goods-list {
  width: 100%;
  overflow: hidden;
  padding: 0 0.2rem 0 0.15rem;
}
.goods-list-a {
  width: calc(calc(100% - 0.2rem) / 3);
  margin-bottom: 0.12rem;
}
.goods-list-a:nth-of-type(3n) {
  margin-right: 0;
}
.goods-list-icon-nine {
  width: 1.02rem;
  height: 1.17rem;
}
.goods-list-icon-num {
  width: 0.72rem;
  height: 1.12rem;
  background: url(../../assets/images/icon/icon_num.png) center center no-repeat;
  background-size: 0.72rem 1.12rem;
  font-family: SourceHanSansCN-Bold;
  font-size: 0.45rem;
  font-weight: bold;
  font-stretch: normal;
  line-height: 1.5rem;
  color: #fff;
  text-align: center;
}
/* 类目会场 */
.type-tab-a {
  height: 5.76rem;
  margin-bottom: 0.2rem;
}
.goods-list-type {
  margin-bottom: 0.5rem;
}
.type-hc-list {
  width: 100%;
  overflow: hidden;
}
/* 店铺 */
.shops {
  width: 100%;
  overflow: hidden;
  padding: 0.15rem 0.2rem 0 0.15rem;
}
.shops-a {
  width: calc(calc(100% - 0.2rem) / 3);
  overflow: hidden;
  height: 5.77rem;
  float: left;
  margin-right: 0.1rem;
  margin-bottom: 0.12rem;
}
.shops .shops-a:last-child {
  margin-right: 0;
}
.shops-a-img {
  height: 100%;
}

.img-height-1{
  height: 7.92rem;
}
.img-height-2{
  height: 1.24rem;
}
.img-height-3{
  height: 3.69rem;
}
.div-margin-bottom{
  margin-bottom: 1rem;
}
</style>

