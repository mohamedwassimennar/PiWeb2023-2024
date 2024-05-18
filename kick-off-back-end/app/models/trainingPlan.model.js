const mongoose = require('mongoose');

const TrainingPlanSchema = mongoose.Schema({
    trainingplace: {
        type: String,
    },

    time: {
        type: String,
    },
    date: {
        type: Date,
    },
    trainingType: {
        type: String,
        required: true,
        enum: ['Endurance', 'Strength training', 'Agility', 'Tactical', 'Technique', 'Recovery']
    },

    archived: {
        type: Boolean,
        default: false
    },
    duration: {
        type: String,

    },
    intensityLevel: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('TrainingPlan', TrainingPlanSchema);