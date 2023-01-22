const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true,
    },
    dni: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = model('User', UserSchema);