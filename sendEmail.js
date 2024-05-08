const nodemailer = require('nodemailer');

async function sendEmail(toEmail, attachmentPath) {
  // Create reusable transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  // Send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Your Name" <your-email@gmail.com>',
    to: toEmail,
    subject: 'Your Wellness Report',
    text: 'Please find attached your wellness report.',
    attachments: [{ path: attachmentPath }]
  });

  console.log('Email sent:', info.messageId);
}

module.exports = sendEmail;
