const { response } = require("express");
const { unknownError } = require("../helpers/unknownError");
const Notification = require('../models/Notification');

const createNotification = async(req, res = response) => {

}

const getNotifications = async(req, res = response) => {
    const { shopId } = req.params;
    const { limit = 10 } = req.query;

    try {
        const notifications = await Notification.find({ shop_id: shopId }).limit(limit);

        res.status(200).json({
            ok: true,
            notifications
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    createNotification,
    getNotifications
}