const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({

    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    telephone: {
        type: Number,
    },
    email: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Playera', PlayerSchema);