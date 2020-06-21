<template>
  <div class="">
            <div class="ms module0 module">
      <div class="ms_title">
          <img src="./../assets/images/index/ms_02.jpg" @click="toPage">
      </div>
      <div class="ms_time">
       <span v-for="(item,index) in time" :key="index" :class="{ active:spike == index}"  @click="getData(item.id,index)">{{item.activityDate}}</span> 
      </div>
      <div class="ms_hidden" >
      <div class="ms_lists">
        <div class="ms_list"   >
          <div class="goods_list" v-for="(item,index) in list" :class="now_buy?'':'can_no_buy'" :key="index"  @click="toMS(item,item.predefined)" >
            <!-- <span v-if="item.activityTitle" class="googs_num"><em></em>前{{item.storeLimit}}件半价</span> -->
            <img  v-lazy="item.goodsCover" />
            <p class="goods_name">{{item.goodsName}}</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>{{item.minPrice}}
              </span>
              <del>¥{{item.shopPrice}}</del>
              <span class="go_buy" :class="item.predefined!=1?'':'nobuy'" :data-data="item.stockNum"></span>
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import URL from "./../assets/js/api"
import { getPath } from '../../../assets/js/common/utils';
export default {
  name: '',
  data() { 
    return {
        time:["08:00","12:00"],
        list:[],
        activityId:0,   //当前活动时间档
        spike:0
    }
  },
  created(){
      let params = {
        
      };
      this.$http.get(URL.spikeTime,{params}).then(res => {
            let result = res.data;
            if(result.status==1){
              console.log(result.data);
              let a = "";
              for (let index = 0; index < result.data.length; index++) {
                const element =result.data[index].section;
                if(result.data[index].section<0){
                  a=index;
                }
              }
              
             let  times = result.data.slice(a);
             if(times.length >4 ){
               this.time = times.slice(0,4)
             }else{
               this.time = times
             }
            }else{
              console.log("获取时间错误");
            }
            
      })
      this.getData("",0);
      

  },
  methods:{
    //进入限时抢购
    
    
    toPage:function(){
        let msUrl = window.location.host=="activity.taojiji.com"?"https://fissile.taojiji.com":"https://fissile.tjjshop.cn"
        //    window.location.href = 'https://fissile.tjjshop.cn/flashSale/view/v1_0_0/home/referPage/808/os/'+this.getQueryString("os")+'/user_id/'+this.getQueryString("user_id")+'/uuid/'+this.getQueryString("uuid")+'/token/'+this.getQueryString("token")
           window.location.href = msUrl+'/flashSale/view/v1_0_0/home/referPage/808'+this.getPath();
   } , 
    getData:function(id,index){
      if( this.activityId==id){
        console.log("zai");
        this.now_buy=true;
      }else{
        this.now_buy=false;
       console.log("buzai");
      }
      this.list=[{goodsName:"taojiji",activityPrice:0.01},{goodsName:"taojiji",activityPrice:0.01},{goodsName:"taojiji",activityPrice:0.01}];
        console.log(id);
        this.spike=index;
        if(id){
          let overflowX = document.getElementsByClassName("ms_lists")[0];
          overflowX.scrollLeft = 0;
        }
        
        let params= {
             activityId:id||""
        }
        this.$http.get(URL.spikeData,{params}).then(res => {
            let result = res.data;
            if(result.status==1){
               if(result.data.length>0){
                this.list = result.data;
                if(!id){
                  this.activityId=result.data[0].activityId
                }
                console.log(result.data);
              }else{
               this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '秒杀----->'+result.message, res.status);
              }
            }else{
               this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '秒杀----->'+result.message, res.status);
             
              
            }
            
      })
    },
    toMS:function(item,predefined){
      let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
      
      if(predefined!=1){
        this.$.eventGoods({
            'pageName':"zhounian_06",
            'elementId':'good_detail_01',
            'goodsId':item.goodsId,
            'goodsName':item.goodsName
          })
          if((window.location.href.indexOf('uuid=wechat') > -1)||(window.location.href.indexOf('uuid/wechat') > -1)||xcx_user){
              this.$.toMs({
                 'goodsId':item.goodsId,
                 'goodsName':item.goodsName,
                 'nowActivityId':this.activityId,
                 "activityId":item.activityId
            })
          }else{
             let msUrl = window.location.host=="activity.taojiji.com"?"https://fissile.taojiji.com":"https://fissile.tjjshop.cn"
             window.location.href =  msUrl+'/flashSale/view/v1_0_0/goodsDetail/referPage/808/'+'goods_id/'+ item.goodsId+'/activityId/'+item.activityId+'/nowActivityId/'+this.activityId+"/goodsName/"+item.goodsName+this.getPath();
          }
      }else{
        this.$parent.msgTxt ="该商品已售罄" 
      }
      
    }
  },
  mounted(){

  }
 }
</script>

<style>


@import "../assets/css/hc";
</style>
