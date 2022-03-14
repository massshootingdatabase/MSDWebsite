const Admin = require("../models/Admin");

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
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({
            success: false,
            error: "Please provide an email and password.",
        });
    }

    try {
        const user = await Admin.findOne({email}).select("+password");

        if(!user) {
            res.status(404).json({success: false, error: "Invalid credentials"});
        }

        const isMatch = await user.matchPasswords(password);
        if(!isMatch) {
            res.status(404).json({success:false, error: "Invalid credentials"});
        }

        res.status(201).json({
            success: true,
            token: "fjriuhgrfl",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.forgotpassword = (req, res, next) => {
    res.send("forgot password route");
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset password Route");
};

