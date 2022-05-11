const mongoose = require('mongoose');

const connectDb = async() => {
    await mongoose.connect(process.env.DB_SERVER);
    //console.log("MongoDB Connected");
};

const disconnectDb = async() => {
    await mongoose.connection.close();
}

module.exports = connectDb;
module.exports = disconnectDb;