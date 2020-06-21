// 免单购物 API接口请求文件管理

// 版本


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
// let baseUrl = `${apiHost}/newYearGift.php`;
let baseUrl = `${apiHost}/freeCharge.php`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

// 首页列表弹幕
export let danmuList = `${baseUrl}/Goods/user_stock_info`;
// 商品列表分类
export let tagsList = `${baseUrl}/Goods/cate_list/showLoading/1`;
// 免费送年货商品列表
export let goodsList = `${baseUrl}/Goods/goods_list/showLoading/1`;
// 我的送礼列表
export let myGoodsList = `${baseUrl}/order/order_list/showLoading/1`;
// 微信新老客页面跳转
export let diffPage = `${baseUrl}/Free/diffPage/showLoading/1`;



// 一级商品详情
export let goodsDetail = `${transpond}/goods-info/showLoading/1`;
// 二级商品详情
export let secondGoodsDetail = `${transpond}/goods-secondDetail`;

// 创建订单
export let orderAdd = `${baseUrl}/Order/create_order/showLoading/1`;
// 微信授权登录
export let wxLogin = `${baseUrl}/Login/wxLogin`;
// 校验登录token
export let checkToken = `${JAVAtranspond}/user-checkAccessToken`;

// jjsnc start 
// 发起分享详情
export let shareDetail = `${baseUrl}/Free/shareDetail/showLoading/1`;
// 猜你喜欢
export let freeGoodsList = `${baseUrl}/Free/goodsList/showLoading/1`;
//商品列表推荐
export let GoodsGoods_list = `${baseUrl}/Goods/goods_list/showLoading/1`;
// 分享页弹幕
export let shareDanmuList = `${baseUrl}/Goods/user_stock_info`;