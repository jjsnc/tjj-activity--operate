<template>
  <div id="navs-box">
    <div id="navs">
      <a
        href="javascript:;"
        class="nav"
        @click="routerHref1(el.router, el.type == 1 ? 'all' : el.type == 2 ? 'href' : '')"
        v-for="(el, index) in navs"
        :key="index"
      >
        <img class="nav-img" :src="el.img" alt>
        <span class="nav-name">{{ el.name }}</span>
      </a>
    </div>
    <div id="box" :class="{'box-show': tabShow, 'box-hide': tabHide}">
      <div class="box-close">
        <a href="javascript:;" class="close" @click="close"></a>
      </div>
      <div class="box-list">
        <a
          href="javascript:;"
          class="box-list-a"
          v-for="(el, index) in tabs"
          :key="index"
          @click="routerHref(el.router)"
        >
         <img  class="box-list-img" :src="el.img" alt> 
        </a>
      </div>
    </div>
  </div>
</template>
<script>
let vm = null;
let session = window.sessionStorage;
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));

export default {
  data() {
    return {
      navs: [
        {
          name: "主会场",
          type: "",
          router: "/index",
          img: require("../assets/images/icon/bottom_nav_01.png")
        },
        {
          name: "全部会场",
          type: "1",
          router: "all",
          img: require("../assets/images/icon/bottom_nav_02.png")
        },
        {
          name: "领券中心",
          type: "",
          router: "/coupon",
          img: require("../assets/images/icon/bottom_nav_03.png")
        },
        {
          name: "热销榜单",
          type: "",
          router: "/hot",
          img: require("../assets/images/icon/bottom_nav_04.png")
        },
        {
          name: "买即送",
          type: "",
          router: "/one",
          img: require("../assets/images/icon/bottom_nav_05.png")
        }
      ],
      tabShow: false,
      tabHide: false,
      tabs: [
        {
          img: require("../assets/images/icon/n1.jpg"),
          router: "/index",
          name: "大促"
        },
        {
          img: require("../assets/images/icon/n2.jpg"),
          router: "/sign",
          name: "签到领现金"
        },
        {
          img: require("../assets/images/icon/n3.jpg"),
          router: "/ms",
          name: "整点秒杀",
          type:2
        },
        {
          img: require("../assets/images/icon/n4.jpg"),
          router: "/hot",
          name: "热销榜单"
        },
        {
          img: require("../assets/images/icon/n5.jpg"),
          router: "/coupon",
          name: "万券齐发"
        },
        {
          img: require("../assets/images/icon/n6.jpg"),
          router: "/half",
          name: "半价"
        },
        {
          img: require("../assets/images/icon/n7.jpg"),
          router: "/one",
          name: "买即送",
           type:1,
        },
        {
          img: require("../assets/images/icon/n8.jpg"),
          router: "/qingcang",
          name: "清仓",
           type:1,
        },
        {
          img: require("../assets/images/icon/n9.jpg"),
          router: "/new",
          type:1,
          name: "新款"
        },
        {
          img: require("../assets/images/icon/n10.jpg"),
          router: "/clothes",
          name: "服饰"
        },
        {
          img: require("../assets/images/icon/n11.jpg"),
          router: "/general",
          name: "百货"
        },
        {
          img: require("../assets/images/icon/n12.jpg"),
          router: "/shoesBag",
          name: "鞋包"
        },
        {
          img: require("../assets/images/icon/n13.jpg"),
          router: "/makeup",
          name: "美妆"
        },
        {
          img: require("../assets/images/icon/n14.jpg"),
          router: "/food",
          name: "食品"
        },
        {
          img: require("../assets/images/icon/n15.png"),
          router: "/digit",
          name: "数码"
        }
      ]
    };
  },
  created() {
    vm = this;
    // let toSuper = null;
    // if (!session.getItem("toSuper")) {
    //   let href = window.location.href;
    //   let hosts = window.location.host;
    //   toSuper = href.replace(
    //     hosts + "/activity/project/shop_act/view/" + vm.$route.name,
    //     'fissile.taojiji.com/super/view/v1_0_0/index'
    //   );
    //   session.setItem("toSuper", toSuper)
    // }
  },
  methods: {
    // hrefUrl(page, btn) {
    //   let href = window.location.href;
    //   let hosts = window.location.host;
    //   if (btn == 1) {
    //     page = hosts + "/activity/project/shop_act/view" + page;
    //   }
    //   if (session.getItem("toSuper")) {
    //     return session.getItem("toSuper")
    //   }
    // },
    // 路由跳转
    routerHref(page, btn) {
     
      if (btn == "href") {
        window.location.href = vm.hrefUrl(page);
      } else {
         
       //this.getPath();
        if(page == '/new'){
              this.jump2web('https://modeup.taojiji.com/taojiji/pages/2019/07/223174b71a0b42841b-html5.html')
        }
         else if(page == '/qingcang'){
              this.jump2web('https://modeup.taojiji.com/taojiji/pages/2019/07/22e9e60e49548e5c93-html5.html')
        }
         else if(page == '/one'){
              this.jump2web('https://modeup.taojiji.com/taojiji/pages/2019/07/207f112689c1e59894-html5.html')
        }else if(page=="/ms"){
           let msUrl = window.location.host=="activity.taojiji.com"?"https://fissile.taojiji.com":"https://fissile.tjjshop.cn"
        //    window.location.href = 'https://fissile.tjjshop.cn/flashSale/view/v1_0_0/home/referPage/808/os/'+this.getQueryString("os")+'/user_id/'+this.getQueryString("user_id")+'/uuid/'+this.getQueryString("uuid")+'/token/'+this.getQueryString("token")
           window.location.href = msUrl+'/flashSale/view/v1_0_0/home/referPage/808'+this.getPath();
        }

        else{
          if(page=="/coupon"||page=="/sign"){
               let  user_id = this.$parent.user_id;
               var origin = window.location.origin;
                if(!user_id){
                    let u =  origin+'/project/anniversary/view'+page;
                    if (xcx_user) {
                      this.$wx.jump2login();
                    } else {
                      this.$.login({
                        return_url:origin+'/project/anniversary/view'+page
                      });
                    }
                }else{
                  this.$.eventData({
                        elementId:"btn12",
                        pageName:"zhounian_06"
                    });
                    this.$router.push(page+this.getPath());
                }
             
          }else{
              this.$router.push(page+this.getPath());
          }
          
        }
       
      }
    },
    routerHref1(page, btn){
         if (btn == "all") {
            if((!vm.tabShow&&vm.tabHide)||!vm.tabShow&&!vm.tabHide){
              this.$.eventData({
                  elementId:"btn10",
                  pageName:"zhounian_06"
              });
              vm.tabShow = true;
              vm.tabHide = false;
            }else {
              this.close();
            }
        }else{
          if(page=="/coupon"){
               let  user_id = this.$parent.user_id;
               var origin = window.location.origin;
                if(!user_id){
                    let u =  origin+'/project/anniversary/view'+page;
                    if (xcx_user) {
                      this.$wx.jump2login();
                    } else {
                      this.$.login({
                        return_url:origin+'/project/anniversary/view'+page
                      });
                    }
                }else{
                  this.$.eventData({
                        elementId:"btn12",
                        pageName:"zhounian_06"
                    });
                    this.$router.push(page+this.getPath());
                }
             
          }else if(page=="/one"){
               this.$.eventData({
                  elementId:"btn13",
                  pageName:"zhounian_06"
              });
              this.jump2web('https://modeup.taojiji.com/taojiji/pages/2019/07/207f112689c1e59894-html5.html')
          }else if(page=="/hot"){
             this.$.eventData({
                  elementId:"btn11",
                  pageName:"zhounian_06"
              });
              this.$router.push(page+this.getPath());
          }else{
            this.$router.push(page+this.getPath());
          }
           
        }

       
    },
    close() {
      vm.tabShow = false;
      vm.tabHide = true;
    }
  }
};
</script>
<style scoped>
#navs-box {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 1.64rem;
  background: #fff;
}
@keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.6rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.6rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
   #navs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.98rem;
    padding-bottom:34px; 
    background: #fff;
  }
   #navs-box{
    height: 1.98rem;
  }
   @keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.75rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.75rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) {
   #navs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.98rem;
    padding-bottom:34px; 
    background: #fff;
  }
   #navs-box{
    height: 1.98rem;
  }
   @keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.75rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.75rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
}
/* iPhone XR */  
@media only screen and  (device-height: 896px)  {
    #navs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.98rem;
    padding-bottom:34px; 
    background: #fff;
  }
   #navs-box{
    height: 1.98rem;
  }
   @keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.75rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.75rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 1) {
   #navs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.98rem;
    padding-bottom:34px; 
    background: #fff;
  }
   #navs-box{
    height: 1.98rem;
  }
   @keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.75rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.75rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
}

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
 #navs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.98rem;
    padding-bottom:34px; 
    background: #fff;
  }
   #navs-box{
    height: 1.98rem;
  }
   @keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.75rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.75rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
}

/* iPhone XS Max */

@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  #navs {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1.98rem;
    padding-bottom:34px; 
    background: #fff;
  }
   #navs-box{
    height: 1.98rem;
  }
   @keyframes tabShow {
  0% {
    bottom: -20rem;
  }
  100% {
    bottom: 1.75rem;
  }
}
@keyframes tabHide {
  0% {
    bottom: -1.75rem;
  }
  100% {
    bottom: -19.2rem;
  }
}
}
#navs {
  width: 100%;
  height: 1.64rem;
  background: #fff;
  z-index: 99999;
  position: absolute;
  left: 0;
  top: 0;
}
.nav {
  display: block;
  width: 20%;
  float: left;
  height: 1.64rem;
  line-height: 1.64rem;
  font-size: 0.4rem;
  text-align: center;
}
.nav-img {
  display: block;
  width: 0.96rem;
  height: 0.96rem;
  margin: 0.08rem auto 0;
}
.nav-name {
  display: block;
  width: 100%;
  line-height: 0.35rem;
  font-size: 0.2rem;
  text-align: center;
  margin: 0.1rem auto 0;
  font-family: PingFang-SC-Bold;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff004e;
}
#box {
  position: absolute;
  bottom: -19rem;
  width: 100%;
  overflow: hidden;
  z-index: 998;
  background: #fff;
  padding-top: 0.19rem;
}
.box-close {
  width: 100%;
  height: 0.9rem;
  overflow: hidden;
  margin-bottom: 0.19rem;
}
.close {
  display: block;
  width: 0.9rem;
  height: 0.9rem;
  background: url(../assets/images/icon/close.png) center center no-repeat;
  background-size: 0.9rem;
  float: right;
  margin-right: 0.6rem;
}
.box-list {
  width: 100%;
  overflow: hidden;
  padding: 0.2rem 0.3rem 0;
  background: #fff;
}
.box-list-a {
  width: calc(calc(100% - 0.08rem) / 2);
  margin-bottom: 0.1rem;
  height: 1.5rem;
  float: left;
}
.box-list-a:first-child {
  width: 100%;
  
  
}
.box-list-a:nth-of-type(2n-1) {
  float: right;
}
.box-list-img {
  display: block;
  width: 100%;
  height: 100%;
}
.box-show {
  animation: tabShow 0.3s 1 linear forwards;
}
.box-hide {
  animation: tabHide 0.3s 1 linear forwards;
}

</style>
