const { Router } = require('express');
const { check } = require('express-validator');
const { createNotification, getNotifications } = require('../controllers/notification');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.post('/', [
    check('text', 'El texto es obligatorio.').not().isEmpty(),
    check('shop_id', 'El identificador de comercio es obligatorio.').not().isEmpty(),
    fieldValidator
], createNotification);

router.get('/:shopId', [], getNotifications);

module.exports = router;