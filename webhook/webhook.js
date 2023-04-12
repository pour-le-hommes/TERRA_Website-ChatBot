function webhook(event,lineid) {
    const { Client } = require('@line/bot-sdk');
    const CHANNEL_ACCESS_TOKEN = 'qkj/lPvrRK5+BEleRc7d3MUv+P8GNNWxsJOE1+mHYXxCtVreNjPrkUs84z1M/6YC3iT99ORZ+8oFQur+e65c9KU8cOJF7p5sXYluNl27t4Vf7BtmXOVzwHeirh7riGCg1xhESoSqpB0Pbq3d5MNnKAdB04t89/1O/w1cDnyilFU=';
    const CHANNEL_SECRET = 'fe50c21e3a689c8ce8227c63545f3f51';

    const client = new Client({
    channelAccessToken: CHANNEL_ACCESS_TOKEN,
    channelSecret: CHANNEL_SECRET,
    });

    const Line = require('../model/line');
    const commands = require('./commands.js');

    let checking=True

    Line.find({lineid:lineid}).then((result) =>{
        if(!result[0]){
            const message = {
                type:'text',
                text: 'You\'re not registered yet dumbass, type !register'
            }
            checking=False
            return message,checking
        }
        else{
            nama = result[0].nama
            nim = result[0].nim
            return nama,nim
        }
    })

    // const Massaterra = require('./massa.js');
    // const oaterra = require("./oa.js");
    // const pengurusterra = require("./pengurus.js");

    console.log('Received webhook request!')

    const promises = [];

    if (event.type === 'message' && event.message.type === 'text'&& checking===True) {
        const text = event.message.text.toLowerCase()
        if(text.includes('!')){
            message = commands(text,lineid,nama,nim)
            console.log('message in webhook ',message)
            return message
        }else{
            const message = {
                type : 'text',
                text : `Woy ${nama}, ngomong apa dah lu`,
            };
            console.log('respond to nonesense')
            return message
        }
    }
}

module.exports = webhook