var log = console.log.bind(console)

var box = document.querySelector(".box")
var table = document.querySelector("tbody")
var dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]
var dirIndex = 0
var deg = 0
var pos = {
    "x": 6,
    "y": 7,
}

var changeDeg = function () {
    box.style.transform =   `rotate(${deg}deg)`
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
    if (boundaryCheck(newX, newY)) {
        newPos.x += dir[dirIndex][0]
        newPos.y += dir[dirIndex][1]
        box.style.top = 1 + newPos.x * 40 + "px"
        box.style.left = 1 + newPos.y * 40 + "px"
    }
}

var left = function () {
    deg -= 90
    dirIndex -= 1
    dirIndex = dirIndex < 0 ? dirIndex + 4 : dirIndex
}

var right = function () {
    deg += 90
    dirIndex += 1
    dirIndex %= 4
}

var back = function () {
    deg += 180
    dirIndex += 2
    dirIndex %= 4
}

var tunLef = function () {
    left()
    changeDeg()
}

var tunRig = function () {
    right()
    changeDeg()
}

var tunBac = function () {
    back()
    changeDeg()
}

var traDir = function (dir) {
    var index = dirIndex
    dirIndex = dir
    go()
    dirIndex = index
}

var traLef = function () {
    traDir(3)
}

var traTop = function () {
    traDir(0)
}

var traRig = function () {
    traDir(1)
}

var traBot = function () {
    traDir(2)
}

var movDir = function (dir, nDeg) {
    deg = nDeg
    dirIndex = dir
    changeDeg()
    go()
}

var movLef = function () {
    movDir(3, -90)
}

var movTop = function () {
    movDir(0, 0)
}

var movRig = function () {
    movDir(1, 90)
}

var movBot = function () {
    movDir(2, 180)
}

var command = {
    "GO": go,
    "TUN LEF": tunLef,
    "TUN RIG": tunRig,
    "TUN BAC": tunBac,
    "TRA LEF": traLef,
    "TRA TOP": traTop,
    "TRA RIG": traRig,
    "TRA BOT": traBot,
    "MOV LEF": movLef,
    "MOV TOP": movTop,
    "MOV RIG": movRig,
    "MOV BOT": movBot,
}

document.querySelector("ol").addEventListener("click", function (event) {
    if (event.target.nodeName.toLowerCase() === "li") {
        command[event.target.innerText]()
    }
})