const mongoose = require('mongoose');

const StaffSchema = mongoose.Schema({

    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Staff', StaffSchema);