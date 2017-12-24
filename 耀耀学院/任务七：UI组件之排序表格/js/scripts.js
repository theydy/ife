var log = console.log.bind(console)

var myTable = function () {
    this.thead = null
    this.tbody = null
    this.thRows = null
    this.tbRows = null
    this.colSort = {}
    this.colSortType = {}
}

myTable.prototype.onInit = function (parentEl) {
    var cter = parentEl?parentEl:document.querySelector("body")
    var note = `<table class="my-table">
                    <thead class="my-table-head"></thead>
                    <tbody class="my-table-body"></tbody>
                </table>`
    
    cter.insertAdjacentHTML("beforeend", note)
    this.thead = document.querySelector("thead")
    this.tbody = document.querySelector("tbody")
}

myTable.prototype.createWithData = function (data) {
    this.addRows(this.thead, data.thead.length)
    for (var i = 0; i < data.thead.length; i++) {
        this.addCells(this.thRows, i, data.thead[i].length, data.thead[i])
    }
    this.addRows(this.tbody, data.tbody.length)
    for (var i = 0; i < data.tbody.length; i++) {
        this.addCells(this.tbRows, i, data.tbody[i].length, data.tbody[i])
    }
}

myTable.prototype.sort = function (index) {
    var len = this.tbRows.length
    var dataList = []
    var temp

    for (var i = 0; i < this.tbRows.length; i++) {
        dataList[i] = this.tbRows[i]
    }

    for (var i = 0; i < len - 1; i++) {
        for (var j = i + 1; j < len; j++) {
            if (0 > this.colSort[index](dataList[i].children[index], dataList[j].children[index])) {
                temp = dataList[i]
                dataList[i] = dataList[j]
                dataList[j] = temp
            }
        }
    }
    this.tbody.innerHTML = ""
    if (this.colSortType[index]){
        for (var i = 0; i < dataList.length; i++) {
            this.tbody.insertAdjacentElement("beforeend", dataList[i])
        }
    } else {
        for (var i = dataList.length - 1; i >= 0; i--) {
            this.tbody.insertAdjacentElement("beforeend", dataList[i])
        }
    }

    return dataList
}

myTable.prototype.comp = function (a, b) {
    return b.innerText - a.innerText
}

myTable.prototype.addColSort = function (index, comp) {
    var node = `<span class="my-table-sort-up"></span><span class="my-table-sort-down"></span>`

    this.colSort[index] = comp?comp:this.comp
    this.colSortType[index] = false

    this.thRows[0].children[index].insertAdjacentHTML("beforeend", node)
}

myTable.prototype.addRows = function (parentEl, numRow=1) {
    var tb = parentEl?parentEl:this.tbody
    var rows = ""
    
    for (var i = 0; i < numRow; i++) {
        rows += "<tr  class='my-table-tr'></tr>"
    }
    tb.insertAdjacentHTML("beforeend", rows)
    this.thRows = this.thead.querySelectorAll("tr")
    this.tbRows = this.tbody.querySelectorAll("tr")
    return tb
}

myTable.prototype.addCells = function (rows, indexRow, numCell=1, cellTexts=[]) {
    rows = rows?rows:this.tbRows
    var tr = rows[indexRow]?rows[indexRow]:this.addRows().children[0]
    var cells = ""
    var cellText = ""
    
    for (var i = 0; i < numCell; i++) {
        cellText = cellTexts[i]?cellTexts[i]:"Text"
        cells += "<td class='my-table-td'>" + cellText + "</td>"
    }
    tr.insertAdjacentHTML("beforeend", cells)
    return tr
}

myTable.prototype.register = function () {
    var that = this
    that.thead.addEventListener("click", function (event){
        var index = event.path[0].cellIndex
        if (typeof(index)=="undefined") {
            index = event.path[1].cellIndex
        }
        if (that.colSort[index]) {
            that.colSortType[index] = !that.colSortType[index]
            that.sort(index)
        }
    })
}

var table = new myTable()
var data = {
    "thead": [
        ["姓名", "语文", "数学", "英语", "总分"],
    ],
    "tbody": [
        ["小红", 70,  90, 70, 230],
        ["小张", 80,  80, 70, 230],
        ["小花", 90,  70, 80, 240],
        ["小桃", 60, 100, 90, 250],
        ["小明", 90, 100, 70, 260],
    ],
}

table.onInit()
table.createWithData(data)
for (var i = 0; i < data.thead[0].length; i++) {
    table.addColSort(i)
}
table.register()
