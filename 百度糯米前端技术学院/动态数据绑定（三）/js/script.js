let log = console.log.bind(console)

let Observer = class {
    constructor (value, path='') {
        this._watch = {}
        this.data = value
        this.walk(value, path)
    }
    walk (data, path) {
        Object.keys(data).forEach((key) => {
            this.convert(data, key, data[key], path)
        })
    }
    observer (val, path) {
        if (!val || typeof val !== 'object') {
            return
        }
        return this.walk(val, path)
    }
    convert (obj, key, value, path) {
        let self = this
        path += '.' + key
        self.observer(value, path)
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                log('你访问了' + key)
                return value
            },
            set (newVal) {
                if (value === newVal) {
                    return
                }

                value = newVal

                self.observer(value, path)

                let parentsList = path.substring(1).split('.')
                for (let i = parentsList.length; i > 0; i--) {
                    let key = parentsList.slice(0, i).join('.')
                    self.$emit(key, value)
                }

                return newVal
            }
        })
    }
    $watch (key, callback) {
        if (!this._watch[key]) {
            this._watch[key] = []
        }
        this._watch[key].push(callback)
    }
    $emit (key, value) {
        if (this._watch[key] && this._watch[key].length) {
            this._watch[key].forEach((item) => {
                item(value)
            })
        } else {
            log('你设置了' + key + ', 新的值为' + value)
        }
    }
}



// test
let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
})

app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
})

app2.$watch('name.firstName', function (newName) {
    console.log('我的姓名发生了变化，name.firstName')
})

app2.data.name.firstName = 'hahaha'
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla'
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
// test end

