const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views');

router.get('/', viewsController.renderHome);
router.get('/realtimeproducts', viewsController.renderRealTimeProducts);

module.exports = router;