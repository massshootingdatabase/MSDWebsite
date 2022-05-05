const express = require('express');
const router = express.Router();

const {register, login, forgotpassword, resetpassword, privilege} = require('../controllers/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgotpassword').post(forgotpassword);

router.route('/resetpassword/:resetToken').put(resetpassword);

router.route('/privilege').get(privilege);

module.exports = router;

