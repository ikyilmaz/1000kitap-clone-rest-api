import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IFavoriteBook } from './favorite-book.interface';

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

export const FavoriteBook = model<IFavoriteBook>(Models.FAVORITE_BOOK, favoriteBookSchema);