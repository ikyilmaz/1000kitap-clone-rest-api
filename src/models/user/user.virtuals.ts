import { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { Models } from '../models.enum';
import { UserVirtuals } from './user.enums';

export const setUserVirtuals = (userSchema: Schema<IUser>) => {
    // REVIEWS
    userSchema.virtual(UserVirtuals.REVIEWS, {
        ref: Models.BOOK_REVIEW,
        foreignField: 'user',
        localField: '_id'
    });

    // REVIEWS COUNT
    userSchema.virtual(UserVirtuals.REVIEWS_COUNT, {
        ref: Models.BOOK_REVIEW,
        foreignField: 'user',
        localField: '_id',
        count: true
    });

    // EXCERPTS
    userSchema.virtual(UserVirtuals.EXCERPTS, {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'user',
        localField: '_id'
    });

    // EXCERPTS COUNT
    userSchema.virtual(UserVirtuals.EXCERPTS_COUNT, {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'user',
        localField: '_id'
    });

    // FALLOWED BOOKS
    userSchema.virtual(UserVirtuals.FOLLOWED_BOOKS, {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'user',
        localField: '_id'
    });

    // FALLOWED BOOKS COUNT
    userSchema.virtual(UserVirtuals.FOLLOWED_BOOKS_COUNT, {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'user',
        localField: '_id',
        count: true
    });

    // RATED BOOKS
    userSchema.virtual(UserVirtuals.RATED_BOOKS, {
        ref: Models.BOOK_RATING,
        foreignField: 'user',
        localField: '_id'
    });

    // RATED BOOKS COUNT
    userSchema.virtual(UserVirtuals.RATED_BOOKS_COUNT, {
        ref: Models.BOOK_RATING,
        foreignField: 'user',
        localField: '_id',
        count: true
    });


};