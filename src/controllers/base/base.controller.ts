import { catchAsync } from '../../utils/catch-async';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import {  NotFound } from '../../utils/app-error';
import { APIFeatures } from '../../utils/api-features';

export abstract class BaseController {
    protected constructor(private readonly model: mongoose.Model<Document>) {
    }

    get = catchAsync(async (req, res, next) => {
        const data = await this.model.findById(req.params.id);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    getMany = catchAsync(async (req, res, next) => {
        const documentQuery = this.model.find();
        const data = await new APIFeatures(documentQuery, req.query as any).filter().sort().limitFields().paginate().query;
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    create = catchAsync(async (req, res, next) => {
        const doc = await this.model.create(req.body);
        res.status(201).json({ status: 'success', data: doc });
    });

    update = catchAsync(async (req, res, next) => {
        const doc = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ status: 'success', data: doc });
    });

    delete = catchAsync(async (req, res, next) => {
        const doc = await this.model.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'success', data: doc });
    });

}