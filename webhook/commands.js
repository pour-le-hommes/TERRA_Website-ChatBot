function commands(text,lineid){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');
 
    // EDIT NAMA INCLUDE TERRA GA BISA DIGANTI
    // EDIT REPLACE DATABASE JD FUNCTION
    // EDIT BANYAKLAH ANJING
    console.log('command activated')
    
    if(text.includes('rename')){
        Line.find({lineid:lineid}).then(() =>{
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
                return message
            }else{
                newname = splittext[1]
                console.log('new name to ',newname)
                Line.updateOne({lineid:lineid},{nama:newname}).then(() =>{
                    message={
                        type:'text',
                        text:`Renamed successfully!, welcome ${newname}`,
                    }
                    console.log('Name changed successfully!')
                    return message
                }).then((message)=>{
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

module.exports = commands