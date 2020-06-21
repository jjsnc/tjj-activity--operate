import Router from 'vue-router'
import {
    beforeEach
} from '@/assets/js/common/router.com.js'

Vue.use(Router)
console.log(process.env.NODE_ENV);
let _base = process.env.NODE_ENV == 'development' ? 'project/anniversary/view' : 'project/anniversary/view';
console.log(_base)
const router = new Router({
    mode: 'history',
    base: _base,
    routes: [
        // 主会场
        {
            path: `/index*(.*)+`,
            name: 'index',
            component: resolve => require(['./../pages/hall/index/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '主会场',
            }
        },
        // 服饰会场
        {
            path: '/clothes*(.*)+',
            name: 'clothes',
            component: resolve => require(['./../pages/hall/clothes/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '服饰会场',
            }
        },
        // 美妆会场
        {
            path: '/makeup*(.*)+',
            name: 'makeup',
            component: resolve => require(['./../pages/hall/makeup/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '美妆会场',
            }
        },
        // 刺激返场
        {
            path: '/back*(.*)+',
            name: 'back',
            component: resolve => require(['./../pages/hall/back/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '刺激返场',
            }
        },
        // 数码会场
        {
            path: '/digit*(.*)+',
            name: 'digit',
            component: resolve => require(['./../pages/hall/digit/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '数码会场',
            }
        },
        // 美食会场
        {
            path: '/food*(.*)+',
            name: 'food',
            component: resolve => require(['./../pages/hall/food/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '美食会场',
            }
        },
        // 鞋包会场
        {
            path: '/shoesBag*(.*)+',
            name: 'shoesBag',
            component: resolve => require(['./../pages/hall/shoesBag/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '鞋包会场',
            }
        },
        // 百货会场
        {
            path: '/general*(.*)+',
            name: 'general',
            component: resolve => require(['./../pages/hall/general/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '百货会场',
            }
        },
        // 红包弹窗
        // {
        //     path: '/tiger*(.*)+',
        //     name: 'tiger',
        //     component: resolve => require(['./../pages/tiger_test/app.vue'], resolve),
        //     meta: {
        //         // requireAuth: true, // 判断是否需要登录
        //         title: '红包弹窗',
        //     }
        // },
        // 红包弹窗
        // {
        //     path: '/test*(.*)+',
        //     name: 'test',
        //     component: resolve => require(['./../components/tiger.vue'], resolve),
        //     meta: {
        //         // requireAuth: true, // 判断是否需要登录
        //         title: '红包弹窗test',
        //     }
        // },
        // 爆款买即送
        // {
        //     path: '/one*(.*)+',
        //     name: 'one',
        //     component: resolve => require(['./../pages/one/app.vue'], resolve),
        //     meta: {
        //         // requireAuth: true, // 判断是否需要登录
        //         title: '爆款买即送',
        //     }
        // },
        // 限量半价
        {
            path: '/half*(.*)+',
            name: 'half',
            component: resolve => require(['./../pages/half/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '限量半价',
            }
        },
        // 清空购物车
        {
            path: '/qkcart*(.*)+',
            name: 'qkcart',
            component: resolve => require(['./../pages/qkcart/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '清空购物车',
            }
        },
		// 分享后点开的小程序页面
        {
            path: '/qk_wechat*(.*)+',
            name: 'qk_wechat',
            component: resolve => require(['./../pages/qk_wechat/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '清空购物车',
            }
        },
        // 8亿现金免费领
        {
            path: '/sign*(.*)+',
            name: 'sign',
            component: resolve => require(['./../pages/sign/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '8亿现金免费领',
            }
        },
        // 万劵齐发
        {
            path: '/coupon*(.*)+',
            name: 'coupon',
            component: resolve => require(['./../pages/coupon/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '万劵齐发',
            }
        },
        // 男神穿搭
        {
            path: '/boy*(.*)+',
            name: 'boy',
            component: resolve => require(['./../pages/boy/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '男神穿搭',
            }
        },
        // 女神穿搭
        {
            path: '/girl*(.*)+',
            name: 'girl',
            component: resolve => require(['./../pages/girl/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '女神穿搭',
            }
        },
        // 主妇优选
        {
            path: '/woman*(.*)+',
            name: 'woman',
            component: resolve => require(['./../pages/woman/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '主妇优选',
            }
        },
		// 扎气球
        {
            path: '/balloon*(.*)+',
            name: 'balloon',
            component: resolve => require(['./../pages/balloon/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '扎气球',
            }
        },
        //热销榜单
        {
            path: '/hot*(.*)+',
            name: 'hot',
            component: resolve => require(['./../pages/hot/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '热销榜单',
            }
        },
        // 周年庆攻略
        {
            path: '/strategy*(.*)+',
            name: 'strategy',
            component: resolve => require(['./../pages/strategy/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '周年庆攻略',
            }
        },
        // 开学快乐
        {
            path: '/openschool*(.*)+',
            name: 'openschool',
            component: resolve => require(['./../pages/openschool/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '开学快乐',
            }
        },
        // else
        {
            path: `*`,
            name: 'index',
            component: resolve => require(['./../pages/hall/index/app.vue'], resolve),
            meta: {
                // requireAuth: true, // 判断是否需要登录
                title: '主会场',
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
