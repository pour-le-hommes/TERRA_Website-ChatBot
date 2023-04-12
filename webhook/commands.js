function commands(text,lineid){
    const lineschema = require('../model/line.js');
    const Line = require('../model/line.js');
 
    // EDIT NAMA INCLUDE TERRA GA BISA DIGANTI
    // EDIT REPLACE DATABASE JD FUNCTION
    // EDIT BANYAKLAH ANJING
    console.log('command activated')

    let less2 = false;
    let two = false;

    let message ={
        type:'text',
        message:'testing',
    }
    
    if(text.includes('rename')){
        Line.find({lineid:lineid})
        .then(() =>{
            const splittext = text.split(" ")
            if(splittext.length===2){
                newname = splittext[1]
                console.log('new name to ',newname)
                Line.updateOne({lineid:lineid},{nama:newname}).then(()=>{
                    console.log('Name changed successfully!')
                        message={
                            type:'text',
                            text:`Renamed successfully!, welcome ${newname}`,
                        }
                })
            }
        })
        .catch((err)=>{
            console.error('Error in renaming ',err)
        })
    }
    return message
}

module.exports = commands