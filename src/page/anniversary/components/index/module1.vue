<template>
  <div class="">
      <div class="ts module1 module">
      <div class="ts_title">
        <img src="./../../assets/images/index/floor_03.jpg">
      </div>
      <div class="bag"   @click="toPage()">你有<span>{{price}}元</span>周年庆红包待领取</div>
      <div class="ts_list goods_lists">
        <div v-for="(item,index) in redData" :key="index" class="goods_list" @click="jump2good(item.goodsId,item.goodsName,item.totalStock)" >
           <img  v-lazy="item.img640Url"  />
            <p class="goods_name">{{item.goodsName}}</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>{{item.minGroupPrice}}
              </span>
              <del>¥{{item.shopPrice}}</del>
              <span class="go_buy"  :class="!item.totalStock?'nobuy':''"></span>
            </p>
            <span v-if="item.coupon_amount" class="red_bag"><font>￥</font>{{item.coupon_amount}}</span>
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
      redPosition: {
        type: String,
        default: false
      }
    },
  data() { 
    return {
       redData:[],
       price:0,
       msgTxt:""
    }
   
  },
  created(){
      let params = {
        coordinate: this.redPosition,
        activity_id: "1"
      };
      this.$http.get(URL.goods_list_noloading,{params}).then(res => {
            let result = res.data
            console.log(result);
            if(result.result==1){
              if(result.data.goods_ids){
                   console.log("靓仔的 接口");
                  var goods_info = result.data.goods_info;
                  console.log(goods_info);
                  let params ={
                    page:1,
                    pageSize:3,
                    orderType:0,
                    stockNullShow:1,
                    goodsIds:result.data.goods_ids,
                  }
                  this.$http.post(URL.goods_info_noloading,params).then(javaRes => {
                        let javaData = javaRes.data;
                        console.log(javaData);
                        if(javaData.status==1){
                          let len =javaData.data.length;
                          let num = len%3 ;
                          let that = this ;
                          if(len>3){
                             var data = javaData.data.slice(0,3);
                          }else{
                             var data = javaData.data;
                          }
                         
                          for (var index = 0; index < data.length; index++) {
                           Object.keys(goods_info).forEach(function(key){
                               if(key==data[index].goodsId){
                                    data[index].coupon_amount=goods_info[key].coupon_amount ;
                                     that.price += data[index].coupon_amount?data[index].coupon_amount:0 ;
                                  }
                             })
                           this.redData = data;
                          
                          }
                         
                        }else{
                          this.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, '返场猜你喜欢java----->'+javaData.message, javaRes.status);
                           console.log("java接口问题");
                        }
                        
                    }) 
              }else{
                 this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '主返红包----->'+result.message, res.status);

              }
                  
            }else{
         
            this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '主返红包----->'+result.message, res.status);
              console.log("php接口问题");
              
            }
            
            
      })
  },
  methods:{
    jump2good:function(id,name,num){
       if(num){
         this.$.jump2good({
			        goodsId: id,
              goodsName: name,
              elementId:"good_detail_02",
              pageName:"zhounian_06"
			     });
       }else{
        this.msgTxt ="该商品已售罄"
       }
       
    },
    toPage:function(){
      console.log(2222);
       this.$.eventData({
              elementId:"btn07",
              pageName:"zhounian_06"
			     });
      this.$router.push('/coupon'+this.getPath());
    }
  },
  mounted(){
      console.log("模块1");
      this.$parent.moduleStatus=true
      
  }
 }
</script>

<style>


@import "../../assets/css/hc.css";
</style>
