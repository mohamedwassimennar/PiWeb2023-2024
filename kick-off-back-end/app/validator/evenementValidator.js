const yup = require('yup');

const eventSchema = yup.object({
    date: yup.date().required(),
    time: yup.string().required(),
    reservationType: yup.string().oneOf(['Doctor', 'physio'])
});

module.exports = eventSchema;