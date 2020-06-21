import wx from 'weixin-js-sdk';
import { _getTjjUuid } from './utils';

let web = {
  //获得时间戳
  t: function () {
    var myDate = new Date();
    return myDate.getTime();
  },

  //网页host
  host: window.location.host,
  windowUrl: window.location.href,
  //网页pathname
  pathname: window.location.pathname,
  //判断是否为小程序
  xcx: (function () {
    let x = false;
    if (window.location.href.indexOf('uuid=wechat') > -1) {
      x = true;
    }
    return x;
  }()),

  //和app交互的方法
  toAPP: (type, params) => {

    //taojiji+方法类型
    let url = `taojiji://${type}`
    var i = 0;
    //遍历参数
    console.log(params);
    for (var key in params) {
      if (i == 0) {
        url += '?';
      } else {
        url += '&';
      }
      if (typeof (params[key]) == 'object') {
        url += key + '=' + JSON.stringify(params[key]);
      } else {
        url += key + '=' + encodeURIComponent(params[key]);
      }
      i++;
    }
    if (i == 0) {
      url += '?t=' + web.t();
    } else {
      url += '&t=' + web.t();
    }
    //创建/修改iframe的src地址
    console.log("交互地址:" + url);
    let element = document.getElementsByTagName('iframe')[0];
    if (element) {
      element.src = url;
    } else {
      var ele = document.createElement('iframe');
      ele.style.cssText = 'display:none';
      ele.src = url
      document.body.appendChild(ele)
    }

  },

  /* 
     这里是app小程序交互相关的方法
     if判断里是小程序的方法else是app
  */

  // 跳转商品的方法
  jump2good: (params) => {
    // 当传商品title的时候发起商品点击埋点
    // 神策二期埋点：给进入商品详情页的链接拼接 activityName:活动名(比如：618大促活动)
    let scUrl = '';
    let appScObj = {};
    if(params.activityName){
      scUrl = "&activityName=" + params.activityName;
      appScObj.activityName = params.activityName;
    }
    if (params.goodsName) {
      console.log('埋点-tap商品')
      let goods = {
        eventType: 'tap',
        pageName: params.pageName || 'activity',
        elementId: params.elementId || 'goodsdetail',
        goodsId: params.goodsId,
        goodsName: params.goodsName,
        actUrl: params.actUrl || '',
      }
      web.sendData(goods);
    }
    if (web.xcx) {
      console.log(document.title);
      window.wx.miniProgram.navigateTo({
        url: '/pages/home/goodsDetail/goodsDetail?linkId=' + params.goodsId + "&pageTitle=" + document.title + scUrl
      })
    } else {
      appScObj['goodsId'] = params.goodsId;
      web.toAPP('goods', appScObj);
    }
  },
  // 进入页面发起埋点pv
  initPv(params) {
    if (typeof params != 'object') params = {};
    console.log('埋点-页面init发起');
    let goods = {
      eventType: 'view',
      pageName: params.pageName || 'activity',
      elementId: 'pv',
      actUrl: params.actUrl || '',
    }
    web.sendData(goods);
  },
  // //验证是否登录
  checkLogin: () => {
    web.toAPP('checkLogin');
  },
  //app分享
  share: function (params) {
    console.log(params);

    web.toAPP('share', {
      "content": params.content || "活动正在进行中",
      "imgUrl": "http://tjjstatic.taojiji.com/webtjj/default/images/index/tjj_logo.png",
      "shareType": params.shareType || 0,
      "shareUrl": params.shareUrl || "www.taojiji.com",
      "title": params.title || "淘集集"
    });
  },
  //返回app首页
  backHome: function () {
    if (web.xcx) {
      window.wx.miniProgram.switchTab({
        url: '/pages/home/home'
      })
    } else {
      web.toAPP('backHome');
    }

  },
  //跳转商铺
  startShopHome: function (params) {
    // 当传shopTag的时候发起店铺埋点。例如：shopTag:1
    console.log(params)
    if (params.shopTag) {
      console.log('埋点-tap店铺')
      let shops = {
        eventType: 'tap',
        pageName: params.pageName || 'activity',
        elementId: 'shop',
        shopId: params.shopId,
        actUrl: params.actUrl || '',
      }
      web.sendData(shops);
    }
    if (web.xcx) {
      window.wx.miniProgram.navigateTo({
        url: '/pages/home/goodsDetail/shopDetail/shopDetail?shopid=' + params.shopId
      })
    } else {
      web.toAPP('startShopHome', {
        'shopId': params.shopId
      });
    }

  },
  //获取版本
  checkVersion: function (params) {
    web.toAPP('checkVersion', params);
  },
  //获取平台
  checkOS: function (params) {
    web.toAPP('checkOS', params);
  },
  //登入
  login: function (params) {
    console.log("zhixing");
    let return_url = encodeURI(window.location.href);
    web.toAPP('login', {
      "reload": 1,
      'return_url': return_url
    });
  },
  //跳转分类页
  toCATE: function (params) {
    web.toAPP('toSecondDetail', {
      'catId': params.id,
      'cateName': params.name
    })
  },

  /*
    这里是通用方法
  */
  getUrlQuery: function (name, Url) {
    //URL GET 获取值
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i"),
      url = Url || location.href;
    if (reg.test(url))
      return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";

  },
  //埋点
  sendData: function (params) {
    console.log(params);
    window.pageName = params.pageName;
    let u = navigator.userAgent; //用户设备信息
    let uuid = web.getQueryString('uuid') || _getTjjUuid() || '';
    let netType = (u.match(/NetType\/\w+/) ? u.match(/NetType\/\w+/)[0] : 'NetType/other').toLowerCase().replace('nettype/', ''); //网络状态
    let postUrl = window.location.host == 'a.taojiji.com' ? 'https://app-log.taojiji.com/app/log' : 'https://app-log.tjjshop.cn/app/log';
    let _os = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 ? 'android' : '';

    const _baseParams = {
      os: _os ? _os + '-h5' : "h5",
      sysVer: '',
      imei: '',
      uuid: web.getQueryString('openId') || uuid,
      deviceID: uuid,
      chan: 'h5',
      appType: 4,
      appVer: web.getQueryString('version') || '',
      traceId: '',
      token: web.getQueryString('token') || '',
      uid: web.getQueryString('user_id') || '',
      session: web.getQueryString('sessionid') || web.getQueryString('session_id') || '',
      netType: netType || '',
      logType: '4',
      logLevel: 'info',
      cuid: uuid,
      login_mode: '',
      activityTitle: document.title,
      funType: 'h5',
      url: window.location.href,
      logTime: new Date().getTime()
    }

    if (typeof params != 'object') return;
    let postData = [Object.assign(_baseParams, params)];
    console.log(postData[0]);

    Vue.prototype.$http.post(postUrl, {
      appLog: 1,
      logData: [postData]
    }).then(res => {
      console.log(res.data);
    });
  },
  // 获取url参数(通用)
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)", "ig");
    var r;
    r = window.location.search.substr(1).match(reg);
    r == 'null' || r == 'undefined' ? r = null : '';
    if (r) {
      var val = r[r.length - 1].split('=')[1];
      return val == 'null' || val == 'undefined' ? null : val;
    }
    // if (r) return unescape(r[2]);
    var r = web.getParams(name);
    r == 'null' || r == 'undefined' ? r = null : '';
    if (r) return r;
    return null;
  },
  // 获取url参数(/符号拼接参数)
  getParams: function (key) {
    var url = window.location.pathname;
    var arr = url.split('/');
    var index = arr.lastIndexOf(key);
    return (index < 0 ? null : arr[index + 1]);
  },
  // 错误日志封装
  errorLogUpload: function(logLevel, errType, params, uri, apiUri, data, method, message, code){
    errorLogUpload({
      logLevel: logLevel,
      errType: errType,
      apiError: {
        params: JSON.stringify(params),
        uri: uri || window.location.href,
        apiUri: apiUri,
        data: JSON.stringify(data),
        method: method,
        message: message,
        code: code
      }
    });
  },
  // vue路由跳转带参
  vueRouterParams(activityName, routerName){
    return window.location.pathname.replace("/activity/project/"+activityName+"/view/" + routerName, '');
  }
}

export default {
  web
};
