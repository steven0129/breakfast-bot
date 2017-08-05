module.exports = (db, greets) => {
    const rules = {}

    rules['None'] = async () => {
        return '小哲只聽得懂跟早餐有關的事, 不太懂您的意思'
    }

    rules['打招呼'] = async () => {
        let index = Math.floor(Math.random() * greets.length)
        return greets[index]
    }

    rules['詢問推薦早餐'] = async () => {
        let counts = await db.count().exec()
        let random = Math.floor(Math.random() * counts)
        let result = await db.findOne().skip(random).exec()

        return `小哲為您推薦${result.price}元的${result.name}`
    }

    rules['詢問菜單'] = async () => {
        return {
            type: 'image',
            originalContentUrl: 'https://i.imgur.com/XxomcSB.jpg',
            previewImageUrl: 'https://i.imgur.com/XxomcSB.jpg'
        }
    }

    rules['詢問早餐價格'] = async () => {
        return '小哲目前還在學習如何辨識早餐價格, 還請您見諒~'
    }

    return rules
}