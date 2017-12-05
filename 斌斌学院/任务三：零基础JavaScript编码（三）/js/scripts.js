/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
var getData = function () {
    /*
    coding here
    */

    /*
    data = [
        ["北京", 90],
        ["北京", 90]
        ……
    ]
    */
    var data = []
    var lis = document.querySelectorAll("#source li")
    
    for (var i = 0; i < lis.length; i++) {
        var item = lis[i].innerText.split("空气质量：")
        data.push(item)
    }

    return data

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
var sortAqiData = function (data) {
    var comp = function (a, b) {
        return a[1] - b[1]
    }

    data.sort(comp)
    return data
}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
var render = function (data) {
    var ul = document.querySelector("#resort")
    var rank = ["一", "二", "三", "四", "五", "六", "七",]

    ul.innerHTML = ""
    for (var i = 0; i < data.length; i++) {
        ul.insertAdjacentHTML('beforeend', `<li>第${rank[i]}名：${data[i][0]}空气质量：<b>${data[i][1]}</b></li>`)
    }
}

var btnHandle = function () {
    var aqiData = getData()
    aqiData = sortAqiData(aqiData)
    render(aqiData)
}

var init = function () {

    // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
    var btn = document.querySelector("#sort-btn")
    btn.addEventListener("click", function (event) {
        btnHandle()
    })
}

init()