const getMultipleRandom = (arr, num) => {
    return [...arr].sort(() => 0.5 - Math.random()).slice(0, num);
}

module.exports = {
    getMultipleRandom
}