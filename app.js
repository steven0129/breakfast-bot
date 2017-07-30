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
        request(process.env.LUIS_URL + msg)
            .then((response) => {
                console.log(response)
                e.reply(response).catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
    }
})

app.post('/webhook', bot.parser())

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;
    console.log(`App now running on port ${port}`)
})