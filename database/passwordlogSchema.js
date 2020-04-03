const mongoose = require('mongoose');

// building schema for account

const passwordlogSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    onetimepassword:{
        type: String,
        required: true
    }
});

module.exports = OTPassword = mongoose.model('OTPassword', passwordlogSchema);
