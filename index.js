const { Client } = require('@line/bot-sdk');
const app = express()

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
      const message = {
        type: 'text',
        text: 'Hello, world!',
      };

      promises.push(client.replyMessage(event.replyToken, message));
    }
  }

  Promise.all(promises).then(() => res.status(200).end());
});