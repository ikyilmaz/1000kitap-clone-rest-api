import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequest } from '../utils/app-error';

export const checkValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(BadRequest(errors.mapped()));
    next();
};