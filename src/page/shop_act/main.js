// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/js/rem'
import router from './router'
// import VueTouch from 'vue-touch'
import api from '@/api'
// import tapConfig from '@/assets/js/common/tapCount'
import loading from '@/assets/js/common/loading'
import { Lazyload , Popup } from 'vant';
import 'vant/lib/index.css'
import {errorHandler} from '@/assets/js/common/errorHandler'
import '@/assets/js/common/performance'
Vue.config.errorHandler = errorHandler;
Vue.config.warnHandler  = errorHandler;
Vue.use(Popup);
// Vue.use(VueTouch, {
//   name: 'v-touch'
// })
// VueTouch.config.swipe = {
//   threshold: 100 //手指左右滑动距离        
// }
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
// Vue.prototype.$tapConfig = tapConfig

Vue.use(api)
// Vue.prototype.$http = axiosWrap

// 过滤器全局化
import * as filters from '@/filter/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局组件
import headerBanner from '@/components/headerBanner'
import toTop from '@/components/toTop'
import msgBox from '@/components/msgBox'
Vue.component('headerBanner', headerBanner)
Vue.component('ToTop', toTop)
Vue.component('msgBox', msgBox)

// 注册本项目的全局组件
import bottomNav from './components/bottomNav'
Vue.component('bottomNav', bottomNav)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App,
    },
    template: '<App/>'
})
