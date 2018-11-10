import { Request, Response } from 'express';

export const getLandingPage = (req: Request, res: Response) => {
  res.send('Landing page works.')
};

export const redirectToLandingPage = (req: Request, res: Response) => {
  res.redirect('/');
};
