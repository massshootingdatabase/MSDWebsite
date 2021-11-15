// This defines a router handling all requests to api/incidents/*
// This is done to keep index.js light as index.js is out entrance point.

// libraries needed in general...
const express = require('express');
const mongoose = require('mongoose');

// Schemas needed for using Mongoose
const incidentSchema = require('./incidentSchema');

// We might need to reconnect databases...
const SERVER = "mongodb://localhost:27017/";
let DB = "msd";

let router = express.Router();

let conn = mongoose.connect(SERVER + DB); // create default connection
// since we created default connection, use mongoose.model to use the default connection
let incidentModel = mongoose.model("Incident", incidentSchema);


function checkIfNonnegativeInteger(input, valueToReturn) {
    /**
     * Returns valueToReturn if input is not a string
     * that can be parsed into an nonnegative number.
     */
    let integer = parseInt(input);
    if (isNaN(integer) || integer < 0) {
        return valueToReturn;
    }
    return integer;
}


function setupFind(queryStrings) {
    /* Takes the query strings and creates the arguments for find */
    let findOptions = {};
    // process deaths
    findOptions.deaths = {
        $gte: checkIfNonnegativeInteger(queryStrings.minKilled, 0),
        $lte: checkIfNonnegativeInteger(queryStrings.maxKilled, Number.MAX_SAFE_INTEGER)
    };
    // process state
    if (typeof queryStrings.state === "string") {
        findOptions.state = queryStrings.state;
    }
    return findOptions;
}


router.get("/:gva_id(\\d+)", async (req, res) => {
    // /api/incidents/19878
    let query = await incidentModel.findOne({gva_id: req.params.gva_id}).exec();
    res.json(query);
});


router.get("/", async (req, res) => {
    let limit = checkIfNonnegativeInteger(req.query.limit, 100);
    console.log("Query strings:", req.query, "Processed:", setupFind(req.query),  "Limit", limit);
    let query = await incidentModel.find(setupFind(req.query)).sort({date: "descending"}).limit(limit);
    res.json(query);
});



module.exports = router;