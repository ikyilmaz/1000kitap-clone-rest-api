import { IBookLibrary } from '../book-library.interface';
import { Types } from 'mongoose';
import { IBook } from '../../book/book.interface';
import { IBaseModel } from '../../base-model.interface';

export interface IBookLibraryBook extends IBaseModel{
    bookLibrary: IBookLibrary | Types.ObjectId | string;
    book: IBook | Types.ObjectId | string;
}