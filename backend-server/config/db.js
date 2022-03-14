const mongoose = require('mongoose');

const connectDb = async() => {
    await mongoose.connect(process.env.DB_SERVER, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndIdentify: true
    });
    console.log("MongoDB Connected");
};

module.exports = connectDb;