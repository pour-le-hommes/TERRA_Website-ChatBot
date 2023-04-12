const mongoose = require('mongoose');
const schema = mongoose.Schema;

const lineschema = new schema({
    Lineid:{
        type: String,
        required: true
    },
    Nama: {
        type: String,
        required: false
    },
    Jadwal: {
        type: Map,
        of: String,
        required: false
    },
    Tugas: {
        type: Map,
        of: String,
        required: false
    },
    
}, {timestamps : true});

const Line = mongoose.model('line',lineschema);
module.exports = Line;