function pengurusterra(event) {
    const text = event.message.text.toLowerCase();
    console.log('Pengurus function called')
    ConversationalState = "Pengurus"
    const message = {
    type : 'text',
    text : 'Halo pengurus HIMA TG "TERRA" ITB, apakah ada yang bisa dibantu?'
    }
    console.log('Massa to Pengurus')
  }
  
module.exports = pengurusterra;