// libraries needed in general...
require("dotenv").config();
const express = require('express');
const expressFileUpload = require('express-fileupload');
const connectDb = require('./config/db');
const errorHandler = require('./middleware/error');

// Routers needed for the server...
let incidents = require("./routes/incidents");
let email = require("./email");
let auth = require("./routes/auth");
let private = require("./routes/private");
let person = require("./routes/person");
let newsletter = require("./routes/newsletter");

connectDb();
const app = express();
app.use(express.json());
app.use(expressFileUpload());

// a Router is used to handle all endpoints from this URL.
app.use("/api/incidents", incidents); 
app.use("/api/email", email);
app.use("/api/auth", auth);
app.use("/api/private", private);
app.use("/api/person", person);
app.use("/api/newsletter", newsletter);


//error handler (should be the last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') 
{
    app.use(express.static('client/build'));
}
const server = app.listen(PORT, () => {
    console.log(`Mass Shooting Database listening at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log('Logged error: ', err);
    server.close(() => process.exit(1));
})
