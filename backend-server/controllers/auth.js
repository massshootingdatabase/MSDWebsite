const Admin = require("../models/Admin");
const User = require("../models/User");
const Priv = require("../models/Privileges");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const Privileges = require("../models/Privileges");

exports.register = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        let current = true;

        const privilege = await Privileges.findOne({email});
        let accessLevel = 0;
        if(privilege) {
            accessLevel = privilege.accessLevel;
        }
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

exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
        return next(new ErrorResponse("No email could not be sent", 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = user.getResetPasswordToken();

        await user.save();

        // Create reset url to email to provided email
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch(error) {
        next(error);
    }
    
};

exports.resetpassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await Admin.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success",
            user: user
        });

    } catch (err) {
        next(err);
    }
};

exports.privilege = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            //Bearer token
        token = req.headers.authorization.split(" ")[1];
    }
    
    if(!token) {
        return next(new ErrorResponse("Not logged in.", 404));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            const user = await User.findById(decoded.id);
            if(!user) {
                return next(new ErrorResponse("No user found with this id", 404));
            } 
    
            res.status(201).json({
                success: true,
                accessLevel: user.accessLevel
            });
            
        next();  
    } catch(error) {
        return next(error);
    }

}

//documents an Admin who will register in the future
exports.giveprivilege = async (req, res, next) => {
    const {email, accessLevel } = req.body;
    try {
        const admin = await Priv.create({
            email, accessLevel
        });
        res.status(201).json({
            admin: admin
        });

    } catch (error) {
        next(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const Token = user.getSignedToken();
    res.status(statusCode).json({
        success:true,
        token: Token,
    });
}