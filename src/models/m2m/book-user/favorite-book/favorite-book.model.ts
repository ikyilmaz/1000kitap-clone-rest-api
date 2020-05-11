import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IFavoriteBook } from './favorite-book.interface';
import { AppError } from '../../../../utils/app-error';

const favoriteBookSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.USER
    },
    book: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.BOOK
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

favoriteBookSchema.pre<IFavoriteBook>("save", async function(next) {
    if (this.isNew) {
        const exists = await FavoriteBook.exists({ user: this.user, book: this.book })

        if (exists) next(new AppError('already exists', 400));

        next();
    }
})

export const FavoriteBook = model<IFavoriteBook>(Models.FAVORITE_BOOK, favoriteBookSchema);