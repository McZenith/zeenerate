import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from 'src/models/user';

export const createRefreshToken = (user: IUser) => {
  return sign(
    { userId: user._id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
