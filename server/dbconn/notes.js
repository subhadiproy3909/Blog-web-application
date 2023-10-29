const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    note_image: {
        type: String,
        required: true,
    },
    note_file: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('note', noteSchema);