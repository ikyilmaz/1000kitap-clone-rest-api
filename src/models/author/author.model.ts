import { Schema, SchemaTypes, model } from 'mongoose';
import { IAuthor } from './author.interface';
import { Models } from '../models.enum';

const authorSchema = new Schema<IAuthor>({
    firstName: {
        type: SchemaTypes.String,
        minlength: [2, 'field \'firstName\' must contains at least 2 characters'],
        maxlength: [32, 'field \'firstName\' must contain no more than 32 characters'],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: SchemaTypes.String,
        minlength: [2, 'field \'lastName\' must contains at least 2 characters'],
        maxlength: [32, 'field \'lastName\' must contain no more than 32 characters'],
        lowercase: true,
        trim: true
    },
    image: {
        type: SchemaTypes.String,
        default: 'default.jpg'
    },
    placeOfBirth: SchemaTypes.String,
    birthday: SchemaTypes.Date,
    biography: SchemaTypes.String,
    title: SchemaTypes.String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

authorSchema.virtual('books', {
    ref: Models.BOOK,
    foreignField: 'author',
    localField: '_id'
});

export const Author = model<IAuthor>(Models.AUTHOR, authorSchema);