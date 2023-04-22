const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const configOptions = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "testdevelopernodejs@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(configOptions);

const sendEmail = async (data) => {
  await transporter
    .sendMail({ ...data, from: "testdevelopernodejs@meta.ua" })
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = sendEmail;
