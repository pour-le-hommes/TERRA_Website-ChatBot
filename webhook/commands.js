function commands(text,lineid){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');

    console.log('command activated')
    
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
            const splittext = text.split(" ")
            if(splittext.length<1){
                const message={
                    type:'text',
                    text:`Use !rename [name], not ${text} dumbass!`
                }
                return message
            }else{
                if(splittext.length===4){
                    const newname = splittext[1]+' '+splittext[2]+' '+splittext[3]
                }if(splittext.length===3){
                    const newname = splittext[1]+' '+splittext[2]
                }else if(splittext.length===2){
                    const newname = splittext[1]
                }else{
                    const message={
                        type:'text',
                        text:`woy ${text}, seriuslah, panjang kali namamu anjing, ini bukan paragraf`
                    }
                    return message
                }
                console.log('new name to ',newname)
                Line.updateOne({lineid:lineid},{nama:newname}).then(() =>{
                    const message={
                        type:'text',
                        text:`Renamed successfully!, welcome ${newname}`
                    }
                    return message
                })
            }
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

module.exports =commands