window.onload = function () {
    var BGPAGE = chrome.extension.getBackgroundPage();
    var REQUEST = chrome.tabs.sendRequest;
    var tabId = '';

    $('#login').on('click', function () {
        var port = chrome.runtime.connect({
            name: 'content'
        });
        REQUEST(tabId, { id: "login" }, function (response) {
            if (response === 'jump success') {
                new Notification('跳转成功', {
                    icon: './cat.png',  // icon url - can be relative
                    body: '已经为你跳转成功' // notification body text
                });
            }
        });
    });

    chrome.tabs.getSelected(null, function (tab) {
        tabId = tab.id;
    });
    $('#autoCopy').on('click', function () {
        console.log(1);
        REQUEST(tabId, { id: "getMagnet" }, function (response) {
            if (response) {
                console.log(response);
                BGPAGE.magnet = response;
            }
        });
    });

    $('#autoFill').on('click', function () {
        console.log(2);
        REQUEST(tabId, { id: "setMagnet", data: BGPAGE.magnet }, function () {
            new Notification('已经为您添加一条', {
                icon: './cat.png',  // icon url - can be relative
                body: '已经为您添加一条' // notification body text
            });
        })
    });
};

console.log(1);