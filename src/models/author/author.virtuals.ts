import { Schema } from 'mongoose';
import { IAuthor } from './author.interface';
import { Models } from '../models.enum';
import { AuthorVirtuals } from './author.enums';

export const setAuthorVirtuals = (authorSchema: Schema<IAuthor>) => {

    // BOOKS
    authorSchema.virtual(AuthorVirtuals.BOOKS, {
        ref: Models.BOOK,
        foreignField: 'author',
        localField: '_id'
    });

    // BOOKS COUNT
    authorSchema.virtual(AuthorVirtuals.BOOKS_COUNT, {
        ref: Models.BOOK,
        foreignField: 'author',
        localField: '_id',
        count: true
    });

    // USERS WHO ADDED TO FAVORITE AUTHORS
    authorSchema.virtual(AuthorVirtuals.FAVORED_BY, {
        ref: Models.FAVORITE_AUTHOR,
        foreignField: 'author',
        localField: '_id'
    });

    // USERS WHO ADDED TO FAVORITE AUTHORS COUNT
    authorSchema.virtual(AuthorVirtuals.FAVORED_BY_COUNT, {
        ref: Models.FAVORITE_AUTHOR,
        foreignField: 'author',
        localField: '_id',
        count: true
    });

};