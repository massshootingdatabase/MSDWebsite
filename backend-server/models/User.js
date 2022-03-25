const mongoose = require("mongoose");

var options =  {discriminatorKey: 'kind'};
const userSchema = new mongoose.Schema({
        email : {
            type: String,
            required: [true, "Please provide an email"],
            unique: true, 
            match: [
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email address."
            ]
        }
    }, 
    options
);

const User = mongoose.model("User", userSchema);

module.exports = User;

