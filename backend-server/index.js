// libraries needed in general...
require("dotenv").config();
const express = require('express');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');

// Routers needed for the server...
let incidents = require("./incidents");
let email = require("./email");
let auth = require("./routes/auth");

connectDb();
const app = express();
app.use(express.json());

// a Router is used to handle all endpoints from this URL.
app.use("/api/incidents", incidents); 
app.use("/api/email", email);
app.use("/api/auth", auth);

//error handler (should be the last piece of middleware)

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Mass Shooting Database listening at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log('Logged error: ', err);
    server.close(() => process.exit(1));
})
