const ErrorResponse = require("../utils/errorResponse");
const Incident = require("../models/Incidents");
const Shooter = require("../models/Shooter");
const Victim = require("../models/Victim");

//create an incident 
exports.create = async (req, res, next) => {
    const {start_date, end_date, deaths, wounded, types, description, districts, location, sources} = req.body;

    try {
        const incident = await Incident.create({
            start_date, end_date, deaths, wounded, types, description, districts, location, sources
        });
        
        res.status(200).json({
            success:true,
            incident: incident
        });
    } catch (error) {
        next(error);
    }
};


//get the incident with the specified id
exports.get = async (req, res, next) => {
    const {id} = req.body;

    try {
        const incident = await Incident.findOne({id});

        if(!incident) {
            return next(new ErrorResponse("No incident found", 401));
        }

        res.status(200).json({
            success:true,
            Incident: incident
        });


    } catch (error) {
        next(error);
    }
};

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
}