const { Router } = require('express');
const { getShops, getShopById, getCalendarsByShopId, createAppointment, getAllAppointmentsById } = require('../controllers/shop');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.get('/', [], getShops);

router.get('/:id', [], getShopById);

router.get('/:id/calendars', [], getCalendarsByShopId);

router.post('/:shopId/:calendarId', [
    check('user_id', 'Es obligatorio estar en una sesión.').not().isEmpty(),
    check('appointment_date_start', 'Es obligatorio que el turno tenga una fecha y hora de inicio').isObject(),
    check('appointment_date_end', 'Es obligatorio que el turno tenga una fecha y hora de fin').isObject(),
    fieldValidator
], createAppointment);

router.get('/calendar/:calendarId', [], getAllAppointmentsById);

module.exports = router;