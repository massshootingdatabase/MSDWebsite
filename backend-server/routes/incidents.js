const express = require('express');
const router = express.Router();

const {create, get, addShooter} = require('../controllers/incidents');

router.route('/create').post(create);
router.route('/get').post(get);
router.route('/addShooter').post(addShooter);

module.exports = router;
