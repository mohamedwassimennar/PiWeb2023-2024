const mongoose = require('mongoose');

const PlayerPerformanceSchema = mongoose.Schema({
 
    nom: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    totalMatchesPlayed: {
        type: Number,
        default: 0
    },
    goals: {
        type: Number,
        default: 0
    },
    totalDistanceCovered: {
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
    assists: {
        type: Number,
        default: 0
    },
    archived: {
        type: Boolean,
        default: false
    },
    distanceCovered: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PlayerPerformance', PlayerPerformanceSchema);
