import MailgunTransport from 'mailgun-nodemailer-transport';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { IUser } from 'src/models/user';
import { ApolloError } from 'apollo-server-express';

export const transporter = nodemailer.createTransport(
  new MailgunTransport({
    auth: {
      domain: process.env.EMAIL_DOMAIN!,
      apiKey: process.env.EMAIL_APIKEY!,
    },
  })
);

export const sendVerificationEmail = async (user: IUser) => {
  const verificationToken = await sign(
    { userId: user._id },
    process.env.VERIZON_TOKEN!,
    {
      expiresIn: '30m',
    }
  );

  try {
    await transporter.sendMail({
      from: 'Email here',
      to: user.email,
      subject: 'Email Verification',
      text: `your verification link is http://localhost:4000/verification/${verificationToken}`,
    });
    return true;
  } catch (error) {
    throw new ApolloError('could not send verification email');
  }
};
