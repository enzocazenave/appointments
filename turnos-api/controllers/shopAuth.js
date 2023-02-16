const { compareSync } = require('bcryptjs');
const { response } = require('express');
const { sign } = require('jsonwebtoken');
const { unknownError } = require('../helpers/unknownError');
const Shop = require('../models/Shop');

const loginShop = async(req, res = response) => {
    const { username, password } = req.body;

    try {
        const shop = await Shop.findOne({ username });

        if (!shop) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });
        
        const isPasswordValid = compareSync(password, shop.password);

        if (!isPasswordValid) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        const tokenPayload = {
            _id: shop._id,
            title: shop.title,
            image: shop.image,
            created_at: shop.created_at
        }

        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '2h' });
        tokenPayload.token = token;

        res.status(201).json({
            ok: true,
            ...tokenPayload
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const renewShop = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        ...req.body
    });
}

module.exports = {
    loginShop,
    renewShop
}