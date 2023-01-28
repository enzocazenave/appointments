const { Router } = require('express');
const { getShops, getShopById, getCalendarsByShopId, createAppointment } = require('../controllers/shop');
const { check } = require('express-validator');
const { isDate } = require('moment');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.get('/', [], getShops);

router.get('/:id', [], getShopById);

router.get('/:id/calendars', [], getCalendarsByShopId);

router.post('/:shopId/:calendarId', [
    check('user_id', 'Es obligatorio estar en una sesión.').not().isEmpty(),
    check('appointment_date_start', 'Es obligatorio que el turno tenga una fecha y hora de inicio').custom(isDate),
    check('appointment_date_end', 'Es obligatorio que el turno tenga una fecha y hora de fin').custom(isDate),
    fieldValidator
], createAppointment);

module.exports = router;