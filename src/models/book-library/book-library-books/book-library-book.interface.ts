import { IBookLibrary } from '../book-library.interface';
import { Types } from 'mongoose';
import { IBook } from '../../book/book.interface';
import { IBaseModel } from '../../base-model.interface';
import { IUser } from '../../user/user.interface';

export interface IBookLibraryBook extends IBaseModel {
    bookLibrary: IBookLibrary | Types.ObjectId | string;
    book: IBook | Types.ObjectId | string;
    user: IUser | Types.ObjectId | string;
    status: 'READING' | 'TO_BE_READ' | 'READ' | 'DISCONTINUE' | 'NOT_READ'
}