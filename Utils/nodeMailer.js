const nodemailer = require('nodemailer');
const sendRegistrationEmail = async (toEmail,token) => {  // geting  these variable data from controller 
  const transporter = nodemailer.createTransport(
    {
    service: 'gmail',
    auth: {
      user: 'mianehtasham143@gmail.com',
      pass: 'zvsb tafj omny mhgl',
    },
  });
  const mailOptions = {
    from: 'mianehtasham143@gmail.com',
    to: toEmail,
    subject: 'Registration',
    html: `
    <p>Please click the button below to verify your email:</p>
    <a href="http://localhost:8080/api/setPass/${toEmail}/${token}">
      <button style="background-color: #4CAF50; color: white; padding: 10px 15px; border: none; border-radius: 5px; cursor: pointer;">
        Verify Email
      </button>
    </a>
  `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
module.exports = { sendRegistrationEmail };
