import { IBaseModel } from '../../../base-model.interface';
import { IBook } from '../../../book/book.interface';
import { Types } from 'mongoose';
import { IUser } from '../../../user/user.interface';

export interface IBookExcerpt extends IBaseModel {
    book: IBook | Types.ObjectId;
    user: IUser | Types.ObjectId;
    content: string;
}