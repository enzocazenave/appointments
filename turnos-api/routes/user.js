const { Router } = require('express');
const { getAllAppointmentsByUserId } = require('../controllers/user');

const router = Router();

router.get('/appointments/:userId', [], getAllAppointmentsByUserId);

module.exports = router;