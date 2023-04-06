function oaterra(event,EmotionalState) {
    const text = event.message.text.toLowerCase();
    console.log('OA function called',EmotionalState)
    if (text.includes('gua') && EmotionalState === "Swasta") {
        const message = {
          type : 'text',
          text : 'Gua, gua, emang gua temen lu?'
        }
        console.log('swasta => marah')
        EmotionalState = "Marah";
        return {message, EmotionalState};
    }
    if (text.includes('maaf') && EmotionalState === "Marah") {
        EmotionalState = "Swasta";
        console.log('Marah => Swasta')
        const message = {
          type: 'flex',
          altText: 'This is a cat',
          contents: {
            type: 'bubble',
            hero: {
              type: 'image',
              url: 'https://placekitten.com/200/300',
              size: 'full',
              aspectRatio: '20:13',
              aspectMode: 'cover'
            },
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text : 'aman, sori juga ngegas gitu, nih foto biar semangat',
                }
              ]
            }
          }
        }
        req.session.EmotionalState = EmotionalState
        return {message, EmotionalState};
    }
}
module.exports = oaterra;