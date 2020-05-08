import { model, Schema, SchemaTypes } from 'mongoose';
import { IBookRating } from './book-rating.interface';
import { Models } from '../../../models.enum';
import { AppError } from '../../../../utils/app-error';

const bookRatingSchema = new Schema<IBookRating>({
    user: {
        type: SchemaTypes.ObjectId,
        ref: Models.USER,
        required: true
    },
    book: {
        type: SchemaTypes.ObjectId,
        ref: Models.BOOK,
        required: true
    },
    rating: {
        type: SchemaTypes.Number,
        required: true,
        min: 1,
        max: 10,
        set: (value: number) => Math.round(value)
    }
});

bookRatingSchema.pre<IBookRating>('save', async function(next) {

    if (this.isNew) {
        const exists = await BookRating.exists({ user: this.user, book: this.book })

        if (exists) next(new AppError('already exists', 400));

        next();
    }

});


export const BookRating = model<IBookRating>(Models.BOOK_RATING, bookRatingSchema);

