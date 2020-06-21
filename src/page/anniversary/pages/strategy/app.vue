<template>
  <div class="container">
    <headerBanner :options="options"></headerBanner>
    <img src="./../../assets/images/strategy/banner_1.jpg" />
    <img src="./../../assets/images/strategy/banner_2.jpg" />
    <!-- 返回主会场 -->
    <!-- <div class="img-box">
      <img src="./../../assets/images/strategy/banner_3.jpg" />
      <a href="javascript:;" class="back-index-a" @click="toPage('/index')"></a>
    </div> -->
    <div class="img-box">
      <img src="./../../assets/images/strategy/banner_4_1_500.png" />
      <div class="page-list">
        <a href="javascript:;" class="page-list-a" @click="toPage('/sign')"></a>
        <a href="javascript:;" class="page-list-a" @click="toPage('/peach')"></a>
        <a href="javascript:;" class="page-list-a" @click="toPage('/circle')"></a>
      </div>
    </div>
    <!-- 攻略页列表 -->
    <div class="img-box" v-for="(el, index) in list" :key="index">
      <img :src="el.img" />
      <span class="img-box-shadow" v-if="!el.black"></span>
      <!-- !el.black -->
      <a href="javascript:;" class="list-a" @click="toPage(el.page, !el.black)"></a>
    </div>
    <!-- 返回主会场 -->
    <!-- <div class="back-index">
      <img
        class="back-index-img"
        src="./../../assets/images/strategy/back.png"
        @click="toPage('/index')"
        alt
      />
    </div> -->
    <div class="img-none">
      <img v-for="(el, index) in list" :key="index" :src="el.img" />
    </div>
    <msgBox :msgTxt="msgTxt"></msgBox>
  </div>
</template>
<script>
let vm = null;
import { getPath } from "@/assets/js/common/utils";
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
let params = getPath();
export default {
  data() {
    return {
      // 头部组件传参
      options: {
        imgUrl: require("./../../assets/images/strategy/banner.jpg"),
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
          shareXCXTitle: "省钱大攻略 最高不止省50%",
          shareXCXImg: "share/strategy.png"
        }
      },
      list: [
        {
          img: require("./../../assets/images/strategy/1.png"),
          page: "flashSale",
          name: "好物限时秒",
          start: "1",
          end: "28",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/2.png"),
          page: "/clothes",
          name: "服饰",
          start: "9",
          end: "10",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/3.png"),
          page: "/general",
          name: "百货",
          start: "11",
          end: "12",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/4.png"),
          page: "/shoesBag",
          name: "鞋包",
          start: "13",
          end: "14",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/5.png"),
          page: "/makeup",
          name: "美妆",
          start: "15",
          end: "15",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/6.png"),
          page: "/food",
          name: "鲜农",
          start: "16",
          end: "16",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/7.png"),
          page: "/digit",
          name: "数码",
          start: "17",
          end: "17",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/8.png"),
          page: "/back",
          name: "刺激返场",
          start: "18",
          end: "20",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/9.png"),
          page: "/girl",
          name: "女神",
          start: "21",
          end: "22",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/10.png"),
          page: "/boy",
          name: "男神",
          start: "23",
          end: "24",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/11.png"),
          page: "/woman",
          name: "主妇",
          start: "25",
          end: "26",
          black: false
        },
        {
          img: require("./../../assets/images/strategy/12.png"),
          page: "/openschool",
          name: "开学总动员",
          start: "27",
          end: "28",
          black: false
        }
      ],
      msgTxt: null,
      nowTime: null
    };
  },
  created() {
    document.getElementsByTagName("html")[0].style.backgroundColor = "#e10011";
    document.getElementsByTagName("body")[0].style.backgroundColor = "#e10011";
    vm = this;
    // 服务器时间
    this.$api.getNowTime().then(res => {
      vm.nowTime = new Date(res * 1000).getDate();
      vm.blackInit();
    });
    // vm.initPv();
  },
  methods: {
    // 进入页面发起埋点pv
    initPv() {
      this.$.initPv();
    },
    // 随时间日期置灰按钮
    blackInit() {
      this.list.map((el, index) => {
        if (el.start <= this.nowTime && this.nowTime <= el.end) {
          el.black = true;
        }
      });
    },
    // 路由跳转
    toPage(page, btn) {
      if (btn) {
        console.log("没到时间跳转不了呢，大哥！！！");
        // this.msgTxt = '文案暂定';
        return false;
      }
      if (page == "flashSale") {
        // 跳转限时抢购
        window.location.href = window.location.host == 'activity.taojiji.com' ? 'https://fissile.taojiji.com/flashSale/view/v1_0_0/home/referPage/808' + params : 'https://fissile.tjjshop.cn/flashSale/view/v1_0_0/home/referPage/808' + params;
      } else {
        if (page == "/sign") {
          if (this.$.getQueryString('user_id')) {
            this.$router.push({
              path: page + params
            });
          } else {
            this.$.checkLogin();
            return false;
          }
        } else if (page == "/peach") {
          if (this.$.getQueryString('user_id')) {
            window.location.href = window.location.host == 'activity.taojiji.com' ? 'https://minigame.taojiji.com/peach' + params : 'https://minigame.tjjshop.cn/peach' + params;
          } else {
            this.$.checkLogin();
            return false;
          }
        } else if (page == "/circle") {
          if (this.$.getQueryString('user_id')) {
            window.location.href = window.location.host == 'activity.taojiji.com' ? 'https://minigame.taojiji.com/circle' + params : 'https://minigame.tjjshop.cn/circle' + params;
          } else {
            this.$.checkLogin();
            return false;
          }
        } else {
          this.$router.push({
            path: page + params
          });
        }
      }
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      if (user_id) {
      } else {
        if (this.$.xcx()) {
          this.$wx.jump2login();
        } else {
          this.$.login();
        }
      }
    };

    if (xcx_user) {
      vm.options.shareBtn = false;
      let user_id = xcx_user.user_id;
      let token = xcx_user.token;
      window.isLogin(user_id, token, "wechat");
    } else {
      this.$.checkLogin();
    }
  }
};
</script>
<style>
html,
body {
  /* background: #e10011; */
}
</style>
<style scoped>
.container,
.img-box,
.back-index {
  background: #e10011;
}
.container{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
img {
  width: 100%;
  display: block;
}
.img-box {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.img-box-shadow {
  position: absolute;
  width: 2.55rem;
  height: 2.58rem;
  right: 0.16rem;
  top: 0.55rem;
  background: url("./../../assets/images/strategy/black.png") center center
    no-repeat;
  background-size: 2.55rem 2.58rem;
}
.back-index-a {
  position: absolute;
  width: 7.1rem;
  height: 1.2rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.list-a {
  position: absolute;
  width: 11.5rem;
  height: 2.3rem;
  left: 50%;
  margin-left: -5.75rem;
  bottom: 0.3rem;
}
.page-list {
  position: absolute;
  width: 11rem;
  height: 3.5rem;
  left: 50%;
  margin-left: -5.5rem;
  top: 3.1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.page-list-a {
  width: calc(calc(100% - 0.3rem) / 3);
  height: 3.5rem;
}
.back-index {
  width: 100%;
  height: 2.7rem;
  position: relative;
}
.back-index-img {
  position: absolute;
  width: 6.66rem;
  height: 1.82rem;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.img-none {
  width: 0;
  opacity: 0;
  height: 0;
  overflow: hidden;
}
</style>

