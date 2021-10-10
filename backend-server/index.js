// libraries needed in general...
const express = require('express');
const mongoose = require('mongoose');

// Schemas needed for using Mongoose
const incident = require('./incident');


const app = express();
const PORT = process.env.PORT || 5000;

// We might need to reconnect databases...
const SERVER = "mongodb://localhost:27017/";
let DB = "msd";

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/incidents', (req, res) => {
    let conn = mongoose.connect(SERVER + DB); // create default connection
    // since we created default connection, use mongoose.model to use the default connection
    let incidentModel = mongoose.model("Incident", incident); 
    let query = incidentModel.find({});

    query.exec(function(err, incidents){
        if(err)
           return console.log(err);
        incidents.forEach(function(incident){
           console.log(incident);
        });
    });

    res.send("Query");
});

app.listen(PORT, () => {
    console.log(`Mass Shooting Database listening at http://localhost:${PORT}`);
});

