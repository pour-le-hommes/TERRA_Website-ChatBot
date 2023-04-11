function commands(text,lineid){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');
 
    // EDIT NAMA JADI 1 DULU
    // EDIT NAMA INCLUDE TERRA GA BISA DIGANTI
    // EDIT REPLACE DATABASE JD FUNCTION
    // EDIT BANYAKLAH ANJING
    console.log('command activated')
    
    if(text.includes('rename')){
        Line.find({lineid:lineid}).then((result) =>{
            const splittext = text.split(" ")
            let message={
                type:'text',
                text:`Message not working`
            }
            if(splittext.length<2){
                message={
                    type:'text',
                    text:`Use !rename [name], not just ${text} dumbass!`
                }
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
                    message={
                        type:'text',
                        text:`woy ${text}, seriuslah, panjang kali namamu anjing, ini bukan paragraf`
                    }
                }
                console.log('new name to ',newname)
                Line.updateOne({lineid:lineid},{nama:newname}).then(() =>{
                    message={
                        type:'text',
                        text:`Renamed successfully!, welcome ${newname}`
                    }
                    console.log('Name changed successfully!')
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