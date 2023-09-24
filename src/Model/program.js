const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        default: 'https://ruta/a/imagen/dummy.png'
    },
    category: {
        type: String,
        required: true
    }
});

const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;
