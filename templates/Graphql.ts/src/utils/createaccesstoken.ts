import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from 'src/models/user';

export const createAccessToken = (user: IUser) => {
  return sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};
