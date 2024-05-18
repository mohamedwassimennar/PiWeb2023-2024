const yup = require('yup');

const recoveryPlanSchema = yup.object({
    playerName: yup.string().required(),
    injuryStatus: yup.string().oneOf(['In Recovery', 'Recovered', 'Pending']).required(),
    recoveryStartDate: yup.date().required(),
    recoveryEndDate: yup.date().required(),
    recoveryActivities: yup.string().required(), // Description des activités de récupération
});

module.exports = recoveryPlanSchema;
