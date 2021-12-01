// This defines a router handling all requests to api/incidents/*
// This is done to keep index.js light as index.js is our entrance point.

// libraries needed in general...
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Schemas needed for using Mongoose
const incidentSchema = require("./incidentSchema");

let router = express.Router();

console.log(process.env.DB_SERVER + process.env.DB);
let conn = mongoose.connect(process.env.DB_SERVER + process.env.DB); // create default connection

// since we created default connection, use mongoose.model to use the default connection
let incidentModel = mongoose.model("Incident", incidentSchema);

// endpoint for indicidual incidents...
router.get("/:gva_id(\\d+)", async (req, res) => {
  // /api/incidents/19878
  let query = await incidentModel
    .findOne(
      { gva_id: req.params.gva_id }, 
      setupProject(req.query))
    .exec();
  res.json(query);
});

//constructs a query from an advanced search form
router.get("/", async (req, res) => {
  /* default search parameters are:
    {
      limit: 10
      offset: 0
      orderby: {date: descending}
    }*/
  let limit = checkIfNonnegativeInteger(req.query.limit, 10);
  let offset = 0;

  console.log(
    "Query strings:",
    req.query,
    "Processed:",
    setupQuery(req.query),
    "Limit",
    limit
  );

  //setting project because search results are not going to show everything right away
  //adding offset for pagination purposes
  let query = await incidentModel
    .find(setupQuery(req.query), setupProject(req.query))
    .sort(setupOrderBy(req.query))
    .skip(offset)
    .limit(limit);

  res.json(query);
});


// HELPERS DOWN HERE
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


function setupQuery(queryStrings) {
  /**
   * Parses the query strings object and returns findOptions object
   * containing the appropriate arugments for find
   */
  let findOptions = {};
  
  // a query string param must be defined to handle it
  // process city and state
  if (typeof queryStrings.state === "string") {
    findOptions.state = queryStrings.state;
  }
  if (typeof queryStrings.city === "string") {
    findOptions.city = queryStrings.city;
  }

  // process deaths
  findOptions.deaths = {
    $gte: checkIfNonnegativeInteger(queryStrings.minKilled, 0),
    $lte: checkIfNonnegativeInteger(
      queryStrings.maxKilled,
      Number.MAX_SAFE_INTEGER
    ),
  };
  // process injured
  findOptions.wounded = {
    $gte: checkIfNonnegativeInteger(queryStrings.minWounded, 0),
    $lte: checkIfNonnegativeInteger(
      queryStrings.maxWounded,
      Number.MAX_SAFE_INTEGER
    ),
  };

  return findOptions;
}

function setupProject(queryStrings) {
  /**
   * Returns an filterOptions object that dictates which elements to return
   * /api/incidents?project=gva_id,incident_name,city,state
   */
  if (queryStrings.project === "string") {
    let projectOptions = {};
    queryStrings.project.split(",").forEach(element => {projectOptions[element] = 1;});
    return projectOptions;
  } else {
    return {
      gva_id: 1,
      incident_name: 1,
      city: 1,
      state: 1,
      deaths: 1,
      wounded: 1,
      start_date: 1,
    };
  }
}

function setupOrderBy(queryStrings) {
  /**
   * Returns an orderBy object that dictates what order the elements sorted by
   * order of strings matter!
   * api/incidents?orderBy=gva_id1,city0
   */
  let orderBy = {};
  queryStrings.orderBy
    .split(",")
    .forEach(element => {element[element.length - 1] === 1 ? projectOptions[element] = "asc" : "desc";});
  return orderBy;
}

module.exports = router;
