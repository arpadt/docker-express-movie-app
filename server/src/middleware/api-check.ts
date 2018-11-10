import { Request, Response, NextFunction } from 'express';

export default function apiCheck(req: Request, res: Response, next: NextFunction) {
  process.env.API_KEY
    ? next()
    : next(new Error('Missing API key.'));
};
