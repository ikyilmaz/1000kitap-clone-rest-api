import { User } from '../../models/user/user.model';
import { APIFeatures } from '../../utils/api-features';

export class UserService {
    public model = User;

    getOne = (id: string) => this.model.findById(id);

    getMany = (query: any) => {
        const documentQuery = this.model.find();
        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };
}