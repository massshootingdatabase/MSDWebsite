// libraries needed in general...
require("dotenv").config();
const express = require("express");
const expressFileUpload = require("express-fileupload");
const errorHandler = require("./middleware/error");

// Routers needed for the server...
const incidents = require("./routes/incidents");
const auth = require("./routes/auth");
const priv = require("./routes/private");
const newsletter = require("./routes/newsletter");

const app = express();
app.use(express.json());
app.use(expressFileUpload());

// a Router is used to handle all endpoints from this URL.
app.use("/api/incidents", incidents);
app.use("/api/auth", auth);
app.use("/api/private", priv);
app.use("/api/newsletter", newsletter);

// error handler (should be the last piece of middleware)
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

module.exports = app;
