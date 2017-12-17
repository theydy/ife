var log = console.log.bind(console)

var box = document.querySelector(".box")
var table = document.querySelector("tbody")
var dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var spanClass = ["box-top", "box-right", "box-bottom", "box-left"]
var dirIndex = 0
var pos = {
    "x": 6,
    "y": 7,
}

var changeClass = function () {
    box.children[0].className = spanClass[dirIndex]
}

var boundaryCheck = function (x, y) {
    var a = (x > 0) && (x < 11)
    var b = (y > 0) && (y < 11)
    return a && b
}

var go = function () {
    var newPos = pos
    var newX = newPos.x + dir[dirIndex][0]
    var newY = newPos.y + dir[dirIndex][1]
    var a
    if (boundaryCheck(newX, newY)) {
        newPos.x += dir[dirIndex][0]
        newPos.y += dir[dirIndex][1]
        a = table.children[newPos.x].children[newPos.y]
        a.insertBefore(box, null)
    }
}

var tunLef = function () {
    dirIndex -= 1
    dirIndex = dirIndex < 0 ? dirIndex + 4 : dirIndex
    changeClass()
}

var tunRig = function () {
    dirIndex += 1
    dirIndex %= 4
    changeClass()
}

var tunBac = function () {
    dirIndex += 2
    dirIndex %= 4
    changeClass()
}

var command = {
    "GO": go,
    "TUN LEF": tunLef,
    "TUN RIG": tunRig,
    "TUN BAC": tunBac,
}

document.querySelector("ol").addEventListener("click", function (event) {
    if (event.target.nodeName.toLowerCase() === "li") {
        command[event.target.innerText]()
    }
})