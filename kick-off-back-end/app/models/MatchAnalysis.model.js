const mongoose = require('mongoose');

const MatchAnalysisSchema = mongoose.Schema({
   
    teamPerformance: {
        type: String
    },
    tacticalFormations: {
        type: String
    },
    archived: {
        type: Boolean,
        default: false
    },
    keyMoments: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MatchAnalysis', MatchAnalysisSchema);
