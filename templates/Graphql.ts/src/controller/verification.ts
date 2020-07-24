import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../models';
import 'dotenv/config';

export const verification = async (req: Request, res: Response) => {
  const token = req.params.token;

  if (!token) {
    return res.send({ msg: 'No verification token provided' });
  }
  try {
    const payload: Object = verify(token, process.env.VERIZON_TOKEN!);
    const { userId }: any = payload;
    const user = await User.findById(userId);
    if (user?.verified)
      return res.send({ msg: 'You have confirmed your email earlier' });
    await User.findByIdAndUpdate(userId, { verified: true });
    return res.send({ msg: 'Email verification successful' });
  } catch (error) {
    return res.send({ msg: 'Verification link expired' });
  }
};
