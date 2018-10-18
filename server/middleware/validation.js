const { param } = require('express-validator/check');

const validateTitle = () => {
  return param('title')
    .not()
    .isEmpty()
    .trim()
    .escape();
};

module.exports = { validateTitle }
