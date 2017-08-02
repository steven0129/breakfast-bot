const linebot = require('linebot')
const rules = require('./botRule.js')

module.exports = (luis, channelId, channelSecret, channelAccessToken) => {
    const botService = {}
    const bot = linebot({
        channelId: channelId,
        channelSecret: channelSecret,
        channelAccessToken: channelAccessToken
    })

    botService.message = () => {
        bot.on('message', (e) => {
            // let json = luis.identify(e.message.text)
            luis.identify(e.message.text)
                .then((json) => {
                    console.log(e)
                    let intent = json.intents[0].intent
                    let score = json.intents[0].score
                    // if (score < 0.75)
                    //     replyMsg = '小哲只聽得懂跟早餐有關的事, 不太懂您的意思'
                    // else
                    //     replyMsg = rules[intent]

                    e.reply('test')
                        .then((message) => console.log(message))
                        .catch((error) => console.log(error))
                })
        })

        return bot
    }

    return botService
}