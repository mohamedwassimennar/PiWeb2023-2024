const yup = require('yup');

const matchAnalysisSchema = yup.object({
    teamPerformance: yup.string(),
    tacticalFormations: yup.string(),
    keyMoments: yup.string(),
});

module.exports = matchAnalysisSchema;
