import http from './../../../../api/http'
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
let apiFissileHost = process.env.NODE_ENV == 'development' ? '/apiFissileHost' : 'https://api-fissile.taojiji.com';
let apiJavaHost = process.env.NODE_ENV == 'development' ? '/apiJavaHost' : 'https://api.taojiji.com';

// 接口请求公共部分
let baseUrl = `${apiHost}/index.php`;
let fissileUrl = `${apiFissileHost}/anniversary.php/v1_0_0`;
let javaURL = `${apiJavaHost}/activity-java`;
let apisUrl = `${apiJavaHost}/wap`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

let url = {
    // 获取商品
	goods_info: `${javaURL}/activity/goodsList/isJava/1/showLoading/1`,
//	api_goodlist: `${apisUrl}/activity/getAliGoodsList`,
	api_goodlists: `${apisUrl}/crazy/goodslist`,
}
export default url;