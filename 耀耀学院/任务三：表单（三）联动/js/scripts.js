var log = console.log.bind(console)

var div = document.querySelector(".identity-div")
var detail = document.querySelector(".identity-detail")
var city = ["北京", "上海",]
var school = {
    "北京": ["清华", "北大"],
    "上海": ["复旦", "同济"],
}
var identityFunc = {
    "在校生": function () {
        detail.insertAdjacentHTML("beforeend", `
            <label>学校</label>
            <select class="identity-select" name="city">
            </select>
            <select class="identity-select" name="school">
            </select>
            `)
        for (var i = 0; i < city.length; i++) {
            detail.children[1].insertAdjacentHTML("beforeend", `
                <option value="${city[i]}">${city[i]}</option>
                `)
        }
        for (var i = 0; i < school[city[0]].length; i++) {
            detail.children[2].insertAdjacentHTML("beforeend", `
            <option value="${school[city[0]][i]}">${school[city[0]][i]}</option>
            `)
        }
    },
    "非在校生": function () {
        detail.insertAdjacentHTML("beforeend", `
            <label>就业单位</label>
            <input class="identity-work" type="text" name="word">
            `)
    },
}

var insertDetailDiv = function (ntype) {
    detail.innerHTML = ""
    identityFunc[ntype]()
}

div.addEventListener("change", function (event) {
    var input = event.target
    if (input.nodeName.toLowerCase() === "input") {
        if (input.checked) {
            insertDetailDiv(input.value)
        }
    }
})

detail.addEventListener("change", function (event) {
    var target = event.target
    var list = this.children[2]
    if (target.name === "city") {
        list.innerHTML = ""
        for (var i = 0; i < school[target.value].length; i++) {
            list.insertAdjacentHTML("beforeend", `
            <option value="${school[target.value][i]}">${school[target.value][i]}</option>
            `)
        }
    }
})

insertDetailDiv("在校生")
