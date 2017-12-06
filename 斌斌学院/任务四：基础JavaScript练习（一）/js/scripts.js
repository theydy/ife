
var log = console.log.bind(console)


var btnLefIn = document.querySelector("#left-in")
var btnRigIn = document.querySelector("#right-in")
var btnLefOut = document.querySelector("#left-out")
var btnRigOut = document.querySelector("#right-out")
var div = document.querySelector("#show")


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
    return true
}

var insertNode = function (pos) {
    var inputData   = document.querySelector("#input").value
    var note = `<span style="display:inline-block;margin:5px;padding:20px;background-color:red;">${inputData}</span>`
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

