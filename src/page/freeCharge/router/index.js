import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)

let _base = 'freeCharge/view';

const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        //详情页
        {
            path: `/goodsDetail*(.*)+`,
            name: 'goodsDetail',
            component: resolve => require(['../pages/goodsDetail.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免单购物团',
            }
        },
        //分享页页
        {
            path: `/share*(.*)+`,
            name: 'share',
            component: resolve => require(['../pages/share.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免单购物团',
            }
        },
        // 首页(无路由匹配都进入这个页面)
        {
            path: `/home`,
            name: 'freeCharge',
            component: resolve => require(['../pages/home.vue'], resolve),
            children: [{
                    path: '/home/myFree*(.*)+',
                    name: 'myFree',
                    component: resolve => require(['../pages/myFree.vue'], resolve),
                    meta: {
                        // requireAuth: true, // 判断是否需要登录
                        title: '免单购物团',
                    }
                },
                {
                    path: '*(.*)+',
                    name: 'todayFree',
                    component: resolve => require(['../pages/mainFree.vue'], resolve),
                    meta: {
                        title: '免单购物团',
                    }
                },


            ],
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '免单购物团'
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
