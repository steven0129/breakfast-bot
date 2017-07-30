const linebot = require('linebot')
const app = require('express')()
const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (e) => {
    if (e.message.type === 'text') {
        console.log(e.message)
        let msg = e.message.text
        e.reply(msg).then((data) => {
            console.log(msg)
        }).catch((error) => {
            console.log('error')
        })
    }
})

var linebotParser = bot.parser()
app.post('/webhook', linebotParser)

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port;
    console.log(`App now running on port ${port}`)
})