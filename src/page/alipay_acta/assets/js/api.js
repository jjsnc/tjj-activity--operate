import http from './../../../../api/http'
// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
let apiFissileHost = process.env.NODE_ENV == 'development' ? '/apiFissileHost' : 'https://api-fissile.taojiji.com';
let apiJavaHost = process.env.NODE_ENV == 'development' ? '/apiJavaHost' : '';

// 接口请求公共部分
let baseUrl = `${apiHost}/index.php`;
let fissileUrl = `${apiFissileHost}/anniversary.php/v1_0_0`;
let javaURL = `${apiJavaHost}/activity-java`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;

let url = {
    // 获取商品
//  GoodList: `${baseUrl}/ShandjjApi/getGoodsInfo/showLoading/1`,
	GoodList: `${apiFissileHost}/index.php/index/transpond/request_java/host_type/8/api_url/getGoods-info/is_post/1/showLoading/1`,
}
export default url;
