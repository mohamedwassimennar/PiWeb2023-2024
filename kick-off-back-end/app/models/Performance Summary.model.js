const mongoose = require('mongoose');

const PerformanceSummarySchema = mongoose.Schema({

    season: {
        type: Date, // Modification du type en Date
        required: true // Spécification que la saison est obligatoire
    },
    totalGoalsScored: {
        type: Number,
        default: 0
    },
    averagePassCompletionRate: {
        type: Number,
        default: 0
    },
    totalDistanceCovered: {
        type: Number,
        default: 0
    },
    totalMatchesPlayed: {
        type: Number,
        default: 0
    },
    yellowCards: {
        type: Number,
        default: 0
    },
    redCards: {
        type: Number,
        default: 0
    },
    archived: {
        type: Boolean,
        default: false
    },
    minutesPlayed: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PerformanceSummary', PerformanceSummarySchema);
