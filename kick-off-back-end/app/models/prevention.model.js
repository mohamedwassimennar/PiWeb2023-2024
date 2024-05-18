const mongoose = require('mongoose');

const PreventionSchema = mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recommendedPractices: {
        type: String,
        enum: ['Not recommended', 'Proper warm-up and cool-down routines', 'Regular sports massage therapy', 'Periodic medical check-ups and assessments', 'Implement injury prevention programs'],
        required: true
    },
    equipmentRecommendations: {
        type: String,
        enum: ['Not recommended', 'Wear appropriate cleats for the playing surface', 'Use shin guards for protection'],
        required: true
    },
    nutritionalRecommendations: {
        type: String,
        enum: ['Not recommended', 'Maintain a balanced diet rich in carbohydrates, protein, and healthy fats', 'Stay hydrated by drinking water before, during, and after activities'],
        required: true
    },
    lifestyleRecommendations: {
        type: String,
        enum: ['Not recommended', 'Manage training workload to avoid overtraining and fatigue', 'Incorporate rest days into training schedules', 'Practice safe tackling and falling techniques to prevent injuries', 'Educate athletes about common injuries and early warning signs'],
        required: true
    },
    archived: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Prevention', PreventionSchema);
