<template>
  <div id="time_header">
    <img class="one" :src="img" alt srcset />
    <span v-for="(data,index) in this.headerData" :key="index">
      <i :class="{'activity':data.nowday,'fz':data.fz&&data.nowday?data.fz:''}">{{data.date}}</i>
      <br />
      <em :class="{'activityDate':data.nowday}">{{data.activity}}</em>
    </span>
    <span class="gl" @click="toPage">攻略></span>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import URL from "./../assets/js/api";
export default {
  data() {
    return {
      img: require("./../assets/images/icon/1.png"),
      data: [
        { date: "-8.8-", activity: "生日宴主场", day: "8" },
        { date: "8.9~8.10", activity: "服饰步行街", day: "9" },
        { date: "8.11~8.12", activity: "百货商品城", day: "11",fz:true  },
        { date: "8.13~8.14", activity: "鞋包批发城", day: "13" ,fz:true },
        { date: "-8.15-", activity: "女神美容院", day: "15" },
        { date: "-8.16-", activity: "鲜农副市场", day: "16" },
        { date: "-8.17-", activity: "通信数码店", day: "17" },
        { date: "8.18~8.20", activity: "抄底扫货", day: "18",fz:true  },
        { date: "8.21~8.22", activity: "女神穿搭", day: "21",fz:true  },
        { date: "8.23~8.24", activity: "男神穿搭", day: "23",fz:true  },
        { date: "8.25~8.26", activity: "主妇优选", day: "25",fz:true  },
        { date: "8.27~8.28", activity: "开学快乐", day: "27",fz:true  }
      ],
      index: 2, //当前位置
      headerData: []
    };
  },
  beforeCreate() {},
  created() {
    window.num = this.numFn(1.25);
    this.nowTime();
    // var nowDate = new Date().getDate();
    // this.dateShow(nowDate, "shouji");
  },
  components: {
    vueSeamlessScroll
  },
  methods: {
    toPage: function() {
      this.$.eventData({
        'pageName':"zhounian_06",
        'elementId':'gonglue'
      })
      this.$router.push("/strategy" + this.getPath());
    },

    numFn(rem) {
      var fz = parseFloat(
        document.getElementsByTagName("html")[0].style.fontSize
      );
      return rem * fz;
    },
    nowTime: function() {
      URL.getNowTime().then(res => {
        console.log(res);
        this.dateShow(new Date(res * 1000).getDate());
      });
    },
    dateShow: function(nowDate, type) {
      let day = 8;
      let that = this;
      //根据时间日期分类 顶部导航的时间
      if(nowDate<8 || nowDate>28){
        nowDate=8
      }
      if (
        nowDate == 10 ||
        nowDate == 12 ||
        nowDate == 14 ||
        nowDate == 19 ||
        nowDate == 22 ||
        nowDate == 24 ||
        nowDate == 26 ||
        nowDate == 28
      ) {
        day = nowDate - 1;
      } else if (nowDate == 20) {
        day = 18;
      } else {
        day = nowDate;
      }

      //得到当前应当显示的日期的位置
      this.data.forEach(function(value, index) {
        if (value.day == day) {
          that.index = index;
        }
      });

      //根据位置截取4个对象 22号以后取最后4个

      if (day >= 21) {
        let endIndex = 1;
        if (day == 23) {
          endIndex = 2;
        } else if (day == 25) {
          endIndex = 3;
        } else if(day == 21){
          endIndex=1
        } else{
          endIndex = 4;
        }
        this.headerData = this.data.slice(7, 12);
        //高亮显示的时间档增加一个属性
        this.$set(this.headerData[endIndex], "nowday", true);
      } else {
        this.headerData = this.data.slice(this.index, this.index + 5);
        // 高亮显示的时间档增加一个属性
        this.$set(this.headerData[0], "nowday", true);
      }

      if (type == "shouji") {
        this.nowTime();
      }
    }
  }
};
</script>
<style scoped >
.one {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.73rem;
  width: 1.39rem;
  z-index: 9;
}
#time_header {
  width: 100%;
  line-height: 1rem;
  left: 0;
  padding-left: 1.39rem;
  background-image: linear-gradient(0deg, #ff0000 0%, #ff5512 100%),
    linear-gradient(#eb0016, #eb0016);
  background-blend-mode: normal, normal;
  height: 1.15rem;
  box-sizing: border-box;
  overflow: hidden;
  clear: both;
}
#time_header span {
  color: black;
  float: left;
  font-size: 0.3rem;
  line-height: 0.45rem;
  text-align: center;
  height: 1.15rem;
  padding-top: 0.15rem;
  width: 1.9rem;
  color: #ffef98;
  font-family: AlibabaPuHuiTiM;
  font-style: normal;
  position: relative;
}
#time_header span::after {
  content: "";
  position: absolute;
  right: 0;
  height: 0.75rem;
  display: block;
  background: #ffc697;
  top: 0.25rem;
  width: 0.5px;
}
#time_header span:nth-last-of-type(1)::after {
  background: none;
}
#time_header span i {
  font-style: normal;
}

#time_header .gl {
  width: 1.1rem;
  padding-top: 0.1rem;
  height: 1rem;
  line-height: 1rem;
}
#time_header .activity {
  width: 1.72rem;
  font-family: AlibabaPuHuiTiB;
  height: 0.46rem;
  font-size: 0.39rem;
  display: inline-block;
  font-weight: bolder;
  background-image: linear-gradient(0deg, #fffe90 0%, #ffffff 100%),
    linear-gradient(#de0000, #de0000);
  background-blend-mode: normal, normal;
  box-shadow: 1px 2px 3px 0px rgba(167, 0, 0, 0.55);
  border-radius: 0.22rem;
  font-style: normal;
  color: #ff0401;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
}
#time_header  .fz{
   font-size: 0.3rem;
}
em {
  font-style: normal;
}
#time_header .activityDate {
  -webkit-mask-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#fffe90),
    color-stop(40%, #fffe90),
    to(#fff)
  );
}
</style>

