const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');
const webhook = require('./webhook/webhook.js')
const session = require('express-session');
const MemoryStore = require('memorystore')(session)

const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get('/', (req,res) => {
  console.log('Received request!')
  res.send('Hi')
  res.status(200)
  console.log(req.session)
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

app.post('/webhook', (req, res) => {
  res.status(200)
  const events = req.body.events;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    message,promises = webhook(event)
    promises.push(client.replyMessage(event.replyToken, message));
  }
  Promise.all(promises).then(() => res.status(200).end());
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});