import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../../models.enum';
import { IUserLibrary } from './user-library.interface';

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

export const UserLibrary = model<IUserLibrary>(Models.USER_LIBRARY, userLibrarySchema);

