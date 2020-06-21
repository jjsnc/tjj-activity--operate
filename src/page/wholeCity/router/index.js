import Vue from 'vue'
import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)
console.log(process.env.NODE_ENV);
let _base = process.env.NODE_ENV == 'development' ? 'activity/project/wholeCity/view' : 'activity/project/wholeCity/view';
console.log(_base)
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 服饰
        {
            path: `/dress*(.*)+`,
            name: 'dress',
            component: resolve => require(['../pages/dress/dress.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '初夏味道衣见钟情',
            }
        },
        // 秒杀会场
        {
            path: `/flashSale*(.*)+`,
            name: 'flashSale',
            component: resolve => require(['../pages/flashSale/flashSale.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '热搜指数排行榜',
            }
        },
        // 食品
        {
            path: `/food*(.*)+`,
            name: 'food',
            component: resolve => require(['../pages/food/food.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '吃出甜蜜好食光',
            }
        },
        // 家居百货
        {
            path: `/general*(.*)+`,
            name: 'general',
            component: resolve => require(['../pages/general/general.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '居家正能量',
            }
        },
        // 主会场
        {
            path: `/happies*(.*)+`,
            name: 'happies',
            component: resolve => require(['../pages/happies/happies.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '惠动全城 一毛可拔',
            }
        },
        // 美妆母婴
        {
            path: `/makeup*(.*)+`,
            name: 'makeup',
            component: resolve => require(['../pages/makeup/makeup.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '辣妈萌宝出街',
            }
        },
        // 鞋包
        {
            path: `/shoesBag*(.*)+`,
            name: 'shoesBag',
            component: resolve => require(['../pages/shoesBag/shoesBag.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '春日活力趣味出游',
            }
        },
        // 攻略页面
        {
            path: `/strategy*(.*)+`,
            name: 'strategy',
            component: resolve => require(['../pages/strategy/strategy.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '攻略',
            }
        },
        // else
        {
            path: `*`,
            name: 'happies',
            component: resolve => require(['../pages/happies/happies.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '惠动全城 一毛可拔',
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
