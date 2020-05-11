import { model, Schema, SchemaTypes } from 'mongoose';
import { Models } from '../../models.enum';
import { IBookLibraryBook } from './book-library-book.interface';
import { AppError } from '../../../utils/app-error';

const bookLibraryBookSchema = new Schema({
    bookLibrary: {
        type: SchemaTypes.ObjectId,
        ref: Models.BOOK_LIBRARY,
        required: true
    },
    book: {
        type: SchemaTypes.ObjectId,
        ref: Models.BOOK,
        required: true
    }
}, { timestamps: true });

bookLibraryBookSchema.pre<IBookLibraryBook>('save', async function(next) {
    if (this.isNew) {
        const exists = await BookLibraryBook.exists({
            bookLibrary: this.bookLibrary,
            book: this.book
        });

        if (exists) next(new AppError('already exists', 400));

        next();
    }
});

export const BookLibraryBook = model<IBookLibraryBook>(Models.BOOK_LIBRARY_BOOK);