<template>
  <div>
    <div>
      <vueSeamlessScroll :data="data" :class-option="defaultOption" class="seamless-warp">
        <ul class="item">
          <li v-for="(data, index) in data" :key="index" @click="toPage(data)" >
            <!-- data.txt是人工组装的数据 -->
            <span  class="title">{{ data.txt }}</span>
          </li>
        </ul>
      </vueSeamlessScroll>
    </div>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  data() {
    return {
      data: [],
      autoPlay: true,
      singleHeight: 0
    };
  },
  props: {
    roll: {
      type: Object,
      default: false
    }
  },
  components: {
    vueSeamlessScroll
  },
  created(){
      
      
      
  },
  computed: {
    // 公告滚动自定义
    defaultOption() {
      return {
        openTouch: false, // 关闭手势滑动
        step:1, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: this.singleHeight, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: this.roll.waitTime, // 单步运动停止的时间(默认值1000ms)
        autoPlay: this.autoPlay,
        switchDelay:5000
      };
    }
  },
  methods: {
    numFn(rem) {
      var fz = parseFloat(document.getElementsByTagName("html")[0].style.fontSize);
      console.log(fz);
      return rem * fz;
    },
    toPage:function(data){
        console.log(data);
        if(data.url){
          console.log(222);
           console.log( data.url);
          this.$.eventData({
            'pageName':"zhounian_06",
            'elementId':data.type
          })
          if (data.url.indexOf('project/anniversary/view/')>-1){
            var a = data.url.split('project/anniversary/view')[1];
            this.$router.push(a+this.getPath());
            }else{
                if(data.url.indexOf('.html')>-1){
                  window.location.href = data.url;
                }else{
                  window.location.href = data.url+this.getPath();
                }
            }
          
        }
    }
  },
  watch: {
    roll(newVal, oldVal) {
      
      console.log(oldVal);
      let roll = newVal;
      this.singleHeight = this.numFn(roll.singleHeight);
      if (roll.rollData.length - roll.stopNum >= 1) {
        this.data = roll.rollData.concat(roll.rollData).concat(roll.rollData).concat(roll.rollData);
      }else{
        if(roll.rollData%2==0){
          this.data = roll.rollData;
        }else{
          this.data = roll.rollData.concat( roll.rollData);
        }
        
      }
      if(this.data[0].type=='qipao'&&roll.rollData.length==2){
         this.autoPlay = false;
      }else{
        this.autoPlay = true;
      }
      if (roll.rollData.length == 1) {
        this.autoPlay = false;
      }
    }
  }
};
</script>
<style scoped>
</style>

