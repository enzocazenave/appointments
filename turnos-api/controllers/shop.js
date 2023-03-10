const { response } = require('express');
const { getMultipleRandom } = require('../helpers/getMultipleRandom');
const { unknownError } = require('../helpers/unknownError');
const Appointment = require('../models/Appointment');
const Calendar = require('../models/Calendar');
const Shop = require('../models/Shop');

const getShops = async(req, res = response) => {

    const { random = false } = req.query;

    try {
        const shops = await Shop.find({});
        let shopsToSearchBar = shops.map(({ _doc: { text, created_at, ...keepProperties } }) => keepProperties);

        if (random) {
            shopsToSearchBar = getMultipleRandom(shopsToSearchBar, 4);
        }

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
        const calendars = await Calendar.find({ shop_id: id });
        
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

        let appointment = await Appointment.findOne({ appointment_date_start, shop_id: shopId, calendar_id: calendarId });
    
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

        await appointment.save();
    
        res.status(200).json({
            ok: true,
            appointment
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const createCalendar = async(req, res = response) => {
    const { id } = req.params;
    //const { appointments_frequency, min_time, max_time, appointments_days, name, text, image } = req.body;

    try {
        const calendar = new Calendar({
            shop_id: id,
            ...req.body
        })

        await calendar.save();

        res.status(200).json({
            ok: true,
            calendar
        })
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

const getAppointmentsByShopId = async(req, res = response) => {
    const { shopId } = req.params;

    try {
        const monthCount = [{ month: 1, appointments: 0 },{ month: 2, appointments: 0 },{ month: 3, appointments: 0 },{ month: 4, appointments: 0 },{ month: 5, appointments: 0 },{ month: 6, appointments: 0 },{ month: 7, appointments: 0 },{ month: 8, appointments: 0 },{ month: 9, appointments: 0 },{ month: 10, appointments: 0 },{ month: 11, appointments: 0 },{ month: 12, appointments: 0 }];
        const appointments = await Appointment.find({ shop_id: shopId });     

        appointments.forEach(appointment => {
            if (appointment.appointment_date_start.year !== new Date().getFullYear()) return;
            monthCount[appointment.appointment_date_start.month].appointments += 1;
        });

        res.status(200).json({
            ok: true,
            appointments: {
                count: appointments.length,
                monthCount,
            }
        });
    } catch(error) {
        unknownError(res, error);
    }
}

const getCalendarsWithAppointments = async(req, res = response) => {
    const { shopId } = req.params;

    try {
        const calendars = await Calendar.find({ shop_id: shopId });
        const calendarsInfo = await Promise.all(calendars.map(async(calendar) => {

            const { name, image, _id } = calendar;

            return {
                _id,
                name,
                image,
                appointments: await Appointment.find({ calendar_id: _id }).count()
            }
        }));

        res.status(200).json({
            ok: true,
            calendars: calendarsInfo
        })
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getShops,
    getShopById,
    getCalendarsByShopId,
    createAppointment,
    createCalendar,
    getAllAppointmentsById,
    getAppointmentsByShopId,
    getCalendarsWithAppointments
}