import { Request, Response } from 'express';

export interface IResContext {
  req: Request;
  res: Response;
  payload?: { userId: string };
}
