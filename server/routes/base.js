module.exports = {
  getLandingPage(req, res) {
    res.send('Landing page works.')
  },
  redirectToLandingPage(req, res) {
    res.redirect('/');
  },
}
