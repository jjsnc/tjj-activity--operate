<style  scoped >
#general {
  background: #5f98ff;
}
header {
  height: 5.99rem;
  position: relative;
 width: 100%;
}
header img {
  height: 5.99rem;
  width: 100%;
}
.left_scroll {
  height: 2.32rem;
  overflow: hidden;
  position: absolute;
  top: 3.67rem;
  left: 0;
  padding-top: 0.1rem;
}
>>> #float {
  background: #5f98ff;
}
.shops {
  background: #5f98ff;
}
.shop_lists {
  width: 100%;
  padding: 0.15rem;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1.8rem;
}
.shop_list {
  width: 3.81rem;
  height: 5.77rem;
  text-align: center;
  background: #b31135;
  font-family: MicrosoftYaHei;
  font-size: 0.48rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  margin-bottom: 0.2rem;
  font-weight: bolder;
}
.shop_list p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 0.7rem;
  line-height: 0.7rem;
  width: 98%;
}
.shop_list .shop_name {
  font-weight: normal;
  margin-top: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 98%;
}
.shop_list img {
  height: 4.17rem;
  width: 3.81rem;
}
</style>
  
<style>
.shop_title {
  height: 2rem;
  width: 100%;
  margin: 0.16rem 0;
}
.left_scroll li {
  height: 0.94rem;
  width: 2.78rem !important;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.3rem;
  background-color: rgba(255, 254, 171, 0.8);
  border: solid 1px #fbd03c;
  border-left: solid 0 #fbd03c;
  opacity: 0.82;
  border-radius: 0 1rem 1rem 0;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff2d16;
  margin-bottom: 0.19rem;
  font-weight: bolder;
  text-align: center;
  padding: 0.08rem 0.08rem;
  line-height: 0.36rem;
}

.left_scroll li span {
  height: 0.72rem;
  display: block;
  overflow: hidden;
}

.page_button {
  width: 100%;
  padding: 0.2rem 0.15rem 0.1rem;
  background: #5f98ff;;
  height: 2.78rem;
  display: flex;
  justify-content: space-between;
}
.page_button img {
  width: calc(calc(100% - 0.16rem) / 2);
  height: 100%;
  margin-top: -0.01rem;
}
.page_button_three img {
  width: calc(calc(100% - 0.32rem) / 3);
}
#float {
  width: 12rem;
  padding: 0 0.3rem;
  height: 5.63rem;
  margin-top: 0.2rem;
  overflow-x: auto;
}
.float {
  width: 120%;
  height: 5.63rem;
}
/* 1.18 */
.float-a {
  width: 2.66rem;
  height: 2.67rem;
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
  width: 100%;
}
.float-a-bottom-0 {
  margin-bottom: 0;
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
.tab_hidden {
  height: 0.97rem;
  overflow: hidden;
}
.tabs {
  width: 100%;
  overflow-x: auto;
  height: 0.99rem;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
   margin-bottom: 0.2rem;
}
.tab_box {
  height: 0.99rem;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}
.dg {
  height: 0.99rem;
  width: 100%;
}
#general .tabs div {
  background-color: #2858de;
  width: 100%;
  line-height: 0.99rem;
  height: 0.99rem;
 
}
.tab > span {
  width: 2.4rem;
  float: left;
  font-size: 0.5rem;
  text-align: center;
  height: 0.99rem;
  z-index: 999;
  font-size: 0.47rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
}
#general .tab > span .active {
  background-color: #f8001f;
  display: inline-block;
  border: 0px;
  width: 2.26rem;
  height: 0.72rem;
  border-radius: 0.1rem;
  line-height: 0.81rem;
}
.hc_img {
  height: 2.5rem;
  width: 100%;
}
#general .hc_lists {
  width: 100%;
  min-height: 2rem;
  background: #5f98ff;
  justify-content: space-around;
  display: flex;
  flex-wrap: wrap;
  padding: 0.2rem 0.08rem;
}
.hc_list {
  width: 3.89rem;
  height: 5.56rem;
  background: #fff;
  margin-bottom: 0.07rem;
  position: relative;
}
.hc_list img {
  width: 3.89rem;
  height: 3.89rem;
}
.hc_list .goods_name {
  width: 100%;
  padding: 0 0.15rem;
  margin: 0.24rem 0 0.24rem;
  color: #333;
  font-size: 0.38rem;
  font-family: "PingFang-SC-Medium";
  height: 0.41rem;
  line-height: 0.41rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hc_list .goods_buy .price font {
  letter-spacing: 0.02rem;
  color: #333;
  font-family: "PingFang-SC-Heavy";
  font-size: 0.35rem;
  color: #ff190d;
}
.hc_list .goods_buy {
  height: 0.52rem;
  width: 100%;
  padding: 0 0.14rem;
  margin: 0 auto;
}
.hc_list .goods_buy .price {
  color: #ff190d;
  font-size: 0.55rem;
  font-family: "MicrosoftYaHei-Bold";
  float: left;
  margin-top: 0.06rem;
  letter-spacing: -0.01rem;
}
.hc_list del font {
  font-size: 0.17rem;
}
.hc_list del {
  color: #7f7a7a;
  font-family: "PingFang-SC-Regular";
  font-size: 0.25rem;
  float: left;
  margin-top: 0.30rem;
  margin-left: 0.08rem;
}
.hc_list .googs_num {
  padding-left: .10rem;
  position: absolute;
  left: 0;
  top: 2.75rem;
  width: 2.41rem;
  display: block;
  height: 0.61rem;
  line-height: 0.61rem;
  background-image: linear-gradient(0deg,#f96b19 0%,#f54724 53%,#f32532 100%);
  border-radius: 0 2rem 2rem 0;
  color: #fff;
  font-size: 0.3rem;
  font-family: "PingFang-SC-Bold";
  z-index: 1;
}
.googs_num em {
  width: .25rem;
  height: .29rem;
  margin-top: .15rem;
  margin-right: .1rem;
  display: inline-block;
  background-image: url('./../../../assets/images/fhc/fire.png');
  background-repeat:no-repeat;
  background-size:cover;
  background-position: center  left ;
  font-style: normal;
}
.goods_jb{
   position: absolute;
   left: 0.1rem;
   width: .82rem;
   height: .8rem;
   background-image: url('./../../../assets/images/icon/mjs.png');
   background-repeat:no-repeat;
   background-size:cover;
}
.goods_one{
   position: absolute;
   left: 0.1rem;
   width: .82rem;
   height: .91rem;
   background-image: url('./../../../assets/images/icon/one.png');
   background-repeat:no-repeat;
   background-size:cover;
}

.goods_ph{
  position: absolute;
  left: 0.1rem;
  top: 0;
  height: 1.05rem;
  width: .81rem;
  text-align: center;
  background-image: url('./../../../assets/images/fhc/ph.png');
  background-repeat:no-repeat;
  background-size:cover;
  font-size: .3rem;
  color: #ff0808;
  line-height: 1.05rem;
}
.hc_list .go_buy {
  width: 1.62rem;
  height: 0.55rem;
  float: right;
  text-align: center;
  line-height: 0.55rem;
  background-color: #ff190d;
  border-radius: 0.1rem;
  font-family: PingFang-SC-Medium;
  font-size: 0.41rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffffff;
  position: absolute;
  right: 0.15rem;
}
#general .hc_list .nobuy{
  background-color: #c7c7c7;
  color: #9b9b9b;
}
#general .pzhh {
  height: 2.65rem;
  background: #ff889d;
}
#general .share{
  width: 2rem;
    position: absolute;
    right: 0.2rem;
    height: 1rem;
    z-index: 10;
    top: 0.5rem;
}
/* iPhone X 和 iPhone XS */

@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .shop_lists{
    padding-bottom: 2.14rem;
  }
}

/* iPhone XR */

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .shop_lists{
    padding-bottom: 2.14rem;
  }
}

/* iPhone XS Max */

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .shop_lists{
    padding-bottom: 2.14rem;
  }
}
#general .img_text{
  position: absolute;
  margin: 0 auto;
  height: 3.12rem;
  left: 0;
  right: 0;
  top:1.5rem;
  width: 7.67rem;
}
</style>


<template>
  <div id="general">
     <openQQ v-if="openQ"></openQQ>
    <header>
      <img :src="banner" />
      <img class="img_text" :src="banner1" />
      <img class="share"  src="./../../../assets/images/icon/share.png"  @click="shareMini('share/general.jpg','居家百货一站购 超值囤货0.1元起')">
      <roll class="center_scroll" :roll="roll1" v-if="timeEndSHOW"></roll>
    </header>
    <roll class="left_scroll" v-if="timeEndSHOW" :roll="roll"></roll>
    <pageButton :pageData="page_button"></pageButton>
    <float :floatData="floatData"></float>
    <div class="tabs" id="nav" :class="{fixed:fixed}">
      <div class="tab">
        <span v-for="(nav,index) in navs" :key="index" @click="jumpNav(index)">
          <span :class="{ active:changeNav == index}">{{nav}}</span>
        </span>
      </div>
    </div>
    <!-- 平滑导航 -->
    <div v-if="fixed" class="dg"></div>
    <img v-lazy="hcImg" class="hc_img module0 module" @click="jump2web('https://modeup.taojiji.com/taojiji/pages/2019/07/17315946cfe016c5f4-html5.html')" />
    <div class="hc_lists">
      <div class="hc_list" v-for="(item,index) in hc_goods" :key="index"  @click="jump2good(item.goodsId,item.goodsName,item.totalStock)" >
        <span class="googs_num"  v-if="item.storeLimit" >
          <em></em>前{{item.storeLimit}}件半价
        </span>  
        <img v-lazy="item.img640Url" />
        <p class="goods_name">{{item.goodsName}}</p>
        <p class="goods_buy">
          <span class="price">
            <font>¥</font>{{item.minGroupPrice}}
          </span>
          <del>
            <font>¥</font>{{item.shopPrice}}
          </del>
          <span class="go_buy"  v-if="item.totalStock">立即抢</span>
          <span class="nobuy go_buy"   v-else>已售完</span>
        </p>
      </div>
    </div>
    <goods :hc_info="hc_info[0]" v-if="indexModule[0]"></goods>
    <goods :hc_info="hc_info[1]" v-if="indexModule[1]"></goods>
    <goods :hc_info="hc_info[2]" v-if="indexModule[2]"></goods>
    <div class="shops module4 module">
      <img class="shop_title" src="./../../../assets/images/fhc/hd.jpg" />
      <div class="shop_lists">
           <div class="shop_list" v-for="(item,index) in shops" :key="index"  @click="toShop(item.shop_id)" >
            <img v-lazy="item.pic_url">
            <p class="shop_name" >{{item.activity_name}}</p>
            <p>{{item.shop_text}}</p>
      </div>
      </div>
    </div>
    <msgBox :msgTxt="msgTxt" />
    <bNav></bNav>
  </div>
</template>
<script>
import openQQ from "./../../../components/openQQ"; //滚动  
import roll from "./../../../components/roll"; //滚动
import bNav from "./../../../components/bottomNav"; //秒杀模块
import pageButton from "./../../../components/index/pageButton"; //页面图片
import float from "./../../../components/index/float"; //浮动图标
import URL from "./../../../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
import Vue from "vue";
let firstScrollTo = scroller();
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));

// import vanTabs from 'vant';
export default {
  data() {
    return {
      hc_info: [
        {
          hc: "3-2",
          img: require("./../../../assets/images/fhc/bh_2.jpg"),
          index: 1,
          type: 0,
          url:' https://modeup.taojiji.com/taojiji/pages/2019/07/193dd9a57163a83229-html5.html'
        },
        {
          hc: "3-3",
          img: require("./../../../assets/images/fhc/bh_3.jpg"),
          index: 2,
          type: 0,
          num:3,
          url:'https://modeup.taojiji.com/taojiji/pages/2019/07/18a2216039b2ae45ef-html5.html'
        },
        {
          hc: "3-4",
          img: require("./../../../assets/images/fhc/pz.jpg"),
          index: 3,
          type: 1,
          num:20,
          navs: [
            { name: "夏日必备", id: "3-4" },
            { name: "厨房烹饪", id: "3-5" },
            { name: "洁净美家", id: "3-6" },
            { name: "收纳整理", id: "3-7" },
            { name: "母婴儿童", id: "3-8" }
          ]
        }
      ],
      banner: require("./../../../assets/images/fhc/g1.jpg"),
      banner1: require("./../../../assets/images/fhc/g2.png"),
      hcImg: require("./../../../assets/images/fhc/bh_1.jpg"),
      fixed: false,
      changeNav_love: 0,
      timeEndSHOW: true, 
      indexModule: [false, false, false],
      moduleStatus: true,
      moduleStart: 0,
      navs: ["批发市场", "精致生活   ", "热销榜单", "品质好货", "每日好店"],
      roll: { stopNum: 1, rullData: [] },
      roll1: { stopNum: 1, rullData: [] },
      page_button: [
        require("./../../../assets/images/index/p_07.jpg"),
        require("./../../../assets/images/index/p_09.jpg")
      ],
      // 浮动图
      styleObject: {}, //浮动宽度
      floatData: [
      ],
      changeNav: 0, //tab导航
      fixed_top: 0,
      tabClick: false,
      hc_goods: [ {},{},{},{},{},{}],
      shops:[],
      msgTxt:'',
      user_id:"",
      token:"",
      uuid:"",
      openQ:false,
    };
  },
  created() {
    document.getElementsByTagName("html")[0].style.backgroundColor = "#5f98ff";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#5f98ff";
    this.$.initPv({
        pageName: "zhounian_06"
      });
    this.getGoods()
     //获取顶部资源接口
      let params = {
        coordinate:"19-3,22-3,20-3,21-3",
        activity_id:1,
      }
      this.$http.get(URL.topData, { params }).then(res => {
          let zy = res.data;
          let zyData = zy.data;
          //左上角气泡
          if(zy.result==1){
              if(zyData.link_info&&zyData.link_info['19-3']){
                  let rollData=[];
                  if(zyData.link_info["19-3"].length<=1){
                     rollData=[]
                  }else{
                    for (let index = 0; index <zyData.link_info['19-3'].length; index++) {
                     var obj = {
                        'txt' : zyData.link_info['19-3'][index].activity_name,
                        'url':zyData.link_info['19-3'][index].jump_link,
                        'type':'qipao'
                     }
                   rollData.push(obj);
                    this.roll = {
                     stopNum: 2,
                     waitTime: 3000,
                     singleHeight:  1.13,
                     rollData: rollData
                  }
                  }
                 
                  }
                  
              }
              //中部按钮
              if(zyData.link_info&&zyData.link_info['20-3']){
                  this.page_button = zyData.link_info['20-3'];
              }
              //气泡
              if(zyData.link_info&&zyData.link_info['21-3']){
                  
                  this.floatData = zyData.link_info['21-3'];
                  
              }



          }else{
            console.log("资源有问题");
            
          }
          console.log("dingdingdingding 顶部资源 dingdingdingding");
          console.log(zy);
          

          
      })
   
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      if (user_id) {
        this.user_id = user_id;
        this.token = token;
        this.uuid = uuid;
        this.openQ = true;
      } else {
        if (xcx_user) {
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
      if (xcx_user) {
        let user_id = xcx_user.user_id;
        let token = xcx_user.token;
        window.isLogin(user_id, token, "wechat");
      } else {
        this.$.checkLogin();
      }
    }
    window.addEventListener("scroll", this.handleScroll);
    let this_ = this;
    let _onload = window.onload;
    if (document.readyState == "complete") {
      if (this_.moduleStatus) {
        this_.moduleStatus = false;
        this_.moduleStart = 0;
        Vue.set(this_.indexModule, 0, true);
      }
    }
    window.onload = function() {
      _onload ? _onload() : "";
      let len = this_.indexModule.length;
      console.log("zhixing ");
      if (this_.moduleStatus) {
        this_.moduleStatus = false;
        this_.moduleStart = 0;
        Vue.set(this_.indexModule, 0, true);
      }
    };
    this.$nextTick(function() {
      console.log("next");
    });
  },
  watch: {
    moduleStatus(val) {
      if (this.indexModule[this.moduleStart] && this.moduleStatus) {
        console.log("当前已加载" + this.moduleStart);
        console.log("状态" + this.moduleStatus);
        this.moduleStart = this.moduleStart + 1;
        //  this.indexModule[this.moduleStart]=true
        Vue.set(this.indexModule, this.moduleStart, true);
        this.moduleStatus = false;
        if (this.moduleStart == 3) {
          //开始调用每日好店 商品
          this.getshops(1);
        }
        console.log(this.moduleStart);
      } else {
        // alert("当前已加载"+this.moduleStart)
        // alert("状态"+this.moduleStatus)
      }
    },
    $route(to, from) {
      console.log(to);
      console.log(from);
      console.log("@@2222333333333333333333");
    }
  },

  methods: {
     //跳转店铺
      toShop:function(id){
        this.$.startShopHome({
                  elementId:'store',
                  pageName:"zhounian_06",
                  shopId:id
        })
      },
      //跳转商品
      jump2good:function(id,name,num){
        
       if(num){
          this.$.jump2good({
			        goodsId: id,
              goodsName: name,
              elementId:"good_detail_03",
              pageName:"zhounian_06"
			     });
       }else{
         this.msgTxt ="该商品已售罄"
       }
      },

     getshops:function(){
         let params = {
        coordinate: '3-9',
        activity_id: 1
      };
      this.$http.get(URL.topData,{params}).then(res => {
          if(res.data.result==1){
              let shop = res.data.data.link_info;
              if(shop['3-9']){
                this.shops = shop['3-9']
              }
          }else{
              this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, res.data, res.config.method, '分会场店铺----->'+res.data.message, res.status);
          }
      })
    },

    getGoods: function(coordinate) {
      let params = {
        coordinate: '3-1',
        activity_id: 1
      };
      this.$http.get(URL.goods_list_noloading, { params }).then(res => {
        let result = res.data;
        console.log(result);
        if (result.result == 1) {
          if(result.data.goods_ids){
            this.getData( result.data.goods_ids);
          }else{
            this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '分会场欢php----->'+result.message, res.status);
          }
        } else {
          this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '分会场php----->'+result.message, res.status);
          console.log("php");
        }
      });
    },
    getData: function(id) {
      //数据加载
      let params = {
        page: 1,
        pageSize: 18,
        stockNullShow: 1,
        orderType: 0,
        goodsIds:id
          
      };
      this.$http.post(URL.goods_info_noloading,  params).then(javaRes => {
        let javaData = javaRes.data;
        console.log(javaData);
        if (javaData.status == 1) {
          let len =javaData.data.length;
          let num = len%3 ;
          this.hc_goods= javaData.data.slice(0, len - num);
        } else {
          this.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, '分会场java----->'+javaData.message, javaRes.status);
          console.log("java接口问题");
        }
      });
    },
    

    jumpNav: function(index) {
      console.log(index);
      this.tabClick = true;
      var vm = this;
      firstScrollTo = scroller();
      firstScrollTo(".module" + index, {
        offset: this.numFn(-0.99),
        onDone: function() {
          vm.tabClick = false;
        }
      });
      this.tab_scroll(index);
    },
    tab_scroll: function(index) {
      var overflowX = document.getElementsByClassName("tabs")[0];
      let fz = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize
      );
      this.changeNav = index;
    },
  

    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (!this.indexModule1) {
        this.indexModule1 = true;
      }
      if (!this.fixed) {
        this.fixed_top = document.getElementById("nav").offsetTop;
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
       let dg_top = document.getElementsByClassName("module0")[0].offsetTop;
       if(scrollTop<=dg_top){
        this.fixed = false;
      }
      var modules = document.getElementsByClassName("module");
      if (!this.tabClick) {
        for (var i = 0; i < modules.length; i++) {
          if (
            scrollTop >=
            parseFloat(modules[i].offsetTop) -
              parseFloat(
                document.getElementsByTagName("html")[0].style.fontSize
              ) *
                1.2
          ) {
            var module_height =
              parseFloat(modules[i].offsetTop) -
              parseFloat(
                document.getElementsByTagName("html")[0].style.fontSize
              ) *
                0.99;

            this.changeNav = i;

            this.tab_scroll(i);
          }
        }
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

    },

    numFn(rem) {
      var fz = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize
      );
      return rem * fz;
    }
  },

  computed: {
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: {
    roll,
    bNav,
    openQQ,
    pageButton,
    float,
    goods: resolve => {
      require(["./../.../../../../components/index/goods"], resolve);
    },
  }
};
</script>


