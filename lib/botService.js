const linebot = require('linebot')

module.exports = (db, luis, botRule, channelId, channelSecret, channelAccessToken) => {
    const botService = {}
    const bot = linebot({
        channelId: channelId,
        channelSecret: channelSecret,
        channelAccessToken: channelAccessToken
    })

    botService.message = () => {
        bot.on('message', (e) => {
            console.log(e)
            new db['rawwords']({
                name: e.source.userId,
                content: e.message.text
            }).save((error) => console.log(error))

            if (!(e.message.text.includes('小哲'))) return // do nothing
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