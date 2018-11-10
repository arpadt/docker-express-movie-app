import { param } from 'express-validator/check';

export default function validateTitle() {
  return param('title')
    .escape();
}
