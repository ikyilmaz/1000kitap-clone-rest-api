import { model, Schema, SchemaTypes } from 'mongoose';
import { IBookLibrary } from './book-library.interface';
import { Models } from '../models.enum';
import { AppError } from '../../utils/app-error';
import { setBookLibraryVirtuals } from './book-library.virtuals';

const bookLibrarySchema = new Schema<IBookLibrary>({
    name: {
        type: SchemaTypes.String,
        required: [true, 'field \'name\' is required'],
        maxlength: [64, 'field \'name\' must contain no more than 64 characters'],
        minlength: [1, 'field \'name\' must contains at least 1 characters']
    },
    privacy: {
        type: SchemaTypes.String,
        enum: [
            'PUBLIC',
            'JUST_ME',
            'JUST_FOLLOWERS'
        ],
        select: false,
        required: [true, 'field \'privacy\' is required']
    },
    description: {
        type: SchemaTypes.String,
        maxlength: [255, 'field \'description\' must contain no more than 255 characters'],
        minlength: [1, 'field \'description\' must contains at least 1 characters']
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
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

bookLibrarySchema.pre<IBookLibrary>('save', async function(next) {
    if (this.isNew) {
        const exists = await BookLibrary.exists({ user: this.user, name: this.name });

        if (exists) next(new AppError('already exists', 400));

        next();
    }
});

setBookLibraryVirtuals(bookLibrarySchema);

export const BookLibrary = model<IBookLibrary>(Models.BOOK_LIBRARY, bookLibrarySchema);