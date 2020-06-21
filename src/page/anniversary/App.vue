<template>
  <div id="app" :class="{iPhoneX:iPhoneX}">
  	<router-view class="router-view"/>
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  &.iPhoneX {
    min-height: calc(100% - 20px) !important;
  }
}
.router-view {
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.iPhoneX {
  .router-view {
    // bottom: 20px;
    min-height: calc(100% - 20px) !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      iPhoneX: false
    };
  },
  mounted() {
    this.deviceType();
  },
  methods: {
    deviceType() {
      var u = navigator.userAgent;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      
      if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
          //是iphoneX
          this.iPhoneX = true;
        } else {
          //不是iphoneX
          this.iPhoneX = false;
        }
      }
    }
  },
  created() {
    document.getElementById("taoLoading").style.display = "none";
  }
};
</script>
