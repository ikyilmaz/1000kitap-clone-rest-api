import { Book } from '../../models/book/book.model';
import { APIFeatures } from '../../utils/api-features';
import { limitFields, paginate } from '../../utils/api-features-funcs';

export class BookService {
    public model = Book;

    getMany = (query: { [key: string]: any }) => {
        const documentQuery = this.model.find()
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], ['name'])
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], ['firstName', 'lastName'])
            });

        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };

    get = (id: string, query: { [key: string]: any }) => {
        const documentQuery = this.model.findById(id)
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], ['name'])
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], ['firstName', 'lastName'])
            });

        return new APIFeatures(documentQuery, query).limitFields().query;
    };

    getWithReviews = (id: string, query: { [key: string]: any }) => {
        const documentQuery = this.model.findById(id)
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], ['name'])
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], ['firstName', 'lastName'])
            })
            .populate({
                path: 'reviews',
                select: limitFields(query['reviewFields'], ['book user content']),
                options: {
                    ...paginate(query),
                    sort: query['reviewSortBy'] || '-createdAt'
                },
                populate: {
                    path: 'user',
                    select: limitFields(query['reviewUserFields'], ['firstName', 'lastName', 'image'], ['password'])
                }
            });

        return new APIFeatures(documentQuery, query).limitFields().query;

    };

    getWithExcerpts = (id: string, query: { [key: string]: any }) => {
        const documentQuery = this.model.findById(id)
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], ['name'])
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], ['firstName', 'lastName'])
            })
            .populate({
                path: 'excerpts',
                select: limitFields(query['reviewFields'], ['book user content']),
                options: {
                    ...paginate(query),
                    sort: query['reviewSortBy'] || '-createdAt'
                },
                populate: {
                    path: 'user',
                    select: limitFields(query['reviewUserFields'], ['firstName', 'lastName', 'image'], ['password'])
                }
            });

        return new APIFeatures(documentQuery, query).limitFields().query;
    };
}
