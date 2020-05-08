import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IUserFollow } from './user-follow.interface';

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


const UserFollow = model<IUserFollow>(Models.USER_FOLLOW, userFollowSchema);