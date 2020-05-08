import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IUserFollow } from './user-follow.interface';
import { AppError } from '../../../../utils/app-error';

const userFollowSchema = new Schema<IUserFollow>({
    followed: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.USER
    },
    following: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.USER
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: false
    }
});

userFollowSchema.pre<IUserFollow>('save', async function(next) {
    if (this.isNew) {
        const exists = await UserFollow.exists({
            followed: this.followed,
            following: this.following
        });

        if (exists) next(new AppError('already exists', 400));

        next();
    }
});


export const UserFollow = model<IUserFollow>(Models.USER_FOLLOW, userFollowSchema);