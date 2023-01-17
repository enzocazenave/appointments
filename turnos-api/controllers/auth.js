const { response } = require('express');
const { unknownError } = require('../helpers/unknownError');
const User = require('../models/User');

const registerUser = async(req, res = response) => {
    const { email } = req.body;

    try {

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