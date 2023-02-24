const { Router } = require('express');
const { check } = require('express-validator');
const { getNotifications, deleteNotification } = require('../controllers/notification');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.get('/:shopId', [], getNotifications);

router.delete('/:notificationId/delete', [], deleteNotification)

module.exports = router;