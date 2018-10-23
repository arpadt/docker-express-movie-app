import { param } from 'express-validator/check';

const validateTitle = () => {
  return param('title')
    .escape();
}

export {validateTitle}
