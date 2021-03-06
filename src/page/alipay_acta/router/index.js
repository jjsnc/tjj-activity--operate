import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)
console.log(process.env.NODE_ENV);
let _base = process.env.NODE_ENV == 'development' ? 'project/alipay_acta/view' : 'project/alipay_acta/view';
console.log(_base)
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 主会场
        {
            path: `/index*(.*)+`,
            name: 'index',
            component: resolve => require(['./../pages/strday/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '两元集市',
            }
        },
        {
            path: '/strday*(.*)+',
            name: 'strday',
            component: resolve => require(['./../pages/strday/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '两元集市',
            }
        },
        {
            path: '/sunday*(.*)+',
            name: 'sunday',
            component: resolve => require(['./../pages/sunday/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '两元集市',
            }
        },
        // else
        {
            path: `*`,
            name: 'index',
            component: resolve => require(['./../pages/strday/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '两元集市',
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
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    if (isChunkLoadFailed) {
        // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题

        // const targetPath = $router.history.pending.fullPath;
        // $router.replace(targetPath);
    }

});
export default router;
