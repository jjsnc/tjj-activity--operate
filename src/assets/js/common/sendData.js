	/**
	 * 发送埋点数据
	 * @param {*} fun_name 
	 * @param {*} fun_type 
	 * @param {*} user_id 
	 * 
	 */
	import axios from 'axios';
	import qs from 'qs'

	function sendPoint(params) {
	    var channel = params.url_from;
	    var url = window.location.href;
	    var origin = window.location.$router;
	    //页面进入的三种来源 需要判断url是否是一种 
	    if (!origin) {
	        var source = ["index", "indexbanner", "classify", "advert", "hcswiper", "dressswiper", "foodswiper", "generalswiper", "makeupswiper", "shoesBagswiper", "dressclassify", "dressclassify", "foodclassify", "generalclassify", "makeupclassify", "shoesBagclassify"];
	        source.map(function (el) {
	            if (url.indexOf(el) > -1) {
	                origin = '/' + el
	            }
	        })
	    }

	    //页面进入的三种渠道 channel app携带参数app h5携带	html5 短信 sms 小程序  uuid=wechat
	    switch (channel) {
	        case 'app':
	            channel = 1
	            break;
	        case 'sms':
	            channel = 2;
	            break;
	        case 'html5':
	            channel = 4
	            break;
	        case '':
	            channel = 4;
	            break;
	        default:
	            channel = 4;
	            break;
	    };
	    if (url.indexOf("uuid=wechat") > -1) {
	        channel = 3
	    }

	    var event_id = new Date().getTime() + +params.user_id;

	    //如果是分类页 param1 就是分类页的 	
	    var tempParam1 = "";
	    if (origin == "/classify" || origin == "classify") {
	        tempParam1 = '首页$_$' + params.source + '$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    } else if (origin == "banner" || origin == "/banner") {
	        tempParam1 = '首页banner$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');

	    } else if (origin == "/indexbanner" || origin == "indexbanner") {
	        tempParam1 = '首页indexbanner$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    } else if (origin == "/advert" || origin == "advert") {
	        tempParam1 = '首页$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');

	    } else if (origin == "/index" || origin == "index") {
	        tempParam1 = '首页$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    } else {
	        tempParam1 = '首页$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    }
	    if (url.indexOf("hc_") > -1) {
	        tempParam1 = '首页hc_banner$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    }
	    if (url.indexOf("swiper") > -1) {
	        tempParam1 = '首页banner$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    }
	    if (url.indexOf("classify") > -1) {
	        tempParam1 = '首页$_$' + params.source + '$_$' + params.param1 + (params.param12 ? "$_$" + params.param12 : '');
	    }
	    console.log(tempParam1);

	    //发送给数据的url
	    var sendUrl = url.slice(0, url.indexOf("view")) + "view" + origin
	    console.log(sendUrl);
	    var tempJson = {
	        "app_market": -1,
	        "client_latitude": -1,
	        "client_longitude": -1,
	        "client_version": params.client_version || -1,
	        "cpu_id": -1,
	        "device_board": -1,
	        "device_display": -1,
	        "device_hardware": -1,
	        "device_iccid": -1,
	        "device_id": -1,
	        "device_imei": -1,
	        "device_imsi": -1,
	        "device_meid": -1,
	        "device_model": -1,
	        "device_name": -1,
	        "device_resolution": -1,
	        "device_serial": -1,
	        "login_mode": -1,
	        "network_type": -1,
	        "os_version": -1,
	        "platform": 3,
	        "product_line": "1",
	        "uuid": params.uuid || -1,
	        "wifi_mac": -1,
	        "event_record": [{
	            "event_id": event_id,
	            "fun_name": params.fun_name || -1,
	            "fun_type": params.fun_type || -1,
	            "log_time": new Date().format("yyyy-MM-dd hh:mm:ss"),
	            "gender": -1,
	            "is_new_user": -1,
	            "is_pay_user": -1,
	            "param1": tempParam1 || -1,
	            "param2": window.location.href,
	            "param3": channel || 4,
	            "param4": params.param4 || -1,
	            "param5": params.param5 || -1,
	            "param6": params.param6 || -1,
	            "param7": params.param7 || -1,
	            "param8": params.param8 || -1,
	            "param9": params.param9 || -1,
	            "param10": params.param10 || -1,
	            "pos_id": -1,
	            "user_id": params.user_id || -1
	        }]
	    };
	    var requestUrl = window.location.host == 'activity.taojiji.com' ? 'https://c.taojiji.com/v1.0.0/h/warehouse/appevent/client/batch/receive' : 'https://testc.taojiji.com/v1.0.0/h/warehouse/appevent/client/batch/receive';
	    post(requestUrl, tempJson, function (res) {
	        console.log(res);
	    });

	    function post(url, tempJson, fn) {
	        tempJson = JSON.stringify(tempJson);
	        var xhr = new XMLHttpRequest();
	        xhr.open("POST", url, true);
	        // 添加http头，发送信息至服务器时内容编码类型
	        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
	        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
	                fn.call(this, xhr.responseText);
	            }
	        };
	        xhr.send(tempJson);
	    }





	}
	// Date 日期格式化
	Date.prototype.format = function (format) {
	    var args = {
	        "M+": this.getMonth() + 1,
	        "d+": this.getDate(),
	        "h+": this.getHours(),
	        "m+": this.getMinutes(),
	        "s+": this.getSeconds(),
	        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
	        "S": this.getMilliseconds()
	    };
	    if (/(y+)/.test(format))
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var i in args) {
	        var n = args[i];
	        if (new RegExp("(" + i + ")").test(format))
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
	    }
	    return format;
	};
	export default {
	    sendPoint

	};
