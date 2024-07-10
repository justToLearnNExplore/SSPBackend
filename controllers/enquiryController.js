const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD
  },
});

exports.raiseEnquiry = async (req, res) => {
  const { gamename, gamecategory, name, email, phone, message } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_ADDRESS,
      subject: 'New Enquiry Raised',
      html: `
        <h2>New Enquiry Raised</h2>
        <p><strong>Game name:</strong> ${gamename}</p>
        <p><strong>Game category:</strong> ${gamecategory}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, error: 'Failed to send email' });
      }
      res.json({ success: true, message: 'Enquiry raised successfully' });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
};
