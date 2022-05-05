// This defines a router handling all requests to api/email/*
// This is done to keep index.js light

// libraries needed in general
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

let router = express.Router();
// assume form data is sent as application/x-www-form-urlencoded
// we pick this since multipart isn't necessary
router.use(express.urlencoded({extended: false}));

router.post("/", (req, res) => {    
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        // WILL NEED TO REPLACE WITH LEGIT SMTP SERVER
        auth: {
            user: process.env.TEST_EMAIL_USER,
            pass: process.env.TEST_EMAIL_PASS
        }
    });
    // tests whether transporter is made
    transporter.verify(function (error, success) {
        if (error) {
            console.log("Error");
        } else {
            console.log("Success! Server ready to send...");
        }
    })
    // set up the email content
    let email_data = {
            from: req.body.from, // req.body.from
            to: process.env.OUR_EMAIL,
            subject: req.body.subject, // req.body.subject
            text: req.body.message // req.body.text
    };
    transporter.sendMail(email_data, (err, info) => {
        if (err) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
});


module.exports = router;
