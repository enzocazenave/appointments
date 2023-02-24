const verifyJWT = require("../helpers/verifyJWT");
const createAppointmentNotification = require("./createAppointmentNotification");
const panelConnected = require("./panelConnected");
const panelDisconnected = require("./panelDisconnected");

const socketConnection = async(socket, io) => {
    const [valid, _id, title] = verifyJWT(socket.handshake.query['x-token']);

    if (!valid) return socket.disconnect();

    if (title) {
        await panelConnected(_id, socket);
        console.log(`PANEL COMMERCE ${ _id } | ✅`);
    } else {
        console.log(`${ _id } | ✅`);
    }
    
    socket.on('create-appointment-notification', (payload) => createAppointmentNotification(payload, io));

    socket.on('disconnect', async() => {
        if (title) await panelDisconnected(_id);
        console.log(`${ _id } | ❌`);
    });
}

module.exports = socketConnection;