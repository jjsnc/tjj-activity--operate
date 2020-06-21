<template>
  <div>
    <!-- 按钮图加载--体验优化 -->
    <div class="none-img">
      <img src="../assets/img/woman_no.png" alt>
      <img src="../assets/img/man_no.png" alt>
      <img src="../assets/img/woman_has.png" alt>
      <img src="../assets/img/man_has.png" alt>
    </div>
    <section  >
      <img src="../assets/img/new_07.jpg">
    </section>
    <section>
      <div>
        <div v-if="sex == 1" id="btn-box">
          <a
            data-gender="1"
            :data-btn="man?0:1"
            href="javascript:;"
            class="btn-box btn-box-man-no"
            :class="{'btn-box-man': man}"
            @click="sexClick"
          ></a>
          <a
            data-gender="2"
            :data-btn="woman?0:1"
            href="javascript:;"
            class="btn-box btn-box-woman-no"
            :class="{'btn-box-woman': woman}"
            @click="sexClick"
          ></a>
        </div>
        <div v-else id="btn-box">
          <a
            data-gender="2"
            :data-btn="woman?0:1"
            href="javascript:;"
            class="btn-box btn-box-woman-no"
            :class="{'btn-box-woman': woman}"
            @click="sexClick"
          ></a>
          <a
            data-gender="1"
            :data-btn="man?0:1"
            href="javascript:;"
            class="btn-box btn-box-man-no"
            :class="{'btn-box-man': man}"
            @click="sexClick"
          ></a>
        </div>
      </div>
    </section>
    <section >
      <img src="../assets/img/new_02.jpg">
    </section>
    <!-- 爆款 -->
    <div class="list">
      <div
        class="gos"
        v-for="(el, index) in topData"
        :key="index"
        @click="toGoods(el.goodsId,el.title)"
      >
        <div class="ims">
          <img class="im" v-lazy="(el.imgUrl)" alt>
          <div class="flas">
            <img src="../assets/img/flag.png" alt>
          </div>
        </div>
        <p :class="{name:index<5, name1: index>=5}">{{ el.title }}</p>
        <p class="zjs" v-if="index<5">昨日同类销量前5</p>
        <p class="info">
          <span class="icon">新人价</span>
          <span class="price">
            ￥
            <i>{{ el.price }}</i>
          </span>
          <del>￥{{ el.shop_price }}</del>
        </p>
      </div>
    </div>
    <section class="toTab">
      <img src="../assets/img/new_03.jpg">
    </section>
    <!-- 菜单 -->
    <nav id="nav" :class="{'fixed': fixed}">
      <span
        :id="el.cate_id"
        :data-btn="index==0?1:0"
        :data-index="index"
        v-for="(el, index) in tab"
        :key="index"
        :class="{active: index==tabActive, tab}"
        @click="tabClick(el.cate_id,index,el.cate_name)"
      >{{ el.cate_name }}</span>
    </nav>

    <!-- 平滑垫高 -->
     <div class="navHeight" v-if="fixed"></div>
    <!-- 菜单类商品 -->
    <div class="list list2">
      <div
        class="gos"
        v-for="(el, index) in tabData"
        :key="index"
        @click="toGoodsCsx(el.goodsId,el.goodsName)"
      >
        <div class="ims">
          <img class="im" v-lazy="(el.img640Url)" alt>
        </div>
        <p :class="{name1: index>=0}">{{ el.goodsName }}</p>
        <!-- <p class="zjs" v-if="index<3">昨日同类销量前5</p> -->
        <p class="info">
          <span class="icon">新人价</span>
          <span class="price">
            ￥
            <i>{{ el.minGroupPrice }}</i>
          </span>
          <del>￥{{ el.shopPrice }}</del>
        </p>
      </div>
    </div>
    <section>
		<img src="https://tjjstatic.taojiji.com/wapsite/default/Fashion/new-images/jsq.jpg">
	</section>
    <!-- 加载 -->
    <!-- 返回顶部 -->
    <ToTop></ToTop>
  </div>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import url from "./../assets/js/api.js";
import { scroller } from "vue-scrollto/src/scrollTo";
let scrollToTop = scroller();
let vm = this;
let user_id = tjjApp.web.getQueryString("user_id", window.location.href);
let uuid = tjjApp.web.getQueryString("uuid", window.location.href);
let token = tjjApp.web.getQueryString("token", window.location.href);
export default {
  data() {
    return {
      // 数据缓存
      manData: {
        hot: []
      },
      fixed: false,
      man: false,
      woman: false,
      btn: true,
      womanData: {
        hot: []
      },
      // 爆款数据
      topData: [{}, {}, {}, {}, {}, {}],
      // 菜单数据
      tabData: [],
      // 性别
      sexBtn: true,
      sex: 2,
      sexHtml: "",
      getSex: 2,
      // 菜单
      tab: [],
      tabId: "",
      tabBtn: false,
      tabTimeOutBtn: true,
      tabActive: 0,
      firstId: null,
      // load
      loadBtn: true,
      page: 1,
      loading: true,
      endPage: false, //加载到底部,
      firstEnter: true
    };
  },
  created() {
    //发送埋点
    let params = {
      pageName: "new_user",
      actUrl: location.href
    };
    tjjApp.web.initPv(params);

    vm = this;
    // 精选爆款抢购

    this.init(1, "", "", 1);
  },
  methods: {
    // 加载数据
    init(tab_type, tab_id, gender, btn) {
      // 性别
      let genderName = "";
      if (!gender) {
        genderName = "";
      } else {
        genderName = "&gender=" + gender;
      }

      // 登录信息
      let userMsg = "";
      if (!user_id) {
        userMsg = "";
      } else {
        userMsg = "&user_id=" + user_id + "&uuid=" + uuid + "&token=" + token;
      }

      this.$http
        .get(url.GoodList + "?tab_type=" + tab_type + genderName + userMsg)
        .then(res => {
          let datas = res.data;
          let data = datas.data;

          if (datas.code == 200) {
            // console.log(data);
            if (data.length == 0 ) {
             
              //返回数据为空
              vm.sex = 2;
              console.log(res.data);
              this.getSex = 2;
              this.woman = true;
              this.sexBtn = false;
              errorLogUpload({
                logLevel: 3,
                errType: 21,
                apiError: {
                  params: "",
                  uri: window.location.href,
                  apiUri: res.request.responseURL,
                  data: JSON.stringify(res.data),
                  message: "精选data为空",
                  method: res.config.method,
                  code: res.status
                }
              });
              vm.getTab();
            } else {
              this.topData = [];
              if (vm.sexBtn) {
                // vm.man =  datas.real_gender;;
                vm.sex = datas.real_gender;
                if (this.sex == 1) {
                  this.man = true;
                } else {
                  this.woman = true;
                }
                this.getSex = datas.real_gender;
                this.sexBtn = false;
                // 初始化菜单

                vm.getTab();
              }
              // 数据总条目不超过18个且条数是3的倍数
              let lengths = data.length;
              if (lengths > 18) {
                lengths = 18;
              } else if (lengths > 3) {
                let nums = lengths % 3;
                lengths = lengths - nums;
              }
              this.topData = data;
              vm.loadBtn = false;
            }
          } else {
            alert("网络问题！！！");
          }
        });
    },
    // 菜单获取 来自超声新
    getTab() {
      this.$http.get(url.TabList).then(res => {
        let data = res.data.data.cateList;
        let num  = data.length%6; 
        if(data.length>6){
          data =  data.splice(0,data.length-num)
        }
        if (data.length == 0 || !data) {
          errorLogUpload({
            logLevel: 3,
            errType: 21,
            apiError: {
              params: "",
              uri: window.location.href,
              apiUri: res.request.responseURL,
              data: JSON.stringify(res.data),
              message: "tab为空",
              method: res.config.method,
              code: res.status
            }
          });
        } else {
        //  console.log(data);
          this.tab = data;
          vm.tabBtn = true;
          this.tabId = data[0].cate_id;
          setTimeout(this.getTabData,1000) 
          //this.getTabData();
        }
      });
    },

    //获取tab数据
    getTabData(type) {
      var params = {
            page: this.page,
            cateId: this.tabId,
            os: "",
            user_id: user_id,
            uuid: uuid,
            token: token,
            source: "new_user"
      };
      Vue.prototype.$loading.show();
      if (this.tabId) {
        this.$http.get(url.TabListData, { params }).then(res => {
          var result = res.data;
          if (result.status == 1) {
            if (type == "clickTab") {
              this.tabData = [];
            }
            if (result.data.length == 20) {
              if(vm.firstEnter){
                  window.addEventListener("scroll", this.handleScroll);
                  this.firstEnter=false;
              }
              this.page++;
              this.endPage = false;
              vm.loading = true;
            
              var lists = result.data;
              var newList =  lists.filter(item => item.totalStock!=0 )
              this.tabData = this.tabData.concat(newList);
            } else {
              if (result.data.length == 0 && this.endPage&&this.page==1) {
                errorLogUpload({
                  logLevel: 3,
                  errType: 21,
                  apiError: {
                    params: JSON.stringify(params),
                    uri: window.location.href,
                    apiUri: res.request.responseURL,
                    data: JSON.stringify(res.data),
                    message: "超声新数据为空",
                    method: res.config.method,
                    code: res.status
                  }
                });
              }
              var lists = result.data;
              var newList =  lists.filter(item => item.totalStock!=0 )
              var dataLen = this.tabData.concat(newList);
              var nums = dataLen.length % 3;
              // alert(nums);
              this.tabData = dataLen.splice(0, dataLen.length - nums);
             
            }
          } else {
          }
        });
      } else {
       
      }
    },
    sexClick(e) {
      let btn = e.currentTarget.getAttribute("data-btn");
      let sex = e.currentTarget.getAttribute("data-gender");
      let iTimerTimeOut = null;
      if (btn == 1 && vm.btn) {
        vm.btn = false;
        if (sex == 1) {
          this.man = true;
          this.woman = false;
        } else {
          this.man = false;
          this.woman = true;
        }
        console.log(sex);
        this.init(1, "", sex, 1);
        iTimerTimeOut = setTimeout(function() {
          vm.btn = true;
        }, 300);
      }
    },
    // 监听滚动
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (!this.fixed) {
        this.fixed_top = document.getElementById("nav").offsetTop;
      }
      if (scrollTop >= this.fixed_top) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }

      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
      }

      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      if (scrollHeight - clientHeight <= scrollTop + 300 && vm.loading) {
        // 下拉加载
        this.endPage = true;
        vm.loading = false;
        if (!this.firstEnter) {
          vm.getTabData();
        }
      }
    },

    // 菜单点击
    tabClick(id, index, cate_name) {
      if (this.tabActive != index) {
        this.firstEnter=false;
        this.tabId = id;
        this.tabActive = index;
        this.page = 1;
        this.getTabData("clickTab");
        scrollToTop(document.getElementsByClassName("toTab")[0])
        this.endPage = false;
        tjjApp.web.sendData({
          cateName: cate_name,
          pageName: "new_user",
          elementId: "cate_gory"
        });
      } else {
        console.log("chongfu");
      }
    },
    // 跳转商品
    toGoods(id, name) {
      tjjApp.web.jump2good({
        goodsId: id,
        goodsName: name,
        pageName: "new_user",
        elementId: "good_detail"
      });
    },
    // 跳转商品
    toGoodsCsx(id, name) {
      tjjApp.web.jump2good({
        goodsId: id,
        goodsName: name,
        pageName: "new_user",
        elementId: "good_detail_csx"
      });
    },
     // rem换算成px
    remFn(num) {
      return num * 25;
    }
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      let params = {
        fun_name: "进入活动页面",
        fun_type: "HD1",
        client_version: -1,
        user_id: user_id || -1,
        uuid: uuid || -1,
        param1: document.title,
        source: "首页"
      };
      send.sendPoint(params);
    };
    let windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      let user_id = tjjApp.web.getQueryString("user_id", window.location.href);
      let token = tjjApp.web.getQueryString("token", window.location.href);
      window.isLogin(user_id,token, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
   
    // this.$nextTick(() => {
    //   console.log("next");

    //   this.firstEnter = false;
    // });
  },
  components: {
    ToTop
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style>
@import "./../assets/css/newCustomer";
</style>
