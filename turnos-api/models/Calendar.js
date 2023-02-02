const { model, Schema } = require('mongoose');

const CalendarSchema = Schema({
    shop_id: {
        type: String,
        required: true
    },
    appointments_frequency: {
        type: Number,
        required: true
    },
    min_time: {
        type: Object,
        required: true
    },
    max_time: {
        type: Object,
        required: true
    },
    appointments_days: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = model('Calendar', CalendarSchema);