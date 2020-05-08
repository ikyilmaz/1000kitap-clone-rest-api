import { model, Schema, SchemaTypes } from 'mongoose';
import { IBookReview } from './book-review.interface';
import { Models } from '../../../models.enum';

const bookReviewSchema = new Schema<IBookReview>({
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
    rating: {
        type: SchemaTypes.Number,
        min: 1,
        max: 10,
        set: (value: number) => Math.round(value)
    },
    specialNote: {
        type: SchemaTypes.String,
        maxlength: [256, 'field \'specialNote\' must contain no more than 256 characters']
    },
    content: {
        type: SchemaTypes.String,
        required: [true, ' field \'content\' is required'],
        maxlength: [3000, 'field \'content\' must contain no more than 3000 characters']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});


export const BookReview = model<IBookReview>(Models.BOOK_REVIEW, bookReviewSchema);