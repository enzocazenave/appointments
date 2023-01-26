const { Router } = require('express');
const { getShopsBySearchbar } = require('../controllers/shop');

const router = Router();

router.get('/search', [], getShopsBySearchbar);

module.exports = router;