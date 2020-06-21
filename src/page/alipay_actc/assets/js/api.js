import http from './../../../../api/http'
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
let apiJavaHost = process.env.NODE_ENV == 'development' ? '/apiJavaHost' : 'https://api.taojiji.com';

// 接口请求公共部分
let baseUrl = `${apiHost}/index.php`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

let url = {
    // 获取商品
    GoodList: `${apiJavaHost}/index.php/index/Goods/goodsList/showLoading/1`,
    GoodListJava: `${apiJavaHost}/activity-java/aliPay/goodsList/showLoading/1/isJava/1`,
    Banner: `${apiJavaHost}/activity-java/aliPay/banner/isJava/1`,
}
export default url;
