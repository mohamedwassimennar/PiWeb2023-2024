const mongoose = require('mongoose');

// Définition du schéma
const RecoveryPlanSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    injuryStatus: {
        type: String,
        enum: ['In Recovery', 'Recovered', 'Pending'],
        required: true
    },
    recoveryStartDate: {
        type: Date,
        required: true
    },
    recoveryEndDate: {
        type: Date,
        required: true
    },
    recoveryActivities: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean,
        default: false
    }
});

// Création du modèle à partir du schéma
const RecoveryPlan = mongoose.model('RecoveryPlan', RecoveryPlanSchema);

module.exports = RecoveryPlan;
