const mongoose = require("mongoose");

const options = { discriminatorKey: "kind" };
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email address.",
      ],
    },
  },
  options
);
/*
userSchema.methods.getSignedToken = function() {
    return jwt.sign(
        {id: this._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRE,}
        );
} */

const User = mongoose.model("User", userSchema);

module.exports = User;
