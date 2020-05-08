import { Schema } from 'mongoose';
import { IBook } from './book.interface';
import { Models } from '../models.enum';

export const setBookVirtuals = (bookSchema: Schema<IBook>) => {
    // REVIEWS
    bookSchema.virtual('reviews', {
        ref: Models.BOOK_REVIEW,
        foreignField: 'book',
        localField: '_id'
    });

    // REVIEWS COUNT
    bookSchema.virtual('reviewsCount', {
        ref: Models.BOOK_REVIEW,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // EXCERPTS
    bookSchema.virtual('excerpts', {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'book',
        localField: '_id'
    });

    // EXCERPTS COUNT
    bookSchema.virtual('excerptsCount', {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // FOLLOWERS
    bookSchema.virtual('followers', {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'book',
        localField: '_id'
    });

    // FOLLOWERS COUNT
    bookSchema.virtual('followersCount', {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // RATES
    bookSchema.virtual('rates', {
        ref: Models.BOOK_RATING,
        foreignField: 'book',
        localField: '_id'
    });

    // RATES COUNT
    bookSchema.virtual('ratesCount', {
        ref: Models.BOOK_RATING,
        foreignField: 'book',
        localField: '_id',
        count: true
    });
};