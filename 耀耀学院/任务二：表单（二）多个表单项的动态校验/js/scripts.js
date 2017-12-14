var log = console.log.bind(console)

var divList = document.querySelectorAll(".validate-line")

var checkDataNamePw = function (data) {
    var regexp = /[^x00-xff]/g
    data = data.trim().replace(regexp, 'ab')
    return (data.length > 3) && (data.length < 17)
}

var checkDataRepPw = function (data) {
    var pw1 = divList[1].children[1].value
    return (pw1 === data) && (data.length > 0)
}

var checkDataEmail = function (data) {
    var regexp = /^[a-z|A-Z|_|0-9][a-z|A-Z|0-9|_|.]*@[a-z|A-Z|0-9]+\.com$/g
    return (data.length > 0) && data.match(regexp)
}

var checkDataPhone = function (data) {
    var regexp = /^\d\d{9}\d$/g
    return (data.length > 0) && data.match(regexp)
}

var checkValidate = function (checkFunc, div, target, succText, failText) {
    var input = target
    if (input.nodeName.toLowerCase() === "input") {
        var tips = div.querySelector(".validate-tips")
        tips.style.display = "block"
        if (checkFunc(input.value)) {
            tips.innerText = succText
            input.className = "validate-input validate-input-success"
            tips.className = "validate-tips validate-success"
            return true
        } else {
            tips.innerText = failText
            input.className = "validate-input validate-input-danger"
            tips.className = "validate-tips validate-danger"
            return false
        } 
    }
}

var showTips = function (event, div) {
    var input = event.target
    if (input.nodeName.toLowerCase() === "input") {
        var tips = div.querySelector(".validate-tips")
        tips.style.display = "block"
    }
}

divList[0].addEventListener("focusout", function (event) {
    checkValidate(checkDataNamePw, this, event.target, "可用名称", "字符数为4~16位")
})

divList[1].addEventListener("focusout", function (event) {
    checkValidate(checkDataNamePw, this, event.target, "密码可用", "不可用密码")
})

divList[2].addEventListener("focusout", function (event) {
    checkValidate(checkDataRepPw, this, event.target, "密码输入一致", "两次密码输入不一致")
})

divList[3].addEventListener("focusout", function (event) {
    checkValidate(checkDataEmail, this, event.target, "邮箱格式正确", "邮箱格式错误")
})

divList[4].addEventListener("focusout", function (event) {
    checkValidate(checkDataPhone, this, event.target, "手机格式正确", "手机格式错误")
})


for (var i = 0; i < divList.length - 1; i++) {
    divList[i].addEventListener("focusin", function (event) {
        showTips(event, this)
    })
}

divList[5].addEventListener("click", function (event) {
    var flag = true
    var checkFunc = [checkDataNamePw,checkDataNamePw,
                     checkDataRepPw,checkDataEmail,checkDataPhone]
    var resultText = [
        ["可用名称", "字符数为4~16位"],
        ["密码可用", "不可用密码"],
        ["密码输入一致", "两次密码输入不一致"],
        ["邮箱格式正确", "邮箱格式错误"],
        ["手机格式正确", "手机格式错误"],
    ]
    var input = event.target
    if (input.nodeName.toLowerCase() === "input") {
        for (var i = 0; i < divList.length - 1; i++) {
            var checkReslt = checkValidate(checkFunc[i], divList[i], divList[i].children[1], ...resultText[i])
            if (!checkReslt) {
                flag = false
            }
        }
    }
    if (flag) {
        alert("提交成功")
    } else {
        alert("提交失败")
    }
})





