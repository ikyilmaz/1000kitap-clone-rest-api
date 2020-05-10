import { BaseService } from '../base/base.service';
import { IBookExcerpt } from '../../models/m2m/book-user/book-excerpt/book-excerpt.interface';
import { Model, MongooseFilterQuery } from 'mongoose';
import { limitFields } from '../../utils/api-features-funcs';
import { APIFeatures } from '../../utils/api-features';
import * as mongoose from 'mongoose';

export class BaseBookService<T extends mongoose.Document> extends BaseService<T> {
    constructor(public model: Model<T>) {
        super(model);
    }

    get = (model: Model<T>, id: string, query: Pick<any, any>) => {
        return model.findById(id)
            .select(query['fields'])
            .populate({
                path: 'user',
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'username', 'image'],
                    unwantedFields: ['password', 'email']
                })
            })
            .populate({
                path: 'book',
                select: limitFields(query['bookFields'], {
                    defaults: ['title', 'image', 'publisher']
                })
            });
    };

    getMany = (model: Model<T>, query: Pick<any, any>) => {
        const documentQuery = model.find()
            .select(query['fields'])
            .populate({
                path: 'user',
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'username', 'image'],
                    unwantedFields: ['password', 'email']
                })
            })
            .populate({
                path: 'book',
                select: limitFields(query['bookFields'], {
                    defaults: ['title', 'image', 'publisher']
                })
            });

        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };
}