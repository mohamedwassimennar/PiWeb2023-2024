const yup = require('yup');

const performanceSummarySchema = yup.object({
    season: yup.date().required(),
    totalGoalsScored: yup.number().integer().min(0),
    averagePassCompletionRate: yup.number().min(0).max(100),
    totalDistanceCovered: yup.number().integer().min(0),
    totalMatchesPlayed: yup.number().integer().min(0),
    yellowCards: yup.number().integer().min(0),
    redCards: yup.number().integer().min(0),
    minutesPlayed: yup.number().integer().min(0),
});

module.exports = performanceSummarySchema;
