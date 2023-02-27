const { response } = require("express");
const { unknownError } = require("../helpers/unknownError");
const Notification = require('../models/Notification');

const getNotifications = async(req, res = response) => {
    const { shopId } = req.params;
    const { limit = 10 } = req.query;

    try {
        const notifications = await Notification.find({ shop_id: shopId }).limit(limit).skip(limit - 10);
        const notificationsCount = await Notification.find({ shop_id: shopId }).count() - limit;
        
        res.status(200).json({
            ok: true,
            notifications,
            notificationsCount
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const deleteNotification = async(req, res = response) => {
    const { notificationId } = req.params;

    try {
        await Notification.findByIdAndDelete(notificationId);

        res.status(200).json({
            ok: true,
            msg: `Notification ${ notificationId } deleted`
        })
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getNotifications,
    deleteNotification
}