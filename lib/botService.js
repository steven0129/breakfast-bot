const linebot = require('linebot')

module.exports = (luis, botRule, channelId, channelSecret, channelAccessToken) => {
    const botService = {}
    const bot = linebot({
        channelId: channelId,
        channelSecret: channelSecret,
        channelAccessToken: channelAccessToken
    })

    botService.message = () => {
        bot.on('message', (e) => {
            luis.identify(e.message.text)
                .then((json) => {
                    let intent = json.intents[0].intent
                    let score = json.intents[0].score

                    if (score < 0.75)
                        e.reply('小哲只聽得懂跟早餐有關的事, 不太懂您的意思')
                            .then((message) => console.log(message))
                            .catch((error) => console.log(error))

                    else
                        botRule[intent]().then((replyMsg) => {
                            console.log(replyMsg)
                            e.reply(replyMsg)
                                .then((message) => console.log(message))
                                .catch((error) => console.log(error))
                        })
                })
        })

        return bot
    }

    return botService
}