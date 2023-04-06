const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');
const webhook = require('./webhook/webhook.js')
const session = require('express-session');
const MemoryStore = require('memorystore')(session)
const parseurl = require('parseurl')

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
  cookie: { secure: true , maxAge:6000 }
  }));

app.use(function (req, res, next) {
  if (!req.session.EmotionalState) {
    req.session.EmotionalState = 'Swasta'
  }
  if (!req.session.ConversationalState) {
    req.session.ConversationalState = 'Massa'
  }
  if (!req.session.views) {
    req.session.views = {}
  }
    // get the url pathname
  var pathname = parseurl(req).pathname

    // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
  next()
})

app.get('/', (req,res) => {
  console.log('Received request!')
  console.log(req.session)
  console.log(req.session.EmotionalState)
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

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.post('/webhook', (req, res) => {
  res.status(200)
  const promises = [];
  const events = req.body.events;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    message = webhook(event)
    promises.push(client.replyMessage(event.replyToken, message));
  }
  Promise.all(promises).then(() => res.status(200).end());
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});