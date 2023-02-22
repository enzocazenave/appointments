const jwt = require('jsonwebtoken');

const verifyJWT = (token = '') => {
    try {
        const { _id, title = null } = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        return [true, _id, title];
    } catch(error) {
        return [false, null, null];
    }
}

module.exports = verifyJWT