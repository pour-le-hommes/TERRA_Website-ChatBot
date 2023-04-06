function webhook(event,req) {
    const { Client } = require('@line/bot-sdk');
    const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
    const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

    const client = new Client({
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET,
    });

    ConversationalState = req.session.ConversationalState
    EmotionalState = req.session.EmotionalState

    const Massaterra = require('./massa.js');
    const oaterra = require("./oa.js");
    const pengurusterra = require("./pengurus.js");
    console.log('Received webhook request!')
    const promises = [];
    if (event.type === 'message' && event.message.type === 'text') {
        const text = event.message.text.toLowerCase()
        
        if(text==='stats'){
            const message = {
                type : 'text',
                text : "Emotional State : " +EmotionalState+" Conversational State : " + ConversationalState
            }
            return message
        }
        else if (text.includes('gua')) {
            OA = oaterra(event,EmotionalState)
            req.session.EmotionalState = OA.EmotionalState
            return OA.message
            // promises.push(client.replyMessage(event.replyToken, message));
        }
        else if (text === "saya janji akan membangun himpunan ini menjadi lebih baik") {
            message = pengurusterra(event)
            return message
            // promises.push(client.replyMessage(event.replyToken, message));
        }
        else if (EmotionalState === "Swasta"){
            message = Massaterra(event)
            return message
            // promises.push(client.replyMessage(event.replyToken, message));
        }
// req.session.ConversationState = ConversationState;
// req.session.EmotionState = EmotionState;
// Promise.all(promises).then(() => res.status(200).end());
    }
}

module.exports = webhook