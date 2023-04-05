const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');
const { Massaterra } = require('./massa');

const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

const client = new Client({
  channelAccessToken: CHANNEL_ACCESS_TOKEN,
  channelSecret: CHANNEL_SECRET,
});

app.get('/', (req,res) => {
  console.log('Received request!')
  res.send('Hi')
  res.status(200)
})

let ConversationState = "Massa"
let EmotionState = "Swasta"

app.post('/webhook', (req, res) => {
  console.log('Received webhook request!')
  res.status(200)
  const events = req.body.events;
  const promises = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    

    if (event.type === 'message' && event.message.type === 'text') {
      const text = event.message.text.toLowerCase()

      if (text.includes('gua')) {
        const message = {
          type : 'text',
          text : 'Gua, gua, emang gua temen lu?'
        }
        promises.push(client.replyMessage(event.replyToken, message));
        EmotionState = "Marah"
      }
      else if (text.include('gua mau minta maaf')) {
        const message = {
          type : 'text',
          text : 'aman, sori juga ngegas gitu, nih foto biar semangat',
        }
        const image = {
          type : 'image',
          originalContentUrl: 'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
          previewImageUrl: 'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*',
        }
        promises.push(client.replyMessage(event.replyToken, message));
        promises.push(client.replyMessage(event.replyToken, image));
      }
      if (text === "saya janji akan membangun himpunan ini menjadi lebih baik") {
        ConversationState = "Pengurus"
        const message = {
          type : 'text',
          text : 'Halo pengurus HIMA TG "TERRA" ITB, apakah ada yang bisa dibantu?'
        }
        console.log('Massa to Pengurus')
        promises.push(client.replyMessage(event.replyToken, message));
      }
      // message =  Massaterra(event)
      // promises.push(client.replyMessage(event.replyToken, message));
    }
  }
  Promise.all(promises).then(() => res.status(200).end());
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});