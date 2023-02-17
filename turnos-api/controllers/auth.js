const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const { generateAuthCode } = require('../helpers/generateAuthCode');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const AuthCode = require('../models/AuthCode');
const configEmailSender = require('../helpers/configEmailSender');

const registerUser = async(req, res = response) => {
    const { email, dni } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico ${ email } está en uso.`
        });

        user = await User.findOne({ dni });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El documento nacional de identidad ${ dni } está en uso.`
        });

        const generatedAuthCode = generateAuthCode();
        const transport = nodemailer.createTransport(configEmailSender);
        await transport.sendMail({
            from: process.env.GMAIL_APP_EMAIL,
            to: email,
            subject: 'Turnate - Código de verificación',
            text: `Código: ${ generatedAuthCode }`
        });

        await AuthCode.deleteOne({ email });
        const authCode = new AuthCode({ email, auth_code: generatedAuthCode });
        authCode.save();

        res.status(200).json({
            ok: true
        })
    } catch(error) {
        unknownError(res, error);
    }
}

const registerUserConfirm = async(req, res = response) => {
    const { email, password, dni, code } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico ${ email } está en uso.`
        });

        user = await User.findOne({ dni });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El documento nacional de identidad ${ dni } está en uso.`
        });

        const authCode = await AuthCode.findOneAndDelete({ auth_code: code, email });

        if (!authCode) return res.status(404).json({
            ok: false,
            msg: 'Código de verificación incorrecto.'
        });

        delete req.body.code;

        user = new User(req.body);

        const salt = genSaltSync();
        user.password = hashSync(password, salt);
        await user.save();

        delete req.body.password;
        const tokenPayload = { ...req.body, _id: user._id, created_at: user.created_at };
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
            _id: user._id,
            email,
            name: user.name,
            surname: user.surname,
            dni: user.dni,
            created_at: user.created_at
        }
        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '2h' });
        tokenPayload.token = token;

        res.status(201).json({
            ok: true,
            ...tokenPayload,
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const changeEmail = async(req, res = response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico ${ email } está en uso.`
        });

        const generatedAuthCode = generateAuthCode();
        const transport = nodemailer.createTransport(configEmailSender);
        await transport.sendMail({
            from: process.env.GMAIL_APP_EMAIL,
            to: email,
            subject: 'Turnate - Código de verificación',
            text: `Código: ${ generatedAuthCode }`
        });

        await AuthCode.deleteOne({ email });
        const authCode = new AuthCode({ email, auth_code: generatedAuthCode });
        authCode.save();

        res.status(200).json({
            ok: true,
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const loginAdmin = async(req, res = response) => {
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

        const isAdmin = user.isAdmin;

        if (!isAdmin) return res.status(400).json({
            ok: false,
            msg: 'El usuario no es administrador.'
        });

        res.status(200).json({
            ok: true,
            _id: user._id,
            email
        })
    } catch(error) {
        unknownError(res, error);
    }
}

const changeEmailConfirm = async(req, res = response) => {
    const { code, oldEmail, newEmail } = req.body;

    try {
        const authCode = await AuthCode.findOneAndDelete({ auth_code: code, email: newEmail });

        if (!authCode) return res.status(404).json({
            ok: false,
            msg: 'Código de verificación incorrecto.'
        });

        const user = await User.findOneAndUpdate({ email: oldEmail }, { email: newEmail });
        await user.save();

        const tokenPayload = {
            _id: user._id,
            email: newEmail,
            name: user.name,
            surname: user.surname,
            dni: user.dni,
            created_at: user.created_at
        }

        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: '2h' });

        tokenPayload.token = token;

        res.status(200).json({
            ok: true,
            ...tokenPayload
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
    registerUserConfirm,
    loginUser,
    changeEmail,
    changeEmailConfirm,
    renewUser,
    loginAdmin
}