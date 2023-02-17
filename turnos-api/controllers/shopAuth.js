const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
const { response } = require('express');
const { sign } = require('jsonwebtoken');
const { unknownError } = require('../helpers/unknownError');
const Shop = require('../models/Shop');
const User = require('../models/User');


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

const createShop = async(req, res = response) => {
    const { title, username, password, id } = req.body;

    try {
        let shop = await Shop.findOne({ username });

        if (shop) return res.status(400).json({
            ok: false,
            msg: `El nombre de usuario ${ username } está en uso.`
        });

        const user = await User.findById(id);

        if (!user.isAdmin) return res.status(403).json({
            ok: false,
            msg: 'No eres administrador.'
        });

        shop = new Shop({
            title,
            text: '',
            image: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg',
            estimated_location: '',
            username,
            password
        });

        const salt = genSaltSync();
        shop.password = hashSync(password, salt);

        await shop.save();

        res.status(200).json({
            ok: true,
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    loginShop,
    renewShop,
    createShop
}