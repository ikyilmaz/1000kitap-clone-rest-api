import { BaseService } from '../../base/base.service';
import { IFavoriteAuthor } from '../../../models/m2m/author-user/favorite-author/favorite-author.interface';
import { DocumentQuery, Model } from 'mongoose';
import { limitFields } from '../../../utils/api-features-funcs';
import { APIFeatures } from '../../../utils/api-features';

export class FavoriteAuthorService extends BaseService<IFavoriteAuthor> {
    constructor(public model: Model<IFavoriteAuthor>) {
        super(model);
    }

    get = (id: string, query: Pick<any, any>) => this.populateDefaults(this.model.findById(id), query);


    getMany = (query: Pick<any, any>) => {
        const documentQuery = this.populateDefaults(this.model.find(), query);
        return new APIFeatures(documentQuery, query).filter('authorFields', 'userFields').sort().limitFields().paginate().query;
    };

    private populateDefaults = (documentQuery: DocumentQuery<any, any>, query: Pick<any, any>) => {
        return documentQuery
            .select(limitFields(query['fields']))
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], { defaults: ['firstName', 'lastName', 'photo'] })
            })
            .populate({
                path: 'user',
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'username', 'photos'],
                    unwantedFields: ['password', 'email']
                })
            });
    };

}
