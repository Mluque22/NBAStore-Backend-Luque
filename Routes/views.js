const express = require('express');
const router = express.Router();
const { renderHome, renderRealTimeProducts } = require('../controllers/views');

router.get('/', renderHome);
router.get('/realtimeproducts', renderRealTimeProducts);

module.exports = router;
