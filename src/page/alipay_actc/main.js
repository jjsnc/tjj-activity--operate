// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '@/assets/js/common/rem'
import router from './router'
import api from '@/api'
import loading from '@/assets/js/common/loading'
import { Lazyload, Popup } from 'vant';
Vue.use(Popup);
import 'vant/lib/index.css'
// 时间监控
import '@/assets/js/common/performance'
// 错误日志
import { errorHandler } from '@/assets/js/common/errorHandler'
Vue.config.errorHandler = errorHandler;
Vue.config.warnHandler = errorHandler;

// 公用方法封装
import apiProject from '@/page/alipay_actc/assets/js/api'
Vue.prototype.$api = apiProject
import app_xcx from "@/assets/js/common/app_xcx";
Vue.prototype.$ = app_xcx
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

// 注册全局组件
import ToTop from '@/components/toTop'
Vue.component('ToTop', ToTop)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
