<template>
  <div class="shops" id="shops">
      <div class="shops module11 module">
      <img class="shop_title" src="./../../assets/images/index/jxhd.jpg" />
      <div class="shop_lists"  >
         <div class="shop_list"  v-for="(item,index) in shops" :key="index"  @click="toShop(item.shop_id,item.activity_name)" >
            <img v-lazy="item.pic_url">
            <p class="shop_name" >{{item.activity_name}}</p>
            <p>{{item.shop_text}}</p>
         </div> 
         
      </div>
    </div>
  </div>
</template>

<script>
import URL from "./../../assets/js/api"

export default {
  name: '',
   props:{
    shopPosition:{
      type:String,
      default: false
    }
  },
  data() { 
    return {
       shops:[]
    }
  },
  methods:{
     toShop:function(id,name){
      this.$.startShopHome({
                elementId:'store',
                pageName:"zhounian_06",
                shopId:id,
      })
    },
  },
 
  created(){
      let params = {
        coordinate: this.shopPosition,
        activity_id: 1
      };
      this.$http.get(URL.topData,{params}).then(res => {
          if(res.data.result==1){
              let shop = res.data.data.link_info;
              if(shop[this.shopPosition]){
                this.shops = shop[this.shopPosition]
              }
          }else{
              this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, res.data, res.config.method, '店铺----->'+res.data.message, res.status);
          }
      })
  },
  mounted(){
    this.$parent.moduleStatus=true
  },
 
 }
</script>
<style >

 #shops .shop_lists{
  width: 100%;
  padding:0.1rem 0.15rem 0rem;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}
#shops .shop_list   p{
  color:#ff0300;
}
.shop_list{
  width: 3.81rem;
  height: 5.77rem;
  text-align: center;
  background:#ffe1a7;
  font-family: MicrosoftYaHei;
	font-size: .48rem;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
  color: #ffffff;
  font-weight: bolder;
  margin-bottom: 0.15rem;
}
.shop_list p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 98%;
  height: 0.7rem;
  line-height: 0.7rem;
}
.shop_list .shop_name{
  font-weight: normal;
  margin-top: 0.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 98%;
}
.shop_list img{
  height: 4.17rem;
  width: 3.81rem;

}
</style>

<style>


@import "../../assets/css/hc.css";
</style>
