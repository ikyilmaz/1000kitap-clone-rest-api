import { User } from '../../models/user/user.model';
import { APIFeatures } from '../../utils/api-features';
import { limitFields } from '../../utils/api-features-funcs';
import { UserProfile } from '../../models/user-profile/user-profile.model';

export class UserService {
    public model = User;

    create = async (user: Pick<string, any>) => {
        
        const createdUser = await this.model.create({
            ...user
        });

        createdUser.profile = await UserProfile.create({
            user: createdUser._id || createdUser.id
        });

        return createdUser;

    };

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