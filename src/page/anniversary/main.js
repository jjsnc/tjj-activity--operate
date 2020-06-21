// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import '@/assets/js/common/rem'
import router from './router'
import api from '@/api'
import loading from '@/assets/js/common/loading'
import { Lazyload, Popup, Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs).use(Popup);
import 'vant/lib/index.css'
// 时间监控
import '@/assets/js/common/performance'
// 错误日志
import { errorHandler } from '@/assets/js/common/errorHandler'
Vue.config.errorHandler = errorHandler;
Vue.config.warnHandler = errorHandler;

// 公用方法封装
import apiProject from '@/page/anniversary/assets/js/api'
Vue.prototype.$api = apiProject
import app_xcx from "@/assets/js/common/app_xcx";
Vue.prototype.$ = app_xcx
import send from "@/assets/js/common/sendData.js";
Vue.prototype.$send = send
import WxMini from "@/assets/js/common/wx.mini";
Vue.prototype.$wx = WxMini;
import { getPath, getQueryString } from "@/assets/js/common/utils";
Vue.prototype.getPath = getPath;
Vue.prototype.getQueryString = getQueryString;
Vue.prototype.jump2web = function (url) {
  window.location.href = url
},

Vue.prototype.shareMini = function (img, title) {
  this.$.eventData({
    elementId: "share",
    pageName: "zhounian_06"
  });
  this.$.share({
    imgUrl: require("./assets/images/" + img),
    title: title,
    miniPath: window.location.origin + '/project/anniversary/view/' + this.$route.name,
    shareUrl: window.location.origin + '/project/anniversary/view/' + this.$route.name
  })
}
// 懒加载
Vue.use(Lazyload, {
  preLoad: 2,
  // error: 'static/error.png',
  loading: require('@/assets/images/common/loading_pic.png'),
  // attempt: 3,
  // listenEvents: ['scroll','touchmove']
});
Vue.use(loading)
Vue.config.productionTip = false

Vue.use(api)

// 过滤器全局化
import * as filters from '@/filter/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局组件
import HeaderBanner from '@/components/headerBanner'
import ToTop from '@/components/toTop'
import MsgBox from '@/components/msgBox'
Vue.component('HeaderBanner', HeaderBanner)
Vue.component('ToTop', ToTop)
Vue.component('MsgBox', MsgBox)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
