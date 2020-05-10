import { Book } from '../../models/book/book.model';
import { APIFeatures } from '../../utils/api-features';
import { limitFields } from '../../utils/api-features-funcs';
import { BookVirtuals } from '../../models/book/book.enums';
import { getOneWithOptions } from '../../types/types';
import { getOneWithPopulated } from '../../utils/get-one-with-populated';

export class BookService {
    public model = Book;

    getMany = (query: Pick<any, any>) => {
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

    get = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, [
        { populate: { path: BookVirtuals.REVIEWS_COUNT } },
        { populate: { path: BookVirtuals.EXCERPTS_COUNT } }
    ]);

    getOneWithReviews = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, {
        populate: {
            path: BookVirtuals.REVIEWS,
            select: limitFields(query['reviewFields'], { defaults: ['book', 'user', 'content'] }),
            sortBy: query['reviewSortBy'],
            count: { path: BookVirtuals.REVIEWS_COUNT },
            populate: this.populateUser(query)
        }
    });

    getOneWithExcerpts = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, {
        populate: {
            path: BookVirtuals.EXCERPTS,
            select: limitFields(query['excerptFields'], { defaults: ['book user content'] }),
            sortBy: query['excerptSortBy'],
            count: { path: BookVirtuals.EXCERPTS_COUNT },
            populate: this.populateUser(query)
        }
    });

    getOneWithFollowers = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, {
        populate: {
            path: BookVirtuals.FOLLOWERS,
            select: limitFields(query['followerFields']),
            sortBy: query['followerShortBy'],
            count: { path: BookVirtuals.FOLLOWERS_COUNT },
            populate: this.populateUser(query)
        }
    });

    getOneWithRates = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, {
        populate: {
            path: BookVirtuals.RATES,
            select: limitFields(query['rateFields']),
            sortBy: query['rateSortBy'],
            count: { path: BookVirtuals.RATES_COUNT },
            populate: this.populateUser(query)
        }
    });

    getOneWithLibraries = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, {
        populate: {
            path: BookVirtuals.LIBRARIES,
            select: limitFields(query['libraryFields']),
            sortBy: query['librarySortBy'],
            count: { path: BookVirtuals.LIBRARIES_COUNT },
            populate: this.populateUser(query)
        }
    });

    getOneWithFavorites = (id: string, query: Pick<any, any>) => this.getOneWith(id, query, {
        populate: {
            path: BookVirtuals.FAVORED_BY,
            select: limitFields(query['favoredByFields']),
            sortBy: query['favoredBySortBy'],
            count: { path: BookVirtuals.FAVORED_BY_COUNT },
            populate: this.populateUser(query)
        }
    });

    // Short-Hand for populating user
    private populateUser = (query: Pick<any, any>) => {
        return {
            path: 'user',
            select: limitFields(query['excerptUserFields'], {
                defaults: ['firstName', 'lastName', 'image'],
                unwantedFields: ['password', 'email']
            }),
            sortBy: query['userSortBy'] || '-createdAt'
        };
    };

    private getOneWith = (id: string, query: Pick<any, any>, options?: getOneWithOptions) => {

        const documentQuery = this.model.findById(id)
            .select(limitFields(query['fields'], { unwantedFields: ['password', 'email'] }))
            .populate({
                path: 'category',
                select: limitFields(query['categoryFields'], { defaults: ['name'] })
            })
            .populate({
                path: 'author',
                select: limitFields(query['authorFields'], { defaults: ['firstName', 'lastName'] })
            });

        if (options) getOneWithPopulated({ documentQuery, query, options });

        return documentQuery;
    };
}
