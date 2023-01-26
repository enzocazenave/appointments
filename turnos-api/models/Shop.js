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
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    estimated_location: {
        type: String,
        required: true
    },
});

module.exports = model('Shop', ShopSchema);