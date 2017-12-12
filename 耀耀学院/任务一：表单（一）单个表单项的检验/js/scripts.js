var log = console.log.bind(console)

var btn = document.querySelector(".validate-button")

var checkDataValidate = function (data) {
    var regexp = /[^x00-xff]/g
    data = data.trim().replace(regexp, 'ab')
    return (data.length > 3) && (data.length < 17)
}

btn.addEventListener("click", function (event) {
    var input = document.querySelector("#validate-input")
    var tips = document.querySelector(".validate-tips")
    if (checkDataValidate(input.value)) {
        tips.innerText = "通过测试"
        input.className = "validate-input validate-input-success"
        tips.className = "validate-tips validate-success"
    } else {
        tips.innerText = "字符数为4~16位"
        input.className = "validate-input validate-input-danger"
        tips.className = "validate-tips validate-danger"
    }
})





