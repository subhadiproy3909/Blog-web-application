const mongoose = require('mongoose');

const schema = mongoose.Schema;
const blogSchema = new schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    headings: {
        type: [String],
        required: true,
    },
    contents: {
        type: [String],
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
});

const blogModel = mongoose.model('blogPost', blogSchema);

module.exports = blogModel;