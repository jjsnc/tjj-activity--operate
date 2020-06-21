// 免单购物 API接口请求文件管理

// 版本


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';

// 接口请求公共部分
// let baseUrl = `${apiHost}/newYearGift.php`;
let baseUrl = `${apiHost}/index.php`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;


let url = {
    // 秒杀
    GetGoodsSkillCategory: `${baseUrl}/AActivity/GetGoodsSkillCategory/showLoading/1`,
    // 获取商品
    GoodList: `${baseUrl}/ShandjjApi/getGoodsInfo/showLoading/1`,
    // 弹框领取优惠券
    coupon: `${baseUrl}/AActivity/couponReceiveFull/showLoading/0`,
    // 猜你喜欢商品
    recommend: `${baseUrl}/AActivity/recommend/showLoading/1`,
}
export default url;