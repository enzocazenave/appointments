const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const Shop = require('../models/Shop');

const getShopsBySearchbar = async(req, res = response) => {
    const shops = await Shop.find({});

    res.status(200).json({
        ok: true,
        shops
    })
}

module.exports = {
    getShopsBySearchbar
}