const mongoose = require('mongoose');
const schema = mongoose.Schema;

const massaschema = new schema({
    role:{
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
    
}, {timestamps : true});

const Massa = mongoose.model('massa',massaschema);
module.exports = Massa;