// libraries needed in general...
const express = require('express');

// Routers needed for the server...
let incidents = require("./incidents");
let email = require("./email");

const app = express();
const PORT = process.env.PORT || 5000;

// a Router is used to handle all endpoints from this URL.
app.use("/api/incidents", incidents); 
app.use("/api/email", email);

app.listen(PORT, () => {
    console.log(`Mass Shooting Database listening at http://localhost:${PORT}`);
});

