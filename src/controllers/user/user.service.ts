import { User } from '../../models/user/user.model';
import { APIFeatures } from '../../utils/api-features';
import { limitFields, paginate } from '../../utils/api-features-funcs';
import { UserProfile } from '../../models/user-profile/user-profile.model';
import { UserVirtuals } from '../../models/user/user.enums';
import { getOneWithOptions } from '../../types/types';
import { IUser } from '../../models/user/user.interface';
import { DocumentQuery } from 'mongoose';

type getUserFunc = (conditions: Pick<any, any>, query: Pick<any, any>) => DocumentQuery<IUser | null, IUser, {}>

export class UserService {
    public model = User;

    create = async (user: Pick<any, any>) => {

        const createdUser = await this.model.create(user);

        createdUser.profile = await UserProfile.create({ user: createdUser._id || createdUser.id });

        return createdUser;

    };

    update = (id: string, user: Pick<any, any>) => this.model.findByIdAndUpdate(id, user, { new: true });

    getMany = (query: any) => {
        const documentQuery = this.model.find()
            .select(limitFields(query['fields'], { unwantedFields: ['password', 'email'] }));
        return new APIFeatures(documentQuery, query).filter().sort().paginate().query;
    };

    getOne: getUserFunc = (conditions, query) => this.getOneWith(conditions, query);

    getOneWithProfile: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            path: UserVirtuals.PROFILE,
            select: limitFields(query['profileFields'])
        }
    });

    getOneWithReviews: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['reviewFields']),
            path: UserVirtuals.REVIEWS,
            sortBy: query['reviewSortBy'],
            populateWithCount: { path: UserVirtuals.REVIEWS_COUNT },
            populate: {
                select: limitFields(query['excerptBookFields'], { defaults: ['title', 'image', 'publisher'] }),
                path: 'book'
            }
        }
    });

    getOneWithExcerpts: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['excerptFields'], { defaults: ['book', 'content'] }),
            path: UserVirtuals.EXCERPTS,
            sortBy: query['excerptSortBy'],
            populateWithCount: { path: UserVirtuals.EXCERPTS_COUNT },
            populate: {
                select: limitFields(query['excerptBookFields'], { defaults: ['title', 'image', 'publisher'] }),
                path: 'book'
            }
        }
    });

    getOneWithFavoriteAuthors: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['authorFields']),
            path: UserVirtuals.FAVORITE_AUTHORS,
            sortBy: query['authorSortBy'],
            populateWithCount: { path: UserVirtuals.FAVORITE_AUTHORS_COUNT }
        }
    });

    getOneWithFavoriteBooks: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['bookFields']),
            path: UserVirtuals.FAVORITE_BOOKS,
            sortBy: query['bookSortBy'],
            populateWithCount: { path: UserVirtuals.FAVORITE_BOOKS_COUNT }
        }
    });

    getOneWithFollowers: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['followFields'], {
                unwantedFields: ['password', 'email']
            }),
            path: UserVirtuals.FOLLOWERS,
            sortBy: query['followSortBy'],
            populateWithCount: { path: UserVirtuals.FOLLOWERS_COUNT }
        }
    });

    getOneWithFollows: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['followerFields'], {
                unwantedFields: ['password', 'email']
            }),
            path: UserVirtuals.FOLLOWING,
            sortBy: query['followerSortBy'],
            populateWithCount: { path: UserVirtuals.FOLLOWING_COUNT }
        }
    });

    getOneWithRatedBooks: getUserFunc = (conditions, query) => this.getOneWith(conditions, query, {
        populate: {
            select: limitFields(query['ratedBookFields']),
            path: UserVirtuals.RATED_BOOKS,
            sortBy: query['ratedBookSortBy'],
            populateWithCount: { path: UserVirtuals.RATED_BOOKS_COUNT }
        }
    });

    private getOneWith = (conditions: Pick<any, any>, query: Pick<any, any>, options?: getOneWithOptions) => {

        const documentQuery = this.model.findOne(conditions)
            .select(limitFields(query['fields'], { unwantedFields: ['password', 'email'] }));

        if (options) {
            documentQuery.populate({
                path: options.populate.path,
                select: options.populate.select,
                options: {
                    ...paginate(query),
                    sort: options.populate.sortBy || '-createdAt'
                },
                populate: options.populate.populate ? options.populate.populate : undefined
            });

            if (options.populate.populateWithCount) documentQuery.populate(options.populate.populateWithCount.path);
        }

        return documentQuery;
    };
}