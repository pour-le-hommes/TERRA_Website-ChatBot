const express = require('express')
const app = express()
// const mongoose = require('mongoose')
const UserRouter = require('./routes/users')
// const { Client } = require('@line/bot-sdk')
// const webhook = require('./webhook/webhook.js')
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
// const CHANNEL_SECRET = process.env.CHANNEL_SECRET;

// const client = new Client({
//   channelAccessToken: CHANNEL_ACCESS_TOKEN,
//   channelSecret: CHANNEL_SECRET,
// });

// // Connect To Mongodb
// const url = 'mongodb+srv://testing:testing123@cluster0.ytucosn.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect(url)
//     .then((result) => app.listen(3000))
//     .then(console.log('connect to Mongodb'))
//     .catch((err) => console.log(err))

// // Create View Engine
// console.log('View Engine')
// app.set('view engine', 'ejs')

// Create Home Page
app.get('/',(req,res) =>{
    console.log('Home Page')
    res.status(200)
    res.render('homepage',{text:'suppp'})
})

// app.listen(process.env.PORT||3000)

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