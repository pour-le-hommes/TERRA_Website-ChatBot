function oaterra(event,EmotionState) {
    const text = event.message.text.toLowerCase();
    console.log('OA function called')
    if (text.includes('gua') && EmotionState === "Swasta") {
        const message = {
          type : 'text',
          text : 'Gua, gua, emang gua temen lu?'
        }
        EmotionState = "Marah"
        return message
    }
    else if (text.includes('maaf') && EmotionState === "Marah") {
        EmotionState = "Swasta";
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
        return message
    }
}
module.exports = oaterra;