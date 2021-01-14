const express = require('express');
const router = express.Router();

const { usersController } = require('../controller');

router.post('/signup', usersController.signup.post);
router.post('/signin', usersController.signin.post);
router.post('/signout', usersController.signout.post);
router.get('/info', usersController.info.get);
router.patch('/editinfo', usersController.editinfo.patch);
router.post('/checkpwd', usersController.checkpwd.post);
router.post('/remove', usersController.remove.post);
router.post('/google', usersController.google.post);

module.exports = router;