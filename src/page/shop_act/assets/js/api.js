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

// https://growth.taojiji.com
// https://growth.tjjshop.cn

let apiUrl = 'https://growth.taojiji.com';
// apiUrl = process.env.NODE_ENV == 'development' ? '/handSomeBoyHost' : 'https://growth.taojiji.com';

let url = {
    // 秒杀
    GetGoodsSkillCategory: `${baseUrl}/ShandjjApi/getSpikeDataJava/showLoading/1`,
    // 获取商品
    GoodList: `${baseUrl}/ShandjjApi/getGoodsInfo/showLoading/1`,
    // 主会场-获取倒计时
    CountDownUrl: `${apiUrl}/activity/activity/deadline/showLoading/1`,
    // 万券齐发-获取列表
    GetCouponList: `${apiUrl}/activity/activity/getcouponlist/showLoading/1`,
    // 万券齐发-领取优惠券
    GetCouponInfo: `${apiUrl}/activity/activity/getcouponinfo/showLoading/1`,
    //抽奖接口
    GetDraw: `${apiUrl}/activity/activity/getdraw/showLoading/1`,
    //获取用户抽奖次数
    GetUserCount: `${apiUrl}/activity/activity/getusercount/showLoading/1`,
    //获取淘好礼底部商品接口
    GetTaoGoodList: `${apiUrl}/activity/index/gettaogoods/showLoading/1`,
}
export default url;
