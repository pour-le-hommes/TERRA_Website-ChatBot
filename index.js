const { Client } = require('@line/bot-sdk');
const express = require('express')
const bodyParser = require('body-parser');

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

app.post('/webhook', (req, res) => {
  console.log('Received webhook request!')
  res.status(200)
  const events = req.body.events;
  const promises = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    if (event.type === 'message' && event.message.type === 'text') {
      if (event.message.text === 'Selamat pagi'){
        const message = {
          type: 'text',
          text: 'Selamat pagi Massa TERRA!',
        };
        console.log('Respon Greetings')
        promises.push(client.replyMessage(event.replyToken, message));
      }
      if (event.message.text === 'HMT? ') {
        const message = {
          type: 'text',
          text: 'Himpunan Mahasiswa TERRA',
        };
        console.log('Respon HMT')
        promises.push(client.replyMessage(event.replyToken, message));
      }
      if (event.message.text === '!TERRA') {
        const message = {
          type: 'image',
          originalContentUrl: 'https://km.itb.ac.id/wp/wp-content/uploads/2020/09/FTTM-HIMATG-_TERRA_-ITB.jpg',
          previewImageUrl: 'https://km.itb.ac.id/wp/wp-content/uploads/2020/09/FTTM-HIMATG-_TERRA_-ITB.jpg',
        };
        console.log('Respon TERRA Picture')
        promises.push(client.replyMessage(event.replyToken, message));
    }
  }

  Promise.all(promises).then(() => res.status(200).end());
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});