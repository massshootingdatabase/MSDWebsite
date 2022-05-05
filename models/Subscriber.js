
const User = require("../models/User");
const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
      optOut: Boolean
    }, 
    options
);

const Subscriber = User.discriminator('Subscriber', subSchema);
module.exports = Subscriber;