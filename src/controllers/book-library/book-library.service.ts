import { BaseService } from '../base/base.service';
import { IBookLibrary } from '../../models/book-library/book-library.interface';
import { DocumentQuery, Model } from 'mongoose';
import { limitFields, paginate } from '../../utils/api-features-funcs';
import { BookLibraryVirtuals } from '../../models/book-library/book-library.enums';

export class BookLibraryService extends BaseService<IBookLibrary> {
    constructor(public model: Model<IBookLibrary>) {
        super(model);
    }

    get = (id: string, query: Pick<any, any>) => {
        return this.model.findOne({ _id: id, privacy: 'PUBLIC' })
            .select(limitFields(query['fields'], { unwantedFields: ['privacy'] }))
            .populate(this.populateUser(query))
            .populate({
                path: BookLibraryVirtuals.BOOKS,
                select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] }),
                options: {
                    ...paginate(query),
                    sort: query['sortBy'] || '-createdAt'
                }
            })
            .populate(BookLibraryVirtuals.BOOKS_COUNT);

    };

    getMany = (query: Pick<any, any>) => {
        return this.model.find({ privacy: 'PUBLIC' })
            .select(limitFields(query['fields'], { unwantedFields: ['privacy'] }))
            .populate(this.populateUser(query))
            .populate(BookLibraryVirtuals.BOOKS_COUNT);
    };

    private populateUser = (query: Pick<any, any>) => {
        return {
            path: 'user',
            select: limitFields(query['userFields'], {
                defaults: ['photo', 'username'],
                unwantedFields: ['email', 'password']
            }),
            options: {
                ...paginate(query),
                sort: query['sortBy'] || '-createdAt'
            }
        };
    };
}