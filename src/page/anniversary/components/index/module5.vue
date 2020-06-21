<template>
  <div class="">
       <img class="limited_title"  src="./../../assets/images/index/jx.jpg" />
    <div
      class="jx_hc module"
      v-for="(hc,index) in hc_list"
      :class="['module']+(index+5)"
      :key="index"
      :style="{ background: hc.color}"
    >
      <div class="jx_hc_top">
        <div>
          <img @click="toPage1(index)" :src="hc.urlData[0].img" alt srcset />
        </div>
        <div>
          <img  @click="toPage2(index,0)" :src="hc.urlData[1].img"   alt srcset />
          <img @click="toPage2(index,1)" :src="hc.urlData[2].img" alt srcset />
        </div>
      </div>
      <div class="jx_hc_bottom">
        <img  @click="toPage3(index,key)" 
          :src="hc_bottom.img"
          v-for="(hc_bottom,key) in hc.urlData.slice(3,6)"
          :page="hc_bottom.url"
          :key="key"
          alt
          srcset
        />
      </div>
    </div>
  </div>
</template>

<script>
// import URL from "./../../assets/js/api"

export default {
  name: '',
  props:{
    hc_list: {
      type: Array,
      default: false
    }
  },
  data() { 
    return {
      pages1:['/clothes','/general','/shoesBag','/makeup','/food',"/digit"],
      pages2:[
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/116867a136e7b58c8c-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/113d50c3fb5a4cfcc7-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/180fb20ea5567d5214-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/1214228dbf2d023b91-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/11595f29c4847b3618-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/11f9c3c262b1e71279-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/129ae9f4921626541d-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/121b520e94a0e52ce1-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/11c4088d15d4ea7715-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/164b7318f5f1019c8c-html5.html"}
              ],
               [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/169dd958d3c8e8dc4d-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/11a17bd668b93f0f97-html5.html"}
              ],
            ],
      pages3:[
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/153ca44d604a300a51-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/153d74c388499815c8-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/15a1285130d82a35cf-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/12559ecb590aabcf20-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/1788040fb3fbaa7738-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/18b39103937206eb16-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/115534c991028b5916-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/1142e801805988e928-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/115e2c46f720927b8d-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/12a7b53b3a1e19b98a-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/12f367c3ab19c80bdd-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/122016162ba6ca886b-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/16b311487ae2231254-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/119f3000bb9cb9567d-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/115ae40f0479fdf6f3-html5.html"}
              ],
              [
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/1263e3ae75ef7f48ba-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/186c3f490f47c3ed3b-html5.html"},
                {"url":"https://modeup.taojiji.com/taojiji/pages/2019/07/19fd914c3b4777051a-html5.html"}
              ],
            ]      
    }
  },
  created(){
    
  },
  methods:{
    toPage1:function(index) {
        console.log(this.getPath());
        this.$router.push(this.pages1[index]+this.getPath());
        this.$.eventData({
              elementId:"btn09",
              pageName:"zhounian_06"
			     });  
    },
    toPage2:function(index,index1) {
        this.jump2web(this.pages2[index][index1].url)
        this.$.eventData({
              elementId:"btn09",
              pageName:"zhounian_06"
			     });  
    },
     toPage3:function(index,index1) {
      // console.log(this.pages3[index][index1].url);
       this.jump2web(this.pages3[index][index1].url)
        this.$.eventData({
              elementId:"btn09",
              pageName:"zhounian_06"
			     });  
    },
  },
  mounted(){
    this.$parent.moduleStatus=true
  },
 
 }
</script>

<style>


@import "../../assets/css/hc.css";
</style>
