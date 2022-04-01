const Person = require('../models/Person');
const mongoose = require('mongoose');

var options = Person.options;

const shooterSchema = new mongoose.Schema({
    status: String,
    crime: [String],
    trauma: [String],
    mental: [String],
    motives: [String],
    education: String,
    employment: String,
    religion: String,
    immigrant: Boolean,
    citizenship: String
});

const Shooter = Person.discriminator('Shooter', shooterSchema);
module.exports = Shooter;