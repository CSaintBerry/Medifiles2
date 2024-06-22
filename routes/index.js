const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.post('/register', userController.register);

module.exports = router;
