import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)
console.log(process.env.NODE_ENV);
let _base = process.env.NODE_ENV == 'development' ? 'activity/project/happy/flashSale/view' : 'activity/project/happy/flashSale/view';
console.log(_base)
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        //详情页
        {
            path: `/flashSale*(.*)+`,
            name: 'flashSale',
            component: resolve => require(['../pages/flashSale.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '热搜指数排行榜',
            }
        },
       
        {
            path: `*`,
            name: 'flashSale',
            component: resolve => require(['../pages/flashSale.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '热搜指数排行榜',
            }
        },

    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            console.log(savedPosition)
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

let _temp = false;

router.beforeEach((to, from, next) => {
    beforeEach(to, from, next, _temp, _base, function () {
        _temp = true;
    });
})

export default router;
