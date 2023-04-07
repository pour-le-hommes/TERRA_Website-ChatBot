const mongoose = require('mongoose');
const schema = mongoose.Schema;

const massaschema = new schema({
    nama: {
        type: String,
        required: true
    },
    nim: {
        type: Number,
        required: true
    },
    
}, {timestamps : true});

const Massa = mongoose.model('massa',massaschema);
module.exports = Massa;