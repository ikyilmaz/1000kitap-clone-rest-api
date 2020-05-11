import { BaseService } from '../base/base.service';
import { IBookLibrary } from '../../models/book-library/book-library.interface';
import { Model } from 'mongoose';
import { limitFields, paginate } from '../../utils/api-features-funcs';
import { BookLibraryVirtuals } from '../../models/book-library/book-library.enums';

export class BookLibraryService extends BaseService<IBookLibrary> {
    constructor(public model: Model<IBookLibrary>) {
        super(model);
    }

    get = (id: string, query: Pick<any, any>) => {
        return this.model.findOne({ privacy: 'PUBLIC' })
            .select(limitFields(query['fields']))
            .populate({
                path: BookLibraryVirtuals.BOOKS,
                select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] }),
                options: {
                    ...paginate(query),
                    sort: query['sortBy'] || '-createdAt'
                }
            });

    };
}