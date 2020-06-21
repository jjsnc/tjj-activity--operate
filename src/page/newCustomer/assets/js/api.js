// 免单购物 API接口请求文件管理

// 版本


// 当前项目使用的域名前缀，本地用‘/apiHost’代理，打包后使用系统变量域名
let apiHost = process.env.NODE_ENV == 'development' ? '/apiHost' : '';
let apiHostFissile = process.env.NODE_ENV == 'development' ? '/apiHostFissile' : '';
// 接口请求公共部分
// let baseUrl = `${apiHost}/newYearGift.php`;
let baseUrl = `${apiHost}/index.php`;

// 公共转发接口
let transpond = `${baseUrl}/Transpond/request/api_url`;

// 公共java转发接口
let JAVAtranspond = `${baseUrl}/Transpond/request_java/api_url`;


// 首页列表
let url = {
    GoodList: `${baseUrl}/NewGuestGender/index`,
    TabList: `${baseUrl}/NewGuestCoupon/tabList`,
    //TabList: `https://fissile.taojiji.com/super.php/v1_0_0/super/cateList`,
    TabList: `${process.env.apiHost_fissile}/super.php/v1_0_0/super/cateList`,
    //TabListData: `https://api.taojiji.com/activity-java/activity/cate/goodsList`,
    TabListData: `${process.env.apiHost_java}/activity-java/activity/cate/goodsList`
}
export default url;