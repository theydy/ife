var log = console.log.bind(console)

var btn = document.querySelector("#button")
var winOut = document.querySelector("#out-window")
var btnSucc = document.querySelector("#success")
var btnBack = document.querySelector("#back")

var onCancelOutWin = function (el) {
    el.addEventListener("click", function (event) {
        if (this === event.target) {
            var div = document.querySelector(".out-container")
            div.classList.toggle("out-window-hidden")
            event.stopPropagation()
        }
    })
}

onCancelOutWin(btn)
onCancelOutWin(winOut)
onCancelOutWin(btnSucc)
onCancelOutWin(btnBack)
