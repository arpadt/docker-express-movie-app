const { param } = require('express-validator/check');

module.exports = {
  validateTitle() {
    return param('title')
      .not()
      .isEmpty()
      .trim()
      .escape();
  }
}
