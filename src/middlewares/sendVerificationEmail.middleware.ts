import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import { User } from '../models/user.model';
import { UserOutput } from '../types';

async function emailForVerification(req: Request, res: Response) {
  dotenv.config();
  const { email, accessRoute } = req.body;

  let user: UserOutput | null = await User.findOne({
    attributes: ['id', 'email'],
    where: {
      email: email,
    },
  });
  

  if (user?.email == email) {
    const token = jwt.sign(
      { email: email }, // Payload
      'MuqeetAhmad', // Secret key
    );
    console.log(token);

    const transporter = nodemailer.createTransport({
      // service: 'Gmail',
      // port: 465, // or 465 for SSL
      // secure: false, // use true for SSL
      // auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
      // tls: {
      //   rejectUnauthorized: false, // Add this to ignore certificate errors
      // },
      // onnectionTimeout: 10000, // 10 seconds
      // greetingTimeout: 10000, // 10 seconds
      // logger: true, // Enable logging
      // debug: true, // Show debug output
    });
    let verificationLink: string = '';
    if (accessRoute == 'resetPassword') {
      verificationLink = `http://localhost:3000/resetPassword/${token}`;
    } else if (accessRoute == 'emailVerification') {
      verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    }

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Email Verification',
      text: `Click this link to proceed: ${verificationLink}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('verification email sent', verificationLink);
      res.status(200).json({ message: 'Verification email sent!' });
    } catch (error) {
      console.log('verification email error', error);
      res.status(200).json({ message: 'Error sending verfication email' });
      return;
    }
  }
}

export { emailForVerification };
