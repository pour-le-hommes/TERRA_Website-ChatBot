// define a function that handles the logic for ordinary user messages
function Massaterra(event) {
    const text = event.message.text.toLowerCase();
    let message;
    console.log('Massa function called')

    if (text === 'selamat pagi'){
        const message = {
          type: 'text',
          text: 'Selamat pagi Massa TERRA!',
        };
        console.log('Respon Greetings')
        // promises.push(client.replyMessage(event.replyToken, message));
    }
    else if (text === 'hmt? ') {
        const message = {
          type: 'text',
          text: 'Himpunan Mahasiswa TERRA',
        };
        console.log('Respon HMT')
        // promises.push(client.replyMessage(event.replyToken, message));
    }
    else if (text === '!terra') {
        const message = {
          type: 'image',
          originalContentUrl: 'https://km.itb.ac.id/wp/wp-content/uploads/2020/09/FTTM-HIMATG-_TERRA_-ITB.jpg',
          previewImageUrl: 'https://km.itb.ac.id/wp/wp-content/uploads/2020/09/FTTM-HIMATG-_TERRA_-ITB.jpg',
        };
        console.log('Respon TERRA Picture')
        // promises.push(client.replyMessage(event.replyToken, message));
    }
    else {
        const message = {
            type : 'text',
            text : 'ngomong apa dah lu?',
        }
        console.log('Respon nonsense')
    }
    return message;
}

module.exports = {
    Massaterra
};