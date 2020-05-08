import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IBookFollower } from './book-follower.interface';
import { AppError } from '../../../../utils/app-error';

const bookFollowerSchema = new Schema({
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

bookFollowerSchema.pre<IBookFollower>('save', async function(next) {

    if (this.isNew) {
        const bookFollower = await BookFollower.findOne({ user: this.user, book: this.book }).select('id');

        if (!!bookFollower) next(new AppError('already exists', 400));

        next();
    }

});

export const BookFollower = model<IBookFollower>(Models.BOOK_FOLLOWER, bookFollowerSchema);