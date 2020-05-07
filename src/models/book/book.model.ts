import { SchemaTypes, Schema, model } from 'mongoose';
import { IBook } from './book.interface';
import { Models } from '../models.enum';

const bookSchema = new Schema<IBook>({
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

/* * */

export const Book = model<IBook>(Models.BOOK, bookSchema);