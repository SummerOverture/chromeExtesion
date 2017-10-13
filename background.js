chrome.browserAction.setTitle({
    title: '点击我 我会帮你发送登录请求（帐号为杨璐）'
});12

var PORT;
var magnet = '';

chrome.runtime.onConnect.addListener(function (port) {
    console.log(port);
    PORT = port;
    port.onMessage.addListener(function (msg) {
        console.log(msg);
        if (msg === 'jump success') {
            new Notification('跳转成功', {
                icon: './cat.png',  // icon url - can be relative
                body: '已经为你跳转成功' // notification body text
            });
        } else if (msg === 'buy success') {
            new Notification('抢购成功', {
                icon: './cat.png',  // icon url - can be relative
                body: '已经为你抢购成功' // notification body text
            });
        }
    });
});

chrome.browserAction.onClicked.addListener(function (tab) {
    PORT.postMessage('on click');
});

chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
        if (request.id === 'setMagnet') {
            console.log(request);
        }
    });

