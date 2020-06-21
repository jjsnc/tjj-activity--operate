import Vue from 'vue'
import Router from 'vue-router'
import { beforeEach } from '@/assets/js/common/router.com.js'

Vue.use(Router)
console.log(process.env.NODE_ENV);
let _base = process.env.NODE_ENV == 'development' ?  'activity/project/newCustomer/view' : 'activity/project/newCustomer/view';
console.log(_base)
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        //详情页
        {
            path: `/index*(.*)+`,
            name: 'newCustomer',
            component: resolve => require(['../pages/newCustomer.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '新人暴击低价',
            }
        },
        {
            path: `*`,
            name: 'newCustomer',
            component: resolve => require(['../pages/newCustomer.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '新人暴击低价',
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
