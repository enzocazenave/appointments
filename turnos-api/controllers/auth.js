const { genSaltSync, hashSync } = require('bcryptjs');
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

        res.status(201).json({
            ok: true, 
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const loginUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {

    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    registerUser,
    loginUser
}