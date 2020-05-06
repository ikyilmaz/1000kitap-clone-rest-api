import { NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import { BadRequest } from './appError';

export const checkValidationResult = (req: Request, next: NextFunction): boolean => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        next(BadRequest(errors.mapped()));
        return true;
    }

    return false;
};