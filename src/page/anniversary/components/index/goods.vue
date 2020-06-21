<template>
  <div>
    <div class="hc_goods" v-if="hc_info.type==0">
      <img v-lazy="hc_info.img" class="hc_img module" :class="'module'+hc_info.index" @click="jump2page(hc_info.url)" />
      <div class="hc_lists">
        <div class="hc_list" v-for="(item,index) in hc_goods" :key="index"  @click="jump2good(item.goodsId,item.goodsName,item.totalStock)" >
          <span v-if="hc_info.num==3" class="goods_ph">{{index+1}}</span>
          <span v-else class="goods_jb"></span>
          <img  v-lazy="item.img640Url"  />
          <p class="goods_name">{{item.goodsName}}</p>
          <p class="goods_buy">
            <span class="price">
              <font>¥</font>{{item.minGroupPrice}}
            </span>
            <del>
              <font>¥</font>{{item.shopPrice}}
            </del>
            <span class="go_buy"  v-if="item.totalStock">立即抢</span>
            <span class="nobuy go_buy"   v-else>已售完</span>
          </p>
        </div>
      </div>
    </div>
    <div class="pzhh" v-if="hc_info.type==1" :class="'module'+hc_info.index">
      <img v-lazy="hc_info.img" class="hc_img module" />
    </div>
    <div class="tabs" v-if="hc_info.type==1" id="nav">
      <div class="tab">
        <span v-for="(nav,index) in hc_info.navs" :key="index" @click="navChange(nav.id,index)">
          <span :class="{ active:changeNav == index}">{{nav.name}}</span>
        </span>
      </div>
    </div>
    <div v-if="hc_info.type==1" class="hc_lists" >
      <div class="hc_list" v-for="(item,index) in hc_goods" :key="index"   @click="jump2good_pz(item.goodsId,item.goodsName,item.totalStock)" >
        <span  class="goods_one"></span>
        <img  v-lazy="item.img640Url"  />
        <p class="goods_name">{{item.goodsName}}</p>
        <p class="goods_buy">
          <span class="price">
            <font>¥</font>{{item.minGroupPrice}}
          </span>
          <del>
            <font>¥</font>{{item.shopPrice}}
          </del>
          <span class="go_buy"  v-if="item.totalStock">立即抢</span>
           <span class="nobuy go_buy"   v-else>已售完</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import URL from "./../../assets/js/api";
export default {
  name: "",
  props: {
    hc_info: {
      type: Object,
      default: false
    }
  },
  data() {
    return {
      hc_goods: [],
      page:1,
      changeNav: 0, //tab导航
      id:"",
      coordinate:"",
      changeName:""
    };
  },
  created() {
    if(this.hc_info.type == 1){
      this.id=this.hc_info.navs[0].id;
      this.coordinate=this.hc_info.navs[0].id;
      this.changeName = this.hc_info.navs[0].name;
    }else{
      this.coordinate = this.hc_info.hc;
    }
    this.pageSize = this.hc_info.num || 18;
    this.getGoods(this.hc_info.hc,"click");
  },
  mounted() {
    this.$parent.moduleStatus = true;
  },
  methods: {
    //tiaozhuanwangye
    jump2page:function(url){
      window.location.href = url
    },
    jump2good:function(id,name,num){
      if(num){
        
        this.$.jump2good({
			        goodsId: id,
              goodsName: name,
              elementId:this.hc_info.index==1?"good_detail_04":"good_detail_06",
              pageName:"zhounian_06"
			     });
      }else{
        this.$parent.msgTxt ="该商品已售罄"
      }
       console.log(this.hc_info.index);
       
    },
    jump2good_pz:function(id,name,num){
       console.log(this.hc_info.index);
       if(num){
         
         this.$.jump2good({
			        goodsId: id,
              goodsName: name,
              elementId:"good_detail_07",
              pageName:"zhounian_06",
              tabName:this.changeName
			     });
       }else{
          this.$parent.msgTxt ="该商品已售罄"
       }
       
    },


    navChange: function(id,index) {
      if(this.coordinate!=id){
        this.coordinate=id;
        this.changeNav=index;
        this.page=1;
        this.changeName = this.hc_info.navs[index].name;
        this.getGoods(id,"click");
      }
      
    },
    getGoods: function(coordinate,type) {
      let params = {
        coordinate: coordinate,
        activity_id: 1
      };
      this.$http.get(URL.goods_list_noloading, { params }).then(res => {
        let result = res.data;
        console.log(result);
        if (result.result == 1) {
          if(result.data.goods_ids){
             this.getData(type,result.data.goods_ids);
          }else{
            this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '会场商品----->'+result.message, res.status);
          }
        } else {
            this.$.errorLogUpload(3, 21, params, '', res.request.responseURL, result, res.config.method, '会场商品----->'+result.message, res.status);
        }
      });
    },
    getData: function(type,id) {
      if (this.hc_info.type == 1) {
        let params = {
          page: this.page,
          pageSize:this.pageSize,
          stockNullShow: 1,
          orderType: 0,
          goodsIds:id
        };
        this.$http.post(URL.goods_info_noloading,  params ).then(javaRes => {
          let javaData = javaRes.data;
          console.log("jjjjjjjjjjjjjjjjjxxxxxxxxxxxxx");
          console.log(javaData);
          if (javaData.status == 1) {
            if(type=="click"){
              this.hc_goods=[];
            }
          this.hc_goods = this.hc_goods.concat(javaData.data);
          console.log("ppppzzzzzzzzzzzzzzzzzzzzzzzzzzz");

            if(javaData.totalPage>javaData.nowPage){
                if(javaData.nowPage<=2){
                  this.page = javaData.nowPage+1;
                  this.getData('uncklick',id)
                }
            }
            if(javaData.nowPage==4||javaData.nowPage==javaData.totalPage){
                let len =this.hc_goods.length;
                let num = len%3 ;
                this.hc_goods= this.hc_goods.splice(0, len - num);
            }
          } else {
          this.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, '会场商品列表----->'+javaData.message, javaRes.status);
            console.log("java接口问题");
          }
        });
      } else {
        //数据加载

        let params = {
          page: 1,
          pageSize: this.pageSize,
          stockNullShow: 1,
          orderType: 0,
          goodsIds:id
        };
        this.$http.post(URL.goods_info_noloading,  params).then(javaRes => {
          let javaData = javaRes.data;
          console.log(javaData);
          if (javaData.status == 1) {
             let len =javaData.data.length;
             let num = len%3 ;
             if(javaData.data.length>3){
                this.hc_goods = javaData.data.splice(0, len - num);
             }else{
                this.hc_goods = javaData.data;
             }
            
          } else {
            console.log("java接口问题");
          }
        });
      }
    }
  }
};
</script>

<style>
/* @import "../../assets/css/hc.css"; */
</style>