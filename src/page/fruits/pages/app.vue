<template>
  <div class="container">
    <img src="../assets/images/top_01.jpg" alt class="top_img">
    <section id="box_01">
      <img src="../assets/images/top_02.jpg" alt>
      <div class="box_01">
        <div
          class="box_01_list"
          v-for="(el,index) in miaoData"
          :key="index"
          v-if="index < 3"
        >
          <img v-lazy="el.img320_url" alt @click="toGoods(el.goods_id)">
          <img class="one_icon" src="../assets/images/one_icon.png" alt>
          <a href="javascript:;" class="over" v-if="el.num == 0 || !el.num">
            <img src="../assets/images/over.png" alt>
          </a>
          <h3 class="box_01_list_title" @click="toGoods(el.goods_id)">{{ el.goods_name }}</h3>
          <div class="box_01_list_price" @click="toGoods(el.goods_id)">
            <span class="box_01_newprice">
              <font>￥</font>{{ el.group_price }}
            </span>
            <span class="box_01_oldprice">
              <font>￥</font>{{ el.shop_price | numFilter }}
            </span>
            <a href="javascript:;" class="box_01_go">马上抢</a>
          </div>
        </div>
      </div>
    </section>
    <section id="box_02">
      <img src="../assets/images/top_03.jpg" alt>
      <div class="box_02">
        <a
          href="javascript:;"
          class="box_02_a"
          v-for="(el,index) in shopData"
          :key="index"
          @click="toShop(el.id)"
        >
          <img v-lazy="el.img" alt class="box_02_a_img">
        </a>
      </div>
    </section>
    <div id="nav" :class="{'fixed': fixed}">
      <a
        href="javascript:;"
        class="nav"
        :class="{'nav_active': nav_active == index}"
        v-for="(nav, index) in navs"
        :key="index"
        @click="navClick(index)"
      >
        <span :class="{'nav_active': nav_active - 1 == index}">{{ nav.name }}</span>
      </a>
    </div>
    <div v-if="fixed" id="zw_height"></div>
    <div id="goods">
      <div class="goods">
        <div class="goods_list" v-for="(el, index) in goods" :key="index" @click="toGoods(el.goods_id)">
          <img v-lazy="el.img320_url" alt>
          <h3 class="goods_list_title">{{ el.goods_name }}</h3>
          <div class="goods_list_price">
            <span class="goods_list_price_new">
              <font>￥</font>{{ el.group_price }}
            </span>
            <span class="goods_list_price_old">￥{{ el.shop_price }}</span>
            <a href="javascript:;" class="goods_list_price_go"></a>
          </div>
        </div>
      </div>
    </div>
    <div id="more" v-if="shareBtn">
      <a href="javascript:;" class="more-a" @click="toMore">查看更多 ></a>
    </div>
    <ToTop></ToTop>
    <msgBox :msgTxt="msgTxt"></msgBox>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import msgBox from "@/components/msgBox";
import URL from "./../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
let scrollTo = scroller();
let vm = null;
export default {
  data() {
    return {
      navs: [
        { name: "TOP榜单" },
        { name: "瓜分天夏" },
        { name: "优质农货" },
        { name: "茶香四溢" },
        { name: "果干系列" }
      ],
      miaoData: [],
      shopData: [
        {
          id: 109120,
          name: "果上生活",
          img: require("../assets/images/shop_01.jpg")
        },
        {
          id: 12154,
          name: "魅力无限石榴姐店",
          img: require("../assets/images/shop_02.jpg")
        },
        {
          id: 72430,
          name: "农家鲜果店",
          img: require("../assets/images/shop_03.jpg")
        },
        {
          id: 81912,
          name: "陕甘宁特产",
          img: require("../assets/images/shop_04.jpg")
        },
        {
          id: 52280,
          name: "童味优鲜食品店",
          img: require("../assets/images/shop_05.jpg")
        },
        {
          id: 7894,
          name: "沃丰绿色农业",
          img: require("../assets/images/shop_06.jpg")
        }
      ],
      goods: [],
      goods_data: {},
      goods_ids: [
        "1768192,2526891,4344581,5617,3071153,2593470,19637,1758445,1982890,875793,3183174,2666872,5028209,717638,475419,1208420,49131,3367246,4602572,1281017,1765615,1760601,88879,1750068,1021168,1322485,994584,912573,1231324,3182702,913657,1694749,1197624,99360,2007794,2253531,3163293,55959,3183192,1618274,912781,30329,3091890,3071053,222354,2656504,58449,2601487,1597625,2324915,89039,3071150,3456611,1114391,1527303,2507787,949110",
        "5028209,4344581,4602572,4355460,1758445,5617,4133226,3071153,4448173,3535454,2229132,4024618,2680460,2640670,2942950,775811,1092947,1982890,2690971,1453536,3087573,3006171,3006173,2640662,1281282,2630687,3071150,2937996,4242418,2148152,2601609,3071053,3209449,911299,3006179,3025928,4121276,19637,3456467,4076356,3104060,151460,3554512,1970961,2205853,3565503,3006178,3137587,938753,3132572,2325081,2870352,1060332,4245463,4222098,3704993",
        "1586896,2501954,2566129,4013004,3041619,3041860,1604269,2593425,2958596,1751987,2595858,2966065,2542447,1208425,717638,2593454,2280757,3041852,1175796,2999075,3005762,2821575,3800927,1458899,1168197,1096660,1076920,3420107,1715113,1264308,4085617,1501739,1601649,2174223,1992999,3334578,4082608,3482605",
        "2310811,1490094,3416038,3531166,4133218,2025815,4004251,2563193,2693973,3224623,4125814,1114391,1414466,1021168,2822103,2384771,955765,2522174,2788395,1434302,986050,1623257,3710687,2523482,3491999,1073853,3045942,3496233,1750068,2887470,2816839,1760833,2974916,2621393,2572876,2555727",
        "1768192,2539950,4010863,1460299,3452362,1281017,2865355,2851925,1322485,3049318,3049326,1189222,1455086,2927760,4021459,1237587,1661827,2312297,3091890,2526936,469,2010707,3100938,4033867,2597841,1338578,908637,35843,994584,2597844,1371627,3633226,64524,990843,949110,4085486,2862882,6185,3939730,1759886,2244072,3899005,2965368,129130,2555341,58847"
      ],
      // goods_ids: [
      //   "91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      //   "97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
      // ],
      fixed: false,
      fixed_top: 0,
      nav_active: 0,
      shareBtn: true,
      msgTxt: "",
    };
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
    let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
    if (xcx_user) {
      vm.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
  },
  created() {
    vm = this;
    for (let i = 0; i < vm.navs.length; i++) {
      vm.goods_data[i] = [];
    }
    vm.init(0);
    vm.miaoInit();
  },
  filters: {
		numFilter(value) {
		  return parseFloat(value).toFixed(1);
		}
	},
  methods: {
    // 菜单点击滚动
    navClick(index) {
      vm.init(index);
      vm.nav_active = index;
    },
    // 商品初始化
    init(i) {
      if(vm.goods_data[i].length != 0){
        vm.goods = vm.goods_data[i];
        return false;
      }
      let params = {
        goods_id: this.goods_ids[i]
      };
      this.$http.get(URL.GoodList, { params }).then(res => {
        console.log(res);
        let data = res.data;
        if(res.status == '200' && data.length != 0){
          if(data.length % 2 != 0 && data.length > 1){
            data = data.slice(0, data.length - 1);
          }
          vm.goods_data[i] = data;
          vm.goods = vm.goods_data[i];
        }else{
          vm.goods_data[i] = [];
          vm.msgTxt = res.statusText;
        }
      });
    },
    // 秒杀数据
    miaoInit(){
      this.$http.get(URL.GetGoodsSkillCategory).then(res => {
        let data = JSON.parse(res.data);
        console.log(data);
        if(data.result == 1){
          if(data.data.length != 0){
            vm.miaoData = data.data;
          }else{
            vm.msgTxt = '系统发生异常，请稍后再试';
          }
        }else{
          vm.msgTxt = data.message;
        }
      });
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
    },
    // 跳转二级分类
    toMore() {
      tjjApp.web.toCATE({ id: 361, name: '食品' });
    },
    // 跳转店铺
    toShop(id) {
      tjjApp.web.startShopHome(id);
    },
    // 跳转商品
    toGoods(id) {
      tjjApp.web.jump2good(id);
    },
    // 分享
    shareClick() {
      tjjApp.web.share({
        title: document.title
      });
    },
    // rem换算成px
    remFn(num) {
      return num * 25;
    },
    // 自定义路径跳转
    locationHref(url) {
      location.href = url;
    }
  },
  components: {
    ToTop,
    msgBox
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped >
.container,
#nav,
#goods,
#more,
#more-height {
  background: #90eac0;
}
img {
  width: 100%;
  display: block;
}
section {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.top_img {
  height: 7.67rem;
}
#box_01 {
  width: 100%;
  height: 7.74rem;
}
.box_01 {
  position: absolute;
  width: calc(100% - 0.88rem);
  height: 4.9rem;
  left: 0.44rem;
  top: 2.2rem;
}
.box_01_list {
  float: left;
  width: calc(calc(100% - 0.4rem) / 3);
  height: 4.9rem;
  background: #fff;
  margin-right: 0.2rem;
  position: relative;
}
.box_01_list:last-child {
  margin-right: 0;
}
.box_01_list img {
  width: 100%;
  height: 3.5rem;
}
.box_01_list .one_icon {
  position: absolute;
  width: 1.53rem;
  height: 1.48rem;
  left: -0.07rem;
  top: -0.07rem;
}
.box_01_list .over {
  position: absolute;
  width: 100%;
  height: 5rem;
  background: #000;
  opacity: 0.5;
  left: 0;
  top: 0;
}
.box_01_list .over img {
  width: 3.3rem;
  height: 2.6rem;
  margin: 1.17rem auto 0;
}
.box_01_list_title {
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: left;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.37rem;
  font-weight: normal;
  font-stretch: normal;
  color: #4b4b4b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0.17rem;
}
.box_01_list_price {
  width: 100%;
  height: 0.5rem;
  padding: 0 0.17rem;
}
.box_01_list_price .box_01_newprice {
  display: inline-block;
  height: 0.4rem;
  line-height: 0.4rem;
  font-family: FZLTDHK--GBK1-0;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #ff4c2f;
  float: left;
  margin-top: 0.1rem;
  margin-right: 0.16rem;
}
.box_01_list_price .box_01_newprice font {
  font-size: 0.26rem;
}
.box_01_list_price .box_01_oldprice {
  display: inline-block;
  height: 0.25rem;
  line-height: 0.25rem;
  font-family: FZZDXJW--GB1-0;
  font-size: 0.25rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #000;
  opacity: 0.4;
  float: left;
  margin-top: 0.22rem;
  text-decoration: line-through;
}
.box_01_list_price .box_01_oldprice font {
  font-size: 0.16rem;
}
.box_01_list_price .box_01_go {
  width: 1.3rem;
  height: 0.46rem;
  line-height: 0.46rem;
  text-align: center;
  background: #ff4c2f;
  border-radius: 0.06rem;
  font-family: FZZDXJW--GB1-0;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fff;
  float: right;
}
#box_02 {
  width: 100%;
  height: 13.25rem;
}
.box_02 {
  position: absolute;
  width: calc(100% - 0.92rem);
  height: 10.68rem;
  left: 0.46rem;
  top: 2.26rem;
}
.box_02_a {
  display: block;
  width: calc(calc(100% - 0.3rem) / 3);
  height: 5.17rem;
  float: left;
  margin-right: 0.15rem;
  margin-bottom: 0.17rem;
}
.box_02_a .box_02_a_img {
  width: 100%;
  height: 5.17rem;
}
.box_02_a:nth-of-type(3n) {
  margin-right: 0;
}
.share {
  position: absolute;
  width: 1.84rem;
  height: 0.45rem;
  top: 0.4rem;
  right: 0.2rem;
  /* background: url(../assets/images/share.png) center center no-repeat; */
  /* background-size: 1.84rem 0.45rem; */
}
#type {
  height: 4.7rem;
}
#type img {
  height: 4.7rem;
}
#type .type {
  position: absolute;
  width: 1rem;
  height: 1rem;
  z-index: 1;
}
#type .type:nth-of-type(1) {
  width: 2.9rem;
  height: 4.7rem;
  left: 0.54rem;
  top: 0;
}
#type .type:nth-of-type(2) {
  width: 5rem;
  height: 2.3rem;
  left: 3.5rem;
  top: 0;
}
#type .type:nth-of-type(3) {
  width: 5rem;
  height: 2.3rem;
  left: 3.5rem;
  bottom: 0;
}
#type .type:nth-of-type(4) {
  width: 2.9rem;
  height: 4.7rem;
  right: 0.54rem;
  top: 0;
}
#nav {
  width: 100%;
  height: 1.1rem;
  background: #31b58e;
}
#nav .nav {
  width: calc(100% / 5);
  height: 1.1rem;
  display: block;
  float: left;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.42rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0.02rem;
  color: #fff;
  text-align: center;
  background: #31b58e;
}
#nav .nav span {
  display: inline-block;
  width: 100%;
  height: 0.64rem;
  margin: 0.23rem auto 0;
  line-height: 0.64rem;
  background: url(../assets/images/border.png) right center no-repeat;
  background-size: 0.04rem 0.63rem;
}
#nav .nav:last-child span {
  background: none;
}
#nav .nav_active {
  background: #4bcda7;
}
#nav .nav.nav_active span {
  background: none;
}
#nav .nav span.nav_active {
  background: none;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
#zw_height {
  width: 100%;
  height: 1.1rem;
}
#goods {
  width: 100%;
  overflow: hidden;
  padding: 0 0.25rem;
}
#goods .goods {
  width: 100%;
  overflow: hidden;
  margin-bottom: 0.2rem;
  margin-top: 0.28rem;
}
#goods .goods_list {
  width: calc(calc(100% - 0.08rem) / 2);
  height: 7.8rem;
  float: left;
  margin-right: 0.08rem;
  margin-bottom: 0.1rem;
  background: #fff;
}
#goods .goods_list:nth-of-type(2n) {
  margin-right: 0;
}
#goods .goods_list img {
  width: 100%;
  height: 5.7rem;
}
#goods .goods_list .goods_list_title {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: left;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #585c63;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 0.34rem;
}
#goods .goods_list .goods_list_price {
  width: 100%;
  height: 0.9rem;
}
#goods .goods_list .goods_list_price .goods_list_price_new {
  display: inline-block;
  float: left;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.53rem;
  height: 0.53rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff4c2f;
  margin-top: 0.125rem;
  margin-left: 0.42rem;
}
#goods .goods_list .goods_list_price .goods_list_price_new font {
  font-size: 0.39rem;
  height: 0.39rem;
  float: left;
}
#goods .goods_list .goods_list_price .goods_list_price_old {
  text-decoration: line-through;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.32rem;
  height: 0.32rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #999;
  float: left;
  margin-top: 0.28rem;
  margin-left: 0.33rem;
}
#goods .goods_list .goods_list_price .goods_list_price_go {
  display: block;
  width: 0.88rem;
  height: 0.88rem;
  float: right;
  background: url(../assets/images/go.png) center center no-repeat;
  background-size: 0.88rem;
  margin-right: 0.44rem;
}
#more {
  width: 100%;
  height: 2rem;
  position: relative;
  margin-top: -0.04rem;
  background: #f1fdef;
}
#more .more-a {
  position: absolute;
  width: 7.9rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  background: #31b58e;
  border-radius: 1rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.6rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1rem;
  letter-spacing: 0px;
  color: #fff;
}
#more-height {
  width: 100%;
  height: 1rem;
}
</style>

