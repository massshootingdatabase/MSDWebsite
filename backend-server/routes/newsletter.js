const express = require('express');
const router = express.Router();

const {signup, confirm, upload, del} = require('../controllers/newsletter');

router.route('/signup').post(signup);
router.route('/confirm').get(confirm);
router.route('/upload').post(upload);
router.route('/delete').get(del);

module.exports = router;


