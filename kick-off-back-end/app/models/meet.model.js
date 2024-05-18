const mongoose = require('mongoose');

const MeetSchema = mongoose.Schema({
    date: {
        type: Date,
    },
    time: {
        type: String,
    },
    link: {
        type: String,
        default: 'https://meet.jit.si/space-dev'
    },
    archived: {
        type: Boolean,
        default: false
    },
    meettype: {
        type: String,
        required: true,
        enum: ['player', 'doctor', 'physiotherapist']
    }
}, {
    timestamps: true
});



module.exports = mongoose.model('Meet', MeetSchema);