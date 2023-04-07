const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserRouter = require('./routes/users')
const { Client } = require('@line/bot-sdk')
const webhook = require('./webhook/webhook.js')
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});

// Connect To Mongodb
const url = 'mongodb+srv://testing:testing123@cluster0.ytucosn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url)
    .then((result) => app.listen(3000))
    .then(console.log('connect to Mongodb'))
    .catch((err) => console.log(err))

// Create View Engine
console.log('View Engine')
app.set('view engine', 'ejs')

// Create Home Page
app.get('/',(req,res) =>{
    res.send('What"s up?')
    console.log('Home Page')
    // res.render('index',{text:'suppp'})
    res.status(200)
})

// Users Pages
// app.use('/users', UserRouter)

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