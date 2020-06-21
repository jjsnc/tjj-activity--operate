<template>
  <div id="tiger">
    <a href="javascript:;" @click="show=true">1</a>
    <!-- 弹窗  -->
    <van-popup v-model="show">
      <tiger v-on:closeFn="getMessage" />
    </van-popup>
  </div>
</template>
<script>
import tiger from "./../../components/tiger";
export default {
  data() {
    return {
      show: true
    };
  },
  components: {
    tiger
  },
  methods: {
    getMessage() {
      this.show = false;
    }
  }
};
</script>
<style scoped>
#tiger {
  width: 100%;
  overflow: hidden;
  background: red;
  height: 100rem;
}
.van-popup {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
</style>

