import { BaseService } from '../../base/base.service';
import { IUserProfile } from '../../../models/user/user-profile/user-profile.interface';
import { DocumentQuery, Model } from 'mongoose';
import { limitFields } from '../../../utils/api-features-funcs';
import { APIFeatures } from '../../../utils/api-features';

export class UserProfileService extends BaseService<IUserProfile> {
    constructor(public model: Model<IUserProfile>) {
        super(model);
    }

    get = (id: string, query: Pick<any, any>) => this.populateDefaults(this.model.findById(id), query);

    getMany = (query: Pick<any, any>) => {
        const documentQuery = this.populateDefaults(this.model.find(), query);

        return new APIFeatures(documentQuery, query).filter('userFields', 'fields').sort().limitFields().paginate().query;
    };

    update = (userProfile: Pick<any, any>) => this.model.findOneAndUpdate({ user: userProfile.user }, userProfile, { new: true });

    private populateDefaults = (documentQuery: DocumentQuery<any, any>, query: Pick<any, any>) => {
        return documentQuery
            .select(limitFields(query['fields']))
            .populate({
                path: 'user',
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'username', 'photo'],
                    unwantedFields: ['password', 'email']
                })
            });
    };
}
