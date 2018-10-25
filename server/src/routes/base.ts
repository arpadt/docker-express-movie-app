export const getLandingPage = (req: any, res: any) => {
  res.send('Landing page works.')
};

export const redirectToLandingPage = (req: any, res: any) => {
  res.redirect('/');
};
