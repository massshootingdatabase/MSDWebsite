/*
This module is meant to dictate the schema for Incidents.

We're not making a model in here because we use the 
    "export schema" pattern for multiple connection objects
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;

const Shooter = require("./Shooter").schema;

const incidentSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  incident_id: String, // generated
  start_date: Date, // ISO 8601 format... YYYY-MM-DDThh:mm:ssZ
  end_date: Date,
  deaths: Number,
  wounded: Number,
  types: [String],
  description: String, // includes name

  districts: {
    congressional: String, // String because of congressional districts like 59B
    state_senate: String, // ditto
    state_house: String, // ditto
  },

  location: {
    // workaround to prevent Mongoose from interpreting location as an object of type String
    place_type: String,
    coordinates: [Number, Number], // [lat, long]
    address: String,
    city: String,
    state: String, // abbreviations, ex: CA
    postal_code: String, // String because of zipcodes like 01678
  },

  // linking the victims collections for each incident
  victims: [{ type: Schema.Types.ObjectId, ref: "Person" }],

  // embedding shooters for each incident
  shooters: [Shooter],

  sources: [
    {
      description: String, // type of source may differ from a webpage
      url: String,
    },
  ],
});

// we only are exporting the schema...
const Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident;
