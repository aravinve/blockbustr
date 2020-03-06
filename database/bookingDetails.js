const mongoose = require('mongoose');

// building schema for account

const bookingSchema = mongoose.Schema({
    transactionID:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    movie:{
        title:{
            type: String,
            required: true
        },
        date:{
            type: String,
            required: true
        },
        time:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        hall:{
            type: String,
            required: true
        },
        seats:{
            type: String,
            required: true
        }
    },
});

module.exports = bookingDetails = mongoose.model('bookingDetails', bookingSchema);