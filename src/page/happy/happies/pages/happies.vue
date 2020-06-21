<style  >
.bg {
  background: rgba(0, 0, 0, 0.7);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999;
}
.bg img {
  width: 10.52rem;
  height: 11.11rem;
  margin: 2rem auto;
}
.seamless-warp {
  overflow: hidden;
  position: absolute;
  top: 1rem;
  height: 1.9rem;
  left: 0rem;
  padding-top: 0.1rem;
}
.item li {
  width: 3rem;
  height: 0.55rem;
  margin-bottom: 0.15rem;
  font-family: MicrosoftYaHei;
  font-size: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #7b0905;
  background: rgba(255, 227, 179, 0.8);
  padding-left: 0.1rem;
  line-height: 0.55rem;
  border-radius: 0 0.27rem 0.27rem 0;
}
.lb {
  position: relative;
}
.share {
  position: absolute;
  width: 1.84rem;
  height: 0.45rem;
  right: 0.2rem;
  top: 0.27rem;
  background: url(../assets/images/share_new.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
.gl {
  position: absolute;
  width: 1.84rem;
  height: 0.45rem;
  right: 0.2rem;
  top: 0.9rem;
  background: url(../assets/images/more.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

</style>

<template>
  <nav class="container">
    <div class="bg" v-if="conpon==true" @click="conpon=false">
      <img src="../assets/images/coupon.png">
    </div>
    <img src="../assets/images/index_01.jpg">
    <div class="lb">
      <vue-seamless-scroll :data="listData" class="seamless-warp" :class-option="goodsClassOption">
        <ul class="item">
          <li @click="topage('dress')">
            <span class="title">T恤0.1元秒</span>
          </li>
          <li @click="topage('food')">
            <span class="title">瓜子0.1元起</span>
          </li>
          <li @click="topage('shoesBag')">
            <span class="title">小白鞋0.1元抢</span>
          </li>
          <li @click="topage('makeup')">
            <span class="title">0.1元口红限量抢购</span>
          </li>
          <li @click="topage('general')">
            <span class="title">小白鞋神器2.6元起</span>
          </li>
        </ul>
      </vue-seamless-scroll>
      <img src="../assets/images/index_02.jpg">
      <div class="gl" @click="togl()"></div>
      <div class="share" @click="share" v-if="xcx==false"></div>
    </div>
    <img src="../assets/images/index_03.jpg">

    <vanSwipe :autoplay="3000" vertical :show-indicators="timer" class="ms"  >
      <vanSwipeItem v-for="(image, index) in images" :key="index" >
        <img v-lazy="image" @click="toms()">
      </vanSwipeItem>
    </vanSwipe>
    <img src="../assets/images/index_05.jpg">
    <div class="nav" :class="{fixed:navFIxed}">
      <span
        v-for="(item,index) in navs"
        :key="index"
        @click="toGoodNav(index)"
        :class="{ active:changeNav == index}"
      >{{item.name}}</span>
    </div>
    <div class="goods_list">
      <div class="shop" v-for="(shop,index) in new_hc_lists" :key="index" :class="'shop'+(index)">
        <div class="goods_top">
          <div class="shop_img" @click="topage(shop.name)">
            <img :src="shop.url">
          </div>
          <div class="goods_top_list">
            <div
              class="goods"
              v-for="(goods,key) in (shop.value.slice(0,4))"
              :key="key"
              @click="toGoods(goods.goods_id)"
            >
              <img v-lazy="goods.img320_url">
              <p class="goods_info">{{goods.goods_name}}</p>
              <p class="goods_price_info">
                <span class="goods_price">
                  <i>￥{{goods.group_price}}</i>
                  <i>￥{{goods.shop_price}}</i>
                </span>
                <span class="goods_buy">立即抢购>></span>
              </p>
            </div>
          </div>
        </div>
        <div class="goods_bottom">
          <div
            class="goods"
            v-for="(goods,key) in (shop.value.slice(4,10))"
            :key="key"
            @click="toGoods(goods.goods_id)"
          >
            <img v-lazy="goods.img320_url">
            <p class="goods_info">{{goods.goods_name}}</p>
            <p class="goods_price_info">
              <span class="goods_price">
                <i>￥{{goods.group_price}}</i>
                <i>￥{{goods.shop_price}}</i>
              </span>
              <span class="goods_buy">立即抢购>></span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <img src="../assets/images/index_08.jpg">
    <div v-if="love_show" class="goods_love">
      <div
        class="goods"
        v-for="(goods,key) in love_lists"
        :key="key"
        @click="toGoods(goods.goodsId)"
      >
        <img class="goods_img" v-lazy="goods.imgUrl">
        <p class="goods_info">{{goods.goodsName}}</p>
        <p class="goods_price_info">
          <span class="goods_price">
            <i>￥{{goods.groupPrice}}</i>
            <i>￥{{goods.shopPrice}}</i>
          </span>
          <span class="goods_buy">立即抢购>></span>
        </p>
      </div>
    </div>
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import msgBox from "@/components/msgBox";
import { GoodList, coupon, recommend } from "./../assets/js/api.js";
import { scroller } from "vue-scrollto/src/scrollTo";
import vueSeamlessScroll from "vue-seamless-scroll";
import { Swipe, SwipeItem  } from 'vant';

export default {
  data() {
    return {
      listData: [
        {
          
        },
        {
         
        },
        {
         
        },
        {
         
        },
        {
         
        }
      ],
      isScoll: false,
      conpon: false,
      xcx: false,
      msgTxt: "",
      navs: [
        { name: "服饰内衣" },
        { name: "家居百货" },
        { name: "鞋包配饰" },
        { name: "辣妈萌宝" },
        { name: "休闲美食" }
      ],
      images: [
       
      ],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      //    hc_id: [
      //   "3377459,2911300,2994246,3500823,2892691,2827055,2601062,2603659,3003902,65864",
      //   "3431005,3361041,3365085,2581296,2601345,3566232,3634051,2693996,1528916,37581",
      //   "2243947,2630692,2537409,2870450,2826718,1577567,2807194,1219273,2522932,2807214"
      //   "2755669,2755683,3495724,3546487,12951,1743565,3174045,3564916,1878118,2821682"
      //   "2598679,994764,1472288,88879,1208420,6102060,1121414,3059533,2224392,986658"
      // ],
      hc_id: [
        "1215901,1215831,1215883,1215098,1215905,1215903,1215571,1215591,1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,1214996,1215805,1215232,1215067.1215004,1215173,1214983,1214982",
        "1215955,1215831,1215901,1215883,1215591,1215098,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,1215173",
        "1215903,1215831,1215901,1215883,1215591,1215959,1215098,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,1215173",
        "1215591,1215831,1215883,1215797,1215901,1215903,1215098,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,215067.1215004,1215173",
        "1215803,1215831,1215883,1215901,1215591,1215903,1215098,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982,1215173"
      ],
      userInfo: {},
      new_hc_lists: {},
      love_show: false,
      love_lists: {}
    };
  },
  created() {
   
  },
  async mounted() {
    var dayIndex = 0;
    var date = new Date().getDate();
    switch (date) {
      case 23:
        dayIndex = 1;
        break;
      case 24:
        dayIndex = 1;
        break;
      case 25:
        dayIndex = 2;
        break;
      case 26:
        dayIndex = 3;
        break;
      case 27:
        dayIndex == 4;
      default:
        dayIndex = 0;
        break;
    }
  
     var imgs =[
       [require("../assets/images/23_1.png"),require("../assets/images/23_2.png")],
       [require("../assets/images/24_1.png"),require("../assets/images/24_2.png")],
       [require("../assets/images/25_1.png"),require("../assets/images/25_2.png")],
       [require("../assets/images/26_1.png"),require("../assets/images/26_2.png")],
       [require("../assets/images/27_1.png"),require("../assets/images/27_2.png")],
       ]
       this.images=imgs[dayIndex];
    this.navs = this.newData(dayIndex, this.navs);
    var hc_list = {};
    let len = this.hc_id.length;
    for (let index = 0; index < len; index++) {
      let params = {
        goods_id: this.hc_id[index]
      };
      await this.$http.get(GoodList, { params }).then(res => {
        //  console.log(res.data);
        hc_list[index] = res.data;
      });
    }
    this.new_hc_lists = this.newData(dayIndex, hc_list);
    console.log(this.new_hc_lists);
    let that = this;
    window.isLogin = (user_id, token, uuid) => {
      this.userInfo = {
        user_id: user_id,
        token: token,
        uuid: uuid
      };
      var params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "服饰"
      };
      if(user_id){
           that.getCoupon();
      }else{
        tjjApp.web.login()
      }
      send.sendPoint(params);
    };
     var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      this.xcx = true;
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      let token = tjjApp.web.getUrlQuery("token", window.location.href);
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // 获得优惠券
    getCoupon: function() {
      this.$http.post(coupon, this.userInfo).then(res => {
        console.log(res.data);
        if (res.data == null || res.data == "undefined" || res.data == "null") {
          this.msgTxt = "请刷新页面";
        } else {
          if (res.data.result == 1) {
            this.conpon = true;
          } else {
            this.msgTxt = res.data.message;
          }
        }
      });
    },
    //获得喜欢的商品
    loveGoods: function() {
      this.$http.post(recommend, this.userInfo).then(res => {
        console.log(res.data);
        if (res.data == null || res.data == "undefined" || res.data == "null") {
          this.msgTxt = "请刷新页面";
        } else {
          if (res.data.result == 1) {
            this.love_lists = res.data.goodsList;
          } else {
            this.msgTxt = res.data.message;
          }
        }
      });
    },
    //跳转攻略
    togl() {
      var urlOrigin = window.location.origin;
      var jump_url = urlOrigin + "/activity/project/happy/strategy/view/index";
       window.location.href = jump_url;
    },
    //分会场
    topage(page) {
      var url = window.location.href;
      var urlOrigin = window.location.origin;
      var jump_url = "";
      var origin = "index";
      //页面进入的三种来源 需要判断url是否是一种
      var source = ["index", "banner", "advert"];
      source.map(function(el) {
        if (url.indexOf(el) > -1) {
          origin = el;
        }
      });
      if (origin == "banner") {
        //此时在banner 出现
        jump_url =
          urlOrigin + "/activity/project/happy/" + page + "/view/indexbanner";
      } else if (origin == "advert") {
        // 在首页出现
        jump_url =
          urlOrigin + "/activity/project/happy/" + page + "/view/index";
      } else {
        // 在首页出现
        jump_url =
          urlOrigin + "/activity/project/happy/" + page + "/view/index";
      }
      window.location.href = jump_url;
      console.log(jump_url);
    },
    toms(){
       var urlOrigin = window.location.origin;
      var  jump_url = urlOrigin + "/activity/project/happy/flashSale/view/index";
      console.log(jump_url);
      
      window.location.href = jump_url;
    },
    //  根据index 返回一个拼接的新数组
    newData(index, arr) {
      var arr1 = {};
      var lastArr = [];
      var firstArr = [];
      if (arr instanceof Array) {
        return arr.slice(index).concat(arr.slice(0, index));
      } else {
        //  重造数组对象 增加图片
        var img = [
          {
            url: require("../assets/images/hc_05.jpg"),
            id: 315,
            name: "dress"
          },
          {
            url: require("../assets/images/hc_11.jpg"),
            id: 37,
            name: "general"
          },
          {
            url: require("../assets/images/hc_17.jpg"),
            id: 317,
            name: "shoesBag"
          },
          {
            url: require("../assets/images/hc_23.jpg"),
            id: 320,
            name: "makeup"
          },
          { url: require("../assets/images/hc_29.jpg"), id: 321, name: "food" }
        ];
        var len = Object.keys(arr).length;
        for (let i = 0; i < len; i++) {
          if (i < index) {
            console.log("wo bei shanchu");
            arr1 = {
              url: img[i].url,
              id: img[i].id,
              name: img[i].name,
              value: arr[i]
            };
            lastArr.push(arr1);
          } else {
            arr1 = {
              url: img[i].url,
              id: img[i].id,
              name: img[i].name,
              value: arr[i]
            };
            firstArr.push(arr1);
          }
        }

        return firstArr.concat(lastArr);
      }
    },
    //滚动监听
    handleScroll() {
      var windowUrl = window.location.href;
      var moreshow = true;
      if (windowUrl.indexOf("uuid=wechat") > -1) {
        var more = document.getElementsByClassName("more");
        if (moreshow) {
          for (let index = 0; index < more.length; index++) {
            more[index].style.display = "none";
          }
        }
        moreshow = false;
      }
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      let navTop = document.getElementsByClassName("nav")[0].offsetTop;

      var goodsTop = document.getElementsByClassName("shop");
      for (var i = 0; i < goodsTop.length; i++) {
        if (scrollTop >= goodsTop[i].offsetTop) {
          this.changeNav = i;
        }
      }
      if (scrollTop >= navTop) {
        this.navFIxed = true;
      }
      if (scrollTop < goodsTop[0].offsetTop) {
        this.navFIxed = false;
      }

      var clientHeight = document.body.clientHeight;
      var scrollHeight = document.body.scrollHeight;
      if (clientHeight + scrollTop >= scrollHeight - 30) {
        if (!this.love_show) {
          this.love_show = true;
          console.log("dibu");
          this.loveGoods();
        }
      }
    },
    toGoodNav: function(index) {
      //滚动位置
      this.changeNav = index;
      const firstScrollTo = scroller();
      firstScrollTo(".shop" + index);
    },
    toGoods: function(id) {
      //跳转商品
      tjjApp.web.jump2good(id);
    },
    share: function() {
      //分享
      var a = {
        title: "惠动全城 一毛可拔"
      };
      tjjApp.web.share(a);
    }
  },
  computed: {
    goodsClassOption: function() {
      return {
        hoverStop: false,
        openTouch: false,
        waitTime: 1000,
        singleHeight: 26
      };
      m;
    }
  },
  components: {
    ToTop,
    msgBox,
    vueSeamlessScroll,
    vanSwipe:Swipe, 
    vanSwipeItem : SwipeItem
  }
};
</script>
<style >
.container,
html {
  background: #d32737 !important;
}

.ms {
  width: 11.82rem;
  height: 4.73rem;
  background-color: #af0e1d;
  border-radius: 0.1rem;
  margin: 0 auto;
}
.goods_img {
  width: 100%;
  height: 3.57rem;
}
img {
  width: 100%;
  display: block;
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 100;
  margin: 0 auto;
  left: 0;
  right: 0;
  margin: 0rem auto !important;
}

.nav {
  width: 100%;
  height: 0.88rem;
  padding: 0 0.09rem;
  display: flex;
  justify-content: space-between;
  background: #bd2331;
}
.nav span {
  width: 2.28rem;
  height: 0.7rem;
  margin-top: 0.1rem;
  text-align: center;
  background: linear-gradient(to right, #f44454, #e20d1e);
  font-family: SourceHanSansCN-Regular;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  line-height: 0.7rem;
  box-shadow: 0.5px -0.5px 0.5px #f83d4e;
}
.nav .active {
  background: linear-gradient(to right, #f4715c, #f45438);
  box-shadow: -0.5px -0.5px 0.5px #d1381e;
}
.goods_list {
  width: 11.82rem;
  min-height: 5rem;
  margin: 0 auto;
}
.goods_top {
  justify-content: space-between;
  display: flex;
  width: 100%;
  height: 9.19rem;
  margin: 0.19rem auto;
}
.goods_top > div {
  width: 3.81rem;
  height: 100%;
}
.goods_top .goods_top_list {
  width: 7.81rem;
  height: 9.19rem;
  display: flex;
  align-content: space-between;
  justify-content: space-between;
  flex-wrap: wrap;
}

.goods {
  height: 4.5rem;
  width: 3.81rem;
  background: #fff;
  padding: 0.12rem;
}
.goods_top .shop_img {
  width: 3.81rem;
  height: 9.19rem;
}
.goods_info {
  width: 98%;
  font-family: MicrosoftYaHei;
  font-size: 0.26rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #d32737;
  line-height: 0.3rem;
  border-bottom: 0.5px solid #d32737;
  margin: 0.05rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods_price_info {
  height: 0.34rem;
  width: 98%;
  display: flex;
  justify-content: space-between;
}
.goods_price {
  font-family: MicrosoftYaHei;
  font-size: 0.33rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #d32737;
}
.goods_price i {
  font-style: normal;
}
.goods_price i:nth-last-child(1) {
  font-family: MicrosoftYaHei;
  font-size: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #737373;
  text-decoration: line-through;
  margin-left: 0.1rem;
}
.goods_buy {
  width: 1.2rem;
  height: 0.34rem;
  background-color: #d32737;
  border-radius: 0.1rem;
  font-family: MicrosoftYaHei;
  font-size: 0.2rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  line-height: 0.34rem;
}
.goods_bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 9.2rem;
  width: 100%;
}
.goods_love {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 9.2rem;
  margin: 0 auto;
  width: 11.82rem;
}
.goods_love .goods {
  margin-bottom: 0.19rem;
}
</style>

