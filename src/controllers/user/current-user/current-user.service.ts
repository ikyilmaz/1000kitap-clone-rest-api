import { BaseService } from '../../base/base.service';
import { IUser } from '../../../models/user/user.interface';
import { DocumentQuery, Model } from 'mongoose';
import { BookLibrary } from '../../../models/book-library/book-library.model';
import { limitFields } from '../../../utils/api-features-funcs';
import { getOneWithOptions } from '../../../types/types';
import { getOneWithPopulated } from '../../../utils/get-one-with-populated';
import * as mongoose from 'mongoose';
import { BookLibraryBook } from '../../../models/book-library/book-library-books/book-library-book.model';
import { APIFeatures } from '../../../utils/api-features';
import { BookLibraryVirtuals } from '../../../models/book-library/book-library.enums';
import { BookReview } from '../../../models/m2m/book-user/book-review/book-review.model';
import { BookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { UserFollow } from '../../../models/m2m/user-user/user-follow/user-follow.model';
import { UserVirtuals } from '../../../models/user/user.enums';

export class CurrentUserService extends BaseService<IUser> {
    constructor(public model: Model<IUser>) {
        super(model);
    }

    get = ({ query, model, currentUserId }: { currentUserId: string, query: Pick<any, any>, model: Model<mongoose.Document>, }) => {
        const documentQuery = model.findOne({ user: currentUserId });

        return this.getWith(documentQuery, query, {
            fields: limitFields(query['fields']),
            populate: {
                path: BookLibraryVirtuals.BOOKS,
                select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] }),
                count: { path: BookLibraryVirtuals.BOOKS_COUNT }
            }
        });
    };

    getBookLibraries = (currentUserId: string, query: Pick<any, any>) =>
        this.getWith(BookLibrary.find({ user: currentUserId }), query, {
            fields: limitFields(query['fields'])
        });


    getBookLibrary = (currentUserId: string, bookLibraryId: string, query: Pick<any, any>) => {
        const documentQuery = BookLibrary.findOne({ _id: bookLibraryId, user: currentUserId });

        return this.getWith(documentQuery, query, {
            fields: limitFields(query['fields']),
            populate: {
                path: BookLibraryVirtuals.BOOKS,
                select: limitFields(query['bookFields'], { defaults: ['title', 'image', 'publisher'] }),
                count: { path: BookLibraryVirtuals.BOOKS_COUNT }
            }
        });
    };

    getFollowers = (currentUserId: string, query: Pick<any, any>) => {
        const documentQuery = UserFollow.findOne({ following: currentUserId });

        return this.getWith(documentQuery, query, {
            fields: limitFields(query['fields']),
            populate: {
                path: 'followingBy',
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'photo'],
                    unwantedFields: ['password', 'email']
                })
            }
        });
    };

    getFollowings = (currentUserId: string, query: Pick<any, any>) => {
        const documentQuery = UserFollow.findOne({ followingBy: currentUserId });

        return this.getWith(documentQuery, query, {
            fields: limitFields(query['fields']),
            populate: {
                path: 'following',
                select: limitFields(query['userFields'], {
                    defaults: ['firstName', 'lastName', 'photo'],
                    unwantedFields: ['password', 'email']
                })
            }
        });
    };

    private getWith = (documentQuery: DocumentQuery<any, any>, query: Pick<any, any>, options?: getOneWithOptions) => {
        if (options) getOneWithPopulated({ documentQuery, query, options });

        return new APIFeatures(documentQuery, query).filter('fields', 'bookFields').sort().limitFields().paginate().query;
    };
}