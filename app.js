const app = require('express')()
const errorhandler = require('errorhandler')
const diContainer = require('./lib/diContainer.js')

diContainer.register('channelId', process.env.CHANNEL_ID)
diContainer.register('channelSecret', process.env.CHANNEL_SECRET)
diContainer.register('channelAccessToekn', process.env.CHANNEL_ACCESS_TOKEN)
diContainer.register('dbName', 'menus')
diContainer.register('dbUrl', process.env.MONGODB_URL)
diContainer.register('greets', ['您好', '哈囉', '您好, 非常高興為您服務', 'hello'])
diContainer.register('app', app)
diContainer.factory('luis', require('./lib/luis.js'))
diContainer.factory('botController', require('./lib/botController.js'))
diContainer.factory('botService', require('./lib/botSerice.js'))
diContainer.factory('botRule', require('./lib/botRule.js'))

const botController = diContainer.get('botController')

app.use(errorhandler())
app.post('/webhook', botController.parser)

const server = app.listen(process.env.PORT || 8080, () => {
    let port = server.address().port
    console.log(`App now running on port ${port}`)
})