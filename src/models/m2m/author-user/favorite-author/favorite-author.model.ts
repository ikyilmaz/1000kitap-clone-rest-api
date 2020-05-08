import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IFavoriteAuthor } from './favorite-author.interface';
import { AppError } from '../../../../utils/app-error';

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

favoriteAuthorSchema.pre<IFavoriteAuthor>('save', async function(next) {
    if (this.isNew) {
        const exists = await FavoriteAuthor.exists({
            user: this.user,
            author: this.author
        });

        if (exists) next(new AppError('already exists', 400));

        next();
    }
});

export const FavoriteAuthor = model<IFavoriteAuthor>(Models.FAVORITE_AUTHOR, favoriteAuthorSchema);