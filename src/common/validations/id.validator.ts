import { param } from 'express-validator';

export const idValidation = param('id')
   .exists().withMessage('ID is required')
   .isNumeric().withMessage('ID must be a numeric string')
   .isInt({ min: 1 }).withMessage('ID must be a positive integer');