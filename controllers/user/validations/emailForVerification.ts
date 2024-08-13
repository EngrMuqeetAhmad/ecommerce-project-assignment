const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import dotenv from "dotenv";

async function emailForVerification(req: any, res: any) {
  dotenv.config();
  const { email, password } = req.body;

  // Generate a JWT for email verification
  const token = jwt.sign(
    { email: email, password: password }, // Payload
    "MuqeetAhmad" // Secret key
  );
  console.log(token);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465, // or 465 for SSL
    secure: false, // use true for SSL
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
    tls: {
      rejectUnauthorized: false, // Add this to ignore certificate errors
    },
    onnectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000, // 10 seconds
    logger: true, // Enable logging
    debug: true, // Show debug output
  });

  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Click this link to verify your email: ${verificationLink}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log("verification email sent");
    res.status(200).json({ message: "Verification email sent!" });

    return;
  } catch (error) {
    console.log("verification email error", error);
    res.status(200).json({ message: "Error sending verfication email" });
    return;
  }
}

export { emailForVerification };
