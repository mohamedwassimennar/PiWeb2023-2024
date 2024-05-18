const yup = require('yup');

const injurySchema = yup.object({
    playerName: yup.string().required(),
    playerId: yup.string().required(),
    type: yup.string().oneOf(['Muscle', 'Ligament', 'Fracture', 'Other']).required(),
    description: yup.string().required(),
    date: yup.date().required(),
    estimatedRecoveryTime: yup.number().integer().min(0).required() // En jours
});

module.exports = injurySchema;
