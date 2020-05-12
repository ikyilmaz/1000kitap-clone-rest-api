import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IUserLibrary } from './user-library.interface';
import { AppError } from '../../../../utils/app-error';

/**
 * @deprecated using bookLibrarySchema
 * */
const userLibrarySchema = new Schema({
    book: {
        type: SchemaTypes.ObjectId,
        required: [true, 'field \'book\' is required'],
        ref: Models.BOOK
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: [true, 'field \'user\' is required'],
        ref: Models.USER
    },
    status: {
        type: SchemaTypes.String,
        enum: ['READING', 'TO_BE_READ', 'READ', 'DISCONTINUE', 'NOT_READ'],
        default: 'TO_BE_READ'
    }
}, {
    timestamps: true
});

userLibrarySchema.pre<IUserLibrary>("save",  async function(next) {
    if (this.isNew) {
        const exists = await UserLibrary.exists({ user: this.user, book: this.book })

        if (exists) next(new AppError('already exists', 400));

        next();
    }
})

export const UserLibrary = model<IUserLibrary>(Models.USER_LIBRARY, userLibrarySchema);

