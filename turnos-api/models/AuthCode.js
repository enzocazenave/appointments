const { model, Schema } = require('mongoose');

const AuthCodeSchema = Schema({
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    email: {
        type: String,
        required: true
    },
    auth_code: {
        type: String,
        required: true
    }
});

module.exports = model('AuthCode', AuthCodeSchema);