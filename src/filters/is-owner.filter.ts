import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { catchAsync } from '../utils/catch-async';
import { Forbidden, NotFound } from '../utils/app-error';

/**
 * @description only the owner access to the specified route
 * */
export const isOwner = (
    model: Model<mongoose.Document>,
    options?: {
        customIdentifier?: {
            modelField: string,
            paramField: string
        },
        customOwnerField?: string
    }
) => catchAsync(async (req, res, next) => {
    let data: mongoose.Document | null;
    if (options?.customIdentifier) {

        const conditions: Partial<Pick<any, any>> = {};

        conditions[options.customIdentifier.modelField] = req.params[options.customIdentifier.paramField];

        console.log(conditions)

        data = await model.findOne(conditions);

    } else {
        data = await model.findById(req.params.id);
    }

    if (!data) return next(NotFound());

    let ownerId: any;

    if (options?.customOwnerField) ownerId = data[options.customOwnerField as keyof mongoose.Document];
    else ownerId = data['user' as keyof mongoose.Document];

    if (ownerId && req.user.id != ownerId) return next(Forbidden('you can not perform this action'));

    req.model = data;
    next();
});