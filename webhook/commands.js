async function commands(text,lineid,nama,nim){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');
 
    // EDIT NAMA INCLUDE TERRA GA BISA DIGANTI
    // EDIT REPLACE DATABASE JD FUNCTION
    // EDIT BANYAKLAH ANJING
    console.log('command activated')

    let message ={
        type:'text',
        message:'testing',
    }
    
    if(text.includes('rename')){
        const splittext = text.split(" ")
        if(splittext.length===2){
            newname = splittext[1]
            console.log('new name to ',newname)
            await Line.updateOne({lineid:lineid},{nama:newname})
            console.log('Name changed successfully!')
            message={
                type:'text',
                text:`Renamed successfully!, welcome ${newname}`,
            }
            return message
        }
    }
    else if(text.includes('stats')){
        message={
            type:'text',
            text:`Name : ${nama}\nNim : ${nim}`
        }
        return message
    }
}

module.exports = commands