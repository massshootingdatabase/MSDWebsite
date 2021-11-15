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


app.get('/api/incidents', async (req, res) => {
    let conn = mongoose.connect(SERVER + DB); // create default connection
    // since we created default connection, use mongoose.model to use the default connection
    let incidentModel = mongoose.model("Incident", incident); 

    console.log(req.query);
    let limit = 100;
    if (typeof req.query.limit === "string") {
        limit = parseInt(req.query.limit, 10);
        if (limit <= 0) {
            limit = 1;
        } else if (limit > 1000) {
            limit = 1000;
        } else if (isNaN(limit)) {
            limit = 100;
        }
    }
    
    console.log(limit);
    let query = await incidentModel.find().sort({"date": "descending"}).limit(limit);
    res.json(query);
});

app.listen(PORT, () => {
    console.log(`Mass Shooting Database listening at http://localhost:${PORT}`);
});

