const mongoose = require('mongoose');
const schema = mongoose.Schema;

const massaschema = new schema({
    Role:{
        type: String,
        required: true
    },
    Nama: {
        type: String,
        required: true
    },
    Nim: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: false
    }
    
}, {timestamps : true});

const Massa = mongoose.model('massa',massaschema);
module.exports = Massa;