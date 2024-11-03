const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/token', authController.authenticate);

module.exports = router;
