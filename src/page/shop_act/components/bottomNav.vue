<template>
  <div id="navs-box">
    <div id="navs">
      <a
        href="javascript:;"
        class="nav"
        @click="routerHref(el.router, el.type == 1 ? 'all' : el.type == 2 ? 'href' : '')"
        v-for="(el, index) in navs"
        :key="index"
      >
        <img class="nav-img" :src="el.img" alt>
        <span class="nav-name">{{ el.name }}</span>
      </a>
    </div>
    <div id="box" :class="{'box-show': tabShow, 'box-hide': tabHide}">
      <div class="box-close">
        <a href="javascript:;" class="close" @click="close"></a>
      </div>
      <div class="box-list">
        <a
          href="javascript:;"
          class="box-list-a"
          v-for="(el, index) in tabs"
          :key="index"
          @click="routerHref(el.router)"
        >
          <img class="box-list-a" v-lazy="el.img" alt>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
let vm = null;
let session = window.sessionStorage;
export default {
  data() {
    return {
      navs: [
        {
          name: "主会场",
          type: "",
          router: "/index",
          img: require("../assets/images/icon/bottom_nav_01.png")
        },
        {
          name: "全部会场",
          type: "1",
          router: "all",
          img: require("../assets/images/icon/bottom_nav_02.png")
        },
        {
          name: "领券中心",
          type: "",
          router: "/coupon",
          img: require("../assets/images/icon/bottom_nav_03.png")
        },
        {
          name: "热销榜单",
          type: "",
          router: "/hot",
          img: require("../assets/images/icon/bottom_nav_04.png")
        },
        {
          name: "超省新",
          type: "2",
          router: "fissile.taojiji.com/super/view/v1_0_0/index",
          img: require("../assets/images/icon/bottom_nav_05.png")
        }
      ],
      tabShow: false,
      tabHide: false,
      tabs: [
        {
          img: require("../assets/images/icon/bottom_nav_popup_01.png"),
          router: "/index",
          name: "大促"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_02.png"),
          router: "/hot",
          name: "热销榜单"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_03.png"),
          router: "/nine",
          name: "9块9超值"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_04.png"),
          router: "/clothes",
          name: "潮流服饰"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_05.png"),
          router: "/shoe",
          name: "时尚鞋包"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_06.png"),
          router: "/baibao",
          name: "家居百货"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_07.png"),
          router: "/beauty",
          name: "美妆个护"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_08.png"),
          router: "/food",
          name: "休闲美食"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_09.png"),
          router: "/digital",
          name: "3C生活"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_10.png"),
          router: "/coupon",
          name: "万券齐发"
        },
        {
          img: require("../assets/images/icon/bottom_nav_popup_11.png"),
          router: "/games",
          name: "免费淘好礼"
        }
      ]
    };
  },
  created() {
    vm = this;
    let toSuper = null;
    if (!session.getItem("toSuper")) {
      let href = window.location.href;
      let hosts = window.location.host;
      toSuper = href.replace(
        hosts + "/activity/project/shop_act/view/" + vm.$route.name,
        'fissile.taojiji.com/super/view/v1_0_0/index'
      );
      session.setItem("toSuper", toSuper)
    }
  },
  methods: {
    hrefUrl(page, btn) {
      let href = window.location.href;
      let hosts = window.location.host;
      if (btn == 1) {
        page = hosts + "/activity/project/shop_act/view" + page;
      }
      if (session.getItem("toSuper")) {
        return session.getItem("toSuper")
      }
    },
    // 路由跳转
    routerHref(page, btn) {
      if (btn == "all") {
        vm.tabShow = true;
        vm.tabHide = false;
      } else if (btn == "href") {
        window.location.href = vm.hrefUrl(page);
      } else {
        this.$router.push(page);
      }
    },
    close() {
      vm.tabShow = false;
      vm.tabHide = true;
    }
  }
};
</script>
<style scoped>
#navs-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 1.64rem;
}
#navs {
  width: 100%;
  height: 1.64rem;
  background: #fff;
  z-index: 999;
  position: absolute;
  left: 0;
  top: 0;
}
.nav {
  display: block;
  width: 20%;
  float: left;
  height: 1.64rem;
  line-height: 1.64rem;
  font-size: 0.4rem;
  text-align: center;
}
.nav-img {
  display: block;
  width: 0.96rem;
  height: 0.96rem;
  margin: 0.08rem auto 0;
}
.nav-name {
  display: block;
  width: 100%;
  line-height: 0.35rem;
  font-size: 0.2rem;
  text-align: center;
  margin: 0.1rem auto 0;
  font-family: PingFang-SC-Bold;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff004e;
}
#box {
  position: absolute;
  bottom: -12rem;
  width: 100%;
  overflow: hidden;
  z-index: 998;
}
.box-close {
  width: 100%;
  height: 0.9rem;
  overflow: hidden;
  margin-bottom: 0.36rem;
}
.close {
  display: block;
  width: 0.9rem;
  height: 0.9rem;
  background: url(../assets/images/icon/close.png) center center no-repeat;
  background-size: 0.9rem;
  float: right;
  margin-right: 0.6rem;
}
.box-list {
  width: 100%;
  overflow: hidden;
  padding: 0.2rem 0.3rem 0;
  background: #fff;
}
.box-list-a {
  width: calc(calc(100% - 0.1rem) / 2);
  margin-bottom: 0.1rem;
  height: 1.8rem;
  float: left;
}
.box-list-a:first-child {
  width: 100%;
}
.box-list-a:nth-of-type(2n-1) {
  float: right;
}
.box-list-img {
  display: block;
  width: 100%;
  height: 100%;
}
.box-show {
  animation: tabShow 0.3s 1 linear forwards;
}
.box-hide {
  animation: tabHide 0.3s 1 linear forwards;
}
@keyframes tabShow {
  0% {
    bottom: -12rem;
  }
  100% {
    bottom: 1.6rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.6rem;
  }
  100% {
    bottom: -12rem;
  }
}
</style>
