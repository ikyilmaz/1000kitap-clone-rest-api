import { RequestHandler } from 'express';
import { Forbidden } from '../utils/app-error';

/**
 * @description only specified roles can access to the specified route
 * */
export const restrictTo: (...roles: string[]) => RequestHandler = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(Forbidden());
    next();
};
