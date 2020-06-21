<template>
  <div class="">
       <div id="float" v-if="floatData.length>=8" >
      <div class="float" :style="styleObject">
        <a
          href="javascript:;"
          class="float-a"
          :class="{
              'float-a-bottom-0': index >= Math.ceil(floatData.length/2)
            }"
          v-for="(el, index) in floatData"
          :key="index"
          @click="toPage(el)"
        >
          <img class="float-a-img" v-lazy="el.pic_url" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import URL from "./../../assets/js/api"
export default {
  name: '',
   props: {
    floatData: {
      type: Array,
      default: false
    }
  },
  data() { 
    return {
      styleObject:{},
        pages:{
        "view/clothes": "/clothes",
        "view/shoesBag": "/shoesBag",
        "view/general": "/general",
        "view/food": "/food",
        "view/digit": "/digit",
        "view/makeup": "/makeup",
        "view/sign": "/sign",
        "view/half": "/half",
        "view/coupon": "/coupon",
      },
      pagess: ['sign']
    }
  },
  created(){
      console.log(this.pageData);
    
  },
  mounted(){
      
  },
  watch: {
    floatData(newVal, oldVal) {
      if(this.floatData.length==8){
        this.$set(this.styleObject, "margin", "0 auto");
      }
      let floatWidth = Math.ceil(this.floatData.length / 2) * 2.86 + "rem";
      this.$set(this.styleObject, "width", floatWidth);
          console.log("fffffffffffffffffloat");
          console.log(newVal);
    }
    },
  methods:{
    toPage:function(data){
      if(data.jump_type==2){
        this.$.jump2good({
           goodsId: data.goods_id,
        })
      }else{
        if(data.jump_link){
          if (data.jump_link.indexOf('project/anniversary/view/')>-1){
              var a = data.jump_link.split('project/anniversary/view')[1];
              this.$router.push(a+this.getPath());
          }else{
              if(data.jump_link.indexOf('.html')>-1){
                window.location.href = data.jump_link;
              }else{
                window.location.href = data.jump_link+this.getPath();
              }
          }
         }
      }
      this.$.eventData({
        'pageName':"zhounian_06",
        'elementId':'bubble'
      })
    }

  }
 }
</script>

<style>

/* 
@import "../../assets/css/hc.css"; */
</style>
