<template>
  <div class="">
     <div class="love module module12 ">
      <img class="love_title" src="./../../assets/images/index/love.png" />
      <div class="tabs" id="nav" >
        <div class="tab">
          <span  v-for="(nav,index) in navs" :key="index" @click="jumpNav_love(index)">
            <span   :class="{ activity:changeNav_love == index}" >{{nav}}</span>
          </span>
        </div>
    </div>
    <div class="love_lists">
        <div class="love_list">
            <img src="http://clustersjimg.taojiji.com/g1/M02/64/E8/ChN0GVzN_BSAQgdkAAFV6xZ7m7s276_480_480.jpg" alt srcset />
            <p class="love_title">商品名称 商品名称 商品名称</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>16.8
              </span>
              <del><font>¥</font>99.9</del>
              <span class="go_buy"></span>
            </p>
        </div>
        <div class="love_list">
            <img src="http://clustersjimg.taojiji.com/g1/M02/64/E8/ChN0GVzN_BSAQgdkAAFV6xZ7m7s276_480_480.jpg" alt srcset />
            <p class="love_title">商品名称 商品名称 商品名称</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>16.8
              </span>
              <del><font>¥</font>99.9</del>
              <span class="go_buy"></span>
            </p>
        </div>
        <div class="love_list">
            <img src="http://clustersjimg.taojiji.com/g1/M02/64/E8/ChN0GVzN_BSAQgdkAAFV6xZ7m7s276_480_480.jpg" alt srcset />
            <p class="love_title">商品名称 商品名称 商品名称</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>16.8
              </span>
              <del><font>¥</font>99.9</del>
              <span class="go_buy"></span>
            </p>
        </div>
        <div class="love_list">
            <img src="http://clustersjimg.taojiji.com/g1/M02/64/E8/ChN0GVzN_BSAQgdkAAFV6xZ7m7s276_480_480.jpg" alt srcset />
            <p class="love_title">商品名称 商品名称 商品名称</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>16.8
              </span>
              <del><font>¥</font>99.9</del>
              <span class="go_buy"></span>
            </p>
        </div>
        <div class="love_list">
            <img src="http://clustersjimg.taojiji.com/g1/M02/64/E8/ChN0GVzN_BSAQgdkAAFV6xZ7m7s276_480_480.jpg" alt srcset />
            <p class="love_title">商品名称 商品名称 商品名称</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>16.8
              </span>
              <del><font>¥</font>99.9</del>
              <span class="go_buy"></span>
            </p>
            
        </div>
        <div class="love_list">
            <img src="http://clustersjimg.taojiji.com/g1/M02/64/E8/ChN0GVzN_BSAQgdkAAFV6xZ7m7s276_480_480.jpg" alt srcset />
            <p class="love_title">商品名称 商品名称 商品名称</p>
            <p class="goods_buy">
              <span class="price">
                <font>¥</font>16.8
              </span>
              <del><font>¥</font>99.9</del>
              <span class="go_buy"></span>
            </p>
        </div>
    </div>
   </div>
  </div>
</template>

<script>
// import URL from "./../../assets/js/api"
export default {
  name: '',
  data() { 
    return {
        navs:['精选推荐','潮流服饰','家居百货','时尚鞋包','美妆个护','休闲美食','3C生活'],
        changeNav_love:0,//猜你喜欢导航
    }
  },
  created(){
      // let params = {
      //   user_id: 1,
      //   tab_name: 1,
      //   page: 1,
      //   size: 1
      // };
      // this.$http.get(URL.spikeTime,{params}).then(res => {
      //       let result = res.data
      //       if(result.status==1){
      //           console.log(result.data);
      //           if(result.data){
      //               let data = result.data
      //               let len = data.length;
      //               let currentTime = data[0].currentTime;
      //               console.log(currentTime);
      //               for (let index = 0; index <len; index++) {
      //                       if(data[index].startTime<=currentTime<=data[index].endTime){
      //                           console.log(index);
                                
      //                       }
                      
      //               }    
      //           }
                
             
                
      //       }
            
      // })
  },
  mounted(){

  },
  methods:{
    jumpNav_love:function(){

    }

  }
 }
</script>

<style>


@import "../../assets/css/hc.css";
</style>
