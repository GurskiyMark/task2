import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../http-statuses";


export const inputValidationResultMiddleware = (req: Request, res: Response, next: NextFunction) => {
   const formattedErrors = validationResult(req).formatWith(err => {
      if ('path' in err) {
         return { field: err.path, message: err.msg };
      }
      return null;
   }).array({ onlyFirstError: true }).filter((err): err is { field: string; message: string } => err !== null);

   if (formattedErrors.length > 0) {
      return res.status(HttpStatus.BadRequest).json({
         errorMessages: formattedErrors,
      });
   }

   next();
};

