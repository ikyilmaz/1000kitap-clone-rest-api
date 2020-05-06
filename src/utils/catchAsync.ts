import { RequestHandler } from 'express';

export const catchAsync = (fn: RequestHandler): RequestHandler =>
    (req, res, next) =>
        fn(req, res, next).catch((err: Error) => next(err));
