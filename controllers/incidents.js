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

// get the incident with the specified id
exports.get = async (req, res, next) => {
  const { id } = req.body;

  try {
    const incident = await Incident.findOne({ _id: id });

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
