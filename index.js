const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');
const webhook = require('./webhook/webhook.js')
const session = require('express-session');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
console.log('testing')
const params = {
  Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  Key: 'Data/massa.json'
};
console.log('testing')
const app = express();
app.use(bodyParser.json());
console.log('testing')
const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';
console.log('testing')
const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});
console.log('testing')
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
console.log('testing')
(async () => {
  // Store something
  await s3.putObject({
    Body: JSON.stringify({"now":new Date().toString()}),
    Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
    Key: 'Data/massa.json'
  }).promise()

  // Read the file
  // let my_file = await s3.getObject({
  //   Bucket: process.env.BUCKET,
  //   Key: "some_files/my_file.json",
  // }).promise()

  // Log file content
  // console.log(JSON.parse(my_file.Body.toString()))

  // let res = await s3.deleteObject({
  //   Bucket: process.env.BUCKET,
  //   Key: "some_files/my_file.json",
  // }).promise()

  console.log(res)
})()
console.log('testing')
app.get('/', (req,res) => {
  res.status(200)
  console.log('Received request!')
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