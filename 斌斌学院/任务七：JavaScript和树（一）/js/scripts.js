
var log = console.log.bind(console)

var btnPrOrder = document.querySelector("#btn-pr-order")
var btnMidOrder = document.querySelector("#btn-mid-order")

var structNode = function () {
    this.value = null
    this.left = null
    this.right = null
}

var resetColor = function() {
    var divs = document.querySelectorAll(".node-block")
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = "white"
    }
}

var initTree = function (currNode, currElement) {
    var root = currNode
    var childNode = currElement.children
    var childL = new structNode()
    var childR = new structNode()

    root.value = currElement
    root.value.style.backgroundColor = "white"
    if (!childNode.length) {
        return
    }
    root.left = childL
    root.right = childR
    initTree(root.left, childNode[0])
    initTree(root.right, childNode[1])
    
    return root
}


var preOrder = function (rootNode) {
    if (!rootNode) {
        return
    }
    var div = rootNode.value
    div.style.backgroundColor = "red"
    if (rootNode.right) {
        queue.unshift(rootNode.right)
    }
    if (rootNode.left) {
        queue.unshift(rootNode.left)
    }
    setTimeout(function() {
        var n = queue.shift()
        preOrder(n)
    }, 500)
}

var middleOrder = function (rootNode) {
    if (!rootNode) {
        return
    }
    var flag = rootNode.left
    if (flag) {
        if (flag.value.style.backgroundColor === "red") {
            flag = 1
        } else {
            flag = 0
        }
    } else {
        flag = 1
    }
    if (flag === 1) {
        var div = rootNode.value
        div.style.backgroundColor = "red"
        setTimeout(function() {
            var n = queue.shift()
            middleOrder(n)
        }, 500)
    } else {
        if (rootNode.right) {
            queue.unshift(rootNode.right)
        }
        if (rootNode.left) {
            queue.unshift(rootNode)
            queue.unshift(rootNode.left)
        }
        var n = queue.shift()
        middleOrder(n)
    }
}

// var laterOrder = function (rootNode) {
//     if (!rootNode) {
//         return
//     }
//     var flag = rootNode.left
//     if (flag) {
//         if (flag.value.style.backgroundColor === "red") {
//             flag = 1
//         } else {
//             flag = 0
//         }
//     } else {
//         flag = 1
//     }
//     if (flag === 1) {
//         var div = rootNode.value
//         div.style.backgroundColor = "red"
//         setTimeout(function() {
//             var n = queue.shift()
//             laterOrder(n)
//         }, 500)
//     } else {
//         if (rootNode.right) {
//             queue.unshift(rootNode.right)
//         }
//         if (rootNode.left) {
//             queue.unshift(rootNode)
//             queue.unshift(rootNode.left)
//         }
//         var n = queue.shift()
//         laterOrder(n)
//     }
// }


var queue = []
var root = new structNode()
var div = document.querySelector(".node-block")

root = initTree(root, div)


btnPrOrder.addEventListener("click", function (event) {
    if (queue.length > 0) {
        alert("请等待动画结束。")
        return
    }
    resetColor()
    setTimeout(function() {preOrder(root)}, 500)
})

btnMidOrder.addEventListener("click", function (event) {
    if (queue.length > 0) {
        alert("请等待动画结束。")
        return
    }
    resetColor()
    setTimeout(function() {middleOrder(root)}, 500)
})
