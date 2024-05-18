const mongoose = require('mongoose');

const StageSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    archived: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
});


module.exports = mongoose.model('Stage', StageSchema);