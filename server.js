
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = require('./index.js');

const server = app.listen(PORT, () => {
    console.log(`Mass Shooting Database listening at http://localhost:${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
    console.log('Logged error: ', err);
    server.close(() => process.exit(1));
})