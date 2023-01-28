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
        type: String,
        required: true
    },
    appointment_date_start: {
        type: Date,
        required: true
    },
    appointment_date_end: {
        type: Date,
        required: true
    }
});

module.exports = model('Appointment', AppointmentSchema);