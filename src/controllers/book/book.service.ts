import { Book } from '../../models/book/book.model';
import { APIFeatures } from '../../utils/api-features';
import { limitFields, paginate } from '../../utils/api-features-funcs';
import { BookVirtuals } from '../../models/book/book.enums';

export class BookService {
    public model = Book;

    getMany = (query: Pick<string, any>) => {
        const documentQuery = this.model.find()
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], { defaults: ['name'] })
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], { defaults: ['firstName', 'lastName'] })
            });

        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };

    get = (id: string, query: Pick<string, any>) => {


        const documentQuery = this.model.findById(id)
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], { defaults: ['name'] })
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], { defaults: ['firstName', 'lastName'] })
            })
            .populate('excerptsCount')
            .populate('reviewsCount');

        return new APIFeatures(documentQuery, query).limitFields().query;
    };

    getWithReviews = (id: string, query: Pick<string, any>) => {
        const documentQuery = this.model.findById(id)
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], { defaults: ['name'] })
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], { defaults: ['firstName', 'lastName'] })
            })
            .populate({
                path: BookVirtuals.REVIEWS,
                select: limitFields(query['reviewFields'], { defaults: ['book user content'] }),
                options: {
                    ...paginate(query),
                    sort: query['reviewSortBy'] || '-createdAt'
                },
                populate: {
                    path: 'user',
                    select: limitFields(query['reviewUserFields'], {
                        defaults: ['firstName', 'lastName', 'image'],
                        unwantedFields: ['password', 'email']
                    })
                }
            })
            .populate(BookVirtuals.EXCERPTS_COUNT)
            .populate(BookVirtuals.REVIEWS_COUNT);

        return new APIFeatures(documentQuery, query).limitFields().query;

    };

    getWithExcerpts = (id: string, query: Pick<string, any>) => {
        const documentQuery = this.model.findById(id)
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], { defaults: ['name'] })
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], { defaults: ['firstName', 'lastName'] })
            })
            .populate({
                path: BookVirtuals.EXCERPTS,
                select: limitFields(query['excerptFields'], { defaults: ['book user content'] }),
                options: {
                    ...paginate(query),
                    sort: query['excerptSortBy'] || '-createdAt'
                },
                populate: {
                    path: 'user',
                    select: limitFields(query['excerptUserFields'], {
                        defaults: ['firstName', 'lastName', 'image'],
                        unwantedFields: ['password', 'email']
                    })
                }
            })
            .populate(BookVirtuals.EXCERPTS_COUNT)
            .populate(BookVirtuals.REVIEWS_COUNT);

        return new APIFeatures(documentQuery, query).limitFields().query;
    };
}
