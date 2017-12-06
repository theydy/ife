
var log = console.log.bind(console)


var btnLefIn = document.querySelector("#left-in")
var btnRigIn = document.querySelector("#right-in")
var btnLefOut = document.querySelector("#left-out")
var btnRigOut = document.querySelector("#right-out")
var div = document.querySelector("#show")
var btnSort = document.querySelector("#sort")


var checkValid = function (data) {
    if (data.length < 1) {
        alert("请输入数字")
        return false
    }
    data = Number(data)
    if (isNaN(data)) {
        alert("请输入数字")
        return false
    }
    if (!(data >= 10 && data <= 100)) {
        alert("请输入[10,100]范围内的数字")
        return false
    }
    return true
}

var insertNode = function (pos) {
    var inputData   = document.querySelector("#input").value
    var note = `<span style="display:inline-block;margin:2px;width:15px;height:${inputData}px;background-color:red;"></span>`
    
    if (div.childNodes.length > 60) {
        alert("当前节点已经达到最大值，60个")
        return
    }
    if (checkValid(inputData)) {
        div.insertAdjacentHTML(pos, note)
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

btnSort.addEventListener("click", function (event) {
    var childNodes = div.childNodes
    var data = []
    for (var i = 0; i < childNodes.length; i++) {
        var num = Number(childNodes[i].style.height.split("px")[0])
        data.push(num)
    }
    data.sort(function (a, b) {
        return a - b
    })
    for (var i = 0; i < childNodes.length; i++) {
        childNodes[i].style.height = `${data[i]}px`
    }
})
