const Shop = require("../models/Shop");

const panelConnected = async(_id, socket) => {
    const shop = await Shop.findById(_id);
    shop.socket_id = socket.id;
    await shop.save();
}

module.exports = panelConnected;