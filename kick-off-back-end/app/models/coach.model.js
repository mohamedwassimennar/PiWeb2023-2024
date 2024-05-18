const mongoose = require('mongoose');

const CoachSchema = mongoose.Schema({

    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Coach', CoachSchema);