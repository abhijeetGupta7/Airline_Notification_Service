const nodemailer = require("nodemailer");
const { GMAIL_EMAIL, GMAIL_APP_PASS } = require("./server-config");

const transporter=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // or 587 if secure: false
    secure: true, // true for 465, false for other ports
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_APP_PASS
    }
});

module.exports=transporter;