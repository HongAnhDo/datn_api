import { CONTACT_EMAIL, CONTACT_PASSWORD, DOITAC_EMAIL, DOITAC_PASSWORD } from "../utils/constant";

const nodemailer = require('nodemailer');

async function sendMail({
  sender , receiver,
  subject, content,
}) {
  try {
    var transporter;
    if (sender == DOITAC_EMAIL) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: DOITAC_EMAIL,
          pass: DOITAC_PASSWORD,
        },
      });
    } else {
      sender = CONTACT_EMAIL
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: CONTACT_EMAIL,
          pass: CONTACT_PASSWORD,
        },
      });
    } 
    const mailOptions = {
      from: "Chungxe.vn <" + sender + ">",
      to: receiver,
      subject,
      html: content,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) throw new Error(error.message);
    });
    return {status: 1};
  } catch (error) {throw new Error(error)}
}

module.exports = {
  sendMail,
};