const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const User = require('../models/User');

const registerUser = async(req, res = response) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico ${ email } está en uso.`
        });

        user = new User(req.body);

        const salt = genSaltSync();
        user.password = hashSync(password, salt);
        await user.save();

        delete req.body.password;
        const tokenPayload = { ...req.body };
        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '2h' });
        payload.token = token;

        res.status(201).json({
            ok: true,
            ...payload
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        const tokenPayload = {
            email,
            name: user.name,
            surname: user.surname,
            dni: user.dni
        }
        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '2h' });
        payload.token = token;

        res.status(201).json({
            ok: true,
            ...payload
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const renewUser = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        ...req.body
    });
}

module.exports = {
    registerUser,
    loginUser,
    renewUser
}