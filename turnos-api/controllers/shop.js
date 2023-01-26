const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const Shop = require('../models/Shop');

const getShopsBySearchbar = async(req, res = response) => {
    try {
        const shops = await Shop.find({});
        const shopsToSearchBar = shops.map(({ _doc: { text, created_at, ...keepProperties } }) => keepProperties);

        res.status(200).json({
            ok: true,
            shops: shopsToSearchBar
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getShopsBySearchbar
}