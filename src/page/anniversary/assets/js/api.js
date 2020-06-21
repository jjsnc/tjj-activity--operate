import http from './../../../../api/http'
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : 'https://api.taojiji.com';
let apiFissileHost = process.env.NODE_ENV == 'development' ? '/apiFissileHost' : 'https://api-fissile.taojiji.com';
let apiJavaHost = process.env.NODE_ENV == 'development' ? '/apiJavaHost' : 'https://api.taojiji.com';
let apiSuperHost = process.env.NODE_ENV == 'development' ? '/apiSuperHost' : 'https://fissile.taojiji.com';
let apiSuperJavaHost = process.env.NODE_ENV == 'development' ? '/apiSuperJavaHost' : 'https://api.taojiji.com';

// 接口请求公共部分
let baseUrl = `${apiHost}/index.php`;
let fissileUrl = `${apiFissileHost}/anniversary`;
let javaURL = `${apiJavaHost}/activity-java`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

let url = {
     // 获取会场顶部资源
     topData: `${fissileUrl}/Goods/link_list`,

     // 获取主会场秒杀时间
     spikeTime: `${apiJavaHost}/seckill-java/timeFiles/isJava/1`,
     // 获取主会场秒杀数据
     spikeData: `${apiJavaHost}/seckill-java/activity/list/isJava/1`,
     // -----------------商品列表---------------
     // 周年庆通用商品ID接口
     goods_list: `${fissileUrl}/Goods/goods_list/showLoading/1`,
     goods_list_noloading: `${fissileUrl}/Goods/goods_list`,
     // 周年庆通用商品列表接口
     goods_info: `${javaURL}/activity/goodsList/isJava/1/showLoading/1`,
     goods_info_noloading: `${javaURL}/activity/goodsList/isJava/1`,

     // -----------------优惠券接口---------------

     //------------------   万卷齐发领取优惠券接口  万券齐发优惠券列表      ----------------------------
     coupon_list: `${fissileUrl}/Category/coupon_list/showLoading/1`,
     receiveFullCoupon: `${apiJavaHost}/api.php/Wap/Coupon/receiveFullCoupon/showLoading/1`, 
     receiveCoupon: `${apiJavaHost}/api.php/wap/coupon/receiveCoupon/showLoading/1`, 
     
     

     // -----------------四个页面的优惠券（开学季、男神、女神、主妇）-----------------
     // 分类页分享领钱
     categoryShare: `${fissileUrl}/Category/share/showLoading/1/user_info/1`,
     // 通用分类页数据列表
     categoryList: `${fissileUrl}/Category/category/showLoading/1/user_info/1`,

     // -----------------摇摇乐-----------------
     // 滚动条
     tiger_info: `${fissileUrl}/Slots/user_stock_info`,
     // 抽奖机会
     tiger_chance: `${fissileUrl}/Slots/chance/user_info/1/showLoading/1`,
     // 分享
     tiger_share: `${fissileUrl}/Slots/share/user_info/1/showLoading/1`,
     // 摇奖
     tiger_draw: `${fissileUrl}/Slots/draw/user_info/1/showLoading/1`,
     window: `${fissileUrl}/Slots/window`,
     

     // -----------------签到领现金-----------------
     // 滚动条
     sign_scroll: `${fissileUrl}/Sign/scroll/showLoading/1`,
     // 签到列表
     sign_signList: `${fissileUrl}/Sign/signList/showLoading/1`,
     // 签到
     sign_sign: `${fissileUrl}/Sign/sign/showLoading/1`,
     // 超省新菜单
     sign_tab: `${apiSuperHost}/super.php/v1_0_0/super/cateList/showLoading/1`,
     // 超省新商品列表
     sign_goodsList: `${apiSuperJavaHost}/activity-java/activity/cate/goodsList/isJava/1/showLoading/1`,

     // -------------------清空购物车------------------
     // 清空购物车主页面
     clear_clearPage: `${fissileUrl}/Clear/clearPage/showLoading/1/user_info/1`,
     // 立即清空购物车
     clear_clearCart: `${fissileUrl}/Clear/clearCart/showLoading/1/user_info/1`,
     // TA们刚刚中奖了
     clear_clearScroll: `${fissileUrl}/Clear/clearScroll/showLoading/1`,
     // 清空购物车分享页面
     clear_sharePage: `${fissileUrl}/Clear/sharePage/showLoading/1`,
     // 清空购物车分享领券接口
     clear_getShare: `${fissileUrl}/Clear/getShare/showLoading/1/user_info/1`,
     // 清空购物车去下单
     clear_click: `${fissileUrl}/Clear/click/showLoading/1/user_info/1`,
     // 下单领券
     clear_getOrder: `${fissileUrl}/Clear/getOrder/showLoading/1/user_info/1`,
     // 抽奖券列表
     clear_couponList: `${fissileUrl}/Clear/couponList/showLoading/1/user_info/1`,

     // -----------------------扎气球-----------------------
     // 扎气球领奖
     prickballoon_get_rewards: `${fissileUrl}/Prickballoon/get_rewards/showLoading/1`,
     round_check: `${fissileUrl}/Prickballoon/round_check`,
     Prickballoon_window: `${fissileUrl}/Prickballoon/window`,
     // 本地时间
     getTime: function () {
          let date = new Date().getTime();
          return date / 1000;
     },
     // 服务器时间
     getNowTime: (() => {
          let Url = `${fissileUrl}/Prickballoon/now_time`;
          return http.get(Url).then(res => {
               let timeData = res.data
               if (timeData.result == 1) {
                    return timeData.data.time;
               } else {
                    return url.getTime()
               }
          }).catch(res => {
               return url.getTime()
          })
     })
}
export default url;

