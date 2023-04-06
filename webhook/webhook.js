function webhook(req,res) {
    const Massaterra = require('./massa.js');
    const oaterra = require("./oa.js");
    const pengurusterra = require("./pengurus.js");
    console.log('Received webhook request!')
    res.status(200)
    const events = req.body.events;
    const promises = [];
    let ConversationState = req.session.ConversationState || "Massa"
    let EmotionState = req.session.EmotionState || "Swasta"
    console.log(ConversationState, EmotionState)
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
  
      if (event.type === 'message' && event.message.type === 'text') {
        const text = event.message.text.toLowerCase()
        if (text.includes('gua')) {
          message = oaterra(event,EmotionState)
          promises.push(client.replyMessage(event.replyToken, message));
        }
        else if (text === "saya janji akan membangun himpunan ini menjadi lebih baik") {
          ConversationState = "Pengurus"
          const message = {
            type : 'text',
            text : 'Halo pengurus HIMA TG "TERRA" ITB, apakah ada yang bisa dibantu?'
          }
          console.log('Massa to Pengurus')
          promises.push(client.replyMessage(event.replyToken, message));
        }
        else if (EmotionState === "Swasta"){
          message = Massaterra(event)
          promises.push(client.replyMessage(event.replyToken, message));
        }
      }
    req.session.ConversationState = ConversationState;
    req.session.EmotionState = EmotionState;
    Promise.all(promises).then(() => res.status(200).end());
    }
    return res.status(200)
}

module.exports = webhook