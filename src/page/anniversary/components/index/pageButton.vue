<template>
  <div class="">
    <div class="page_button" :class="pageData.length==3?'page_button_three':'' ">
      <img v-for="(img,index) in pageData" :key="index" v-lazy="img.pic_url" alt srcset @click="toPage(index,img.jump_link)" />
    </div>
  </div>
</template>

<script>
// import URL from "./../../assets/js/api"
export default {
  name: '',
   props: {
    pageData: {
      type: Array,
      default: false
    }
  },
  data() { 
    return {
    }
  },
  created(){
     
      
     
  },
  watch: {
    pageData(newVal, oldVal) {
         console.log("pagegggggggggggggggggggggggggg");
         console.log(newVal);
    }
    },
  methods:{
    toPage:function(index,path){
      index = index+1;
      this.$.eventData({
        'pageName':"zhounian_06",
        'elementId':'btn0'+index
      });
      if(path){
        if(path.indexOf('view/sign')>-1){
           this.$router.push('/sign'+this.getPath());
        }else if(path.indexOf('peach')>-1){
          let xyUrl = window.location.host=="activity.taojiji.com"?"https://minigame.taojiji.com/peach":"https://minigame.tjjshop.cn/peach"
          window.location.href = xyUrl+this.getPath();
        }else if(path.indexOf('circle')>-1){
          let circle = window.location.host=="activity.taojiji.com"?"https://minigame.taojiji.com/circle":"https://minigame.tjjshop.cn/circle"
          window.location.href = circle+this.getPath();
        }else{
        window.location.href = path+"?os="+this.getQueryString("os")+'&user_id='+this.getQueryString("user_id")+'&uuid='+this.getQueryString("uuid")+'&token='+this.getQueryString("token")
        }
      }
     
      //alert(path+"?os="+this.getQueryString("os")+'&user_id='+this.getQueryString("user_id")+'&uuid='+this.getQueryString("uuid")+'&token='+this.getQueryString("token"))
     
    }

  }
 }
</script>

<style>

/* 
@import "../../assets/css/hc.css"; */
</style>
