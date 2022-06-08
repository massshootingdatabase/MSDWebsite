/* eslint-disable camelcase */
const ErrorResponse = require("../utils/errorResponse");
const Incident = require("../models/Incidents");
// const Shooter = require("../models/Shooter");
const Victim = require("../models/Victim");

// create an incident
exports.create = async (req, res, next) => {
  const {
    start_date,
    end_date,
    deaths,
    wounded,
    types,
    description,
    districts,
    location,
    sources,
    victims,
    shooters,
  } = req.body;

  try {
    const incident = await Incident.create({
      start_date,
      end_date,
      deaths,
      wounded,
      types,
      description,
      districts,
      location,
      sources,
      shooters,
    });

    if (victims !== undefined && victims.length > 0) {
      victims.forEach((v) => {
        console.log(v.name);
        addVictim(v, incident, next);
      });
    }
    /*
        let id = JSON.stringify(incident._id);
        id = id.substring(1, id.length-1);
        const newIncident = await Incident.findOne({"_id": id});
        console.log("NEW INCIDENT");
        console.log(newIncident);
        
        //for some reason the incident isn't showing up as populate with victims, but making a separate api call to 
        // incident GET reveals that it was indeed updated. Basically it works, but is going to be harder to test to 
        // catch the case where it doesn't work
*/
    res.status(200).json({
      success: true,
      incident,
    });
  } catch (error) {
    next(error);
  }
};

const addVictim = async (v, incident, next) => {
  const { name, age, gender, race, sexuality, died, knewPerp } = v;

  // create a victim
  const victim = await Victim.create({
    name,
    age,
    gender,
    race,
    sexuality,
    died,
    knewPerp,
  });

  // console.log(victim);

  incident.victims.push(victim._id);
  incident.save(function (err) {
    if (!err) console.log("Success!");
  });
  // console.log("INCIDENT:");
  // console.log(incident);
};

/* ----------------------------------------------------- */
/* ------------------- DATA QUERYING ------------------- */
/* ----------------------------------------------------- */

// get the incident with the specified id
exports.get = async (req, res, next) => {
  try {
    const incident = await Incident.findOne({ _id: req.params.id });

    if (!incident) {
      return next(new ErrorResponse("No incident found", 401));
    }

    res.status(200).json({
      success: true,
      Incident: incident,
    });
  } catch (error) {
    next(error);
  }
};

/* 
router.get("/:gva_id(\\d+)", async (req, res) => {
// /api/incidents/19878
let query = await incidentModel
  .findOne(
    { gva_id: req.params.id }, 
    setupProject(req.query))
  .exec();
res.json(query);
});
*/

// constructs a query from an advanced search form
exports.getAdvanced = async (req, res, next) => {
  /* default search parameters are:
  {
    limit: 10
    offset: 0
    orderby: {date: descending}
  } */
  let limit = parseInt(req.query.limit);
  if (isNaN(limit)) {
    limit = 10;
  }
  let offset = parseInt(req.query.offset);
  if (isNaN(offset)) {
    offset = 0;
  }

  // setting project because search results are not going to show everything right away
  // adding offset for pagination purposes
  const incident = await Incident.find(
    setupQuery(req.query),
    setupProject(req.query)
  )
    .sort(setupOrderBy(req.query))
    .skip(offset)
    .limit(limit);

  // console.log(query.getFilter(), query.getOptions(), query.projection());

  // let results = await query.exec();
  // res.json(results);
  res.status(200).json({
    success: true,
    Incident: incident,
  });
};

function createRange(min, max) {
  const options = {};
  const minInt = parseInt(min);
  const maxInt = parseInt(max);

  if (!isNaN(minInt)) {
    options.$gte = minInt;
  }

  if (!isNaN(maxInt)) {
    options.$lte = maxInt;
  }

  return options;
}

/**
 * Parses the query strings object and returns findOptions object
 * containing the appropriate arugments for find
 */
function setupQuery(queryStrings) {
  const findOptions = {};

  // checking if the type of a query string is a string
  // is a quick way to check if the query string param has a usable value
  const locationParams = [
    "state",
    "city",
    "address",
    "postal_code",
    "place_type",
  ];
  locationParams.forEach((element) => {
    if (typeof queryStrings[element] === "string") {
      findOptions["location." + element] = queryStrings[element];
    }
  });

  const districtParams = ["congressional", "state_senate", "state_house"];
  districtParams.forEach((element) => {
    if (typeof queryStrings[element] === "string") {
      findOptions["districts." + element] = queryStrings[element];
    }
  });

  // checks for a key word or phrase in the description
  if (typeof queryStrings.keyWord === "string") {
    findOptions.description = {
      $regex: ".*" + queryStrings.keyWord + ".*",
    };
  }
  console.log(findOptions);

  // process deaths
  const deathRange = createRange(
    queryStrings.minKilled,
    queryStrings.maxKilled
  );
  // object.keys is the way to get the length of an object
  // we can't pass undefined, null, nan, or empty objects to an param
  //  otherwise search fails. we only want to pass an object when we want
  //  to do a ranged search (a min and/or max)
  if (Object.keys(deathRange).length > 0) {
    findOptions.deaths = deathRange;
  }
  // process wounded
  const woundedRange = createRange(
    queryStrings.minWounded,
    queryStrings.maxWounded
  );
  if (Object.keys(woundedRange).length > 0) {
    findOptions.wounded = woundedRange;
  }

  // process date
  const dateRange = {};
  // the createRange function doesn't work with dates...
  if (typeof queryStrings.before === "string") {
    dateRange.$lte = new Date(queryStrings.before).toISOString();
  }
  if (typeof queryStrings.after === "string") {
    dateRange.$gte = new Date(queryStrings.after).toISOString();
  }
  if (Object.keys(dateRange).length > 0) {
    findOptions.start_date = dateRange;
  }

  console.log(findOptions);

  return findOptions;
}

function setupProject(queryStrings) {
  /**
   * Returns an filterOptions object that dictates which elements to return
   * /api/incidents?include=gva_id,incident_name,city,state&exclude=_id
   */

  let projectOptions = {};

  if (typeof queryStrings.include === "string") {
    queryStrings.include.split(",").forEach((element) => {
      projectOptions[element] = 1;
    });
  }

  if (typeof queryStrings.exclude === "string") {
    queryStrings.exclude.split(",").forEach((element) => {
      projectOptions[element] = 0;
    });
  }

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
  const orderBy = {};
  if (typeof queryStrings.orderBy === "string") {
    queryStrings.orderBy.split(",").forEach((element) => {
      /* eslint no-unused-expressions: "off" */
      element[element.length - 1] === 1 ? (orderBy[element] = "asc") : "desc";
    });
  }
  return orderBy;
}

/* ----------------------------------------------------- */
/* ------------------- INCIDENT UPDATES ---------------- */
/* ----------------------------------------------------- */

/*
 TODO : These will be useful for updating incidents, not necessary right now for creating an incident.
 
//embed a shooter
exports.addShooter = async (req, res, next) => {

    const {id, name, age, gender, race, sexuality, status, crime, trauma, mental, motives, education, employment, religion, immigrant, citizenship} = req.body;
    try {
        //create the shooter
        const shooter = await Shooter.create({
            name, age, gender, race, sexuality, status, crime, trauma, mental, motives, education, employment, religion, immigrant, citizenship
        });
        
        //get the incident we are going to save a shooter to
        const incident = await Incident.findOne({id});
        
        //embed into incident
        incident.shooters.push(shooter);

        incident.save(function (err) {
            if (!err) console.log('Success!');
        });

        res.status(200).json({
            success:true,
            Shooter: shooter
        });
    }
    catch (error) {
        next(error);
    }
};


//link a victim 
exports.addVictim = async (req, res, next) => {

    const {id, name, age, gender, race, sexuality, died, knewPerp} = req.body;

    //create a victim 
    try {
        const victim = await Victim.create({
            name, age, gender, race, sexuality, died, knewPerp
        });
        
        //get the incident we are going to save a victim to       
        const incident = await Incident.findOne({id});
        incident.victims.push(victim._id);
        incident.save(function (err) {
            if (!err) console.log('Success!');
        });

        res.status(200).json({
            success:true,
            Incident: incident
        });
    }
    catch (error) {
        next(error);
    }
} */
