import { BaseService } from '../base/base.service';
import { IBookLibrary } from '../../models/book-library/book-library.interface';
import { Model } from 'mongoose';
import { limitFields, paginate } from '../../utils/api-features-funcs';
import { BookLibraryVirtuals } from '../../models/book-library/book-library.enums';
import { BookLibraryBook } from '../../models/book-library/book-library-books/book-library-book.model';
import { APIFeatures } from '../../utils/api-features';
import { IBookLibraryBook } from '../../models/book-library/book-library-books/book-library-book.interface';

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
                options: { ...paginate(query) },
                populate: {
                    path: 'book',
                    select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] })
                }
            })
            .populate(BookLibraryVirtuals.BOOKS_COUNT);

    };

    getMany = (query: Pick<any, any>) => {
        const documentQuery = this.model.find({ privacy: 'PUBLIC' })
            .select(limitFields(query['fields'], { unwantedFields: ['privacy'] }))
            .populate(this.populateUser(query))
            .populate(BookLibraryVirtuals.BOOKS_COUNT);

        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };

    addBook = (bookLibraryId: string, userId: string, data: Pick<any, any>) => {
        return BookLibraryBook.create({
            user: userId,
            book: data.book,
            status: data.status,
            bookLibrary: bookLibraryId
        });
    };

    getBooks = (bookLibraryId: string, query: Pick<any, any>) => {
        const documentQuery = BookLibraryBook.find({ bookLibrary: bookLibraryId })
            .populate({
                path: 'book',
                select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] })

            });

        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };

    updateBookStatus = (bookLibraryBookId: string, status: any) => {
        return BookLibraryBook.findByIdAndUpdate(bookLibraryBookId, { status }, {new :true});
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