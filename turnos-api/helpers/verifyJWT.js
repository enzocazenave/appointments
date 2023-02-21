const jwt = require('jsonwebtoken');

const verifyJWT = (token = '') => {
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        return [true, _id];
    } catch(error) {
        return [false, null];
    }
}

module.exports = verifyJWT