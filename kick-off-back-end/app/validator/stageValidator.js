const yup = require('yup');

const stageSchema = yup.object({
    startDate: yup.string().required(),
    endDate: yup.string().required(),
    lieu: yup.string().required(),

});

module.exports = stageSchema;