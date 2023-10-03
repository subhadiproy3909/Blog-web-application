const mongoose = require('mongoose');

const schema = mongoose.Schema;
const blogSchema = new schema({
    title:{
        type: String,
        required: true
    },
    body:{
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
});

const blogModel = mongoose.model('blogPost', blogSchema);

module.exports = blogModel;