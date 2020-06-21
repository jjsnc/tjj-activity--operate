<template>
  <div class="">
      <div class="imgs" >
        <img @click="imgToPage(key,item.jump_link)" v-for="(item,key) in imgs" :src="item.pic_url" :key="key">
      </div>
      <div class="hot_list module4 module">
      <img src="./../../assets/images/index/floor_11.jpg" @click="toPage('/hot')"  class="limited_title">
      <div class="swiper_list">
        <div class="successNav">
          <swiper :class="this.swipersuccess.loop?'':'swiper-no-swiping'" v-if="swiperData.length>1" :options="swipersuccess">
            <swiper-slide v-for="(item,key) in swiperData" :key="key"  >
              <img :src="item.pic_url" alt  />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import URL from "./../../assets/js/api"
import { mdCardMedia, swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: '',
  props:{
    imgPosition:{
      type:Array,
      default: false
    }
  },
  data() { 
    return {
        imgs:[
          {"src":require("./../../assets/images/index/page1.jpg"),url:"9.9"},
          {"src":require("./../../assets/images/index/page2.jpg"),url:"1"},
          {"src":require("./../../assets/images/index/page3.jpg"),url:"0.5"},
          ],
        swiperData:[],  
        swipersuccess: {
	       
	      },
    }
  },
  
  created(){
  		var that = this;
  		this.swipersuccess={
  			 effect: "coverflow",
	        pagination: { el: ".swiper-pagination" },
	        grabCursor: true,
	        watchSlidesProgress: true,
	        centeredSlides: true,
	        loop: true,
	        preventLinksPropagation: false,
	        slidesPerView: 2,
	        centeredSlides: true,
	        initialSlide: 1,
	        preloadImages: false,
	        on:{
	        	click:function(){
	            let realIndex = this.realIndex;
	            that.toList(realIndex); 
	        	}
	        },
	        // autoplay: {
	        //   delay: 3000,//自动播放速度
	        //   disableOnInteraction: false//鼠标移上去时是否还继续播放
	        // },
	        coverflowEffect: {
	          rotate: 0,
	          rotate: 0,
	          stretch: 100,
	          depth: 180,
	          modifier: 0.5, //
	          slideShadows: false // 滑块遮罩层
	        }
  		}
  		
      let params = {
        coordinate: this.imgPosition.join(','),
        activity_id: 1
      };
      this.$http.get(URL.topData,{params}).then(res => {
           if(res.data.result==1){
              let swipeImg = res.data.data.link_info;
              if(swipeImg[this.imgPosition[0]]){
               
                 this.swiperData = swipeImg[this.imgPosition[0]]
                  if(swipeImg[this.imgPosition[0]].length==3){
                    this.swipersuccess.loop=false;
                }
              }
              if(swipeImg[this.imgPosition[1]]){
                 console.log("lunbotuuu1111uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");
                 this.imgs= swipeImg[this.imgPosition[1]]
              }
             
           }else{
             console.log("列表失败");
             
           }
            
      })
  },
  watch:{
    swiperData(){

    }
  },
  methods:{
    imgToPage:function(index,jump_link ){
      console.log(index);
     var index1=index+4
      this.$.eventData({
            'pageName':"zhounian_06",
            'elementId':'btn0'+index1,
          })
      if(jump_link.indexOf('one/one') >-1){
        this.$.openWeb(jump_link+this.getPath())
      }else{
        window.location.href = jump_link ;
      }
         
    },
    toPage:function(){
       this.$.eventData({
              elementId:"btn07",
              pageName:"zhounian_06"
			     });
       this.$router.push('/hot'+this.getPath());
    },
    toList:function (realIndex) { 
			
      this.$.eventData({
              elementId:"btn08",
              pageName:"zhounian_06"
           });
      window.location.href = this.swiperData[realIndex].jump_link;     
     }
  },
  mounted(){
    console.log("模块4");
    
    this.$parent.moduleStatus=true
  },
  components: {
    mdCardMedia,
    swiper,
    swiperSlide,
    }
 }
</script>
<style scoped>
  .imgs{
    width: 11.68rem;
    margin: 0 auto;
    justify-content: space-between;
    display: flex;
  }
  .imgs img{
    height: 5.89rem;
    width: 3.81rem;
  }
</style>

<style>


@import "../../assets/css/hc.css";
</style>
