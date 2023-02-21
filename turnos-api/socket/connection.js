const verifyJWT = require("../helpers/verifyJWT");

const socketConnection = async(socket, io) => {
    const [valid, _id] = verifyJWT(socket.handshake.query['x-token']);

    if (!valid) return socket.disconnect();

    console.log(`${ _id } | ✅`)

    socket.on('disconnect', async() => {
        console.log(`${ _id } | ❌`)
    });
}

module.exports = socketConnection;