import { RequestHandler } from 'express';
import { Forbidden } from '../utils/app-error';

export const restrictTo: (...roles: string[]) => RequestHandler = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return next(Forbidden());
    next();
};
