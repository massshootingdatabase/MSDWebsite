
const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

var options = User.options;
const adminSchema = new mongoose.Schema({
        password: {
            type: String,
            required: [true, "Please provide a password."],
            minlength: 6,
            select: false
        },
        current: Boolean,
        accessLevel: {
            type: Number,
            required: [true, "Please provide an access level"]
        },
        resetPasswordToken: String,
        resetPasswordExpired: Date
        
    }, 
    options
);

adminSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.methods.getSignedToken = function() {
    return jwt.sign(
        {id: this._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE,}
        );
}

const Admin = User.discriminator('Admin', adminSchema);
module.exports = Admin;