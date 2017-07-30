const linebot = require('linebot')
const express = require('express')
const app = express()
const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (e) => {
    if (e.message.type === 'text') {
        let msg = e.message.text
        e.reply(msg).then((data) => {
            console.log(msg)
        }).catch((error) => {
            console.log('error')
        })
    }
})

var linebotParser = bot.parser()
app.post('/', linebotParser)

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;
    console.log(`App now running on port ${port}`)
})