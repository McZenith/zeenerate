import { verify } from 'jsonwebtoken';
import { IResContext } from '../interface';
import { NextFunction } from 'express';
// bearer 102930ajslkdaoq01

export const isAuth = (context: IResContext, next: NextFunction) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error('not authenticated');
  }

  return next();
};
