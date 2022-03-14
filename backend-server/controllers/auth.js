const Admin = require("../models/Admin");

const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        let current = true;
        let accessLevel = 0;
        const admin = await Admin.create({
            email, password, current, accessLevel
        });
        res.status(201).json({
            success: true,
            admin
        });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400));
    }

    try {
        const user = await Admin.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        res.status(201).json({
            success: true,
            token: "fjriuhgrfl",
        });

    } catch (error) {
        next(error);
    }
};

exports.forgotpassword = (req, res, next) => {
    res.send("forgot password route");
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset password Route");
};

