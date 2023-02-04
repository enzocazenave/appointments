const { response } = require("express");
const { unknownError } = require("../helpers/unknownError");
const Appointment = require('../models/Appointment');
const Calendar = require("../models/Calendar");
const Shop = require('../models/Shop');

const getAllAppointmentsByUserId = async(req, res = response) => {

    const { userId } = req.params;

    try {
        const appointments = await Appointment.find({ user_id: userId });
        let appointmentsResult = [];

        if (appointments.length > 0) {
            appointmentsResult = await Promise.all(appointments.map(async({ _doc: { _id, shop_id, calendar_id, appointment_date_start, appointment_date_end }}) => {
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
                    appointment_date_end
                }
            }));
        }

        res.status(200).json({
            ok: true,
            appointments: appointmentsResult
        });
    } catch(error) {
        unknownError(res, error);
    }
}

module.exports = {
    getAllAppointmentsByUserId
}