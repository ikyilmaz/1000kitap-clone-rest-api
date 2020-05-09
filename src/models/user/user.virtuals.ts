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

    // FOLLOWED BOOKS
    userSchema.virtual(UserVirtuals.FOLLOWED_BOOKS, {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'user',
        localField: '_id'
    });

    // FOLLOWED BOOKS COUNT
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

    // FOLLOWED USERS
    userSchema.virtual(UserVirtuals.FOLLOWED_USERS, {
        ref: Models.USER_FOLLOW,
        foreignField: 'followed',
        localField: '_id'
    });

    // FOLLOWED USERS COUNT
    userSchema.virtual(UserVirtuals.FOLLOWED_USERS_COUNT, {
        ref: Models.USER_FOLLOW,
        foreignField: 'followed',
        localField: '_id',
        count: true
    });

    // FOLLOWING USERS
    userSchema.virtual(UserVirtuals.FOLLOWING_USERS, {
        ref: Models.USER_FOLLOW,
        foreignField: 'following',
        localField: '_id'
    });

    // FOLLOWING USERS COUNT
    userSchema.virtual(UserVirtuals.FOLLOWING_USERS_COUNT, {
        ref: Models.USER_FOLLOW,
        foreignField: 'following',
        localField: '_id',
        count: true
    });

    // FAVORITE AUTHORS
    userSchema.virtual(UserVirtuals.FAVORITE_AUTHORS, {
        ref: Models.FAVORITE_AUTHOR,
        foreignField: 'user',
        localField: '_id'
    });

    // FAVORITE AUTHORS COUNT
    userSchema.virtual(UserVirtuals.FAVORITE_AUTHORS_COUNT, {
        ref: Models.FAVORITE_AUTHOR,
        foreignField: 'user',
        localField: '_id',
        count: true
    });

    // FAVORITE BOOKS
    userSchema.virtual(UserVirtuals.FAVORITE_BOOKS, {
        ref: Models.FAVORITE_BOOK,
        foreignField: 'user',
        localField: '_id'
    });

    // FAVORITE BOOKS COUNT
    userSchema.virtual(UserVirtuals.FAVORITE_BOOKS_COUNT, {
        ref: Models.FAVORITE_BOOK,
        foreignField: 'user',
        localField: '_id',
        count: true
    });

};