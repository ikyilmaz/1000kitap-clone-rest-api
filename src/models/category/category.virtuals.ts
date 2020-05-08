import { Schema } from 'mongoose';
import { ICategory } from './category.interface';
import { Models } from '../models.enum';

export const setCategoryVirtuals = (categorySchema: Schema<ICategory>) => {
    // BOOKS
    categorySchema.virtual('books', {
        ref: Models.BOOK,
        foreignField: 'category',
        localField: '_id'
    });

    // BOOKS COUNT
    categorySchema.virtual('booksCount', {
        ref: Models.BOOK,
        foreignField: 'category',
        localField: '_id',
        count: true
    });

};