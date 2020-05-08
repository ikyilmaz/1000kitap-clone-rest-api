import { Schema } from 'mongoose';
import { IAuthor } from './author.interface';
import { Models } from '../models.enum';

export const setAuthorVirtuals = (authorSchema: Schema<IAuthor>) => {

    // BOOKS
    authorSchema.virtual('books', {
        ref: Models.BOOK,
        foreignField: 'author',
        localField: '_id'
    });

    // BOOKS COUNT
    authorSchema.virtual('booksCount', {
        ref: Models.BOOK,
        foreignField: 'author',
        localField: '_id',
        count: true
    });

};