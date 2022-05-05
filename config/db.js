const mongoose = require('mongoose');

const connectDb = async() => {
    await mongoose.connect(process.env.DB_SERVER);
    console.log("MongoDB Connected");
};

module.exports = connectDb;