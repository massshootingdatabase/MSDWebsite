/*
This module is meant to dictate the schema for Incidents.

We're not making a model in here because we use the 
    "export schema" pattern for multiple connection objects
*/
const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema({
    gva_id: Number,
    incident_name: String,
    date: Date, // ISO 8601 format... YYYY-MM-DDThh:mm:ssZ
    place_type: String, 
    place_name: String, 
    address: String, 
    city: String, 
    state: String, // abbreviations, ex: CA
    postal_code: String, // String because of zipcodes like 01678 
    congressional: String, // String because of congressional districts like 59B
    state_senate: String,  // ditto
    state_house: String,   // ditto
    deaths: Number, 
    wounded: Number, 
    location: {
        // workaround to prevent Mongoose from interpreting location as an object of type String 
        type: { type : String}, 
        coordinates : [Number, Number] // [lat, long]
    }, 
    sources: [
        {
            url: String,
            isbn: String,
            issn: String,
            doi: String,
            pmid: String,
            sici: String,
            // workaround to prevent Mongoose from interpreting location as an object of type String 
            type : {type: String},
            title: String,
            authors: [String],
            organization: String,
            first_published: Date,
            last_updated: String
        }
    ],
    types: [String]
});

// we only are exporting the schema...
module.exports = incidentSchema;
