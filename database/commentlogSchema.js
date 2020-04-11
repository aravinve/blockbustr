const mongoose = require('mongoose');

// building schema for account

const commentlogSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
});

module.exports = UserComment = mongoose.model('UserComment', commentlogSchema);
