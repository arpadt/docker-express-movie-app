const apiCheck = (req, res, next) => {
  process.env.API_KEY
    ? next()
    : next(new Error('Missing API key.'));
};

module.exports = apiCheck
