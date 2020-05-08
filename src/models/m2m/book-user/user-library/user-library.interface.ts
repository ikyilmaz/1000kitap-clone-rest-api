import { IBook } from '../../../book/book.interface';
import { Types } from 'mongoose';
import { IUser } from '../../../user/user.interface';
import { IBaseModel } from '../../../base-model.interface';

export interface IUserLibrary extends IBaseModel {
    book: IBook | Types.ObjectId | string;
    user: IUser | Types.ObjectId | string;
    status: 'READING' | 'TO_BE_READ' | 'READ' | 'DISCONTINUE' | 'NOT_READ'
}