import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IFavoriteAuthor } from './favorite-author.interface';

const favoriteAuthorSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.USER
    },
    author: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.AUTHOR
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});


export const FavoriteAuthor = model<IFavoriteAuthor>(Models.FAVORITE_AUTHOR, favoriteAuthorSchema);