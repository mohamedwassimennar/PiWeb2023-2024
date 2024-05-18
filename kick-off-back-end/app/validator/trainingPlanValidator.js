const yup = require('yup');

const trainingPlanSchema = yup.object({
    trainingplace: yup.string(),
    time: yup.string(),
    date: yup.date().typeError('Date invalide').required('Date requise'),

    trainingType: yup.string().required().oneOf(['Endurance', 'Strength training', 'Agility', 'Tactical', 'Technique', 'Recovery']),
    duration: yup.string(),
    intensityLevel: yup.string().required()
});

module.exports = trainingPlanSchema;