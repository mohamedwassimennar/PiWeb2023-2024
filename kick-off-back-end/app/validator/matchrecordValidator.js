const yup = require('yup');

const matchPlanSchema = yup.object({
    opponent: yup.string().required(),
    team: yup.string().required(),
    fixtureType: yup.string().oneOf(['League Match', 'Friendly Match']).required(),
    matchStatus: yup.string().oneOf(['scheduled', 'canceled', 'completed']).required(),
    score: yup.string()
    .matches(/^\d+-\d+$/, 'Score must be in the format of number-number, e.g., 1-1'),
});

module.exports = matchPlanSchema;
