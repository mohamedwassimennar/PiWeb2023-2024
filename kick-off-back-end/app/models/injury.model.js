const mongoose = require('mongoose');

const InjurySchema = mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Muscle', 'Ligament', 'Fracture', 'Other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    estimatedRecoveryTime: {
        type: Number, // In days
        required: true
    },
    archived: {
        type: Boolean,
        default: false // Par défaut, la blessure n'est pas archivée
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Injury', InjurySchema);
