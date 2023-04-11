const mongoose = require('mongoose');
const schema = mongoose.Schema;

const lineschema = new schema({
    lineid:{
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: false
    },
    jadwal: {
        type: Map,
        of: String,
        required: false
    },
    tugas: {
        type: Map,
        of: String,
        required: false
    },
    
}, {timestamps : true});

const Line = mongoose.model('line',lineschema);
module.exports = Line;