function commands(text,lineid){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');

    console.log('command activated')
    
    if(text.includes('rename')){
        Line.find({lineid:lineid}).then((result) =>{
            const splittext = text.split(" ")
            if(splittext.length<2){
                const message={
                    type:'text',
                    text:`Use !rename [name], not just ${text} dumbass!`
                }
                return message
            }else{
                let newname=''
                if(splittext.length===4){
                    newname = splittext[1]+' '+splittext[2]+' '+splittext[3]
                }if(splittext.length===3){
                    newname = splittext[1]+' '+splittext[2]
                }else if(splittext.length===2){
                    newname = splittext[1]
                }else{
                    console.log('Text is')
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
                    console.log('Name changed successfully!')
                    return message
                })
            }
        }).then((message)=>{
            return message
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

module.exports = commands