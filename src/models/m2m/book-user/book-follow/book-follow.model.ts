import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IBookFollow } from './book-follow.interface';
import { AppError } from '../../../../utils/app-error';

const bookFollowSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        ref: Models.USER,
        required: true
    },
    book: {
        type: SchemaTypes.ObjectId,
        ref: Models.BOOK,
        required: true
    }
}, {
    timestamps: true
});

bookFollowSchema.pre<IBookFollow>('save', async function(next) {

    if (this.isNew) {
        const exists = await BookFollow.exists({ user: this.user, book: this.book })

        if (exists) next(new AppError('already exists', 400));

        next();
    }

});

export const BookFollow = model<IBookFollow>(Models.BOOK_FOLLOWER, bookFollowSchema);