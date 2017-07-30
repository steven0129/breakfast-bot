const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const bot = require('@line/bot-sdk')
const botMiddleware = require('@line/bot-sdk').middleware

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}

router.post('/webhooks', async (ctx, next) => {
    ctx.body = ctx.request.body.events
})

app.use(logger())
app.use(bodyParser())
app.use(botMiddleware(config))
app.use(json())
app.use(router.routes())

app.listen(process.env.PORT || 8080)