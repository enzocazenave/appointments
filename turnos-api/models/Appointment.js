const { model, Schema } = require('mongoose');

const AppointmentSchema = Schema({
    shop_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    calendar_id: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    appointment_date_start: {
        type: Object,
        required: true
    },
    appointment_date_end: {
        type: Object,
        required: true
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    cancelledMessage: {
        type: String,
        default: ''
    }
});

module.exports = model('Appointment', AppointmentSchema);