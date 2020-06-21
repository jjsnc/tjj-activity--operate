
/* 
** 调用tost组件时需注意： 父组件传入的参数名必须为msgTxt 
*/
<style lang="scss" scoped>
.msgBox {
 
  
  margin:0 auto;
  z-index: 999;
  width: auto;
 
  opacity: 0;
  line-height: .2rem;
  padding: 0.04rem 0.14rem;
  background-color: rgba(51,51,51,1);
  color: #fff;
  text-align: center;
  font-size: 0.14rem;
  border-radius: 0.3rem;
}
.msgBox.msgBox_show {
  visibility: visible;
  opacity: 1;
  animation: msgAnimation 2s;
}
.msg{
    justify-content: center;
    display: flex;
    width: 100%;
     -webkit-transition: all 0.2s;
  transition: all 0.2s;
  visibility: hidden;
    position: fixed;
    top: 50%;
}
@keyframes msgAnimation {
  0%{opacity: 0;}
  5%{opacity: 1;}
  95%{opacity: 1;}
  100%{opacity: 0;}
}
</style>
<template  >
  <div class="msg">
       <div :class="['msgBox', msgShow ? 'msgBox_show' : '']">{{msgTxt}}</div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      msgShow: false,
      hideTimer: "",
      initTimer: ""
    };
  },
  props: {
    msgTxt: String // 父组件传入的参数名必须为msgTxt
  },
  computed: {},
  watch: {
    msgTxt() {
      this.msgShowFn();
    },
  },
  created() {
    this.msgShowFn();
  },
  mounted(){
    let self = this;
    let msgEle = document.getElementsByClassName('msg')[0];
    msgEle.addEventListener('webkitAnimationEnd', () => {
      this.msgShow = false;
      this.$parent && this.$parent.msgTxt ? (this.$parent.msgTxt = "") : "";
    })
  },
  methods: {
    msgShowFn() {
      if (this.msgTxt) {
        this.msgShow = false;
        setTimeout(() => {
          this.msgShow = true;
        },50)
      }
    }
  }
};
</script>