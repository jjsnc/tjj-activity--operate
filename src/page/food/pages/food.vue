<template>
  <nav class="container">
    <div class="imgs">
      <img :src="img" v-for="(img,key) in imgs" :key="key" alt srcset>

      <img class="share_good" v-if="isShare" src="../assets/images/1.png" @click="toGoods()">
      <img
        class="share_good share_good1"
        v-else
        src="../assets/images/food_06.jpg"
        @click="share()"
      >
    </div>

    <div class="nav" :class="{fixed:navFIxed}">
      <span
        v-for="(item,index) in navs"
        :key="index"
        @click="toGoodNav(index)"
        :class="{ active:changeNav == index}"
      >{{item.name}}</span>
    </div>
    <img class="goods_list" src="../assets/images/food_06.jpg" alt srcset>
    <div class="oneyuan food_center">
      <div class="food">
        <img src="../assets/images/food_01.jpg" class="food_img" alt srcset>
        <p class="food_info">标题标题标题标题..</p>
        <p class="food_price">
          <span class="price_icon">淘集集价</span>
          <span class="tjj_price">
            <i>¥</i> 5.9
          </span>
        </p>
      </div>
      <div class="food">
        <img src="../assets/images/food_01.jpg" class="food_img" alt srcset>
        <p class="food_info">标题标题标题标题..</p>
        <p class="food_price">
          <span class="price_icon">淘集集价</span>
          <span class="tjj_price">
            <i>¥</i> 5.9
          </span>
        </p>
      </div>
      <div class="food">
        <img src="../assets/images/food_01.jpg" class="food_img" alt srcset>
        <p class="food_info">标题标题标题标题..</p>
        <p class="food_price">
          <span class="price_icon">秒杀价</span>
          <span class="tjj_price">
            <i>¥</i> 5.9
          </span>
        </p>
      </div>
    </div>
    <img src="../assets/images/food_08.jpg" class="goods_list" alt>
    <div class="ms food_center">
      <div v-for="(item,key) in  msData" :key="key" class="food" @click="toGoods(item.goods_id)">
        <p class="ms_time">{{item.time}}</p>
        <img v-lazy="item.img320_url" class="food_img" alt srcset>
        <p class="food_info">{{item.goods_name}}</p>
        <p class="food_price">
          <span class="price_icon">秒杀价</span>
          <span class="tjj_price">
            <i>¥</i>
            {{item.group_price}}
          </span>
        </p>
      </div>
    </div>
    <!-- 吃货  -->
    <img src="../assets/images/food_10.jpg" class="goods_list" alt>
    <div class="oneyuan food_center ch">
      <div class="food" v-for="(food,index) in  goods_lists[0]" :key="index">
        <img v-lazy="food.img320_url" class="food_img" alt srcset>
        <p class="food_info">{{food.goods_name}}</p>
        <p class="food_price">
          <span class="price_text">秒杀价</span>
          <span class="tjj_price">
            <i>¥</i>
            {{food.group_price}}
          </span>
        </p>
        <p class="buy">加入购物车</p>
      </div>
    </div>
    <img src="../assets/images/food_12.jpg" alt>
    <div class="oneyuan food_center ch">
      <div class="food" v-for="(food,index) in  goods_lists[1]" :key="index">
        <img v-lazy="food.img320_url" class="food_img" alt srcset>
        <p class="food_info">{{food.goods_name}}</p>
        <p class="food_price">
          <span class="price_text">秒杀价</span>
          <span class="tjj_price">
            <i>¥</i>
            {{food.group_price}}
          </span>
        </p>
        <p class="buy">加入购物车</p>
      </div>
    </div>
    <img src="../assets/images/food_14.jpg" alt>
    <div class="oneyuan food_center ch last_ch">
      <div class="food" v-for="(food,index) in  goods_lists[2]" :key="index">
        <img v-lazy="food.img320_url" class="food_img" alt srcset>
        <p class="food_info">{{food.goods_name}}</p>
        <p class="food_price">
          <span class="price_text">秒杀价</span>
          <span class="tjj_price">
            <i>¥</i>
            {{food.group_price}}
          </span>
        </p>
        <p class="buy">加入购物车</p>
      </div>
    </div>

    <ToTop></ToTop>
  </nav>
</template>
<script>
import tjjApp from "@/assets/js/common/app_xcx.js";
import send from "@/assets/js/common/sendData.js";
import ToTop from "@/components/toTop.vue";
import { GoodList, isFoodShare, foodShare } from "./../assets/js/api.js";
export default {
  data() {
    return {
      imgs: [
        require("../assets/images/food_01.jpg"),
        require("../assets/images/food_02.jpg"),
        require("../assets/images/food_03.jpg"),
        require("../assets/images/food_04.jpg"),
        require("../assets/images/food_05.jpg")
      ],
      ms: [
        { state: false, time: "10:00" },
        { state: false, time: "12:00" },
        { state: false, time: "17:00" }
      ],
      isScoll: false,
      navs: [{ name: "限量抢购" }, { name: "限时秒杀" }, { name: "吃货专享" }],
      navFIxed: false,
      changeNav: 0,
      timer: false,
      isShare: false,
      ms_id: [
        "1675588,5209161,1398371,1114184",
        "1772062,1570763,1742743",
        "2499540,1238790,799864"
      ],
      msData: {},
      ch: [
        "53476,86036,97115,1118509,1129744,2245703,2028222,2222778",
        "904578,1831332,2301447,2761964,2714078,2845842,2881633,2969193,2969206",
        "4760326,5425677,5578254,5815166,5815436,1463008,2008495,923886,1989328"
      ],
      chData: {},
      // goods_ids:[
      //   "1215147,1215243,1215959,1216019,1215809,1215811,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215955,1216019,1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215959,1215907,1215905,1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215797,1215799,1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982",
      //   "1215803,1215805,1215807,1215809,1215232,1215959,1215955,1215907,1215905,1215797,1215799,1215803,1215805,1214979,1214977,1214981,1214975,1214984,1214980,1214976,1214983,1214982"
      // ],
      goods_lists: {},
      user_id: "",
      token: "",
      uuid: ""
    };
  },
  created() {
    // 加载数据
  },
  mounted() {
    window.isLogin = (user_id, token, uuid) => {
      this.user_id = user_id;
      this.token = token;
      this.uuid = uuid;
      let params1 = {
        user_id: user_id,
        token: token,
        uuid: uuid
      };
      this.$http.post(isFoodShare, params1).then(res => {
        console.log(res.data.isShare);
        if (res.data.result == 1) {
          this.isShare = res.data.isShare;
        }
      });

      var params = {
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

    window.addEventListener("scroll", this.handleScroll);
    var windowUrl = window.location.href;
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      let user_id = tjjApp.web.getUrlQuery("user_id", window.location.href);
      window.isLogin(user_id, 0, "wechat");
    } else {
      tjjApp.web.checkLogin();
    }
    console.log(this.finalLists);
  },
  methods: {
    getCh() {
      let goods_list = {};
      let len = this.ch.length;
      for (let i = 0; i < len; i++) {
        let params = {
          goods_id: this.ch[i]
        };
        this.$http.get(GoodList, { params }).then(res => {
          //console.log(res);
          let goods = res.data;
          //这里判断如果查到的商品下架一个 再取消一个

          this.goods_lists[i] = goods;
          this.$forceUpdate();
        });
      }
    },

    handleScroll() {
      //监听滚动
      if (!this.isScoll) {
        var date = parseInt(this.getServerDate().getDate());
        console.log(date);
        if (date == 10) {
          var params = {
            goods_id: this.ms_id[2]
          };
        } else if (date == 11) {
          var params = {
            goods_id: this.ms_id[1]
          };
        } else {
          var params = {
            goods_id: this.ms_id[2]
          };
        }

        if (10 <= date < 12) {
          this.ms[0].state = true;
        } else if (12 <= date < 17) {
          this.ms[0].state = true;
          this.ms[1].state = true;
        } else {
          this.ms[0].state = true;
          this.ms[1].state = true;
          this.ms[2].state = true;
        }

        this.isScoll = true;
        console.log("jinru");

        //滚动时请求秒杀接口
        this.$http.get(GoodList, { params }).then(res => {
          console.log(res.data);
          var data = res.data;
          var that = this;
          var arrayOfSquares = data.map(function(item, index) {
            console.log(index);
            item.ms = that.ms[index].state;
            item.time = that.ms[index].time;
          });
          this.msData = data;
        });
        this.getCh();
      }
      var windowUrl = window.location.href;
      var moreshow = true;
      if (windowUrl.indexOf("uuid=wechat") > -1) {
        var more = document.getElementsByClassName("more");
        if (moreshow) {
          for (let index = 0; index < more.length; index++) {
            more[index].style.display = "none";
          }
        }
        moreshow = false;
      }

      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      let navTop = document.getElementsByClassName("nav")[0].offsetTop;
      // console.log("现在：" + navTop);
      var goodsTop = document.getElementsByClassName("goods_list");
      for (var i = 0; i < goodsTop.length; i++) {
        // console.log("现在：" + goodsTop[i].offsetTop);
        if (scrollTop >= goodsTop[i].offsetTop) {
          this.changeNav = i;
        }
      }

      //console.log("浏览器" + scrollTop);
      //console.log("nav" + navTop);
      if (scrollTop >= navTop) {
        // console.log("ee"+navTop);
        this.navFIxed = true;
      }
      if (scrollTop < goodsTop[0].offsetTop) {
        this.navFIxed = false;
      }
    },
    toGoodNav: function(index) {
      //滚动位置
      var top = document.getElementsByClassName("goods_list")[index].offsetTop;
      if (!window.isroll_open) {
        clearInterval(window.isroll_timer);
        this.slideTo(top);
      }
      this.changeNav = index;
    },

    slideTo: function(targetPageY) {
      var that = this;
      window.isroll_timer = setInterval(function() {
        console.log(1);
        window.isroll_open = true;
        var currentY =
          document.documentElement.scrollTop || document.body.scrollTop; //当前及滑动中任意时刻位置
        var distance =
          targetPageY > currentY
            ? targetPageY - currentY
            : currentY - targetPageY; //剩余距离
        var speed = Math.ceil(distance / 10); //每时刻速度
        if (currentY == targetPageY) {
          clearInterval(window.isroll_timer);
          window.isroll_open = false;
        } else {
          window.scrollTo(
            0,
            targetPageY > currentY ? currentY + speed : currentY - speed
          );
        }
      }, 1);
    },
    toGoods: function(id) {
      //跳转商品
      tjjApp.web.jump2good(id);
    },
    getServerDate: function() {
      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
      } else {
        // ie
        xhr = new ActiveObject("Microsoft");
      }
      xhr.open("GET", "/", false); //false不可变
      xhr.send(null);
      var date = xhr.getResponseHeader("Date");
      return new Date(date);
    },
    share: function() {
      var a = {};
      var params1 = {
        user_id: this.user_id,
        token: this.token,
        uuid: this.uuid
      };
      this.$http.post(foodShare, params1).then(res => {
        console.log(res);
        if (res.data.result == 1) {
          this.isShare = true;
        }
      });
      tjjApp.web.share(a);
    }
  },

  components: {
    ToTop
  }
};
</script>
<style >
.container,

html {
  background: #31f4af !important;
}
.imgs {
  min-height: 10%;
  position: relative;
}
.share_good {
  position: absolute;
  z-index: 33;
  bottom: 0.9rem;
  width: 6.92rem;
  height: 3.51rem;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.food_center {
  width: 7.2rem;
  min-height: 3.57rem;
  margin: 0 auto;
  background: e5fdf5;
}
.last_ch {
  padding-bottom: 1rem;
}
.ch .food:nth-last-child(3),
.ch .food:nth-last-child(2),
.ch .food:nth-last-child(1) {
  margin-bottom: 0rem;
}
.ch .food {
  height: 3.79rem;
  margin-bottom: 0.34rem;
}
.oneyuan {
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}
.ms {
  justify-content: space-between;
  display: flex;
}
.ms .food {
  height: 3.79rem;
  padding-top: 0.22rem;
  position: relative;
}
.ms_time {
  width: 1.35rem;
  height: 0.37rem;
  background-color: #163c57;
  border-radius: 0.18rem;
  position: absolute;
  z-index: 33;
  top: -0.18rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  text-align: center;
  line-height: 0.37rem;
  color: #ffea00;
}
.food {
  width: 2.35rem;
  height: 3.57rem;
  background-color: #ffea00;
  border-radius: 0.2rem;
  position: relative;
}
.food_img {
  width: 2.23rem;
  height: 2.23rem;
  border-radius: 0.2rem;
  transform: rotate(4deg);
  margin-left: 0.06rem;
  margin-top: 0.06rem;
}
.food_info {
  margin: 0.13rem auto 0.27rem;
  width: 90%;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.24rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #163c57;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.food_price {
  justify-content: space-between;
  display: flex;
}
.ch .food_price {
  justify-content: center;
  display: flex;
  width: 85%;
  margin-left: 0.2rem;
}
.ch .price_text {
  color: #163c57;
  font-size: 0.22rem;
  height: 0.22rem;
  margin-top: 0.12rem;
  margin-right: 0.1rem;
}
.ch .buy {
  width: 1.82rem;
  height: 0.46rem;
  position: absolute;
  bottom: -0.23rem;
  z-index: 99;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: #163c57;
  border-radius: 0.23rem;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.28rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.46rem;
  text-align: center;
  letter-spacing: 0px;
  color: #ffea00;
}
.price_icon {
  background: url(../assets/images/price.png);
  width: 1.17rem;
  height: 0.37rem;
  background-repeat: no-repeat;
  background-size: 100%;
  font-size: 0.22rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.37rem;
  letter-spacing: 0px;
  color: #ffea00;
  padding-left: 0.08rem;
}
.tjj_price i {
  font-size: 0.3rem;
  font-style: normal;
}
.tjj_price {
  font-size: 0.5rem;
  font-weight: normal;
  letter-spacing: 0px;
  color: #163c57;
  height: 0.42rem;
  margin-top: -0.15rem;
  font-family: Impact;
  margin-right: 0.1rem;
}
img {
  width: 100%;
  display: block;
}
.fixed {
  position: fixed;
  top: 0;
  z-index: 100;
  margin: 0 auto;
  left: 0;
  right: 0;
  margin: 0rem auto !important;
}

.nav {
  width: 100%;
  margin: 0.15rem auto;
  height: 0.59rem;
  display: flex;
  justify-content: space-between;
}
.nav span {
  width: 33.3333%;
  height: 0.7rem;
  text-align: center;
  background-color: #163c57;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ffea00;
  line-height: 0.7rem;
}
.nav .active {
  background-color: #da6a03;
}
</style>

