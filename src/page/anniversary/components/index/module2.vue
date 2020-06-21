<template>
<!-- 限量 -->
  <div :class="moduleIndex">
       <div class="limited  module">
      <img  :src="zjData.index==2?url:require('./../../assets/images/index/floor_09.jpg')" class="limited_title" @click="toPage" >
      <div class="goods_lists nine_num">
        <div class="goods_list" v-for="(item,index) in limit" :key="index" @click="jump2good(item.goodsId,item.goodsName,item.totalStock)" >
             <span v-if="zjData.index==2&&item.title" class="googs_num"><em></em>前{{item.storeLimit}}件半价</span>
             <span v-if="zjData.index==3" class="mjs"></span>
            <img  v-lazy="item.img640Url"  />
            <p class="goods_name">{{item.goodsName}}</p>
            <p class="goods_buy" >
              <span class="price">
                <font>¥</font>{{item.minGroupPrice}}
              </span>
              <del>¥{{item.shopPrice}}</del>
              <span class="go_buy"  :class="!item.totalStock?'nobuy':''"></span>
            </p> 
        </div>
      </div>
    </div>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>

<script>
 import URL from "./../../assets/js/api"
export default {
  name: '',
  props:{
      zjData: {
        type: Object,
        default: false
      }
    },
  data() { 
    return {
        limit:[],
        moduleIndex:'module2',
        msgTxt:"",
        url:require('./../../assets/images/index/floor_07.jpg')
    }
  },
  created(){
      if(this.zjData.position=="8-1"){
         this.url=require('./../../assets/images/index/floor_08.jpg')
      }  
      this.moduleIndex = 'module'+this.zjData.index
      let params = {
        coordinate: this.zjData.position,
        activity_id: 1
      };
      this.$http.get(URL.goods_list_noloading,{params}).then(res => {
            let result = res.data
            console.log(result);
            if(result.result==1){
              if(result.data.goods_ids){
                    let php_goods=result.data.goods_ids
                  let params ={
                    page:1,
                    pageSize:18,
                    goodsIds:php_goods,
                    orderType:0,
                    stockNullShow: 1,

                  }
                  this.$http.post(URL.goods_info_noloading,params).then(javaRes => {
                        let javaData = javaRes.data;
                        console.log(javaData);
                        if(javaData.status==1){
                          let len =javaData.data.length;
                          let num = len%3 ;
                          this.limit= javaData.data.splice(0,javaData.data.length-num);
                        }else{
                           this.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, '返场猜你喜欢java----->'+javaData.message, javaRes.status);
                           
                        }
                        
                    }) 
              }else{
               this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '返场场猜你喜欢php----->'+result.message, res.status);
                
              }
                 
            }else{
              this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '返场场猜你喜欢php----->'+result.message, res.status);
              
              
            }
            
            
      })
  },
  mounted(){
      this.$parent.moduleStatus=true;
  },
  methods:{
      toPage:function(){
        this.$.eventData({
              elementId:"btn07",
              pageName:"zhounian_06"
			     });
           if(this.zjData.index==2){
              this.$router.push('/half'+this.getPath());
           } else{
              window.location.href = "https://modeup.taojiji.com/taojiji/pages/2019/07/207f112689c1e59894-html5.html" 
           }
          
      },
       jump2good:function(id,name,num){
          if(num){
            this.$.jump2good({
			        goodsId: id,
              goodsName: name,
              elementId:this.zjData.index==2?"good_detail_03":"good_detail_04",
              pageName:"zhounian_06"
			      });
          }else{
             this.msgTxt ="该商品已售罄"
          }
       
    }
  }
 }
</script>

<style>


@import "../../assets/css/hc.css";
</style>
