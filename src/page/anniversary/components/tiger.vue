<template>
  <div id="slot-machine">
    <div class="slot-machine-box">
      <div class="slot-machine">
        <img class="back-slot" mode="widthFix" src="../assets/images/tiger/bg.png" />
        <a href="javascript:;" class="close" @click="closeFn"></a>
        <div id="tiger-buffer">
          <roll :roll="roll"></roll>
        </div>
        <div class="start" @click="lucky" v-if="has_frequency==1 && frequency>=1">
          <div class="frequency-box">
            <span class="frequency">{{ frequency }}</span>
          </div>
        </div>
        <a
          href="javascript:;"
          class="start start-share"
          v-if="has_frequency==2 || frequency == 0"
          @click="shareClick"
        ></a>
        <a
          href="javascript:;"
          class="start start-none"
          v-if="has_frequency==3"
          @click="msgTxt = '明天记得再来哦！'"
        ></a>
        <div class="mp-slot">
          <div class="mp-slot-box">
            <div
              v-for="(item,some) in num"
              class="slot-group"
              :key="some"
              :style="{transform: 'translateY('+transY1+'px)'}"
            >
              <img class="slot-item" :src="item" alt />
            </div>
          </div>

          <div class="mp-slot-box">
            <div
              v-for="(item,some) in num"
              class="slot-group"
              :key="some"
              :style="{transform: 'translateY('+transY2+'px)'}"
            >
              <img class="slot-item" :src="item" alt />
            </div>
          </div>

          <div class="mp-slot-box">
            <div
              v-for="(item,some) in num"
              class="slot-group"
              :key="some"
              :style="{transform: 'translateY('+transY3+'px)'}"
            >
              <img class="slot-item" :src="item" alt />
            </div>
          </div>
        </div>
        <div class="good good-init" v-if="init"></div>
        <div class="good" v-if="has_lucky">
          <div class="price">{{ frequencyData.coupon_price }}</div>
          <a
            href="javascript:;"
            class="good-go"
            @click="toGoods(frequencyData.goods_id, frequencyData.coupon_name)"
          >
            <span class="good-go-span">立即</span>
            <span class="good-go-span">购买</span>
          </a>
          <div class="good-img">
            <img class="good-img-img" v-lazy="frequencyData.goods_img" alt />
          </div>
        </div>
        <div class="good good-none" v-if="!has_lucky && !init"></div>
        <div class="img-none">
          <img v-for="(el, index) in imgNone" :key="index" :src="el" alt />
        </div>
        <msgBox :msgTxt="msgTxt" />
      </div>
    </div>
  </div>
</template>
<script>
let vm = null;
import roll from "./roll";
let xcx_user = JSON.parse(sessionStorage.getItem("tjj_xcx_user"));
import { getStyle, removeArrVal } from "./../../../assets/js/common/utils";
removeArrVal();
var fun = function(){event.preventDefault()}
var el = null;
export default {
  data() {
    // 进入页面初始化
    // 获取抽奖次数和已经抽奖次数
    return {
      imgNone: [
        require("./../assets/images/tiger/none.png"),
        require("./../assets/images/tiger/start.png"),
        require("./../assets/images/tiger/start.png"),
        require("./../assets/images/tiger/start.png"),
        require("./../assets/images/tiger/start.png")
      ],
      msgTxt: null,
      roll: {
        stopNum: 1,
        rollData: [
          {
            txt: "淘集集大乐透 现金领不停"
          },
          {
            txt: "淘集集大乐透 现金领不停"
          }
        ]
      },
      scrollArr: [],
      num: [
        require("../assets/images/tiger/1.png"),
        require("../assets/images/tiger/2.png"),
        require("../assets/images/tiger/3.png"),
        require("../assets/images/tiger/4.png"),
        require("../assets/images/tiger/5.png"),
        require("../assets/images/tiger/6.png"),
        require("../assets/images/tiger/1.png")
      ],
      height: 0, // 单个数字高度
      len: 6, // 单个项目数字个数
      transY1: 0, // 第一列初始位置
      num1: 1, // 第一列结束数字
      transY2: 0, // 第二列初始位置
      num2: 2, // 第二列结束数字
      transY3: 0, // 第三列初始位置
      num3: 3, // 第三列结束数字
      speed: 30, // 速度
      frequency: 1, // 抽奖次数
      has_frequency: 2, // 抽奖状态 1：可抽奖，2：分享抽奖，3：没机会
      has_lucky: false, // 抽奖是否抽中
      has_lucky_data: false, // 抽奖是否抽中-数据暂存
      init: true, // 首次进入
      frequencyData: {
        coupon_id: "",
        coupon_name: "",
        coupon_price: "",
        goods_id: "",
        goods_img: ""
      }, // 抽奖结果
      frequencyDataZc: {}, // 抽奖结果-数据暂存
      timer1: null,
      timer2: null,
      timer3: null,
      luckyBtn: 0,
      luckyBtn1: true,
      luckyBtn2: true,
      luckyBtn3: true
    };
  },
  props: {
    show: Boolean
  },
  created() {
    vm = this;
    // this.scrollTxt();
    // this.hasChance();
  },
  mounted() {
    this.scrollTxt();
    el = document.getElementById("slot-machine");
    this.height = getStyle(
      document.getElementsByClassName("mp-slot-box")[0],
      "height"
    ).replace("px", "");
    let arr = [0, 1, 2, 3, 4, 5];
    let num = Math.round(Math.random() * 5);
    this.transY1 = -(this.height * arr[num]);
    arr.remove(arr[num]);

    num = Math.round(Math.random() * 4);
    this.transY2 = -(this.height * arr[num]);
    arr.remove(arr[num]);

    num = Math.round(Math.random() * 3);
    this.transY3 = -(this.height * arr[num]);
    arr.remove(arr[num]);
  },
  methods: {
    // 获取走字屏
    scrollTxt() {
      let params = {
        activity_id: 1
      };
      this.$http.get(this.$api.tiger_info, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.scrollArr = data.data;
          vm.addObj(vm.scrollArr);
          vm.roll = {
            rollData: vm.scrollArr,
            stopNum: 1,
            waitTime: 2000,
            singleHeight: 0.52
          };
        } else {
          vm.roll = {
            rollData: [
              {
                txt: "淘集集大乐透 现金领不停"
              },
              {
                txt: "淘集集大乐透 现金领不停"
              }
            ],
            stopNum: 1,
            waitTime: 2000,
            singleHeight: 0.52
          };
          // vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, '摇摇乐走字屏文案未获取到', res.status);
        }
      });
    },
    // 获取抽奖次数
    hasChance() {
      let params = {
        activity_id: 1
      };
      this.$http.get(this.$api.tiger_chance, { params }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.result == "1") {
          vm.frequency = data.data.chance;
          vm.has_frequency = data.data.status;
          // 按钮状态status，1：可摇奖，2：不可摇奖&有分享机会，3：不可摇奖&无分享机会
          // 当不为1、2、3的时候，默认为2
          switch (data.data.status) {
            case 1:
              break;
            case 2:
              break;
            case 3:
              break;
            default:
              vm.has_frequency = 2;
          }
        } else {
          vm.msgTxt = data.message;
          vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
        }
      });
    },
    // 抽奖
    lucky() {
      let params = {
        activity_id: 1
      };
      if (this.luckyBtn1 && this.luckyBtn2 && this.luckyBtn3) {
        // 埋点
        vm.luckyEvent();
        this.luckyBtn = 0;
        el.addEventListener('touchstart', fun);
        this.luckyBtn1 = false;
        this.luckyBtn2 = false;
        this.luckyBtn3 = false;

        this.$http
          .get(this.$api.tiger_draw, { params })
          .then(res => {
            let data = res.data;
            console.log(data);
            if (data.result == 1) {
              // 抽奖成功
              if (data.data.goods_id) {
                vm.getGoodImg(data.data.goods_id);
              }
              vm.has_lucky_data = true;
              vm.frequencyDataZc = data.data;
              vm.frequencyDataZc.goods_img = "";
              vm.luckyEnd(true);
              vm.frequency = 0;
              // 已分享次数是5的时候，置灰
              if(data.data.share_num >= 5){
                vm.has_frequency = 3;
              }
            } else if (data.result == "-53" || data.result == "-1" || data.result == "-35") {
              // -53抽奖失败
              // -1抽奖失败，未领取到优惠券
              // -35抽奖失败，优惠券的问题
              vm.has_lucky_data = false;
              vm.frequencyDataZc = [];
              vm.luckyEnd(false);
              vm.frequency = 0;
              // 已分享次数是5的时候，置灰
              if(data.data.share_num >= 5){
                vm.has_frequency = 3;
              }
            } else if (data.result == "-33") {
              // 您现在没有机会，分享可以获得机会哦~
              vm.has_frequency = 2;
              // vm.msgTxt = data.message;
              vm.luckyEnd(false);
              vm.frequency = 0;
            } else if (data.result == "-31") {
              // 今日已经到领取上限，明日再来吧
              vm.has_frequency = 3;
              vm.luckyBtn1 = true;
              vm.luckyBtn2 = true;
              vm.luckyBtn3 = true;
              vm.msgTxt = data.message;
              el.removeEventListener('touchstart', fun);
            } else {
              vm.msgTxt = data.message;
              vm.luckyBtn1 = true;
              vm.luckyBtn2 = true;
              vm.luckyBtn3 = true;
              el.removeEventListener('touchstart', fun);
              vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
            }
          })
          .catch(error => {
            console.log(error);
            // 接口返回错误时候，允许抽奖，但是抽不中~~
            // 此时此刻需要上报错误统计日志服务器
            vm.msgTxt = "网络繁忙，请稍后再试";
            vm.luckyBtn1 = true;
            vm.luckyBtn2 = true;
            vm.luckyBtn3 = true;
            el.removeEventListener('touchstart', fun);
            vm.$.errorLogUpload(4, 22, params, '', vm.$api.tiger_draw, error, 'get', "摇摇乐接口异常：网络繁忙，请稍后再试", error.request.status);
          });
      } else {
        vm.msgTxt = "大奖在路上啦，请稍等~";
      }
    },
    // 抽奖结果
    luckyEnd(lucky) {
      // 根据摇摇乐抽奖接口返回值，赋值抽奖结果
      let arr = [1, 2, 3, 4, 5, 6];
      let num = Math.round(Math.random() * 5);
      if (lucky) {
        this.num1 = this.num2 = this.num3 = num + 1;
      } else {
        this.num1 = arr[num];
        arr.remove(arr[num]);
        num = Math.round(Math.random() * 4);
        this.num2 = arr[num];
        arr.remove(arr[num]);
        if (Math.round(Math.random() * 1) == 1) {
          this.num3 = this.num2;
        } else {
          num = Math.round(Math.random() * 3);
          if (Math.round(Math.random() * 1) == 1) {
            this.num3 = this.num1;
          } else {
            this.num3 = arr[num];
          }
        }
      }
      this.start();
    },
    // 分享获取抽奖次数
    shareChance() {
      let params = {
        activity_id: 1
      };
      this.$http
        .get(this.$api.tiger_share, { params })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.result == 1) {
            vm.frequency = 1;
            vm.has_frequency = 1;
          } else if (data.result == "-57") {
            // 分享已经到领取上限，明日再来吧
            vm.has_frequency = 3;
            vm.frequency = 0;
            vm.msgTxt = data.message;
          } else if (data.result == "-37") {
            // 您有一次机会，请先摇奖吧
            vm.has_frequency = 1;
            vm.frequency = 1;
            // vm.msgTxt = data.message;
          } else {
            vm.msgTxt = data.message;
            vm.$.errorLogUpload(3, 21, params, '', res.request.responseURL, data, res.config.method, data.message, res.status);
          }
        });
    },
    // 数据对象增加键值对
    addObj(obj) {
      obj.map((el, index) => {
        el["txt"] = el["user"] + el["time"] + "秒前领取了" + el["price"] + "元";
      });
    },
    // 摇摇乐开始
    start() {
      clearInterval(this.timer1);
      clearInterval(this.timer2);
      clearInterval(this.timer3);
      let {
        len,
        height,
        transY1,
        transY2,
        transY3,
        speed,
        num1,
        num2,
        num3
      } = this;
      const totalHeight = height * len;
      const sRange1 = Math.floor(Math.random() * 5 + 1);
      const sRange2 = Math.floor(Math.random() * 5 + 1);
      const sRange3 = Math.floor(Math.random() * 5 + 1);

      const halfSpeed = speed / 2;
      const endDis1 = num1 == 0 ? 10 * height : num1 * height;
      const endDis2 = num2 == 0 ? 10 * height : num2 * height;
      const endDis3 = num3 == 0 ? 10 * height : num3 * height;
      let i1 = 1;
      let i2 = 1;
      let i3 = 1;

      vm.timer1 = setInterval(() => {
        if (i1 <= sRange1) {
          transY1 -= speed;
          if (Math.abs(transY1) > totalHeight) {
            transY1 += totalHeight;
            i1++;
          }
        } else if (i1 > sRange1 && i1 < sRange1 + 2) {
          transY1 -= halfSpeed;
          if (Math.abs(transY1) > totalHeight) {
            transY1 += totalHeight;
            i1++;
          }
        } else {
          if (Math.abs(transY1) == endDis1) {
            clearInterval(vm.timer1);
            vm.luckyBtn1 = true;
            vm.luckyBtn++;
          }
          let dropSpeed = (endDis1 + transY1) / halfSpeed;
          dropSpeed =
            dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed;
          transY1 -= dropSpeed;
          transY1 =
            Math.abs(transY1) > endDis1 ? (transY1 = -endDis1) : transY1;
        }
        this.transY1 = transY1;
      }, 12);
      vm.timer2 = setInterval(() => {
        if (i2 <= sRange2) {
          transY2 -= speed;
          if (Math.abs(transY2) > totalHeight) {
            transY2 += totalHeight;
            i2++;
          }
        } else if (i2 > sRange2 && i2 < sRange2 + 2) {
          transY2 -= halfSpeed;
          if (Math.abs(transY2) > totalHeight) {
            transY2 += totalHeight;
            i2++;
          }
        } else {
          if (transY2 == endDis2) return;
          if (Math.abs(transY2) == endDis2) {
            clearInterval(vm.timer2);
            vm.luckyBtn2 = true;
            vm.luckyBtn++;
          }
          let dropSpeed = (endDis2 + transY2) / halfSpeed;
          dropSpeed =
            dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed;
          transY2 -= dropSpeed;
          transY2 =
            Math.abs(transY2) > endDis2 ? (transY2 = -endDis2) : transY2;
        }
        this.transY2 = transY2;
      }, 12);
      vm.timer3 = setInterval(() => {
        if (i3 <= sRange3) {
          transY3 -= speed;
          if (Math.abs(transY3) > totalHeight) {
            transY3 += totalHeight;
            i3++;
          }
        } else if (i3 > sRange3 && i3 < sRange3 + 2) {
          transY3 -= halfSpeed;
          if (Math.abs(transY3) > totalHeight) {
            transY3 += totalHeight;
            i3++;
          }
        } else {
          if (Math.abs(transY3) == endDis3) {
            clearInterval(vm.timer3);
            vm.luckyBtn3 = true;
            vm.luckyBtn++;
          }
          let dropSpeed = (endDis3 + transY3) / halfSpeed;
          dropSpeed =
            dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed;
          transY3 -= dropSpeed;
          transY3 =
            Math.abs(transY3) > endDis3 ? (transY3 = -endDis3) : transY3;
        }
        this.transY3 = transY3;
      }, 12);
    },
    // 根据商品id查询商品图片
    getGoodImg(id) {
      let params = {
        page: 1,
        pageSize: 10,
        goodsIds: id,
        stockNullShow: 1,
        orderType: 0
      };
      this.$http
        .post(this.$api.goods_info_noloading, params)
        .then(javaRes => {
          let javaData = javaRes.data;
          console.log(javaData);
          if (javaData.status == 1) {
            vm.frequencyDataZc.goods_img = javaData.data[0].img640Url;
          } else {
            vm.msgTxt = javaData.message;
            vm.frequencyDataZc.goods_img = "";
            vm.$.errorLogUpload(3, 21, params, '', javaRes.request.responseURL, javaData, javaRes.config.method, "摇摇乐抽奖后获取商品图片失败---->"+javaData.message, javaRes.status);
          }
        });
    },
    reset() {
      this.transY1 = 0;
      this.transY2 = 0;
      this.transY3 = 0;
    },
    closeFn() {
      this.$emit("closeFn");
    },
    // 跳转商品 name传值 埋点开关
    toGoods(id, name) {
      this.$.jump2good({
        goodsId: id,
        goodsName: name,
        elementId: "btn16",
        pageName: "zhounian_06"
      });
    },
    // 主/分/返场-摇现金-开始摇奖按钮埋点
    luckyEvent() {
      this.$.eventData({
        pageName: "zhounian_06",
        elementId: "btn14"
      });
    },
    // 分享
    shareClick() {
      let shareText = '';
      let shareImg = '';
      if(this.$route.name == 'back'){
        shareText = '寻宝捡漏 再购一波 0.1元限量补仓';
        shareImg = 'back';
      }else{
        shareText = '1周年送大礼  0.1元秒开心';
        shareImg = 'index';
      }
      if (this.luckyBtn1 && this.luckyBtn2 && this.luckyBtn3) {
        if (this.$.xcx()) {
          this.$.share({
            title: shareText,
            shareActivity: 0,
            shareUrl: window.location.origin + "/project/anniversary/view/" + this.$route.name,
            miniPath: window.location.origin + "/project/anniversary/view/" + this.$route.name,
            imgUrl: require("./../assets/images/share/"+shareImg+".jpg")
          });
        } else {
          this.$.share({
            imgUrl: require("./../assets/images/share/"+shareImg+".jpg"),
            title: shareText,
            miniPath:
              window.location.origin +
              "/project/anniversary/view/" +
              this.$route.name,
            shareUrl:
              window.location.origin +
              "/project/anniversary/view/" +
              this.$route.name
          });
        }
        // 主/分/返场-摇现金-分享获得机会
        setTimeout(function(){
          vm.shareChance();
        },300)
        // 主/分/返场-摇现金-分享获得机会-埋点
        this.$.eventData({
          pageName: "zhounian_06",
          elementId: "btn15"
        });
      } else {
        this.msgTxt = "大奖在路上啦，请稍等~";
      }
    }
  },
  components: {
    roll
  },
  watch: {
    luckyBtn(n, o) {
      if (n == 3) {
        el.removeEventListener('touchstart', fun);
        this.has_lucky = this.has_lucky_data;
        this.frequencyData = this.frequencyDataZc;
        // 第一次抽奖操作后，是否中奖区域初始值关闭
        this.init = false;
      }
    },
    show(n, o){
      // 监听show为true的时候，调取获取机会接口
      if(n){
        this.hasChance();
      }
    }
  }
};
</script>
<style scoped>
* {
  -webkit-backface-visibility: hidden;
}
#slot-machine {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  overflow-y: auto;
  overflow-x: hidden;
}
.slot-machine-box{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 16.53rem;
}
.slot-machine {
  position: relative;
  width: 100%;
  -webkit-user-select: none;
  user-select: none;
}
.mp-slot {
  width: 5.8rem;
  height: 2.8rem;
  position: absolute;
  top: 6.33rem;
  left: 50%;
  margin-left: -2.9rem;
  overflow: hidden;
  z-index: 999;
}
.mp-slot-box {
  width: calc(100% / 3);
  height: 2.8rem;
  overflow: hidden;
  float: left;
}
.slot-group {
  height: 2.8rem;
  position: relative;
}
.slot-item {
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  bottom: 0;
  margin: auto;
}
.back-slot {
  width: 100%;
  overflow: hidden;
}
.frequency-box {
  width: 100%;
  height: 100%;
  position: relative;
}
.frequency {
  width: 1rem;
  height: 0.64rem;
  position: absolute;
  top: 0.1rem;
  left: 0.9rem;
  font-family: SourceHanSansCN-Medium;
  font-size: 0.7rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.64rem;
  letter-spacing: -0.4px;
  color: #ff2053;
  text-align: left;
  z-index: 999;
  overflow: hidden;
}

.close {
  width: 1.3rem;
  height: 1.3rem;
  position: absolute;
  left: 50%;
  margin-left: -0.455rem;
  top: 15.1rem;
  background: url("./../assets/images/tiger/close.png") center center no-repeat;
  background-size: 0.91rem 0.91rem;
}
.good {
  position: absolute;
  left: 50%;
  margin-left: -2.88rem;
  top: 10.59rem;
  width: 5.76rem;
  height: 1.9rem;
  overflow: hidden;
  background: url("./../assets/images/tiger/good_bg.png") center center
    no-repeat;
  background-size: 5.76rem 1.9rem;
  z-index: 999;
}
.good-init {
  background: url("./../assets/images/tiger/init.png") center center no-repeat;
  background-size: 4.05rem 1.5rem;
}
.good-none {
  background: url("./../assets/images/tiger/none.png") center center no-repeat;
  background-size: 4.03rem 0.78rem;
}
.price {
  width: 1.8rem;
  height: 1.08rem;
  float: left;
  margin-left: 0.6rem;
  margin-top: 0.34rem;
  font-family: Impact;
  font-size: 1.45rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.08rem;
  letter-spacing: -0.1rem;
  color: #ec0338;
}
.good-img {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: 0.2rem;
  margin-right: 0.13rem;
  float: right;
  border-radius: 0.08rem;
}
.good-img-img {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.good-go {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  float: right;
  display: block;
  margin-right: 0.2rem;
  margin-top: 0.45rem;
  background: #ec0338 url("./../assets/images/tiger/icon.png") center 0.82rem
    no-repeat;
  background-size: 0.2rem 0.14rem;
  box-shadow: 0.03rem 0.04rem 0.05rem 0px rgba(208, 0, 0, 0.3);
}
.good-go-span {
  font-family: SourceHanSansCN-Regular;
  font-size: 0.31rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.31rem;
  letter-spacing: 0px;
  color: #fff;
  text-align: center;
  display: block;
  width: 100%;
}
.good-go-span:first-child {
  margin-top: 0.2rem;
}
#tiger-buffer {
  position: absolute;
  width: 5.4rem;
  height: 0.52rem;
  top: 5.2rem;
  left: 50%;
  margin-left: -2.7rem;
  overflow: hidden;
}
.img-none {
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
<style>
#tiger-buffer ul {
  width: 100%;
}
#tiger-buffer li {
  height: 0.52rem;
  line-height: 0.52rem;
  width: 100%;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.33rem;
  font-weight: normal;
  font-stretch: normal;
  color: #ff2053;
  text-align: center;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  display: flex;
}
#tiger-buffer li .title {
  display: inline-block;
  width: auto;
  height: 0.52rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.start {
  width: 3.7rem;
  height: 1.04rem;
  position: absolute;
  left: 50%;
  margin-left: -1.85rem;
  top: 13.24rem;
  background: url("./../assets/images/tiger/start.png") center center no-repeat;
  background-size: 3.7rem 1.04rem;
}
.start-share {
  background: url("./../assets/images/tiger/share_has.png") center center
    no-repeat;
  background-size: 3.7rem 1.04rem;
}
.start-none {
  background: url("./../assets/images/tiger/get_over.png") center center
    no-repeat;
  background-size: 3.7rem 1.04rem;
}
</style>