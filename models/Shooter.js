const Person = require("../models/Person");
const mongoose = require("mongoose");

const options = Person.options;

const shooterSchema = new mongoose.Schema(
  {
    status: String,
    crime: [String],
    trauma: [String],
    mental: [String],
    motives: [String],
    education: String,
    employment: String,
    religion: String,
    immigrant: Boolean,
    citizenship: String,
  },
  options
);

const Shooter = Person.discriminator("Shooter", shooterSchema);
module.exports = Shooter;
