<template>
  <div id="banner">
    <img :src="config.imgUrl" alt />
    <a
      href="javascript:;"
      class="share"
      @click="shareClick"
      :style="config.share.shareCssStyle"
    >
      <img :src="options.share.shareImg" alt class="share-img" />
    </a>
    <a
      href="javascript:;"
      class="other"
      v-for="(el, index) in options.otherTab"
      :key="index"
      @click="otherTab(el.sendMsg)"
      :style="el.otherTabCssStyle"
    >
      <img :src="el.otherTabImg" alt class="other-img" />
    </a>
  </div>
</template>
<script>
let vm = null;
export default {
  data() {
    return {
      config: {
        // banner图片地址
        imgUrl: require("../assets/images/common/loading_pic.png"),
        share: {
          // 分享页面css样式
          shareCssStyle: {}
        }
      }
    };
  },
  created() {
    vm = this;
    console.log("headerBanner");
    // 组件默认值或取值
    if (!vm.options.share) {
      vm.config.share.shareCssStyle = {};
    } else {
      if (!vm.options.share.shareCssStyle) {
        vm.config.share.shareCssStyle = {
          width: "1.83rem",
          height: ".54rem",
          right: ".54rem",
          top: ".26rem"
        };
      } else {
        vm.config.share.shareCssStyle.width =
          vm.options.share.shareCssStyle.width || "1.83rem";
        vm.config.share.shareCssStyle.height =
          vm.options.share.shareCssStyle.height || ".54rem";
        vm.config.share.shareCssStyle.right =
          vm.options.share.shareCssStyle.right || "0.4rem";
        vm.config.share.shareCssStyle.top =
          vm.options.share.shareCssStyle.top || "0.26rem";
      }
    }
    vm.config.imgUrl =
      vm.options.imgUrl || require("../assets/images/common/loading_pic.png");
  },
  props: {
    options: {
      type: Object,
      default: {
        imgUrl: require("../assets/images/common/loading_pic.png"),
        shareBtn: false,
        share: {
          shareImg: null, // 分享按钮背景图
          shareXCX: false, // 判断是否触发shareMini
          shareXCXTitle: false, // title
          shareXCXImg: false, // img
          // 分享按钮样式，可不写（但shareCssStyle为空对象），有默认值
          shareCssStyle: {
            width: "1.83rem",
            height: ".54rem",
            right: "0.4rem",
            top: "0.26rem"
          },
          // shareClick没啥特殊要求可不写，写的东西可以覆盖默认值
          shareClick: {
            shareUrl: "https://a.taojiji.com/a/a",
            title: document.title
          }
        }
        // 其他自定义按钮，sendMsg为点击事件区别btn
        // otherTab: [
        //   {
        //     otherTabImg: require("../assets/images/share.png"),
        //     otherTabCssStyle: {
        //       width: "1.83rem",
        //       height: ".54rem",
        //       right: "0.4rem",
        //       top: "0.96rem"
        //     },
        //     sendMsg: "tab1"
        //   }
        // ]
      }
    }
  },
  methods: {
    // 分享
    shareClick() {
      if (vm.options.share.shareXCX) {
        // app在分享小程序页面
        // 埋点针对808活动
        this.$.eventData({
          elementId: "share",
          pageName: "zhounian_06"
        });
        this.$.share({
          imgUrl: require("./../page/anniversary/assets/images/" + vm.options.share.shareXCXImg),
          title: vm.options.share.shareXCXTitle,
          shareUrl: window.location.origin+'/project/anniversary/view/'+this.$route.name,
          miniPath: window.location.origin+'/project/anniversary/view/'+this.$route.name,
        });
      } else {
        // app分享H5页面
        this.$.share(
          Object.assign(
            {
              shareUrl: "https://a.taojiji.com/a/a",
              title: document.title
            },
            vm.options.share.shareClick
          )
        );
      }
    },
    // 自定义菜单
    otherTab(sendMsg) {
      this.$emit("sendMsg", sendMsg);
    },
    // <headerBanner :options="options" @sendMsg="getMsg"></headerBanner>
    // 示例：组件通信(这个方法在父组件中)
    getMsg(data) {
      console.log(data);
    }
  }
};
</script>
<style scoped>
#banner {
  width: 100%;
  overflow: hidden;
  position: relative;
}
img {
  width: 100%;
  display: block;
  border: none;
  outline: none;
}
.share,
.other {
  position: absolute;
}
.share-img,
.other-img {
  width: 100%;
  height: 100%;
}
</style>
