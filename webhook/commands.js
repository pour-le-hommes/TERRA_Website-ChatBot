function commands(text,lineid){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');
 
    // EDIT NAMA INCLUDE TERRA GA BISA DIGANTI
    // EDIT REPLACE DATABASE JD FUNCTION
    // EDIT BANYAKLAH ANJING
    console.log('command activated')

    let less2 = false;
    let two = false;
    
    if(text.includes('rename')){
        Line.find({lineid:lineid}).then(() =>{
            const splittext = text.split(" ")
            if(splittext.length<2){
                less2=true
            }else{
                newname = splittext[1]
                console.log('new name to ',newname)
                Line.updateOne({lineid:lineid},{nama:newname})
                two=true
                console.log('Name changed successfully!')
            }
        })
    }
    console.log('trues : ',less2,two)
    if(less2===true){
        message={
            type:'text',
            text:`Use !rename [name], not just ${text} dumbass!`
        }
        return message
    }else if(two===true){
        message={
            type:'text',
            text:`Renamed successfully!, welcome ${newname}`,
        }
        return message
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