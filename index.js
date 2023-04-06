const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');
const webhook = require('./webhook/webhook.js')
const session = require('express-session');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
  Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  Key: 'Data/massa.json'
};

const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});

app.use(session({
  secret: 'IQoJb3JpZ2luX2VjEEEaCmFwLXNvdXRoLTEiRjBEAiBCKXb4UFzPat/GMnQZFxoEWr6rgtu9piEUbPYWQxBoIwIgRN7vm91iQ7UwTeFAbdXYfCpB9uvFCwdPvp7ahGo9NA4qtAIIKhAAGgw0ODcxMjIyNzU3NDUiDBL1XwRY8jKcbVdNXSqRApM1VMoqCDcW2b4Wof84f8LXJjru1Uo6MzFnaWZL0U5kGDwLwOLr7W5kS9jnYlRg2JMKNGuDpX7tgzQ6KzOAGBtzl4Uz76PTAi15etwX7Yqlk4psDz8CPo3gY84V9v8fgdGV/y6RYA8kmN3VDr/41Bgc7WsI86rGoguDNjM8hBX9zgItR1y/VtZfA8UUYcmIBbW4TSSWWvoKxwvBSMhv4c9pfFNcPnRTqBb66o2bEkIy9igr5CVbB5oOR+94G6vsEWCIqnHUPMD/9IILGXMMao8DA2zJI4m+wO2ExeA5hH4H5B33PSAwGOjAyiZFH2An5S/BqvSlCEhThq1C82VSFxEN/0zQI+KqNtNB8sP+Gm06jjCPmLqhBjqeAdgGDy5YY9N18t5SJx/ePtVpvRSpDCudg+8PPA0u+5nxT/keXe5ww7HHzOp5jxCiSQD6LVQqMTCIohAJsjR1xGaLMIok6BdV4ZtqZSOSQX9u/u7O/+K75p4OdQXloIubc3UH9e6kX7v04x2kvDedmEQNzWwtdn9Z7We0XWT9BHypmvVa7TXznUW4G7/xv92OfT1REt6yWDv0I/WPw1Ut',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 86400000 // session time-to-live in milliseconds
  },
  store: sessionStore,
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

app.put('*', async (req,res) => {
  let filename = req.path.slice(1)

  console.log(typeof req.body)

  await s3.putObject({
    Body: JSON.stringify(req.body),
    params
  }).promise()
  
  res.set('Content-type', 'text/plain')
  res.send('ok').end()
})

app.get('/', (req,res) => {
  console.log('Received request!')
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
  console.log(req.session)  
  console.log(req.session.EmotionalState)
  const promises = [];
  const events = req.body.events;
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    message = webhook(event,req)
    promises.push(client.replyMessage(event.replyToken, message));
  }
  Promise.all(promises).then(() => res.status(200).end());
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});