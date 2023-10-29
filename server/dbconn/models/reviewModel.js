const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    remark: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("review", reviewSchema);