
var log = console.log.bind(console)


var btnLefIn = document.querySelector("#left-in")
var btnRigIn = document.querySelector("#right-in")
var btnLefOut = document.querySelector("#left-out")
var btnRigOut = document.querySelector("#right-out")
var btnQuery = document.querySelector("#btn-query")
var div = document.querySelector("#show")


var checkValid = function (data) {
    if (data.length < 1) {
        alert("请输入非空数据")
        return false
    }
    return true
}

var insertNode = function (pos) {
    var insertForType = {
        "afterbegin" : function (dataList) {
            for (var i = dataList.length - 1; i >= 0; i--) {
                div.insertAdjacentHTML("afterbegin", `<span style="display:inline-block;margin:5px;padding:20px;background-color:red;">${dataList[i]}</span>`)
            }
        },
        "beforeend" : function (dataList) {
            for (var i = 0; i < dataList.length; i++) {
                div.insertAdjacentHTML("beforeend", `<span style="display:inline-block;margin:5px;padding:20px;background-color:red;">${dataList[i]}</span>`)
            }
        },
    }
    var inputData   = document.querySelector("#input").value
    var dataList = []
    if (checkValid(inputData)) {
        var re = /[^\w]/
        dataList = inputData.split(re)
        insertForType[pos](dataList)
    }
}

div.addEventListener("click", function (event) {
    var node = event.target
    if (node.nodeName.toLowerCase() == "span") {
        node.remove()
    }
})

btnLefIn.addEventListener("click", function (event) {
    insertNode("afterbegin")
})

btnRigIn.addEventListener("click", function (event) {
    insertNode("beforeend")
})

btnLefOut.addEventListener("click", function (event) {
    var firstNode = div.firstChild
    if (firstNode) {
        firstNode.remove()
    } else {
        alert("空队列")
    }
})

btnRigOut.addEventListener("click", function (event) {
    var lastNode = div.lastChild
    if (lastNode) {
        lastNode.remove()
    } else {
        alert("空队列")
    }
})

btnQuery.addEventListener("click", function (event) {
    var data = document.querySelector("#query").value
    var childNodes = div.childNodes
    for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].innerText.includes(data)) {
            childNodes[i].style.backgroundColor = "blue"
        } else {
            childNodes[i].style.backgroundColor = "red"
        }
    }
})
