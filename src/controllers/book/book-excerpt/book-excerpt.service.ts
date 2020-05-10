import { BaseService } from '../../base/base.service';
import { IBookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.interface';
import { Model, MongooseFilterQuery } from 'mongoose';
import * as mongoose from 'mongoose';
import { limitFields } from '../../../utils/api-features-funcs';
import { APIFeatures } from '../../../utils/api-features';

interface T extends mongoose.Document {

}

export class BookExcerptService extends BaseService<IBookExcerpt> {
    constructor(public model: Model<IBookExcerpt>) {
        super(model);
    }

    get = (id: string, query: Pick<any, any>) => {
        return this.model.findById(id)
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

    getMany = (query: Pick<any, any>) => {
        const documentQuery = this.model.find()
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

        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query
    }
}