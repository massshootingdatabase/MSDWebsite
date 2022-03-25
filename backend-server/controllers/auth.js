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
        sendToken(admin, 201, res);

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
        const admin = await Admin.findOne({email}).select("+password");

        if(!admin) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        const isMatch = await admin.matchPasswords(password);
        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(admin, 200, res);

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

const sendToken = (user, statusCode, res) => {
    const Token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token: Token,
    });
}