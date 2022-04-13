const express = require('express');
const router = express.Router();

const {create, get, addShooter, addVictim} = require('../controllers/incidents');

router.route('/create').post(create);
router.route('/get').post(get);
router.route('/addShooter').post(addShooter);
router.route('/addVictim').post(addVictim);

module.exports = router;
