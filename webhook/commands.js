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
            if(splittext.length<2){
                console.log('Naming error')
                message={
                    type:'text',
                    text:`Use !rename [name], not just ${text} dumbass!`
                }
                return message
            }else{
                newname = splittext[1]
                console.log('new name to ',newname)
                Line.updateOne({lineid:lineid},{nama:newname})
                console.log('Name changed successfully!')
                message={
                    type:'text',
                    text:`Renamed successfully!, welcome ${newname}`,
                }
                return message
            }
        }).catch((err)=>{
            console.error('Error in renaming ',err)
        })
    }
    // console.log('trues : ',less2,two)
    // if(less2===true){
    //     message={
    //         type:'text',
    //         text:`Use !rename [name], not just ${text} dumbass!`
    //     }
    //     return message
    // }else if(two===true){
    //     message={
    //         type:'text',
    //         text:`Renamed successfully!, welcome ${newname}`,
    //     }
    //     return message
    // }else{
    //     const message = {
    //         type : 'text',
    //         text : 'ngomong apa dah lu?',
    //     };
    //     console.log('respond to nonesense')
    //     return message
    // }
}

module.exports = commands