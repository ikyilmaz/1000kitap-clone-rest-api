import { NextFunction, Request } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { User } from '../models/user/user.model';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export abstract class BaseController {
    protected constructor(private readonly model: mongoose.Model<Document>) {
    }

    get = catchAsync(async (req, res, next) => {
        this.model.findById("").sort("")
    });

    getMany = catchAsync(async (req, res, next) => {

    });

    create = catchAsync(async (req, res, next) => {

    });

    update = catchAsync(async (req, res, next) => {

    });

    delete = catchAsync(async (req, res, next) => {
        const doc = await this.model.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: doc });
    });

}