const express = require('express');
const router = express.Router();

const {create, get, addShooter, addVictim, getAdvanced} = require('../controllers/incidents');
const { protect } = require('../middleware/auth');

router.route('/create').post(protect(3), create); //only data entry team can Create, Update and Delete incidents
router.route('/:id(\\w+)').get(get);
router.route('/get').post(getAdvanced);
//router.route('/addShooter').post(protect(3), addShooter);
//router.route('/addVictim').post(protect(3), addVictim);

module.exports = router;
