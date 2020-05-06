import { User } from '../../models/user/user.model';
import { APIFeatures } from '../../utils/apiFeatures';
import { IUser } from '../../models/user/user.interface';

export class UserService {
    public model = User;

    getOne = (id: string) => {
        return this.model.findById(id);
    };

    getMany = (query: any) => {
        const documentQuery = this.model.find();
        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };
}