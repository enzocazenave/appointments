const { model, Schema } = require('mongoose');

const CalendarSchema = Schema({
    shop_id: {
        type: String,
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