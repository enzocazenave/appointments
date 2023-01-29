const { response } = require('express');
const { default: mongoose } = require('mongoose');
const { unknownError } = require('../helpers/unknownError');
const Appointment = require('../models/Appointment');
const Calendar = require('../models/Calendar');
const Shop = require('../models/Shop');

const getShops = async(req, res = response) => {
    try {
        const shops = await Shop.find({});
        const shopsToSearchBar = shops.map(({ _doc: { text, created_at, ...keepProperties } }) => keepProperties);

        res.status(200).json({
            ok: true,
            shops: shopsToSearchBar
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const getShopById = async(req, res = response) => {
    const { id } = req.params;

    try {
        const shop = await Shop.findById(id);

        if (!shop) return res.status(400).json({
            ok: false,
            msg: 'El comercio indicado no existe.'
        });

        res.status(200).json({
            ok: true,
            shop
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const getCalendarsByShopId = async(req, res = response) => {
    const { id } = req.params;

    try {
        const calendars = await Calendar.find({ shop_id: id })
        if (!calendars) return res.status(400).json({
            ok: false,
            msg: 'El comercio no tiene calendarios de turnos'
        });

        res.status(200).json({
            ok: true,
            calendars
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const createAppointment = async(req, res = response) => {
    const { shopId, calendarId } = req.params;
    const { comment, user_id, appointment_date_start, appointment_date_end } = req.body;

    try {

        let appointment = await Appointment.findOne({ appointment_date_start });
    
        if (appointment) return res.status(400).json({
            ok: false,
            msg: 'Ya hay un turno reservado en ese horario.'
        });
    
        appointment = new Appointment({
            shop_id: shopId,
            user_id,
            calendar_id: calendarId,
            comment,
            appointment_date_start,
            appointment_date_end
        });

        appointment.save();
    
        res.status(200).json({
            ok: true,
            appointment
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getShops,
    getShopById,
    getCalendarsByShopId,
    createAppointment
}