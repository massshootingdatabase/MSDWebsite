const Victim = require("../models/Victim");
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

exports.get = async (req, res, next) => {
    const {id} = req.body;

    try {
        const victim = await Victim.findOne({id});

        if(!victim) {
            return next(new ErrorResponse("No such victim", 401));
        }

        res.status(200).json({
            success:true,
            Victim: victim
        });


    } catch (error) {
        next(error);
    }
};
