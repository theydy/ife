let log = console.log.bind(console)

let Observer = class {
    constructor (value) {
        this._watch = {}
        this.data = value
        this.walk()
    }
    walk () {
        Object.keys(this.data).forEach((key) => {
            this.convert(this.data, key, this.data[key])
        })
    }
    observer (val) {
        if (!val || typeof val !== 'object') {
            return
        }
        return new Observer(val)
    }
    convert (obj, key, value) {
        let self = this
        self.observer(value)
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

                if (typeof value === 'object') {
                    self.observer(value)
                }

                self.$emit(key, value)

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
let app1 = new Observer({
    name: 'youngwind',
    age: 25
 });

 app1.data.name = {
    lastName: 'liang',
    firstName: 'shaofeng'
 }

 app1.data.name.lastName;
 // 这里还需要输出 '你访问了 lastName '
 app1.data.name.firstName = 'lalala'
 // 这里还需要输出 '你设置了firstName, 新的值为 lalala'


let app2 = new Observer({
    name: 'youngwind',
    age: 25
 })

 // 你需要实现 $watch 这个 API
 app2.$watch('age', function(age) {
    console.log(`我的年纪变了，现在已经是：${age}岁了`)
 })

 app2.$watch('age', function(age) {
    console.log(`我的年纪变了，要再强调一次，现在已经是：${age}岁了`)
 })

 app2.data.age = 100; // 输出：'我的年纪变了，现在已经是100岁了'

// test end

