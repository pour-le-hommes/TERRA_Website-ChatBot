const mongoose = require('mongoose');
const schema = mongoose.Schema;

const massaschema = new schema({
    nama: {
        type: String,
        required: true
    },
    nim: {
        type: String,
        required: true
    },
    
}, {timestamps : true});

const Massaschema = mongoose.model('massa',massaschema)
module.exports = Massaschema;