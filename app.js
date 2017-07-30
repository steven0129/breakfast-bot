const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const JSONParseError = require('@line/bot-sdk/exceptions').JSONParseError
const SignatureValidationFailed = require('@line/bot-sdk/exceptions').SignatureValidationFailed

const app = express()

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}

app.use(middleware(config))

app.post('/webhook', (req, res) => {
    res.json(req.body.events) // req.body will be webhook event object
})

app.use((err, req, res, next) => {
    if (err instanceof SignatureValidationFailed) {
        res.status(401).send(err.signature);
        return
    } else if (err instanceof JSONParseError) {
        res.status(400).send(err.raw)
        return
    }

    next(err) // will throw default 500
})

app.listen(process.env.port || 8080)