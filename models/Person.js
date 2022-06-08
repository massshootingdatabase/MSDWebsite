const mongoose = require("mongoose");

const options = { discriminatorKey: "kind" };
const personSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    gender: String,
    race: String,
    sexuality: String,
  },
  options
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
