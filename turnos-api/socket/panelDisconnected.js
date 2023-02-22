const Shop = require("../models/Shop");

const panelDisconnected = async(_id) => {
    const shop = await Shop.findById(_id);
    shop.socket_id = '';
    await shop.save();
}

module.exports = panelDisconnected;