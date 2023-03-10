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
        default: ''
    },
    image: {
        type: String,
        default: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg',
    }
});

module.exports = model('Calendar', CalendarSchema);