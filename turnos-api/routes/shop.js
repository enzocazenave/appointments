const { Router } = require('express');
const { getShops, getShopById, getCalendarsByShopId, createAppointment, getAllAppointmentsById } = require('../controllers/shop');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { loginShop, renewShop, createShop } = require('../controllers/shopAuth');
const { tokenValidator } = require('../middlewares/tokenValidator');

const router = Router();

router.get('/', [], getShops);

router.post('/login', [
    check('username', 'El nombre de usuario es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
    fieldValidator
], loginShop);

router.post('/create', [
    check('title', 'El nombre del comercio es obligatorio.').not().isEmpty(),
    check('username', 'El nombre de usuario del comercio es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña del comercio es obligatorio.').isLength({ min: 6 }),
    fieldValidator,
], createShop)

router.get('/renew', tokenValidator, renewShop);

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