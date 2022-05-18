/*
const Victim = require("../models/Victim");
const Person = require("../models/Person");
const ErrorResponse = require("../utils/errorResponse");

exports.create = async (req, res, next) => {
    const {name, age, gender, race, sexuality, died, knewPerp} = req.body;

    try {
        const victim = await Victim.create({
            name, age, gender, race, sexuality, died, knewPerp
        });

        res.status(200).json({
            success:true,
            victim: victim
        });
    } catch (error) {
        next(error);
    }
};

//get for person, can be a victim or shooter type
exports.get = async (req, res, next) => {
    const {id} = req.body;

    try {
        const person = await Person.findOne({id});

        if(!person) {
            return next(new ErrorResponse("No such person", 401));
        }

        res.status(200).json({
            success:true,
            Person: person
        });


    } catch (error) {
        next(error);
    }
};
*/