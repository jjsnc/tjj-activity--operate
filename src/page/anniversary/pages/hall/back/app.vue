<style  scoped >
@import "./../../../assets/css/hc";
</style>

<style>
/* html,
body {
  background: #ff2b00;
} */
.goods_one{
   position: absolute;
   left: 0.1rem;
   width: .82rem;
   height: .8rem;
   background-image: url('./../../../assets/images/icon/one.png');
   background-repeat:no-repeat;
   background-size:cover;
}
.shop_title {
  height: 2rem;
  width: 100%;
  margin: 0.16rem 0;
}
.center_scroll {
  height: 0.77rem !important;
  overflow: hidden;
  margin-top: 1rem;
  z-index: 8;
  width: 4.78rem;
  line-height: 0.77rem;
  position: absolute;
  bottom: 0.08rem;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.center_scroll ul {
  width: 100%;
}
.center_scroll li {
  height: 0.77rem;
  line-height: 0.77rem;
  font-size: 0.72rem;
  font-weight: normal;
  width: 4.78rem;
  font-weight: bolder;
  text-align: center;
  font-stretch: normal;
  letter-spacing: 0px;
  font-size: 0.42rem;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff260f;
}
.center_scroll li span {
  display: block;
  height: 0.77rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.left_scroll {
  height: 2.28rem;
  overflow: hidden;
  position: absolute;
  top: 6.6rem;
  left: 0;
  padding-top: 0.1rem;
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
  height: 0.70rem;
  display: block;
  overflow: hidden;
}

#we .page_button {
  width: 100%;
  padding: 0rem 0.15rem 0.1rem;
  background: #ff2a00;
  height: 2.58rem;
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
</style>


<template>
  <div id="we">
    <!-- 扎气球的 -->
    <openQQ v-if="openQ"></openQQ>
    <timeHeader class="timeHeade"></timeHeader>
    <header>
      <img
        class="share"
        
        src="./../../../assets/images/icon/share.png"
        @click="shareMini('share/back.jpg','寻宝捡漏 再购一波 0.1元限量补仓')"
      />
      <img :src="banner" class="banner" />
      <roll class="center_scroll" :roll="roll1" v-if="timeEndSHOW"></roll>
    </header>
    <roll class="left_scroll" v-if="timeEndSHOW" :roll="roll"></roll>
    <pageButton :pageData="page_button"></pageButton>
    <float :floatData="floatData"></float>
    <div class="sss" :class="{fixed:fixed}">
    <div class="tabs" id="nav" >
      <div class="tab">
        <span v-for="(nav,index) in navs" :key="index" @click="jumpNav(index)">
          <span :class="{ active:changeNav == index}">{{nav}}</span>
        </span>
      </div>
    </div>
    </div>
    <!-- 平滑导航 -->
    <div v-if="fixed" class="dg"></div>

    <!-- 中部悬浮按钮 -->
    <div @click="toYao" class="center_button"></div>

    <!-- 秒杀模块组件开始  -->
    <spike></spike>
    <!-- 特色会场 -->

    <!-- 限量半价 -->
    <module1 :redPosition="redPosition"></module1>
    <module2 :zjData="zjData[0]" v-if="indexModule[1]"></module2>
    <module2 :zjData="zjData[1]" v-if="indexModule[2]"></module2>
    <module4 :imgPosition="imgPosition" v-if="indexModule[3]"></module4>
    <module5 v-if="indexModule[4]" :hc_list="hc_list"></module5>
    <module6 :shopPosition="'8-7'" v-if="indexModule[5]"></module6>

    <!-- 猜你喜欢 -->
    <div v-if="indexModule[6]" class="love module module12">
      <img class="love_title" src="./../../../assets/images/index/love.png" />
       <div class="sss">
      <div class="tabs" id="nav">
        <div class="tab nav_love">
          <span v-for="(nav,index) in love_navs" :key="index" @click="jumpNav_love(index)">
            <span :class="{ activity:changeNav_love == index}">{{nav.name}}</span>
          </span>
        </div>
      </div>
      </div>
      <div class="love_lists">
        <div
          class="love_list"
          v-for="(item,index) in loveData"
          :key="index"
          @click="jumpGood(item.goodsId,item.goodsName,item.totalStock)"
        >
          <span  class="goods_one"></span>
          <img v-lazy="item.img640Url" />
          <p class="love_title">{{item.goodsName}}</p>
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
    </div>
    <bNav></bNav>
    <tiger v-show="show" :show="show" v-on:closeFn="getMessage" />
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
import openQQ from "./../../../components/openQQ"; //滚动
import roll from "./../../../components/roll"; //滚动
import timeHeader from "./../../../components/header"; //顶部时间
import spike from "./../../../components/spike"; //秒杀模块
import bNav from "./../../../components/bottomNav"; //秒杀模块
import pageButton from "./../../../components/index/pageButton"; //页面图片
import float from "./../../../components/index/float"; //浮动图标
import module1 from "./../.../../../../components/index/module1";

import URL from "./../../../assets/js/api";
import { scroller } from "vue-scrollto/src/scrollTo";
import Vue from "vue";
let firstScrollTo = scroller();
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
// import vanTabs from 'vant';
export default {
  data() {
    return {
      redPosition: "8-5",
      imgPosition: ["8-4", "8-6"],
      zjData: [
        { position: "8-1", index: "2" },
        { position: "8-2", index: "3" }
      ],
      isEnd: false, //是否为底部
      banner: require("./../../../assets/images/index/back_02.png"),
      fixed: false,
      changeNav_love: 0,
      love_nav_tabName: "精选推荐",
      timeEndSHOW: true,
      indexModule: [false, false, false, false, false, false, false],
      moduleStatus: true,
      moduleStart: 0,
      navs: [
        "整点秒杀",
        "特色会场",
        "爆款补仓",
        "买即送礼",
        "热销榜单",
        "服装商厦",
        "百货商场",
        "鞋包商城",
        "美妆超市",
        "特色小吃",
        "通讯电器",
        "精选好店",
        "猜你喜欢"
      ],

      roll: {
        stopNum: 2,
        waitTime: 3000,
        singleHeight: 0.77,
        rollData: [
          {
            date: "1111111",
            activity: "生日宴主场",
            day: "8",
            txt: "999999999999999999"
          }
        ],
        url: "page1"
      },
      roll1: {
        stopNum: 2,
        waitTime: 3000,
        singleHeight: 0.77,
        rollData: [
          {
            date: "1111111",
            activity: "生日宴主场",
            day: "8",
            txt: "2222222222"
          }
        ],
        url: "page1"
      },
      rollData: this.data1,
      data: [
        {
          date: "00000生日宴主场生日宴主场生日宴主场生日宴主场",
          activity: "生日宴主场",
          day: "8"
        },
        { date: "潮流服饰前100件", activity: "服饰步行街", day: "9" },
        { date: "潮流服饰前100件", activity: "生日宴主场", day: "8" },
        { date: "潮流服饰前100件", activity: "服饰步行街", day: "9" },
        { date: "8.9~8.10", activity: "服饰步行街", day: "9" }
      ],
      data1: [
        { date: "1111111", activity: "生日宴主场", day: "8" },
        { date: "8.9~8.10", activity: "服饰步行街", day: "9" },
        { date: "8.11~8.12", activity: "百货商品城", day: "11" }
      ],
      page_button: [
        require("./../../../assets/images/index/p_07.jpg"),
        require("./../../../assets/images/index/p_09.jpg")
      ],
      // 浮动图
      styleObject: {}, //浮动宽度
      floatData: [],
      changeNav: 0, //tab导航

      fixed_top: 0,
      tabClick: false,
      //精选会场
      hc_list: [
        //服饰
        {
          color: "#fe0000",
          urlData: [
            {
              img: require("./../../../assets/images/index/bk1.jpg"),
              url: "01"
            },
            {
              img: require("./../../../assets/images/index/jx2.jpg"),
              url: "02"
            },
            {
              img: require("./../../../assets/images/index/jx3.jpg"),
              url: "03"
            },
            {
              img: require("./../../../assets/images/index/jx4.png"),
              url: "04"
            },
            {
              img: require("./../../../assets/images/index/jx5.png"),
              url: "05"
            },
            {
              img: require("./../../../assets/images/index/jx6.png"),
              url: "06"
            }
          ]
        },
        //百货
        {
          color: "#1ac0d0",
          urlData: [
            {
              img: require("./../../../assets/images/index/bk2.jpg"),
              url: "01"
            },
            {
              img: require("./../../../assets/images/index/jx8.jpg"),
              url: "02"
            },
            {
              img: require("./../../../assets/images/index/jx9.jpg"),
              url: "03"
            },
            {
              img: require("./../../../assets/images/index/jx10.png"),
              url: "04"
            },
            {
              img: require("./../../../assets/images/index/jx11.png"),
              url: "05"
            },
            {
              img: require("./../../../assets/images/index/jx12.png"),
              url: "05"
            }
          ]
        },
        {
          color: "#ea0dfa ",
          urlData: [
            {
              img: require("./../../../assets/images/index/bk3.jpg"),
              url: "01"
            },
            {
              img: require("./../../../assets/images/index/jx14.jpg"),
              url: "02"
            },
            {
              img: require("./../../../assets/images/index/jx15.jpg"),
              url: "03"
            },
            {
              img: require("./../../../assets/images/index/jx16.png"),
              url: "04"
            },
            {
              img: require("./../../../assets/images/index/jx17.png"),
              url: "05"
            },
            {
              img: require("./../../../assets/images/index/jx18.png"),
              url: "05"
            }
          ]
        },
        {
          color: "#fa0d93",
          urlData: [
            {
              img: require("./../../../assets/images/index/bk4.jpg"),
              url: "01"
            },
            {
              img: require("./../../../assets/images/index/jx20.jpg"),
              url: "02"
            },
            {
              img: require("./../../../assets/images/index/jx21.jpg"),
              url: "03"
            },
            {
              img: require("./../../../assets/images/index/jx22.png"),
              url: "04"
            },
            {
              img: require("./../../../assets/images/index/jx23.png"),
              url: "05"
            },
            {
              img: require("./../../../assets/images/index/jx24.png"),
              url: "05"
            }
          ]
        },
        {
          color: "#f9930d",
          urlData: [
            {
              img: require("./../../../assets/images/index/bk5.jpg"),
              url: "01"
            },
            {
              img: require("./../../../assets/images/index/jx26.jpg"),
              url: "02"
            },
            {
              img: require("./../../../assets/images/index/jx27.jpg"),
              url: "03"
            },
            {
              img: require("./../../../assets/images/index/jx28.png"),
              url: "04"
            },
            {
              img: require("./../../../assets/images/index/jx29.png"),
              url: "05"
            },
            {
              img: require("./../../../assets/images/index/jx30.png"),
              url: "05"
            }
          ]
        },
        {
          color: "#0e6af9",
          urlData: [
            {
              img: require("./../../../assets/images/index/bk6.jpg"),
              url: "01"
            },
            {
              img: require("./../../../assets/images/index/jx32.jpg"),
              url: "02"
            },
            {
              img: require("./../../../assets/images/index/jx33.jpg"),
              url: "03"
            },
            {
              img: require("./../../../assets/images/index/jx34.png"),
              url: "04"
            },
            {
              img: require("./../../../assets/images/index/jx35.png"),
              url: "05"
            },
            {
              img: require("./../../../assets/images/index/jx36.png"),
              url: "05"
            }
          ]
        }
      ],
      //猜你喜欢
      love_navs: [
        { name: "精选推荐", path: "8-3-1" },
        { name: "潮流服饰", path: "8-3-2" },
        { name: "家居百货", path: "8-3-3" },
        { name: "时尚鞋包", path: "8-3-4" },
        { name: "美妆个护", path: "8-3-5" },
        { name: "休闲美食", path: "8-3-6" },
        { name: "3C生活", path: "8-3-7" }
      ],
      loveData: [],
      openQ: false,
      user_id:"",
      token:"",
      uuid:"",
      openQ:false,
      show: false, //
      msgTxt:""
    };
  },
  created() {
    this.topData();
      this.$.initPv({
        pageName: "zhounian_06"
      });
      document.getElementsByTagName("html")[0].style.backgroundColor = "#ff2b00";
      document.getElementsByTagName("body")[0].style.backgroundColor = "#ff2b00";
       
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
      this.$.checkLogin();
    }

    window.addEventListener("scroll", this.handleScroll);
    let this_ = this;
    let _onload = window.onload;
    if (document.readyState == "complete") {
      if (this_.moduleStatus) {
        this_.moduleStatus = false;
        this_.moduleStart = 1;
        Vue.set(this_.indexModule, 1, true);
      }
    }
    window.onload = function() {
      _onload ? _onload() : "";
      let len = this_.indexModule.length;
      console.log("zhixing ");
      if (this_.moduleStatus) {
        this_.moduleStatus = false;
        this_.moduleStart = 1;
        Vue.set(this_.indexModule, 1, true);
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
        if (this.moduleStart == 5) {
          //开始调用 猜你喜欢的 商品
          this.getLoveGoods(1, "8-3-1");
        }
        console.log(this.moduleStart);
      } else {
        // alert("当前已加载"+this.moduleStart)
        // alert("状态"+this.moduleStatus)
      }
    }
  },

  methods: {
    //签到领现金
    toYao: function() {
      //出现跑马灯组件苗壮
      if (this.user_id) {
        this.$.eventData({
          elementId: "btn17",
          pageName: "zhounian_06"
        });
        this.show = true;
      } else {
        if (xcx_user) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
      }
    },
    //关闭弹窗
    getMessage() {
      this.show = false;
    },
    topData: function() {
      //获取顶部资源接口
      let params = {
        coordinate: "19-8,22-2,20-8,21-8",
        activity_id: 1
      };
      this.$http.get(URL.topData, { params }).then(res => {
        let zy = res.data;
        let zyData = zy.data;
        //左上角气泡
        if (zy.result == 1) {
          if (zyData.link_info && zyData.link_info["19-8"]) {
            let rollData = [];
             if(zyData.link_info["19-8"].length<=1){
                     rollData=[]
              }else{
                      for (
                      let index = 0;
                      index < zyData.link_info["19-8"].length;
                      index++
                    ) {
                      var obj = {
                        txt: zyData.link_info["19-8"][index].activity_name,
                        url: zyData.link_info["19-8"][index].jump_link,
                        type: "qipao"
                      };
                      rollData.push(obj);
                    }
                    this.roll = {
                      stopNum: 2,
                      waitTime: 3000,
                      singleHeight: 1.13,
                      rollData: rollData
                    };
              }
           
          }
          //中间跑马灯
          if (zyData.link_info && zyData.link_info["22-2"]) {
            let rollData = [];
            for (
              let index = 0;
              index < zyData.link_info["22-2"].length;
              index++
            ) {
              var obj = {
                txt: zyData.link_info["22-2"][index].activity_name,
                url: zyData.link_info["22-2"][index].jump_link,
                type: "pmd"
              };
              rollData.push(obj);
            }
            this.roll1 = {
              stopNum: 1,
              waitTime: 3000,
              singleHeight: 0.77,
              rollData: rollData
            };
          }
          //中部按钮
          if (zyData.link_info && zyData.link_info["20-8"]) {
            this.page_button = zyData.link_info["20-8"];
          }
          //气泡
          if (zyData.link_info && zyData.link_info["21-8"]) {
            this.floatData = zyData.link_info["21-8"];
          }
        } else {
          console.log("资源有问题");
        }
      });
    },

    //跳转商品
    jumpGood: function(id, name,num) {
      if(num){
         this.$.jump2good({
            goodsId: id,
            goodsName: name,
            elementId: "good_detail_05",
            pageName: "zhounian_06",
            tabName: this.love_nav_tabName
          });
      }else{
         this.msgTxt ="该商品已售罄" 
      }
     
    },
    jumpNav_love: function(index) {
      this.love_nav_tabName = this.love_navs[index].name;
      this.changeNav_love = index;
      this.isEnd = false;
      this.getLoveGoods(1, this.love_navs[index].path);
    },

    jumpNav: function(index) {
      console.log(index);
      let chagce_module = document.querySelectorAll('.module'+index);
      if(chagce_module.length==0){
        this.msgTxt ="加载模块失败，请刷新一下" 
      }
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
      if (index == 0) {
        overflowX.scrollLeft = 0;
      } else if (index <= 9) {
        let len = index * 2.4 * fz;
        overflowX.scrollLeft = len;
      } else {
        let len = 9 * 2.4 * fz;
        overflowX.scrollLeft = len;
      }
    },
    //     jumpToTab(index) {
    //
    // 		},

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
      if (scrollTop <= dg_top) {
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

      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      if (scrollHeight - clientHeight <= scrollTop + 200 && this.isEnd) {
        // 下拉加载
        this.isEnd = false;
        //  this.loadingCom()
        console.log("wodaodile");
        this.getLoveGoods(this.nextPage);
      }
    },
    getLoveGoods: function(page, path) {
      //  判断是否未1 如果是1 请求php接口 获得商品id在获取商品详情 否则 就是请求第二页的商品详情
      if (page == 1) {
        let params = {
          coordinate: path,
          activity_id: 1
        };
        this.$http.get(URL.goods_list_noloading, { params }).then(res => {
          let result = res.data;
          console.log(result);
          if (result.result == 1) {
            this.isEnd = true;
            if(result.data.goods_ids){
              this.love_id = result.data.goods_ids;
              this.loveInfo(page);
            }else{
              this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '返场场猜你喜欢php----->'+result.message, res.status);
            }
          } else {
            this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '返场场猜你喜欢php----->'+result.message, res.status);
            console.log("php接口问题");
          }
        });
      } else {
        this.loveInfo(page);
      }
    },
    loveInfo: function(page) {
      let params = {
        page: page,
        pageSize: 20,
        goodsIds: this.love_id,
        orderType: 0,
        stockNullShow: 1,
      };
      this.$http.post(URL.goods_info_noloading,  params ).then(javaRes => {
        let javaData = javaRes.data;

        if (javaData.status == 1) {
          if (page == 1) {
            this.loveData = [];
          }
          this.loveData = this.loveData.concat(javaData.data);
          if (javaData.totalPage > javaData.nowPage) {
            this.isEnd = true;
            this.nextPage = javaData.nowPage + 1;
          } else {
            this.isEnd = false;
          }
        } else {
          this.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, '返场猜你喜欢java----->'+javaData.message, javaRes.status);

          console.log("java接口问题");
        }
      });
    },

    numFn(rem) {
      var fz = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize
      );
      return rem * fz;
    }
  },

  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  components: {
    roll,
    spike,
    openQQ,
    timeHeader,
    bNav,
    pageButton,
    float,
    // module1: resolve => {
    //   require(["./../.../../../../components/index/module1"], resolve);
    // },
    module1: module1,
    module2: resolve => {
      require(["./../.../../../../components/index/module2"], resolve);
    },
    module3: resolve => {
      require(["./../.../../../../components/index/module3"], resolve);
    },
    module4: resolve => {
      require(["./../.../../../../components/index/module4"], resolve);
    },
    module5: resolve => {
      require(["./../.../../../../components/index/module5"], resolve);
    },
    module6: resolve => {
      require(["./../.../../../../components/index/module6"], resolve);
    },
    tiger: resolve => {
      require(["./../.../../../../components/tiger"], resolve);
    }
  }
};
</script>


