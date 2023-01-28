const { Router } = require('express');
const { getShops, getShopById, getCalendarsByShopId } = require('../controllers/shop');

const router = Router();

router.get('/', [], getShops);

router.get('/:id', [], getShopById);

router.get('/:id/calendars', [], getCalendarsByShopId);

module.exports = router;