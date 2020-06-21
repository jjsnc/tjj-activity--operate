<template>
  <div class="">
      <div class="limited module3 module">
      <img src="./../../assets/images/index/floor_09.jpg" class="limited_title">
      <div class="goods_lists nine_num">
        <div class="goods_list"  v-for="(item,index) in limit" :key="index" >
            <img  v-lazy="item.img640Url"  />
           <p class="goods_name">{{item.goodsName}}</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>{{item.minGroupPrice}}
              </span>
              <del>¥{{item.shopPrice}}</del>
              <span class="go_buy"></span>
            </p>
            <span class="mjs"></span>
        </div>
        <!-- <div class="goods_list"></div>
        <div class="goods_list"></div>
        <div class="goods_list"></div>
        <div class="goods_list"></div>
        <div class="goods_list"></div>
        <div class="goods_list"></div>
        <div class="goods_list"></div>
        <div class="goods_list"></div> -->
      </div>
    </div>
  </div>
</template>

<script>
import URL from "./../../assets/js/api"
export default {
  name: '',
  data() { 
    return {
      limit:[],
    }
  },
  created(){
    //Goods/goods_list/user_id/123/uuid/123/token/123/activity_id/123/coordinate/1-2-3
      let params = {
        coordinate: 1,
        activity_id: 1
      };
      this.$http.get(URL.goods_list,{params}).then(res => {
            let result = res.data
            console.log(result);
            if(result.result==1){
                  let php_goods=result.data.goods_ids.slice(0,5);
                  let arr =[];
                  for (const key in php_goods) {
                      arr.push(php_goods[key].goods_id)
                  }
                  console.log();
                  arr = arr.join(',')
                  let params ={
                    page:1,
                    pageSize:18,
                    goodsIds:'388,396,335,318,357,419,180,435,232,527,275,200,439,536,276,366,356,291',
                  }
                 // params = JSON.stringify(params)
                  
                  this.$http.get(URL.goods_info,{params}).then(javaRes => {
                        
                        let javaData = javaRes.data;
                        console.log(javaData);
                        if(javaData.status==1){
                          this.limit=javaData.data;
                        }else{
                           console.log("java接口问题");
                        }
                        
                    })  
            }else{
              console.log("php接口问题");
              
            }
            
            
      })
  },
   mounted(){
      console.log("我是模块3");
       this.$parent.moduleStatus=true
      console.log(this.$parent.indexModule[2]);
   
     
  },
 }
</script>

<style>


@import "../../assets/css/hc.css";
</style>
