import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequest } from '../utils/app-error';

/**
 * @description short-hand for checking the express-validator results
 * */
export const checkValidationResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(BadRequest(errors.mapped()));
    next();
};