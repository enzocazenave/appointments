const { response } = require("express");
const { sortByDate } = require("../helpers/sortByDate");
const { unknownError } = require("../helpers/unknownError");
const Appointment = require('../models/Appointment');
const Calendar = require("../models/Calendar");
const Shop = require('../models/Shop');

const getAllAppointmentsByUserId = async(req, res = response) => {

    const { userId } = req.params;

    try {
        const appointments = await Appointment.find({ user_id: userId });
        let appointmentsResult = [];
        let currentAppointments = [];
        let notCurrentAppointments = [];
        let cancelledAppointments = [];

        if (appointments.length === 0) return res.status(200).json({
            ok: true,
            currentAppointments,
            notCurrentAppointments,
            cancelledAppointments
        });

        appointmentsResult = await Promise.all(appointments.map(async({ _doc: { _id, shop_id, calendar_id, appointment_date_start, appointment_date_end, cancelled }}) => {
            const { title, image } = await Shop.findById(shop_id);
            const { name } = await Calendar.findById(calendar_id);
            return {
                _id,
                shop: {
                    title,
                    image
                },
                calendar_name: name,
                appointment_date_start,
                appointment_date_end,
                cancelled
            }
        }));
        
        for (const appointment of appointmentsResult) {
            const { month, day, year, hour, minute } = appointment.appointment_date_start;
            const appointmentDate = new Date(year, month, day, hour, minute, 0);
            const currentDate = new Date();
            if (appointment.cancelled) {
                cancelledAppointments.push(appointment);
                continue;
            }
            if (currentDate < appointmentDate) {
                currentAppointments.push(appointment);
                continue;
            }
            if (currentDate > appointmentDate) {
                notCurrentAppointments.push(appointment);
                continue;  
            } 
        }

        currentAppointments.sort((a, b) => sortByDate(a,b));
        notCurrentAppointments.sort((a, b) => sortByDate(a,b));
        cancelledAppointments.sort((a, b) => sortByDate(a,b));
        

        res.status(200).json({
            ok: true,
            currentAppointments,
            notCurrentAppointments,
            cancelledAppointments
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getAllAppointmentsByUserId
}