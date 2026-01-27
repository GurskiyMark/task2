import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../common/http-statuses';

/*
  title: string; maxLength: 30
  shortDescription: string; maxLength: 100
  content: string; maxLength: 1000
  blogId: string;
*/
export const postBodyValidation = [
  body('title')
    .exists().withMessage('title is required')
    .custom(v => typeof v === 'string').withMessage('title must be a string')
    .isLength({ max: 30 }).withMessage('Max length 30'),

  body('shortDescription')
    .exists().withMessage('shortDescription is required')
    .custom(v => typeof v === 'string').withMessage('shortDescription must be a string')
    .isLength({ max: 100 }).withMessage('Max length 100'),

  body('content')
    .exists().withMessage('content is required')
    .custom(v => typeof v === 'string').withMessage('content must be a string')
    .isLength({ max: 1000 }).withMessage('Max length 1000'),

  body('blogId')
    .exists().withMessage('blogId is required')
    .custom(v => typeof v === 'string').withMessage('blogId must be a string'),
];



