const yup = require('yup');

const scoutPlanSchema = yup.object({
    playerName: yup.string().required(),
    marketValue: yup.string().required(),
    contract: yup.string().required(),
    club: yup.string().required(),
});

module.exports = scoutPlanSchema;