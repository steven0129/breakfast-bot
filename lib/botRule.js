const db = require('./db.js')

module.exports = () => {
    const rules = {}

    rules['None'] = () => {
        return '小哲只聽得懂跟早餐有關的事, 不太懂您的意思'
    }

    rules['打招呼'] = () => {
        let index = Math.floor(Math.random() * greets.length)
        return greets[index]
    }

    rules['詢問推薦早餐'] = () => {
        let result = ''

        Promise.all([
            db.count.exec()
        ]).then((counts) => {
            let random = Math.floor(Math.random())
            result = db.findOne().skip(random).exec()
        }).catch((err) => {
            console.log(err)
            return '系統發生內部錯誤'
        })

        return result
    }

    rules['詢問早餐價格'] = () => {

    }

    rules['詢問菜單'] = () => {

    }

    return rules
}