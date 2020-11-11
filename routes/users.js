const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

router.post('/signup', usersController.signup.post);

module.exports = router;