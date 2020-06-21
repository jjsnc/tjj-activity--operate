<template>
  <div>
    <div class="headers">
      <img :src="headerimg" />
    </div>
    <div class="goods-list">
      <div
        v-for="(goods,$index) in goodlists"
        class="goods"
        :key="$index"
        @click="jump2good(goods.goodsId, goods.goodsName)"
      >
        <img v-lazy="goods.img640Url" />
        <div class="name">{{goods.goodsName}}</div>
        <div class="xian">
          <div></div>
        </div>
        <div class="zfb-price-name">
          支付宝专属价:
          <span class="zfb-price-qian">¥</span>
          <span class="zfb-price-zheng">{{Number(goods.minGroupPrice) | Zheng}}</span>
          <span class="zfb-price-xiao">{{Number(goods.minGroupPrice) | Xiao}}</span>
        </div>
        <div class="zc-price-name">
          正 常 支 付 价:
          <span class="zc-price-qian">¥</span>
          <span class="zc-price-zheng-a">10</span>
          <span class="zc-price-xiao-a"></span>
        </div>
        <div class="buy">
          <div>抢</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var that = null;
export default {
  data: function() {
    return {
      // 头部默认图
      headerimg: require('@/assets/images/common/loading_pic.png'),
      defaultimg: require("./../../assets/images/banner.jpg"),
      goodlists: [],
      page: 1,
      totalPage: 1,
      flag: true,
    };
  },
  created() {
    that = this;
    this.initPv();
    this.getBanner();
    this.getGoodsList(this.page);
  },
  mounted() {
    window.addEventListener("scroll", this.isdown);
  },
  filters: {
    Zheng(num) {
      let t = ".";
      let ab_str = String(num);
      let m_a = ab_str.split(".");
      if (m_a[1]) {
      } else {
        m_a[1] = 0;
        t = "";
      }
      return m_a[0] + t;
    },
    Xiao(num) {
      let ab_str = String(num);
      let m_a = ab_str.split(".");
      if (m_a[1]) {
      } else {
        m_a[1] = "";
      }
      return m_a[1];
    }
  },
  methods: {
    isdown() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
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
      if (scrollHeight - clientHeight <= scrollTop + 700 && this.page <= this.totalPage && this.flag) {
        this.flag = false;
        // 下拉加载
        this.getGoodsList(this.page);
      }
    },
    getGoodsList(page) {
      let params = {
        page: page,
        pageSize: 30
      };
      this.$http
        .get(this.$api.GoodListJava, { params })
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.status == 1) {
            that.totalPage = data.totalPage;
            if (data.data.length > 0) {
              that.goodlists = that.goodlists.concat(data.data);
              that.page++;
              this.flag = true;
            }else{
              this.flag = false;
            }
          } else {
            errorLogUpload({
              logLevel: 3,
              errType: 21,
              apiError: {
                params: JSON.stringify(params),
                uri: window.location.href,
                apiUri: this.$api.GoodListJava,
                data: res.data,
                message: "status不为1 page=" + page,
                method: res.config.method,
                code: res.status
              }
            });
          }
        })
    },
    getBanner() {
      this.$http
        .get(this.$api.Banner)
        .then(res => {
          let data = res.data;
          console.log(data);
          if (data.status == 1) {
            if(data.data.length > 0){
              that.headerimg = data.data[0];
            }else{
              that.headerimg = that.defaultimg;
            }
          } else {
            that.headerimg = that.defaultimg;
            errorLogUpload({
              logLevel: 3,
              errType: 21,
              apiError: {
                params: "",
                uri: window.location.href,
                apiUri: this.$api.Banner,
                data: res.data,
                message: "banner图未配置",
                method: res.config.method,
                code: res.status
              }
            });
          }
        })
        .catch(error => {
          that.headerimg = that.defaultimg;
          errorLogUpload({
            logLevel: 3,
            errType: 22,
            apiError: {
              params: "",
              uri: window.location.href,
              apiUri: this.$api.Banner,
              data: error,
              message: "兄嘚哦，banner图接口爆掉咯！！！",
              method: 'get',
              code: ''
            }
          });
        });
    },
    initPv() {
      this.$.initPv({
        pageName: "zfbjian"
      });
    },
    jump2good(id, name) {
      this.$.jump2good({
        goodsId: id,
        goodsName: name,
        activityName: "支付宝10-8活动",
        pageName: "zfbjian",
        elementId: "good_detail"
      });
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.isdown);
  }
};
</script>
<style>
  html,body{
    background: #fd2d30;
  }
</style>
<style scoped>
#xbct {
  background: #fd2d30;
}
img {
  width: 100%;
  display: block;
}
.headers img {
  width: 12rem;
  height: 4.48rem;
}
.goods-list {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  background: #fd2d30;
  padding-top: 0.04rem;
  padding-left: 0.17rem;
  margin-bottom: 0.57em;
  min-height: 30rem;
}
.goods {
  width: 5.76rem;
  height: 8.41rem;
  position: relative;
  margin-top: 0.12rem;
  margin-right: 0.15rem;
  background-color: #ffffff;
}
.goods img {
  height: 5.57rem;
}
.goods .name {
  width: 5.27rem;
  height: 0.53rem;
  margin-left: 0.12rem;
  margin-top: 0.14rem;
  margin-bottom: 0.14rem;
  line-height: 0.5rem;
  font-size: 0.39rem;
  font-weight: normal;
  font-stretch: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #000000;
  font-family: SourceHanSansCN-Regular;
}
.xian div {
  width: 5.24rem;
  border: 0.02rem dashed #ccc;
  height: 0.02rem;
  margin-left: 0.12rem;
  margin-bottom: 0.49rem;
}
.zfb-price-name {
  height: 0.33rem;
  font-family: SourceHanSansCN-Normal;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.23rem;
  color: #000000;
  letter-spacing: 0.01rem;
  text-indent: 0.16rem;
}
.zfb-price-qian {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.44rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #fb0f06;
}
.zfb-price-zheng {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.91rem;
  font-weight: normal;
  letter-spacing: 0px;
  color: #fb0f06;
}
.zfb-price-xiao {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.63rem;
  font-weight: normal;
  letter-spacing: 0px;
  color: #fb0f06;
}

.zc-price-name {
  margin-top: 0.5rem;
  height: 0.33rem;
  font-family: SourceHanSansCN-Normal;
  font-size: 0.35rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.23rem;
  color: #695f5f;
  text-indent: 0.16rem;
}
.zc-price-qian {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.44rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-zheng {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.91rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-zheng-a {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.6rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-xiao {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.63rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-xiao-a {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.42rem;
  font-weight: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.buy {
  width: 1.46rem;
  height: 1.46rem;
  background-color: #f24216;
  border-radius: 100%;
  overflow: hidden;
  position: absolute;
  right: 0.16rem;
  bottom: 0.26rem;
}
.buy div {
  width: 1.46rem;
  height: 1.46rem;
  font-family: SourceHanSansCN-Bold;
  line-height: 1.46rem;
  font-size: 0.98rem;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
}
</style>