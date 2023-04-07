const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');
const webhook = require('./webhook/webhook.js')
const session = require('express-session');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
  Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  Key: 'Data/massa.json',
};

const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});

// app.use(function (req, res, next) {
//   if (!req.session.EmotionalState) {
//     req.session.EmotionalState = 'Swasta'
//   }
//   if (!req.session.ConversationalState) {
//     req.session.ConversationalState = 'Massa'
//   }
//   if (!req.session.views) {
//     req.session.views = {}
//   }
//     // get the url pathname
//   var pathname = parseurl(req).pathname

//     // count the views
//   req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
//   next()
// })

;(async () => {
  // Store something
  // await s3.putObject({
  //   Body: JSON.stringify({"now":new Date().toString()}),
  //   Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  //   Key: 'Data/massa.json'
  // }).promise()

  // Read the file
  // let my_file = await s3.getObject({
  //   Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  //   Key:  'Data/massa.json',
  // }).promise()

  // Log file content
  // console.log(JSON.parse(my_file.Body.toString()))

  // let res = await s3.deleteObject({
  //   Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  //   Key:  'Data/massa.json',
  // }).promise()

  // console.log(res)
})()
console.log('testing')
// app.get('/', async (req,res) => {
//   console.log(req)
//   res.status(200)
//   console.log('Received request!')
//   res.send('Hi')
// })

app.get('/', async (req,res) => {
  res.status(200)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const data = {
    "name": '17066',
    "ip": ip
  };
  const s3Objects = await s3.listObjects(params).promise();

  const retrievedata = await Promise.all(s3Objects.Contents.map(async (obj) => {
    if (obj.Key.includes('17066')) {
      const fileContent = await s3.getObject({params}).promise();
      return JSON.parse(fileContent.Body.toString());
    }
  }));
  console.log(data)
  console.log(retrievedata)
  // await s3.putObject({
  //   Body: JSON.stringify(data),
  //   Bucket: 'cyclic-uninterested-jodhpurs-bear-ca-central-1',
  //   Key:  'Data/massa.json',
  // }).promise();
  // res.send('Data stored successfully');
})

















// app.post('/webhook', (req, res) => {
//   console.log(req.session)  
//   console.log(req.session.EmotionalState)
//   const promises = [];
//   const events = req.body.events;
//   for (let i = 0; i < events.length; i++) {
//     const event = events[i];
//     message = webhook(event,req)
//     promises.push(client.replyMessage(event.replyToken, message));
//   }
//   Promise.all(promises).then(() => res.status(200).end());
// });
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});