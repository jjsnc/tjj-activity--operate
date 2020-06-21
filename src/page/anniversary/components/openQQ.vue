<template>
<div  v-if="open" class="qqs" >
  <div class="qq" >
        <img src="./../assets/images/index/qq1.png">
        <span @click="closeQq" class="closeQq" ></span>
        <span @click="jumpQq" class="jumpQq" ></span>
        <span @click="closeQq" class="closeQq2" ></span>
    </div> 
 </div>   
</template>

<script>
import URL from "./../assets/js/api"
export default {
  name: '',
  data() { 
    return {
        open:false,
    }
    
  },
  created(){
    this.isShowQQ();
  },
  methods:{
      //判断是否出现气球🎈🎈
    isShowQQ:function(){
       console.log('判断是否出现气球🎈🎈');
      const time = new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime();
      let  time1 = [
                [3600000*53/6,3600000*55/6],
                [3600000*71/6,3600000*73/6],
                [3600000*89/6,3600000*91/6],
                [3600000*107/6,3600000*109/6],
                [3600000*125/6,3600000*127/6],
              ] ;
      let nowTime = new Date().getTime()-time;
      var res = time1.some(function(item,index,time1){
        return  item[0]<=nowTime&&nowTime<=item[1]
      }) 
      let  params ={
              user_id:this.$parent.user_id,
              token:this.$parent.token,
              uuid:this.$parent.uuid,
            }
      if(res){
          this.$http.get(URL.round_check,{params}).then(res => {
            console.log(res);
            if(res.data.result==1){
                this.open=true;
                window.isOpen=true;
                this.$parent.qqShow=true;
                 this.$http.get(URL.Prickballoon_window,{params}).then(res => {
                   console.log(res);
                 })
            }else{
                this.open=false;
                this.$parent.qqShow=false;
                this.$http.get(URL.window,{params}).then(res => {
                  let data = res.data;
                  if (data.result == 1) {
                    this.$parent.show = true;
                  } else {
                    if(!this.$parent.show){
                      this.$parent.show = false;
                    }
                  
                  }
                });
            }
          })
         
      }else{
          this.$parent.qqShow=false;
          this.$http.get(URL.window,{params}).then(res => {
                  let data = res.data;
                  if (data.result == 1) {
                    this.$parent.show = true;
                    
                  } else {
                    if(!this.$parent.show){
                      this.$parent.show = false;
                    }
                  
                  }
                });
      }

    },
     closeQq:function(){
         //关闭扎气球弹窗
        this.open=false;
        this.$parent.qqShow=false;
     },
     jumpQq:function(){
         //关闭扎气球弹窗
          this.$.eventData({
              elementId:"start",
              pageName:"zhounian_04"
           });
          this.closeQq();
          this.$router.push('/balloon'+this.getPath());
          
     } 
     
  },
 }
</script>

<style lang="" scoped>
.qqs{
  background: rgba(0,0,0,0.8);
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9999999;
}
  .qq{
  width: 100%;
  height: 22.13rem;
  position: fixed;
  z-index: 9999;
}
.qq img{
  position: absolute;
  z-index: 998;
  width: 100%;
  height: 22.13rem;
}
.closeQq{
  position: absolute;
  right: 0.7rem;
  top: 3.5rem;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 999;
  display: inline-block;
}
.jumpQq{
  position: absolute;
  display: inline-block;
  top: 15.2rem;
  width: 60%;
  height: 1.5rem;;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 999;
}
.closeQq2{
  position: absolute;
  display: inline-block;
  top: 17rem;
  width: 60%;
  height: 1.5rem;;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>