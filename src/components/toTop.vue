<template>
  <div class>
    <img v-show="isShow" class="toTop" src="../assets/images/common/top.png" @click="toTop" alt>
  </div>
</template>
<script>
import { scroller } from "vue-scrollto/src/scrollTo";
let scrollToTop = scroller();
export default {
  name: "",
  data() {
    return {
      isShow: false,
      flag: 1
    };
  },
  methods: {
    toTop: function() {
      scrollToTop(document.body);
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let availHeight = window.screen.availHeight;
      if (scrollTop > availHeight) {
        if (this.flag === 1) {
          this.isShow = true;
          this.flag = 0;
        }
      } else {
        this.isShow = false;
        this.flag = 1;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed () {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
.toTop {
  width: 10%;
  position: fixed;
  bottom: 4%;
  right: 5%;
  z-index: 6666;
  display: block;
}
</style>