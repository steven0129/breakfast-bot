const db = require('./db.js')

module.exports = (greets) => {
    const rules = {}

    rules['None'] = async () => {
        return '小哲只聽得懂跟早餐有關的事, 不太懂您的意思'
    }

    rules['打招呼'] = async () => {
        let index = Math.floor(Math.random() * greets.length)
        return greets[index]
    }

    rules['詢問推薦早餐'] = async () => {
        let counts = await db['menu1'].count().exec()
        let random = Math.floor(Math.random() * counts)
        let result = await db['menu1'].findOne().skip(random).exec()

        return result
    }

    rules['詢問早餐價格'] = async () => {

    }

    rules['詢問菜單'] = async () => {

    }

    return rules
}