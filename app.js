const linebot = require('linebot')
const app = require('express')()
const request = require('request-promise')
const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (e) => {
    if (e.message.type === 'text') {
        let msg = e.message.text
        request(process.env.LUIS_URL + encodeURIComponent(msg))
            .then((response) => {
                switch (response.intents[0].intent) {
                    case '打招呼':
                        if (response.intents[0].score > 0.75) {
                            let ans = ['您好', '哈囉', '您好, 非常高興為您服務', 'hello']
                            let index = Math.floor(Math.random() * ans.length)
                            e.reply(ans[index]).catch((error) => console.log(error))
                        } else {
                            e.reply('不好意思, 小哲只能了解早餐相關的事情').catch((error) => console.log(error))
                        }
                        break
                    default:
                        e.reply('不好意思, 小哲只能了解早餐相關的事情').catch((error) => console.log(error))
                        break
                }
            })
            .catch((error) => console.log(error))
    }
})

app.post('/webhook', bot.parser())

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port
    console.log(`App now running on port ${port}`)
})