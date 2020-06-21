//import App from "@/assets/js/common/wap.app.js";
import {
    changeTitle, jump2Login, _getUserInfo
} from '@/assets/js/common/utils'

 // import './vconsole'

// 获取url参数(&符号拼接参数)
const _getQueryString = (url, name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)", "ig");
    var r;
    var _url = '?' + url.split('?')[1];
    r = _url.substr(1).match(reg);
    r == 'null' || r == 'undefined' ? r = null : '';
    if (r){
        var val = r[r.length-1].split('=')[1];
        return val == 'null' || val == 'undefined' ? null : val;
    } 
    // if (r) return unescape(r[2]) == 'null' || unescape(r[2]) == 'undefined' ? null : unescape(r[2]);
    var r = _getParams(url, name);
    r == 'null' || r == 'undefined' ? r = null : '';
    if (r) return r;
    return null;
}
// 获取url参数(/符号拼接参数)
const _getParams = (url, key) => {
    var _url = url.split('?')[0];
    var arr = _url.split('/');
    var index = arr.lastIndexOf(key);
    return (index < 0 ? null : arr[index + 1]);
}

let session_id = _getQueryString(location.href, 'session_id'), // 小程序标识
    os = _getQueryString(location.href, 'os'), // APP标识
    wxLoginBack = _getQueryString(location.href, 'wxLoginBack'); // 微信授权登录回调标识
    // console.log('aaaaaaaaa')

// 设置公共参数并跳转路由
const saveCommonParams = (type, to, next) => {
    let user_info = {};
    let _fullPath = to.fullPath;
    switch (type) {
        case 'save': // 首次保存
            _getQueryString(_fullPath, 'user_id') ? user_info.user_id = _getQueryString(_fullPath, 'user_id') : '';
            _getQueryString(_fullPath, 'token') ? user_info.token = _getQueryString(_fullPath, 'token') : '';
            _getQueryString(_fullPath, 'uuid') ? user_info.uuid = _getQueryString(_fullPath, 'uuid') : '';
            _getQueryString(_fullPath, 'os') ? user_info.os = _getQueryString(_fullPath, 'os') : '';
            _getQueryString(_fullPath, 'session_id') ? user_info.session_id = _getQueryString(_fullPath, 'session_id') : '';
            _getQueryString(_fullPath, 'sessionid') ? user_info.sessionid = _getQueryString(_fullPath, 'sessionid') : '';
            break;
        default:
            break;
    }
    session_id || os ? sessionStorage.setItem('tjj_fission_user', JSON.stringify(user_info)) : localStorage.setItem('tjj_fission_user', JSON.stringify(user_info));
    // localStorage.setItem('tjj_fission_user', JSON.stringify(user_info));
    console.log(user_info.user_id)
    // next();
}

export const beforeEach = (to,from,next,_temp, _base,callback) => {
    let user_info = _getUserInfo();

    // 针对路由加class名
    if(to.name == 'strategy'){
        document.getElementsByTagName('html')[0].classList.add('strategy');
        document.getElementsByTagName('body')[0].classList.add('strategy');
    }else{
        document.getElementsByTagName('html')[0].classList.remove('strategy');
        document.getElementsByTagName('body')[0].classList.remove('strategy');
    }

    changeTitle(to.meta.title);
    let is_xcx = JSON.parse(sessionStorage.getItem('tjj_xcx_user'));
    console.log(is_xcx);
    if(!is_xcx){
        var windowUrl = window.location.href;
        console.log(windowUrl);
        var xcxUserInfo={}
        if (windowUrl.indexOf("uuid=wechat") > -1) {
           xcxUserInfo.user_id =  _getQueryString(windowUrl, 'user_id')
           xcxUserInfo.token =  _getQueryString(windowUrl, 'token')
           xcxUserInfo.uuid = "wechat"
           xcxUserInfo.path=true;
           sessionStorage.setItem('tjj_xcx_user', JSON.stringify(xcxUserInfo))
        }
     
        
        
    }else{
        console.log("cunle ");
        var windowUrl = window.location.href;
        console.log(windowUrl);
        var xcxUserInfo={}
        if (windowUrl.indexOf("uuid=wechat") > -1) {
           xcxUserInfo.user_id =  _getQueryString(windowUrl, 'user_id')
           xcxUserInfo.token =  _getQueryString(windowUrl, 'token')
           xcxUserInfo.uuid = "wechat"
           xcxUserInfo.path=true;
           sessionStorage.setItem('tjj_xcx_user', JSON.stringify(xcxUserInfo))
        }
    }
    // // 微信分享存储首次进入的页面
    // if(!sessionStorage.getItem('TJJ_fissile_shareUrl') || wxLoginBack == 1){
    //     sessionStorage.setItem('TJJ_fissile_shareUrl', location.href)
    // }

    // if(!_temp && (((os || session_id) && !user_info.user_id) || wxLoginBack == 1)){// app或小程序中记录登录信息
    //     typeof callback == 'function' ? callback() : ''
    //     saveCommonParams('save', to, next);
    //     user_info = _getUserInfo();
    //     // return;
    // }
    // if (to.meta.requireAuth && !user_info.user_id) { // 判断当前页面是否需要登录
    //     jump2Login({
    //         return_url: `https://${location.host}/${_base}${to.path}`
    //     })
    //     return;
    // }

    next();
}