import { model, Schema, SchemaTypes } from 'mongoose';
import { IBookExcerpt } from './book-excerpt.interface';
import { Models } from '../models.enum';

const bookExcerptSchema = new Schema<IBookExcerpt>({
    book: {
        type: SchemaTypes.ObjectId,
        required: [true, ' field \'book\' is required'],
        ref: Models.BOOK
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: [true, ' field \'user\' is required'],
        ref: Models.USER
    },
    content: {
        required: [true, ' field \'content\' is required'],
        maxlength: [255, 'field \'content\' must contain no more than 255 characters'],
        type: SchemaTypes.String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

export const BookExcerpt = model<IBookExcerpt>(Models.BOOK_EXCERPT, bookExcerptSchema);