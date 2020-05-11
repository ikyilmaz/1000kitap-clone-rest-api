import { BaseService } from '../../base/base.service';
import { IFavoriteAuthor } from '../../../models/m2m/author-user/favorite-author/favorite-author.interface';
import { Model } from 'mongoose';

export class FavoriteAuthorService extends BaseService<IFavoriteAuthor> {
    constructor(public model: Model<IFavoriteAuthor>) {
        super(model);
    }

}