<style >
html {
  background: #0e4776;
  min-height: 100%;
}
.one {
  width: 100%;
  min-height: 15.26rem;
  background: url("../assets/images/summer3.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  margin: -0.9px auto 0;
}
.one_goods {
  width: 10.71rem;
  margin: 0 auto;
  min-height: 10rem;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}

.one_goods > div {
  height: 7.44rem;
  width: 5.25rem;
  background: #fff;
  margin-bottom: 0.24rem;
  border-radius: 0.1rem;
  position: relative;
}
.one_goods > div:nth-last-of-type(1),
.one_goods > div:nth-last-of-type(2) {
  margin-bottom: 0.1rem;
}
.one_goods > div img {
  width: 5.25rem;
  height: 5.1rem;
  border-radius: 0.1rem 0.1rem 0 0;
}
.one_goods_name {
  font-family: SourceHanSansCN-Normal;
  font-size: 0.54rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.02rem;
  color: #000000;
  padding: 0 0.28rem;
  margin: 0.36rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.one_goods_buy {
  padding: 0 0.28rem;
  height: 0.67rem;
  justify-content: space-between;
  display: flex;
  color: #ff5310;
  margin: 0 auto;
}
.one_goods_price {
  font-family: " SourceHanSansCN-Heavy";
  font-size: 0.54rem;
  margin-top: 0.15rem;
}
.one_goods_price font {
  font-size: 0.42rem;
}
.del {
  color: #b8b8b8;
  font-size: 0.32rem;
  padding-top: 0.37rem;
}
.del font {
  font-size: 0.23rem;
}
.one_goods .button {
  width: 1.89rem;
  display: block;
  height: 0.67rem;
  background-color: #ff5310;
  border-radius: 0.04rem;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  text-align: center;
  line-height: 0.67rem;
}
.one_goods .ysw {
  height: 7.44rem;
  width: 5.25rem;
  border-radius: 0.1rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 22;
}
.one_goods .icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 2.2rem;
  height: 0.56rem;
}
.shops {
  background: url("../assets/images/summer5.jpg");
  width: 100%;
  height: 9.2rem;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-bottom: 0.68rem;
  margin-top:-0.8px; 
}
.shops > div {
  width: 10.74rem;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: space-between;
}
.shops > div img {
  width: 3.44rem;
  height: 4.32rem;
  margin-bottom: 0.2rem;
}
.tab_goods {
  width: 11.44rem;
  margin-bottom: 0.2rem;
}
.tab_goods > div {
  width: 5.61rem;
  height: 7.94rem;
}
.tab_goods > div > img {
  height: 5.44rem;
  width: 5.61rem;
}
.img1px img{
  margin-top: -0.4px;
}
/* .tab_goods .one_goods_buy {
	width: 100%;
	padding: 0.31rem;
} */
</style>

<template>
  <div id="xbct">
    <div v-for="(imgs,index) in headerimg" class="img1px"  :key="index">
      <img :src="imgs.src">
    </div>
    <div class="one">
      <div class="one_goods">
				<div  v-for="(goods,index) in onegoodlist"  :key="index"  >
          <img v-if="goods.num==0" class="ysw" src="../assets/images/ysw.png" alt srcset>
          <img v-lazy="goods.img320_url" alt   @click="jump2good(goods.goods_id)">
          <p class="one_goods_name"   @click="jump2good(goods.goods_id)">{{goods.goods_name}}</p>
          <p class="one_goods_buy"   @click="jump2good(goods.goods_id)">
            <span class="one_goods_price">
              <font>￥</font>{{goods.group_price  }}
            </span>
            <span class="del">
              <del>
                <font>￥</font>{{goods.shop_price | numFilter}}
              </del>
            </span>
            <span class="button">立即抢</span>
          </p>
     
        </div>
      </div>
    </div>
    <img src="../assets/images/summer4.jpg">
    <div class="shops">
      <div>
        <img
          v-for="(shop,index) in shoptop"
          :src="shop.src"
          alt
          @click="jumpToShopHome(shop.dpid)"
          :key="index"
        >
      </div>
    </div>
    <nav :class="navfixed == true ? 'fixed' :''" id="navs" class="nav">
      <span
        v-for="(item,$index) in items"
        @click="selectStyle (item, $index) "
        :key="'C-'+$index"
        :class="{'active':item.active,'unactive':!item.active}"
      >{{item.select}}</span>
    </nav>
    <div class="one_goods tab_goods">
      <div
        v-for="(goods,index) in goodlists[shows]"
        @click="jump2good(goods.goods_id)"
        :key="index"
      >
        <img v-lazy="goods.img320_url" alt>
        <p class="one_goods_name">{{goods.goods_name}}</p>
        <p class="one_goods_buy">
          <span class="one_goods_price">
            <font>￥</font>{{goods.group_price}}
          </span>
          <span class="del">
            <del>
              <font>￥</font>{{goods.shop_price | numFilter}}
            </del>
          </span>
          <span class="button">立即抢</span>
        </p>
      </div>
    </div>
    <div>
      <img
        @click="toSecondsDetail(gmoredatas[shows])"
        :style="{ display : is_wx ? 'none' : '' }"
        :src="gmore"
      >
    </div>
    <ToTop></ToTop>
     <msgBox :msgTxt="msgTxt"></msgBox>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import url from "./../assets/js/api.js";
import msgBox from "@/components/msgBox";
var that = null;
export default {
  components: { ToTop,msgBox},
  name: "xbct",
  async created() {
    that = this;
    this.getgoodlist(0);
  	this.getsecondKillGoods();
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      var params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "首页"
      };
      send.sendPoint(params);
    };
    var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      this.iswx();
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      window.isLogin(user_id, 0, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    window.addEventListener("scroll", this.isdown);
  },
  data: function() {
    return {
      items: [
        { select: "夏日好物", active: true, position: 0 },
        { select: "夏日优品", active: false, position: 0 },
        { select: "夏日趣物", active: false, position: 0 },
        { select: "夏日童真", active: false, position: 0 }
      ],
      navfixed: false,
      msgTxt: "",
      zwf: false,
      offsetTops: 0,
      tabwz: [],
      goodlists: [],

      				// goods_id:[
      				// 	"23,29,30,37,38,39,42,43,44,45,46,47,63,67,207,285,288,289,292,295,296,298,96,97,101,103,109,112,113,114,118,121,122",
      				// 	"71,84,91,93,94,96,97,101,103,109,112,113,114,118,121,122,123,128,130,142,152,154,207,285,288,289,292,295,296,298",
              //   "169,173,174,178,183,187,188,200,203,205,206,207,285,288,289,292,295,296,298",
              //   "38,39,42,43,44,45,46,47,63,67,207,285,288,289,292,295,296,298,23,29,30,96,97,101,103,109,112,113,114,118,121,122"
      				// 	],
      goods_id: [
        "8939,1455306,2693291,1768436,1475000,926757,2535140,2871548,1462412,4383585,3530146,2506,2213,2685641,53678,4383585,4263661,3924499,3633789,1001252,3379543,3639593,3117478,3056258,2794276,2820954,3006111,2649345,2566591,2575473,1475017,2504339,2581338,2262592,1927993,1932103,1697516,1470742,1470889,1142588,959540,915838,898190,1575910,771902,588082,383833,61629,59930,36453,19843,7270,1141816,3230476,1340444,1918594,1510039,1474409,1119255,1059693",
        "3616589,2147,2536592,2062,4312733,4253451,4245399,4294334,4258412,6665,60308,4221684,4213889,2882815,297457,9728,4155492,4083063,3529287,2723526,2717639,2807116,11637,32657,33381,32972,34762,3843772,3965512,4042508,4172178,4210872,2981731,3808,19922,3538828,3431870,1792847,4210703,820275,3910795,1923259,3616589,961752,1000979,4312323,906890,912210,906423,3554,5662,8256,11363,11487,11651,38149,39069,40429,811747,925286",
        "1626460,3117478,2847227,1020903,1443149,3006111,4180764,2674371,1510039,1926403,1930136,1430288,1462865,91777,86601,4334273,4255767,3938839,3837825,3470642,3375221,3005907,2969313,2980748,7270,2736788,1442242,2639126,3030251,2602349,2535140,2535014,2505048,2475684,1933295,1908057,1464771,1471744,8939,1157559,1072029,975158,926757,906589,726744,532641,65504,60985,51587,26093,17766,1426746,2506,2685641,2605642,2237408,1981072,1473662,1414199,1340444",
        "5867,3225,1026641,7008,1198956,22107,614294,4329870,2597676,4291606,4256569,4423806,3861732,3979069,3442337,3158940,3434725,2975672,3480732,2535005,2574906,2587427,2572040,2572045,2579428,2567318,2575509,2772436,3629054,4405687,4200296,1444066,4347338,4208732,4254474,3362865,3420202,2825868,2681824,2589108,2591933,109928,120410,2808185,2825969,2851118,3394808,2975575,3165167,3183008,2589103,2591956,2563506,2554461,2539616,2570310,2736947,4315293,2691247,2715432"
      ],
      headerimg: [
        { src: require("../assets/images/summer1.jpg") },
        { src: require("../assets/images/summer2.jpg") }
      ],
      shoptop: [
        { src: require("../assets/images/1.png"), dpid: "77107" },
        { src: require("../assets/images/2.png"), dpid: "27826" },
        { src: require("../assets/images/3.png"), dpid: "16068" },
        { src: require("../assets/images/4.png"), dpid: "17936" },
        { src: require("../assets/images/5.png"), dpid: "22547" },
        { src: require("../assets/images/6.png"), dpid: "84892" }
      ],
      ysw: [require("../assets/images/ysw.png")],
      is_wx: false,
      shows: 0,
      onegoodlist: [
        // {
        //   goods_id: "1214847",
        //   img320_url:
        //     "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
        //   goods_name: "雪雪翼云霄雪翼云霄雪翼云霄翼雕冲云霄",
        //   group_price: 66.30,
        //   shop_price: "99.00",
        //   num: "599"
        // },
        // {
        //   goods_id: "1214847",
        //   img320_url:
        //     "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
        //   goods_name: "翼雕雪翼云霄雪翼云霄雪翼云霄雪翼云霄雪翼云霄冲云霄",
        //   group_price: 66.0,
        //   shop_price: "99.00",
        //   num: "0"
        // },
        // {
        //   goods_id: "1214847",
        //   img320_url:
        //     "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
        //   goods_name: "雪翼云霄雪翼云霄雪翼云霄雪翼云霄雪翼云霄",
        //   group_price: 66.0,
        //   shop_price: "99.00",
        //   num: "599"
        // },
        // {
        //   goods_id: "1214847",
        //   img320_url:
        //     "http://img.sdjjia.com/fdc/20180611/img/7c0e30ac34d1146b801eb3f55eb436c9_320_320.jpeg",
        //   goods_name: "雪翼雕冲云霄",
        //   group_price: 66.0,
        //   shop_price: "99.00",
        //   num: "599"
        // }
      ],
      gmore: [require("../assets/images/summer6.jpg")],
      gmoredatas: [
				{ ids: "317", names: "母婴" },
				{ ids: "317", names: "母婴" },
        { ids: "406", names: "百货" },
        { ids: "406", names: "百货" },
      ]
    };
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位

      let realVal = parseFloat(value).toFixed(1);

      return realVal;
    }
  },
  methods: {
    getgoodlist(index) {
      if (!that.goodlists[index]) {
        that.$http
          .get(url.GoodList, { params: { goods_id: that.goods_id[index] } })
          .then(res => {
            let ress = res.data;
            let nums = ress.length % 2;
            that.$set(that.goodlists, index, ress.slice(0, ress.length - nums));
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    getsecondKillGoods() {
      that.$http
        .get(url.SecondKill)
        .then(res => {
         
          let ress = JSON.parse(res.data);
          console.log(ress);
          
          if(ress.result==1){
            that.onegoodlist = ress.data;
          }else{
            this.msgTxt=ress.message
          }
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectStyle(item, index) {
      this.getgoodlist(index);
      this.items.forEach(function(item, index) {
        Vue.set(item, "active", false);
      });
      Vue.set(this.items[index], "active", true);
      this.shows = index;
    },
    iswx() {
      this.is_wx = true;
    },
    jumpToShopHome(id) {
      tjjApp.web.startShopHome(id);
    },
    jump2good(id) {
      tjjApp.web.jump2good(id);
    },
    jump2onegood(id, num) {
      if (num > 0) {
        tjjApp.web.jump2good(id);
      }
    },
    toSecondsDetail(gmoredata) {
      tjjApp.web.toCATE({ id: gmoredata.ids, name: gmoredata.names });
    },
    numFn(rem) {
      return rem * 23.4375;
    },
    isdown() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let navTop = document.getElementsByClassName("nav")[0].offsetTop;
			var tab_goods = document.getElementsByClassName("tab_goods");
			 if (scrollTop >= navTop) {
				that.navfixed = true;
			}
			if (scrollTop < tab_goods[0].offsetTop) {
        this.navfixed = false;
      }	
			
    }
  }
};
</script>
<style>
</style>
<style scoped>
.fixed {
  position: fixed;
  top: 0;
  z-index: 100;
  margin: 0 auto;
  left: 0;
  right: 0;
  margin: 0rem auto !important;
}
body,
html {
  background: #0e4776;
  height: 100%;
}
img {
  width: 100%;
  display: block;
}
nav {
  width: 100%;
  font-size: 0.725rem;
  letter-spacing: 0px;
  height: 1.13rem;
  background: #7a95ff;
  margin-bottom: 0.23rem;
}
.fixed {
  position: fixed;
  background-color: #bec5a5;
  top: 0;
  z-index: 999;
}

nav span:last-child {
  margin-right: 0px;
}
nav span {
  width: 25%;
  float: left;
  text-align: center;
  background-color: #2b85e4;
  height: 1.13rem;
  font-family: SourceHanSansCN-Normal;
  font-size: 0.56rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #fff;
  line-height: 1.13rem;
}
nav .active {
  background-color: #ffffff;
  color: #2850b8;
}
.goods {
  width: 100%;
  padding: 0.3rem 0.3rem;
  min-height: 3rem;
  overflow: hidden;
  clear: both;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}

.good .name {
  margin: 0.34133rem 0 0.59rem;
  font-size: 0.789rem;
  font-family: FZLTXHK--GBK1-0;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  color: #000000;
  padding: 0 0.341rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


nav span:nth-last-child(1)::after {
  display: none;
}
nav .active:after {
  display: none;
}

.yjs {
  position: absolute;
  height: 9.49rem;
  z-index: 111;
  top: 0;
}
.gmore {
  margin: 0.2rem auto;
  width: 3.264rem;
  height: 0.853rem;
}
</style>