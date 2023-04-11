const lineschema = require('./model/line.js')
const Line = require('./model/line.js');

function commands(text,lineid){
    if(text.includes('register')){
        const line = new lineschema({
            lineid:userid,
            nama:'User',
            jadwal:{},
            tugas:{}
        });
        line.save().then(console.log(`${line.nama} is successfully added!`))
        const message = {
            type : 'text',
            text : `Registry Successful, welcome ${line.nama}`,
        };
        return message
    }
    else if(text.includes('rename')){
        Line.find({lineid:lineid}).then((result) =>{
            const splittext = text.split("")
            const newname = splittext[1]
        })
    }else{
        const message = {
            type : 'text',
            text : 'ngomong apa dah lu?',
        };
        console.log('respond to nonesense')
        return message
    }
}