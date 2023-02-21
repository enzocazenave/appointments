const { model, Schema } = require('mongoose');

const NotificationSchema = Schema({
    shop_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        default: {}
    }
});

module.exports = model('Notification', NotificationSchema);