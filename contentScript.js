var port = chrome.runtime.connect({
    name: 'yanglu'
});

port.onMessage.addListener(function (msg) {
    console.log('收到消息' + msg + '准备起飞');

    $.post('http://localhost:9000/api/login', {
        code: "123123",
        password: "a0dad820007b98b4ceef4a05ed63a5a0",
        username: "17682300821"
    })
        .done(function () {
            port.postMessage('jump success');
            window.location.pathname = '/';
        })
        .fail(function (err) {
            console.log('fail', err);
        })
});

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var loop = function (cb, id) {
    var la = function () {
        setTimeout(function () {
            console.log(parseInt($(id).text()));
            if (parseInt($(id).text())) {
                cb(parseInt($(id).text()));
            } else {
                return la();
            }
        }, 0)
    };
    return la();
};

if (window.location.href.includes('https://item.jd.com/13641493591.html')) {
    var interval = setInterval(function () {
        if (new Date().Format("yyyy-MM-dd hh:mm:ss") >= '2017-08-31 19:59:56') {
            clearInterval(interval);
            loop(function (price) {
                if (price <= 1) {
                    var href = $("a#InitCartUrl").attr('href');
                    window.open(href);
                    port.postMessage('buy success');
                } else {
                    window.location.reload(true);
                }
            }, '.price.J-p-13641493591')
        }
    }, 1000)
}

if(window.location.href.includes('https://cart.jd.com/addToCart.html')) {
    window.location.href = 'https://trade.jd.com/shopping/order/getOrderInfo.action?rid='+Math.random();
}

if(window.location.href.includes('https://trade.jd.com/shopping/order/getOrderInfo.action?rid=')) {
    $('#order-submit').click()
}

