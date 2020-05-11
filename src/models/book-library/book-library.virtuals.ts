import { Schema } from 'mongoose';
import { IBookLibrary } from './book-library.interface';
import { BookLibraryVirtuals } from './book-library.enums';
import { Models } from '../models.enum';

export const setBookLibraryVirtuals = (bookLibrarySchema: Schema<IBookLibrary>) => {
    // BOOKS
    bookLibrarySchema.virtual(BookLibraryVirtuals.BOOKS, {
        ref: Models.BOOK_LIBRARY_BOOK,
        foreignField: 'bookLibrary',
        localField: '_id'
    });

    // BOOKS COUNT
    bookLibrarySchema.virtual(BookLibraryVirtuals.BOOKS_COUNT, {
        ref: Models.BOOK_LIBRARY_BOOK,
        foreignField: 'bookLibrary',
        localField: '_id',
        count: true
    })

};