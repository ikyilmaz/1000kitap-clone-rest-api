import { Model, MongooseFilterQuery } from 'mongoose';
import { APIFeatures } from '../../utils/api-features';
import * as mongoose from 'mongoose';

export class BaseService<T extends mongoose.Document> {

    constructor(public model: Model<T, {}>) {
    }

    baseGet = (conditions: MongooseFilterQuery<Pick<T, keyof T>>) => {
        return this.model.findOne(conditions);
    };

    baseGetMany = (conditions: MongooseFilterQuery<Pick<T, keyof T>>, query: Pick<string, any>) => {
        const documentQuery = this.model.find(conditions);
        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };

    baseCreate = (data: Partial<Pick<T, keyof T>>) => {
        return this.model.create(data);
    };

    baseUpdate = (id: string, data: Partial<Pick<T, keyof T>>) => {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    };

    baseDelete = (id: string) => {
        return this.model.findByIdAndDelete(id);
    };

}
