import { Schema } from 'mongoose';
import { IUser } from './user.interface';
import { Models } from '../models.enum';

export const setUserVirtuals = (userSchema: Schema<IUser>) => {
    // REVIEWS
    userSchema.virtual('reviews', {
        ref: Models.BOOK_REVIEW,
        foreignField: 'user',
        localField: '_id'
    });

    // REVIEWS COUNT
    userSchema.virtual('reviewsCount', {
        ref: Models.BOOK_REVIEW,
        foreignField: 'user',
        localField: '_id',
        count: true
    });

    // EXCERPTS
    userSchema.virtual('excerpts', {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'user',
        localField: '_id'
    });

    // EXCERPTS COUNT
    userSchema.virtual('excerptsCount', {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'user',
        localField: '_id'
    });

    // FALLOWED BOOKS
    userSchema.virtual('fallowedBooks', {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'user',
        localField: '_id'
    });

    // FALLOWED BOOKS COUNT
    userSchema.virtual('fallowedBooksCount', {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'user',
        localField: '_id',
        count: true
    });

    // RATED BOOKS
    userSchema.virtual('ratedBooks', {
        ref: Models.BOOK_RATING,
        foreignField: 'user',
        localField: '_id'
    });

    // RATED BOOKS COUNT
    userSchema.virtual('ratedBooksCount', {
        ref: Models.BOOK_RATING,
        foreignField: 'user',
        localField: '_id',
        count: true
    });
};