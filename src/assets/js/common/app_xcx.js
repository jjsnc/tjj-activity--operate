/*
 * @Author: Arthur_xu 
 * @Date: 2018-05-23 13:48:10 
 * @Last Modified by: miaozhuang
 * @Last Modified time: 2019-08-13 14:38:15
 */

import { _getTjjUuid } from './utils'
export class web {
    // 获得时间戳
    t() {
        return new Date().getTime()
    }
    // 网页host
    host() {
        return window.location.host
    }
    // 网址
    href() {
        return window.location.href
    }
    // 网页pathname
    pathname() {
        return window.location.pathname
    }
    // 判断是否为小程序
    xcx() {
        if ((window.location.href.indexOf('uuid=wechat') > -1)||(window.location.href.indexOf('uuid/wechat') > -1)) {
            return true
        }
        return false
    }
    // 和app交互的方法
    toAPP(type, params) {
        // taojiji+方法类型
        let url = `taojiji://${type}`
        let i = 0
        // 遍历参数
        console.log(params)
        for (let key in params) {
            if (i == 0) {
                url += '?'
            } else {
                url += '&'
            }
            if (typeof (params[key]) == 'object') {
                url += key + '=' + JSON.stringify(params[key])
            } else {
                url += key + '=' + encodeURIComponent(params[key])
            }
            i++
        }
        if (i == 0) {
            url += '?t=' + this.t()
        } else {
            url += '&t=' + this.t()
        }
        // 创建/修改iframe的src地址
        console.log("交互地址:" + url);
        let element = document.getElementById('tjj_iframe')
        if (element) {
            element.src = url
        } else {
            var ele = document.createElement('iframe')
            ele.style.cssText = 'display:none'
            ele.src = url
            ele.id = 'tjj_iframe'
            document.body.appendChild(ele)
        }
    }
    // 跳转商品的方法
    jump2good(params) {
        // 当传商品title的时候发起商品点击埋点
        // 神策二期埋点：给进入商品详情页的链接拼接 activityName:活动名(比如：618大促活动)
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
            if(params.funType){
                goods.funType = params.funType;

            }
            this.sendData(goods)
        }
        if (this.xcx()) {
            console.log(document.title)
            window.wx.miniProgram.navigateTo({
                url: '/pages/home/goodsDetail/goodsDetail?linkId=' + params.goodsId + "&pageTitle=" + document.title + "&activityName=" + document.title 
            })
        } else {
            this.toAPP('goods', params)
        }
    }
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
        if(params.funType){
            goods.funType = params.funType;
        }
        this.sendData(goods)
    }
    // 通用-埋点点击事件
    eventData(params){
        if (typeof params != 'object') params = {};
        console.log('通用-埋点点击事件');
        let event = {
            eventType: params.eventType|| 'tap',
            pageName: params.pageName || 'activity',
            elementId: params.elementId ||'',
            actUrl: params.actUrl || '',
        }
        if(params.dayNum){
            event.dayNum = params.dayNum;
        }
		 if(params.funType){
            event.funType = params.funType;
        }	
        if(params.dangweiType){
            event.dangweiType = params.dangweiType;
        }
        this.sendData(event)
    }
    eventGoods(params){
        if (typeof params != 'object') params = {};
        let event = {
            eventType: params.eventType|| 'tap',
            pageName: params.pageName || 'activity',
            elementId: params.elementId ||'',
            actUrl: params.actUrl || '',
            goodsId: params.goodsId,
            goodsName: params.goodsName
        }
        if(params.tabName){
            event.tabName=params.tabName;
        }
        this.sendData(event)
    }

    // 验证是否登录
    checkLogin() {
        this.toAPP('checkLogin')
    }
    pay(params) {
        this.toAPP('pay', params);
    }
    openWeb(params){
        if (this.xcx()) {
            window.location.href=params
        }else{
            this.toAPP('web',{
                'url':params
            })
        }
       
    }
   
    // app分享
    share(params) {
        
        console.log(params);
        if (this.xcx()) {
            console.log('小程序分享功能触发');
            // 周年庆小程序分享
            // shareActivity：1，是购物车，非1是其他
            let shareActivity = params.shareActivity||0;
            window.wx.miniProgram.navigateTo({
                url: '/pages/activity/share808/share808?shareActivity=' + shareActivity +
                    '&content=' + (params.content || "活动正在进行中") +
                    '&title=' + (params.title || "淘集集") +
                    '&shareUrl=' + encodeURIComponent('/pages/webview/webview?linkId=' + params.miniPath || "www.taojiji.com") +
                    '&imgUrl=' + (params.imgUrl || "http://tjjstatic.taojiji.com/webtjj/default/images/index/tjj_logo.png")
            })
        } else {
            if(params.native){
               var path=params.miniPath    
            }else{
                "/pages/webview/webview?linkId=" + (params.miniPath || window.location.href)
            }
            this.toAPP('share', {
               
                "content": params.content || "活动正在进行中",
                "imgUrl": params.imgUrl || "http://tjjstatic.taojiji.com/webtjj/default/images/index/tjj_logo.png",
                "shareType": params.shareType || 0,
                "shareUrl": params.shareUrl || "www.taojiji.com",
                "title": params.title || "淘集集",
                "miniPath": path
            })
        }
    }
    // 返回首页
    backHome() {
        if (this.xcx()) {
            window.wx.miniProgram.switchTab({
                url: '/pages/home/home'
            })
        } else {
            this.toAPP('backHome')
        }
    }
    // 跳转商铺
    startShopHome(params) {
        console.log(params)
        console.log('埋点-tap店铺')
        let shops = {
            eventType: 'tap',
            pageName: params.pageName || 'activity',
            elementId: params.elementId ||'shop',
            shopId: params.shopId,
            actUrl: params.actUrl || '',
            
        };
        if(params.shopName){
            shops.shopName = params.shopName
        };
        // 发起店铺埋点
        this.sendData(shops);
       
        if (this.xcx()) {
            window.wx.miniProgram.navigateTo({
                url: '/pages/home/goodsDetail/shopDetail/shopDetail?shopid=' + params.shopId
            })
        } else {
            this.toAPP('startShopHome', {
                'shopId': params.shopId
            });
        }
    }
    // 获取版本
    checkVersion(params) {
        this.toAPP('checkVersion', params)
    }
    // 获取平台
    checkOS(params) {
        this.toAPP('checkOS', params)
    }
    // 登入
    login(params) {
        console.log("zhixing")
        if (typeof params != 'object') params = {};
        setTimeout(()=>{
        	this.toAPP('login', {
	            "reload": 1,
	            'return_url':params.return_url || encodeURI(window.location.href)
        	})
        }, 300);
    }
    // 跳转分类页
    toCATE(params) {
        this.toAPP('toSecondDetail', {
            'catId': params.id,
            'cateName': params.name
        })
    }

    //进入小程序的限时抢购
    toMs(obj){
        wx.miniProgram.navigateTo({
            // url: `/pages/activity/flashSale/goodsDetail/goodsDetail?linkId=${item.goodsId}&title=${item.goodsName}&activityId=${item.activityId}`
               url: '/pages/activity/flashSale/goodsDetail/goodsDetail?linkId='+obj.goodsId+'&title='+obj.goodsName+'&activityId='+obj.activityId+'&nowActivityId='+obj.nowActivityId

        })
    }
          



    // 埋点
    sendData(params) {
        console.log(params);
        window.pageName = params.pageName;
        let u = navigator.userAgent; // 用户设备信息
        let uuid = this.getQueryString('uuid') || _getTjjUuid() || '';
        let netType = (u.match(/NetType\/\w+/) ? u.match(/NetType\/\w+/)[0] : 'NetType/other').toLowerCase().replace('nettype/', ''); // 网络状态
        let postUrl = window.location.host == 'activity.taojiji.com' ? 'https://app-log.taojiji.com/app/log' : 'https://app-log.tjjshop.cn/app/log';
        let _os = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 ? 'android' : '';

        const _baseParams = {
            os: _os ? _os + '-h5' : "h5",
            sysVer: '',
            imei: '',
            uuid: this.getQueryString('openId') || uuid,
            deviceID: uuid,
            chan: 'h5',
            appType: 4,
            appVer: this.getQueryString('version') || '',
            traceId: '',
            token: this.getQueryString('token') || '',
            uid: this.getQueryString('user_id') || '',
            session: this.getQueryString('sessionid') || this.getQueryString('session_id') || '',
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
    }
    // 获取url参数(通用)
    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)", "ig");
        var r = window.location.search.substr(1).match(reg);
        r == 'null' || r == 'undefined' ? r = null : '';
        if (r) {
            let val = r[r.length - 1].split('=')[1];
            return val == 'null' || val == 'undefined' ? null : val;
        }
        var r = this.getParams(name);
        r == 'null' || r == 'undefined' ? r = null : '';
        if (r) return r;
        return null;
    }
    // 获取url参数(/符号拼接参数)
    getParams(key) {
        let arr = window.location.pathname.split('/');
        let index = arr.lastIndexOf(key);
        return (index < 0 ? null : arr[index + 1]);
    }
    // 错误日志封装
    errorLogUpload(logLevel, errType, params, uri, apiUri, data, method, message, code) {
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
        })
    }
}
export default new web();
 