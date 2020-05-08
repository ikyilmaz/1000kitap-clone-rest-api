import { Schema } from 'mongoose';
import { IBook } from './book.interface';
import { Models } from '../models.enum';
import { BookVirtuals } from './book.enums';

export const setBookVirtuals = (bookSchema: Schema<IBook>) => {
    // REVIEWS
    bookSchema.virtual(BookVirtuals.REVIEWS, {
        ref: Models.BOOK_REVIEW,
        foreignField: 'book',
        localField: '_id'
    });

    // REVIEWS COUNT
    bookSchema.virtual(BookVirtuals.REVIEWS_COUNT, {
        ref: Models.BOOK_REVIEW,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // EXCERPTS
    bookSchema.virtual(BookVirtuals.EXCERPTS, {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'book',
        localField: '_id'
    });

    // EXCERPTS COUNT
    bookSchema.virtual(BookVirtuals.EXCERPTS_COUNT, {
        ref: Models.BOOK_EXCERPT,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // FOLLOWERS
    bookSchema.virtual(BookVirtuals.FOLLOWERS, {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'book',
        localField: '_id'
    });

    // FOLLOWERS COUNT
    bookSchema.virtual(BookVirtuals.FOLLOWERS_COUNT, {
        ref: Models.BOOK_FOLLOWER,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // RATES
    bookSchema.virtual(BookVirtuals.RATES, {
        ref: Models.BOOK_RATING,
        foreignField: 'book',
        localField: '_id'
    });

    // RATES COUNT
    bookSchema.virtual(BookVirtuals.RATES_COUNT, {
        ref: Models.BOOK_RATING,
        foreignField: 'book',
        localField: '_id',
        count: true
    });

    // USERS WHO ADDED THE BOOK THEIR LIBRARY
    bookSchema.virtual(BookVirtuals.LIBRARIES, {
        ref: Models.USER_LIBRARY,
        foreignField: 'book',
        localField: '_id'
    });

    // USERS WHO ADDED THE BOOK THEIR LIBRARY COUNT
    bookSchema.virtual(BookVirtuals.LIBRARIES_COUNT, {
        ref: Models.USER_LIBRARY,
        foreignField: 'book',
        localField: '_id',
        count: true
    });
};