const generateAuthCode = (limit = 6) => {
    let digits = '0123456789';
    let authCode = '';

    for (let i = 0; i < limit; i++) {
        authCode += digits[Math.floor(Math.random() * 10)];
    }

    return authCode;
}

module.exports = { 
    generateAuthCode
}