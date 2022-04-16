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
    const {email} = req.body;

    try{
        const admin = await Admin.findOne({email});
        if(!admin) {
            return next(new ErrorResponse("Email could not be sent", 404))
        }

        const resetToken = admin.getResetPasswordToken(); 

        await admin.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
        <h1>You have requested a password reset</h1>
        <p> Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await email({
                to: user.email,
                subject: "Password Reset Request",
                text: message
            });

            res.status(200).json({ success: true, data: "Email Sent"});
        } catch(error){
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpire = undefined;

            await admin.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (error) {
        next(error);
    }
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