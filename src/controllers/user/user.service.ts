import { User } from '../../models/user/user.model';
import { APIFeatures } from '../../utils/api-features';
import { limitFields } from '../../utils/api-features-funcs';

export class UserService {
    public model = User;

    getOne = (conditions: Pick<string, any>, query: Pick<string, any>) => {
        return this.model.findOne(conditions)
            .select(limitFields(query['fields'], ['-__v'], ['password', 'email']));
    };

    getMany = (query: any) => {
        const documentQuery = this.model.find()
            .select(limitFields(query['fields'], ['-__v'], ['password', 'email']));
        return new APIFeatures(documentQuery, query).filter().sort().paginate().query;
    };
}