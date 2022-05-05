/* Later this will become the Admin.js because Admin.js should actually just be User.js
    No inheritance needed. Subscriber should be deleted, and Admin should be combined into User.js
*/

/*
    The purpose of this file is to serve as a list of the admins and their privilege level. 
    When any User registers an account, the endpoint will search this collection by email.
    If a registered user's email is in this collection, then their account will be given an Admin role.
    This schema will be prepopulated with the higher ups and data entry team of this organization.
*/
const mongoose = require("mongoose");

const privilegedSchema = new mongoose.Schema({
        email : {
            type: String,
            required: [true, "Please provide an email"],
            unique: true, 
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email address."
            ]
        },
        accessLevel: {
            type: Number,
            required: [true, "Please provide an access level"]
        }
    }
);

const Privileges = mongoose.model("Privileges", privilegedSchema);

module.exports = Privileges;