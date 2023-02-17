const { model, Schema } = require('mongoose');

const ShopSchema = Schema({
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    estimated_location: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Shop', ShopSchema);