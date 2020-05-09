import { model, Schema, SchemaTypes, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { Models } from '../models.enum';
import { IUserProfile } from './user-profile.interface';

const userProfileSchema = new Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: Models.USER
    },
    biography: {
        type: SchemaTypes.String,
        maxlength: [255, 'field \'biography\' must contain no more than 255 characters']
    },
    placeOfBirth: {
        type: SchemaTypes.String,
        maxlength: [64, 'field \'placeOfBirth\' must contain no more than 64 characters']
    },
    birthday: {
        type: SchemaTypes.Date
    },
    livesIn: {
        type: SchemaTypes.String,
        maxlength: [64, 'field \'livesIn\' must contain no more than 64 characters']
    },
    gender: {
        type: SchemaTypes.String,
        enum: ['M' /*MALE*/, 'F' /*FEMALE*/, 'UNKNOWN'],
        default: 'UNKNOWN'
    },
    profession: {
        type: SchemaTypes.String,
        maxlength: [128, 'field \'profession\' must contain no more than 128 characters']
    }
}, {
    timestamps: true
});

const UserProfile = model<IUserProfile>(Models.USER_PROFILE, userProfileSchema);