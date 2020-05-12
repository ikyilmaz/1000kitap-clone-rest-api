import { RequestHandler } from 'express';

/**
 * @description catching errors in the controllers
 * @returns {RequestHandler}
 * */
export const catchAsync = (fn: RequestHandler): RequestHandler =>
    (req, res, next) =>
        fn(req, res, next).catch((err: Error) => next(err));
