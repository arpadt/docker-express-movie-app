import { param } from 'express-validator/check';

export const validateTitle = () => {
  return param('title')
    .escape();
}
