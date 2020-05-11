import { model, Schema, SchemaTypes } from 'mongoose';
import { IBookLibrary } from './book-library.interface';
import { Models } from '../models.enum';
import { AppError } from '../../utils/app-error';
import { BookFollow } from '../m2m/book-user/book-follow/book-follow.model';

const bookLibrarySchema = new Schema<IBookLibrary>({
    name: {
        type: SchemaTypes.String,
        required: [true, 'field \'name\' is required'],
        maxlength: 64,
        minlength: 1
    },
    privacy: {
        type: SchemaTypes.String,
        enum: ['PRIVATE', 'PUBLIC'],
        default: 'PUBLIC'
    },
    description: {
        type: SchemaTypes.String,
        maxlength: [255, 'field \'description\' must contains at least 2 characters'],
        minlength: [1, 'field \'description\' must contain no more than 32 characters']
    },
    photo: {
        type: SchemaTypes.String,
        default: 'default.jpeg'
    },
    user: {
        type: SchemaTypes.ObjectId,
        required: [true, 'field \'user\' is required'],
        ref: Models.USER
    }
}, { timestamps: true });

bookLibrarySchema.pre<IBookLibrary>('save', async function(next) {
    if (this.isNew) {
        const exists = await BookLibrary.exists({ user: this.user, name: this.name });

        if (exists) next(new AppError('already exists', 400));

        next();
    }
});

export const BookLibrary = model<IBookLibrary>(Models.BOOK_LIBRARY, bookLibrarySchema);