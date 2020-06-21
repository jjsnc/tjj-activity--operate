<template>
  <div @click="toRouter">
    <div class="headers">
      <img v-lazy="headerimg" />
    </div>
    <div class="bg">
      <div class="goods-list">
        <div
          v-for="(goods,$index) in goodlists"
          class="goods"
          :key="$index"
          @click="jump2good(goods.goodsId,goods.goodsName)"
        >
          <div class="yjs">
            <img :src="aflag" />
          </div>
          <img class="goodimgs" v-lazy="goods.img640Url" />
          <div class="name">{{goods.goodsName}}</div>
          <div class="xian">
            <div></div>
          </div>
          <div class="zfb-price-name">
            淘集集补贴价:
            <span class="zfb-price-qian">¥</span>
            <span class="zfb-price-zheng">{{Number(goods.minGroupPrice) | Zheng}}</span><span class="zfb-price-xiao">{{Number(goods.minGroupPrice) | Xiao}}</span>
          </div>
          <div class="zc-price-name">
            市 场 平 均 价:
            <span class="zc-price-qian">¥</span>
            <span class="zc-price-zheng-a">{{Number(goods.shopPrice) | Zheng}}</span><span class="zc-price-xiao-a">{{Number(goods.shopPrice) | Xiao}}</span>
          </div>
          <div class="buy">
            <div>抢</div>
          </div>
        </div>
      </div>
    </div>
    <msgBox :msgTxt="msgTxt" />
  </div>
</template>
<script>
import url from "./../../assets/js/api.js";
var that = null;
export default {
  created() {
    that = this;
	this.getGoodsId();
  },
  mounted() {
  	var windowUrl = window.location.href;
  	location.href="taojiji://web.taojiji.com/active?url=https://"+window.location.host+"/project/alipay_acte/view/index"
    if (windowUrl.indexOf("uuid=wechat") > -1) {
      this.is_wx = true;
//    this.initPv(true);
    } else {
//    this.initPv(false);
    }
    window.addEventListener("scroll", this.isdown);
  },
  data: function() {
    return {
      headerimg: require("@/assets/images/common/loading_pic.png"),
      defaultimg: require("./../../assets/images/banner.jpg"),
      aflag: require("./../../assets/images/aflag.png"),
      goodlists: [],
      goodsList: "",
      page: 1,
      totalPage: 1,
      flag: false,
      is_wx: false,
      msgTxt: null
    };
  },
  filters: {
    Zheng(num) {
      let t = ".";
      //	    		alert(num)
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
      if (
        scrollHeight - clientHeight <= scrollTop + 300 &&
        this.flag &&
        this.totalPage >= this.page
      ) {
        this.flag = false;
        // 下拉加载
        this.get_GoodsInfo(this.page);
      }
    },
    get_GoodsInfo(page) {
      let params = {
        page: page,
        pageSize: 20,
        goodsIds: this.goodsList,
        stockNullShow: 0,
        orderType: 0
      };
      this.$http
        .post(url.goods_info, params)
        .then(javaRes => {
          let javaData = javaRes.data;
          console.log(javaData);
          if (javaData.status == 1) {
            that.totalPage = javaData.totalPage;
            if (javaData.totalPage >= page) {
              that.goodlists = that.goodlists.concat(javaData.data);
              that.flag = true;
              that.page++;
            }
          } else {
            errorLogUpload({
              logLevel: 3,
              errType: 21,
              apiError: {
                params: "",
                uri: window.location.href,
                apiUri: javaRes.request.responseURL,
                data: javaRes.data,
                message: "status不为1，获取商品列表失败",
                method: "get",
                code: 200
              }
            });
          }
        })
        .catch(error => {
          this.flag = true;
          throw error;
        });
    },
    getGoodsId() {
      this.$http
        .get(url.api_goodlist)
        .then(res => {
          console.log(res.data);
          if (res.data.result == 1) {
            if (res.data.goodsList) {
              that.goodsList = res.data.goodsList;
              that.get_GoodsInfo(1);
            }
            if (res.data.bannerUrl) {
              that.headerimg = res.data.bannerUrl;
            } else {
              that.headerimg = that.defaultimg;
            }
          } else {
            that.headerimg = that.defaultimg;
          }
        })
        .catch(e => {
          that.msgTxt = "网络错误，请稍后再试";
          that.headerimg = that.defaultimg;
          throw e;
        });
    },
    toRouter() {
    	if(this.checkBrowser().versions.ios){
    		window.location.href = "https://itunes.apple.com/cn/app/淘集集/id1308838222?mt=8";
    	}else if(this.checkBrowser().versions.android){
    		window.location.href = "https://downloads.taojiji.com/taojiji/tjj.apk"
    	}
    },
    jump2good(id, name) {
    	
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.isdown);
  }
};
</script>
<style>
html,
body {
  background-color: #fd2d30;
}
</style>
<style scoped>
img {
  width: 100%;
  display: block;
}
.headers img {
  width: 12rem;
  height: 10.6rem;
}
.goods-list {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  background-color: #fd2d30;
  margin-left: 0.17rem;
  padding: 0.04rem 0 0.57em;
}
.bg {
  background-color: #fd2d30;
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
.goods .goodimgs {
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
  font-size: 0.37rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.04rem;
  color: #fb0f06;
}
.zfb-price-zheng {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.77rem;
  font-weight: normal;
  letter-spacing: -0.02rem;
  color: #fb0f06;
}
.zfb-price-xiao {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.53rem;
  font-weight: normal;
  letter-spacing: -0.02rem;
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
  font-size: 0.29rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: -0.01rem;
  color: #695f5f;
}
.zc-price-zheng {
  font-family: SourceHanSansCN-Bold;
  font-size: 0.6rem;
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
  font-size: 0.42rem;
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
.yjs {
  position: absolute;
  height: 8.41rem;
  z-index: 111;
  top: 0;
}
</style>