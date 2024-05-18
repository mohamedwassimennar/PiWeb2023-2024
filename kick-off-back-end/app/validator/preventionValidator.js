const yup = require('yup');

const preventionSchema = yup.object({
    playerName: yup.string().required(),
    description: yup.string().required(),
    recommendedPractices: yup.string().oneOf([
        'Not recommended',
        'Proper warm-up and cool-down routines',
        'Regular sports massage therapy',
        'Periodic medical check-ups and assessments',
        'Implement injury prevention programs'
    ]).required(),
    equipmentRecommendations: yup.string().oneOf([
        'Not recommended',
        'Wear appropriate cleats for the playing surface',
        'Use shin guards for protection'
    ]).required(),
    nutritionalRecommendations: yup.string().oneOf([
        'Not recommended',
        'Maintain a balanced diet rich in carbohydrates, protein, and healthy fats',
        'Stay hydrated by drinking water before, during, and after activities'
    ]).required(),
    lifestyleRecommendations: yup.string().oneOf([
        'Not recommended',
        'Manage training workload to avoid overtraining and fatigue',
        'Incorporate rest days into training schedules',
        'Practice safe tackling and falling techniques to prevent injuries',
        'Educate athletes about common injuries and early warning signs'
    ]).required()
});

module.exports = preventionSchema;
