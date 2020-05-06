import { model, Schema, SchemaTypes } from 'mongoose';
import { IBookReview } from './book-review.interface';

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
    content: {
        required: [true, ' field \'content\' is required'],
        maxlength: [3000, 'field \'content\' must contain no more than 3000 characters'],
        type: SchemaTypes.String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true
});

export const BookReview = model<IBookReview>(Models.BOOK_REVIEW, bookReviewSchema);