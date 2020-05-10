import { catchAsync } from '../../utils/catch-async';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { NotFound } from '../../utils/app-error';
import { APIFeatures } from '../../utils/api-features';
import { SendResponse } from '../../utils/send-response';

export abstract class BaseController {
    protected constructor(private readonly model: mongoose.Model<Document>) {
    }

    baseGet = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.model.findById(req.params.id), res, next
        });
    });

    baseGetMany = catchAsync(async (req, res, next) => {
        const documentQuery = this.model.find();
        SendResponse({
            data: await new APIFeatures(documentQuery, req.query as any).filter().sort().limitFields().paginate().query,
            res, next
        });
    });

    baseCreate = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.model.create(req.body),
            res, next, statusCode: 201
        });
    });

    baseUpdate = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true }),
            res, next
        });
    });

    baseDelete = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.model.findByIdAndDelete(req.params.id),
            res, next, statusCode: 204
        });
    });

}