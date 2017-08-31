$.get("https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2017-09-01&leftTicketDTO.from_station=HGH&leftTicketDTO.to_station=RJG&purpose_codes=ADULT")
 .done(function (data) {

 })
 .fail(function (err) {
     console.log(err);
 });
chrome.browserAction.onClicked.addListener(function (Tab) {
    console.log(Tab)
});