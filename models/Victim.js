const Person = require("../models/Person");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const options = Person.options;

const victimSchema = new mongoose.Schema(
  {
    died: {
      type: Boolean,
      required: true,
    },
    knewPerp: Boolean,

    Incident: {
      type: Schema.Types.ObjectId,
      ref: "Incidents",
    },
  },
  options
);

const Victim = Person.discriminator("Victim", victimSchema);
module.exports = Victim;
