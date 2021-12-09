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
  let limit = parseInt(req.query.limit);
  if (isNaN(limit)) {
    limit = 10;
  }
  let offset = parseInt(req.query.offset);
  if (isNaN(offset)) {
    offset = 0;
  }

  //setting project because search results are not going to show everything right away
  //adding offset for pagination purposes
  let query = incidentModel
    .find(setupQuery(req.query), setupProject(req.query))
    .sort(setupOrderBy(req.query))
    .skip(offset)
    .limit(limit);
  
  console.log(query.getFilter(), query.getOptions(), query.projection());

  let results = await query.exec();
  res.json(results);
});



function createRange(min, max) {
  let options = {};
  let minInt = parseInt(min);
  let maxInt = parseInt(max);

  if (!isNaN(minInt)) {
    options.$gte = minInt;
  }

  if (!isNaN(maxInt)) {
    options.$lte = maxInt;
  }

  return options;
}


function setupQuery(queryStrings) {
  /**
   * Parses the query strings object and returns findOptions object
   * containing the appropriate arugments for find
   */
  let findOptions = {};
  
  // checking if the type of a query string is a string
  // is a quick way to check if the query string param has a usable value
  let params = ["state", "city", "congressional", "stateSenate", "stateHouse", "place_type"]
  params.forEach(element => {
    if (typeof queryStrings[element] === "string") {
      findOptions[element] = queryStrings[element];
    }
  });

  // process deaths
  let deathRange = createRange(queryStrings.minKilled, queryStrings.maxKilled);
  // object.keys is the way to get the length of an object
  // we can't pass undefined, null, nan, or empty objects to an param
  //  otherwise search fails. we only want to pass an object when we want
  //  to do a ranged search (a min and/or max)
  if (Object.keys(deathRange).length > 0) {
    findOptions.deaths = deathRange;
  }
  // process wounded
  let woundedRange = createRange(queryStrings.minWounded, queryStrings.maxWounded);
  if (Object.keys(woundedRange).length > 0) {
    findOptions.wounded = woundedRange;
  }
  
  // process date
  let dateRange = {};
  // the createRange function doesn't work with dates...
  if (typeof queryStrings.before === "string") {
    dateRange.$lte = queryStrings.before;
  }
  if (typeof queryStrings.after === "string") {
    dateRange.$gte = queryStrings.after;
  }
  if (Object.keys(dateRange).length > 0) {
    findOptions.date = dateRange;
  }

  return findOptions;
}

function setupProject(queryStrings) {
  /**
   * Returns an filterOptions object that dictates which elements to return
   * /api/incidents?include=gva_id,incident_name,city,state&exclude=_id
   */
 
  let projectOptions = {};

  if (typeof queryStrings.include === "string") {
    queryStrings.include.split(",").forEach(element => {projectOptions[element] = 1;});
  };

  if (typeof queryStrings.exclude === "string") {
    queryStrings.exclude.split(",").forEach(element => {projectOptions[element] = 0;});
  };

  // this could only happen if include and exclude isn't provided
  if (projectOptions.length === 0) {
    projectOptions = {
      _id: 1,
      gva_id: 1,
      incident_name: 1,
      city: 1,
      state: 1,
      deaths: 1,
      wounded: 1,
      start_date: 1,
    };
  }
    
    return projectOptions;
  
}

function setupOrderBy(queryStrings) {
  /**
   * Returns an orderBy object that dictates what order the elements sorted by
   * order of strings matter!
   * api/incidents?orderBy=gva_id1,city0
   */
  let orderBy = {};
  if (typeof queryStrings.orderBy === "string") {
    queryStrings.orderBy
      .split(",")
      .forEach(element => {element[element.length - 1] === 1 ? orderBy[element] = "asc" : "desc";});
  }
  return orderBy;
}

module.exports = router;
