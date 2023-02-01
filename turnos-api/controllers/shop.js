const { response } = require('express');
const moment = require('moment');
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
        
        const appointment_date_start_minute = new Date(appointment_date_start).getMinutes();
        const appointment_date_start_hour = new Date(appointment_date_start).getHours();

        if (appointment_date_start_minute !== 0 &&
            appointment_date_start_minute !== 15 &&
            appointment_date_start_minute !== 30 &&
            appointment_date_start_minute !== 45 ||
            appointment_date_start_hour === 0
        ) return res.status(400).json({
            ok: false,
            msg: 'Horario invalido.'
        })
        

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

const getAllAppointmentsById = async(req, res = response) => {
    const { calendarId } = req.params;

    try {
        const appointments = await Appointment.find({ calendar_id: calendarId });

        if (!appointments) return res.status(400).json({
            ok: false,
            msg: 'No hay turnos reservados en este calendario.'
        });

        const appointmentRefactored = appointments.map(({ _doc: { appointment_date_start, appointment_date_end,...rest }}) => {
            return {
                ...rest,
                start: appointment_date_start,
                end: appointment_date_end
            }
        });

        res.status(200).json({
            ok: true,
            appointments: appointmentRefactored
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getShops,
    getShopById,
    getCalendarsByShopId,
    createAppointment,
    getAllAppointmentsById
}