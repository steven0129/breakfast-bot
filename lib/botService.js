const linebot = require('linebot')
const rules = require('./botRule.js')

module.exports = (luis, channelId, channelSecret, channelAccessToken) => {
    const botService = {}
    const bot = linebot({
        channelId: channelId,
        channelSecret: channelSecret,
        channelAccessToekn: channelAccessToken
    })

    botService.message = () => {
        bot.on('message', (e) => {
            let json = luis(e.message.text)
            let intent = json.intents[0].intent
            let score = json.intents[0].score
            let replyMsg = ''

            if (score < 0.75)
                replyMsg = '小哲只聽得懂跟早餐有關的事, 不太懂您的意思'
            else
                replyMsg = rules[intent]

            e.reply(replyMsg).catch((error) => console.log(error))
        })

        return bot
    }
}