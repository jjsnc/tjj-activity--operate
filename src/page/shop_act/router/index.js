import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)
console.log(process.env.NODE_ENV);
let _base = process.env.NODE_ENV == 'development' ? 'project/shop_act/view' : 'project/shop_act/view';
console.log(_base)
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 618主会场
        {
            path: `/index*(.*)+`,
            name: 'index',
            component: resolve => require(['../pages/index/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618主会场',
            }
        },
        // 618万券齐发
        {
            path: `/coupon*(.*)+`,
            name: 'coupon',
            component: resolve => require(['../pages/coupon/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618万券齐发',
            }
        },
        // 618活动攻略
        {
            path: `/strategy*(.*)+`,
            name: 'strategy',
            component: resolve => require(['../pages/strategy/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618活动攻略',
            }
        },
        // else
        {
            path: `*`,
            name: 'index',
            component: resolve => require(['../pages/index/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618主会场',
            }
        },
        // 618服饰分会场
        {
            path: `/clothes*(.*)+`,
            name: 'clothes',
            component: resolve => require(['../pages/clothes/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618服饰分会场',
            }
        },
        // 618鞋包分会场
        {
            path: `/shoe*(.*)+`,
            name: 'shoe',
            component: resolve => require(['../pages/shoe/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618鞋包分会场',
            }
        },
        // 618美妆分会场 
        {
            path: `/beauty*(.*)+`,
            name: 'beauty',
            component: resolve => require(['../pages/beauty/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618美妆分会场 ',
            }
        },
        // 618食品分会场 
        {
            path: `/food*(.*)+`,
            name: 'food',
            component: resolve => require(['../pages/food/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618食品分会场 ',
            }
        },
        // 618活动3C分会场
        {
            path: `/digital*(.*)+`,
            name: 'digital',
            component: resolve => require(['../pages/digital/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618活动3C分会场',
            }
        },
        // 618百货分会场
        {
            path: `/baibao*(.*)+`,
            name: 'baibao',
            component: resolve => require(['../pages/baibao/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618百货分会场',
            }
        },
        // 618活动9块9超值分会场
        {
            path: `/nine*(.*)+`,
            name: 'nine',
            component: resolve => require(['../pages/nine/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618活动9块9超值分会场',
            }
        }, 
        // 618热销榜单分会场
        {
            path: `/hot*(.*)+`,
            name: 'hot',
            component: resolve => require(['../pages/hot/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618热销榜单分会场',
            }
        }, 
        // 618免费淘好礼
        {
            path: `/games*(.*)+`,
            name: 'games',
            component: resolve => require(['../pages/games/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '618免费淘好礼',
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
    if(isChunkLoadFailed){
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
   
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
    }

});
export default router;
