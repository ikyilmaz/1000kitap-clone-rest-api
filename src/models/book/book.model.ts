import { SchemaTypes, Schema, model } from 'mongoose';
import { IBook } from './book.interface';
import { Models } from '../models.enum';
import { setBookVirtuals } from './book.virtuals';

let bookSchema = new Schema<IBook>({
    title: {
        type: SchemaTypes.String,
        required: [true, 'field \'title\' is required']
    },
    printDate: SchemaTypes.Number,
    numberOfPages: {
        type: SchemaTypes.Number,
        required: [true, 'field \'numberOfPages\' is required']
    },
    format: SchemaTypes.String, // TODO
    ISBN: SchemaTypes.String,
    language: SchemaTypes.String,
    country: SchemaTypes.String,
    publisher: SchemaTypes.String,
    edition: SchemaTypes.Number,
    author: {
        type: SchemaTypes.ObjectId,
        required: [true, 'field \'author\' is required'],
        ref: Models.AUTHOR
    },
    category: {
        type: SchemaTypes.ObjectId,
        required: [true, 'field \'category\' is required'],
        ref: Models.CATEGORY
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


setBookVirtuals(bookSchema);

export const Book = model<IBook>(Models.BOOK, bookSchema);