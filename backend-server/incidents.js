// This defines a router handling all requests to api/incidents/*
// This is done to keep index.js light as index.js is our entrance point.

// libraries needed in general...
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Schemas needed for using Mongoose
const incidentSchema = require("./incidentSchema");

let router = express.Router();

console.log(process.env.DB_SERVER);
let conn = mongoose.connect(process.env.DB_SERVER); // create default connection

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

router.get("/:gva_id(\\d+)", async (req, res) => {
  // /api/incidents/19878
  let query = await incidentModel.findOne({ gva_id: req.params.gva_id }).exec();
  res.json(query);
});

/*
router.get("/", async (req, res) => {
    let limit = checkIfNonnegativeInteger(req.query.limit, 100);
    console.log("Query strings:", req.query, "Processed:", setupFind(req.query),  "Limit", limit);
    let query = await incidentModel.find(setupFind(req.query)).sort({date: "descending"}).limit(limit);
    res.json(query);
});
*/

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
  let direction =
    req.query.direction !== undefined ? req.query.direction : "descending";

  let orderBy;
  switch (req.query.order) {
    case "deaths":
      orderBy = { deaths: direction };
    default:
      orderBy = { date: direction };
  }

  console.log(
    "Query strings:",
    req.query,
    "Processed:",
    setupQuery(req.query),
    "Limit",
    limit
  );

  //setting filter because search results are not going to show everything right away
  //adding offset for pagination purposes
  let query = await incidentModel
    .find(setupQuery(req.query), {
      gva_id: 1,
      incident_name: 1,
      city: 1,
      state: 1,
      deaths: 1,
      wounded: 1,
      start_date: 1,
    })
    .sort(orderBy)
    .skip(offset)
    .limit(limit);

  res.json(query);
});

function setupQuery(queryStrings) {
  /* Takes the query strings and creates the arguments for find */
  let findOptions = {};
  // process fields
  if (typeof queryStrings.state === "string") {
    findOptions.state = queryStrings.state;
  }
  if (
    queryStrings.city !== undefined &&
    typeof queryStrings.city === "string"
  ) {
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

module.exports = router;
