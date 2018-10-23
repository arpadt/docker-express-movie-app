const getLandingPage = (req: any, res: any) => {
  res.send('Landing page works.')
};

const redirectToLandingPage = (req: any, res: any) => {
  res.redirect('/');
};

export {
  getLandingPage,
  redirectToLandingPage,
}
