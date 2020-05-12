import { NextFunction, Response } from 'express';
import { NotFound } from './app-error';

type SendResponseArgs = {
    data: any;
    res: Response;
    next: NextFunction;
    statusCode?: number;
}

/**
 * @description short hand for sending response
 * */
export const SendResponse = ({ data, res, next, statusCode }: SendResponseArgs) => {
    if (!data) return next(NotFound());
    if (Array.isArray(data) && data.length == 0) return next(NotFound());
    res.status(statusCode ? statusCode : 200).json({ status: 'success', data });
};