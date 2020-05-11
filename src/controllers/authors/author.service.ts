import { BaseService } from '../base/base.service';
import { IAuthor } from '../../models/author/author.interface';
import { Model } from 'mongoose';
import { limitFields, paginate } from '../../utils/api-features-funcs';
import { AuthorVirtuals } from '../../models/author/author.enums';

export class AuthorService extends BaseService<IAuthor> {
    constructor(public model: Model<IAuthor>) {
        super(model);
    }

    getWithBooks = (id: string, query: Pick<any, any>) => {
        return this.model.findById(id)
            .select(limitFields(query['fields'], { defaults: ['firstName', 'lastName', 'image'] }))
            .populate({
                path: AuthorVirtuals.BOOKS,
                select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] }),
                options: { ...paginate(query), sort: query['bookSortBy'] || '-createdAt' }
            })
            .populate(AuthorVirtuals.BOOKS_COUNT);
    };

    getWithFavoredUsers = (id: string, query: Pick<any, any>) => {
        return this.model.findById(id)
            .select(limitFields(query['fields'], { defaults: ['firstName', 'lastName', 'image'] }))
            .populate({
                path: AuthorVirtuals.FAVORED_BY,
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'username', 'photo'],
                    unwantedFields: ['password', 'email']
                }),
                options: { ...paginate(query), sort: query['userSortBy'] || '-createdAt' }
            })
            .populate(AuthorVirtuals.FAVORED_BY_COUNT);
    };
}