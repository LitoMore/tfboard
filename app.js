'use strict'

const SDK = require('fanfou-sdk')
const Streamer = require('fanfou-streamer')

const {
  CONSUMER_KEY: consumerKey,
  CONSUMER_SECRET: consumerSecret,
  OAUTH_TOKEN: oauthToken,
  OAUTH_TOKEN_SECRET: oauthTokenSecret
} = require('./config')

const token = {
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthTokenSecret
}

const sdk = new SDK(token)
const streamer = new Streamer(token)

function cast (res) {
  const user = res.object.user.name
  const id = res.object.user.id
  const reply = res.object.text.toLowerCase()
  const status = `用户 @${user} (${id}) 已退饭。`

  if (reply.match(`^@${res.target.name} (tf|Tf|tF|TF)$`)) {
    sdk.post('/statuses/update', {status}, err => {
      if (err) console.error(err)
      else console.log(status)
    })
  }
}

streamer.on('message.mention', res => {
  cast(res)
})

streamer.on('message.reply', res => {
  cast(res)
})

streamer.start()
