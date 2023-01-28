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
    comment: {
        type: String,
        required: true
    },
    appointment_date: {
        type: Date,
        required: true
    }
});

module.exports = model('Appointment', AppointmentSchema);