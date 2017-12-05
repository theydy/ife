var aqiData = [
    ["北京", 90],
    ["上海", 50],
    ["福州", 10],
    ["广州", 50],
    ["成都", 90],
    ["西安", 100]
];

var aqiText = [
    "第一名",
    "第二名",
    "第三名",
    "第四名",
    "第五名",
];

(function () {
    /*
    在注释下方编写代码
    遍历读取aqiData中各个城市的数据
    将空气质量指数大于60的城市显示到aqi-list的列表中
    */
    var log = console.log.bind(console)
    var checkData = function(element) {
        return element[1] > 60
    }
    var comp = function(a, b) {
        return b[1] - a[1]
    }

    var ul = document.querySelector("#aqi-list")
    var newData = aqiData.filter(checkData)
    
    newData.sort(comp)
    for (var i = 0; i < newData.length; i++) {
        ul.insertAdjacentHTML("beforeend", `<li> ${aqiText[i]}: ${newData[i][0]}, ${newData[i][1]} </li>`)
    }

})();



















