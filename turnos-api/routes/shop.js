const { Router } = require('express');
const { getShops, getShopById, getCalendarsByShopId, createAppointment, getAllAppointmentsById, getAppointmentsByShopId, getCalendarsWithAppointments, createCalendar, updateAppointment } = require('../controllers/shop');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { loginShop, renewShop, createShop } = require('../controllers/shopAuth');
const { tokenValidator } = require('../middlewares/tokenValidator');

const router = Router();

// OBTENER TODAS LAS TIENDAS O RANDOM CON QUERY STRING random=true
router.get('/', [], getShops);

// INICIAR SESION DESDE PANEL DE GESTION DE COMERCIO
router.post('/login', [
    check('username', 'El nombre de usuario es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 o más caractéres').isLength({ min: 6 }),
    fieldValidator
], loginShop);

// CREAR CUENTA DE PANEL DE GESTION DE COMERCIO DESDE CONSOLA PYTHON
router.post('/create', [
    check('title', 'El nombre del comercio es obligatorio.').not().isEmpty(),
    check('username', 'El nombre de usuario del comercio es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña del comercio es obligatorio.').isLength({ min: 6 }),
    fieldValidator,
], createShop)

// RENOVACION DE JSON WEB TOKEN
router.get('/renew', tokenValidator, renewShop);

// OBTENER UNA TIENDA POR SU UID
router.get('/:id', [], getShopById);

// OBTENER CALENDARIOS DE TIENDA POR SU UID
router.get('/:id/calendars', [], getCalendarsByShopId);

// CREAR CALENDARIOS DE TIENDA
router.post('/:id/calendars', [
    check('appointments_frequency', 'La frecuencia de turnos en minutos es obligatoria.').isNumeric(),
    check('min_time', 'El horario de primer turno es obligatorio').isObject(),
    check('max_time', 'El horario de primer turno es obligatorio').isObject(),
    check('appointments_days', 'El horario del ultimo turno es obligatorio').isArray(),
    check('name', 'El nombre del calendario es obligatorio').not().isEmpty(),
    fieldValidator
], createCalendar);

router.patch('/:shopId/:calendarId', [], updateAppointment);

// CREAR TURNO A TRAVES DE UID DE COMERCIO Y UID DE CALENDARIO
router.post('/:shopId/:calendarId', [
    check('user_id', 'Es obligatorio estar en una sesión.').not().isEmpty(),
    check('appointment_date_start', 'Es obligatorio que el turno tenga una fecha y hora de inicio').isObject(),
    check('appointment_date_end', 'Es obligatorio que el turno tenga una fecha y hora de fin').isObject(),
    fieldValidator
], createAppointment);

// OBTENER TODOS LOS TURNOS DE UN CALENDARIO POR UID DE CALENDARIO
router.get('/calendar/:calendarId', [], getAllAppointmentsById);

// OBTENER TODOS LOS TURNOS DE UN COMERCIO POR UID DE COMERCIO
router.get('/:shopId/appointments', [], getAppointmentsByShopId);

// OBTENER TODOS LOS CALENDARIOS POR UID DE COMERCIO Y SU CANTIDAD DE TURNOS
router.get('/:shopId/calendarsWithAppointments', [], getCalendarsWithAppointments);

module.exports = router;