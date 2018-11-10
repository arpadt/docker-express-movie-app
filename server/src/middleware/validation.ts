import { param } from 'express-validator/check';
import { Request, Response, NextFunction } from 'express';

export function validateTitle() {
  return param('title')
    .escape();
}

export function validateImdbID(req: Request, res: Response, next: NextFunction) {
  const id: string = req.params.id;
  if (!(/^tt\d+/.test(id))) {
    return res.status(404).send('Invalid id!');
  }
  return next();
}
