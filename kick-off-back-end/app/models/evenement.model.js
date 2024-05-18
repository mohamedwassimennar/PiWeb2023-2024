const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    reservationType: {
        type: String,
        enum: ['Doctor', 'physio']
    },
    archived: {
        type: Boolean,
        default: false
    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playera' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);