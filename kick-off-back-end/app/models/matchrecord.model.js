//matchrecord.model
const mongoose = require('mongoose');

const MatchRecordSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    opponent: String,
    
    venue: String,
    team: String, 
    fixtureType: {
        type: String,
        enum: ['League Match', 'Friendly Match'],
        default: 'League Match'
    },    matchStatus: {
        type: String,
        enum: ['scheduled', 'canceled', 'completed'],
        default: 'scheduled'
    },
    score: String,
    image: String,
    archived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const MatchRecord = mongoose.model('MatchRecord', MatchRecordSchema);

module.exports = MatchRecord;
