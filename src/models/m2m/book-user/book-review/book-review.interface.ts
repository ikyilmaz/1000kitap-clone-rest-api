import { Types } from 'mongoose';
import { IBook } from '../../../book/book.interface';
import { IUser } from '../../../user/user.interface';
import { IBaseModel } from '../../../base-model.interface';

export interface IBookReview extends IBaseModel {
    book: IBook | Types.ObjectId | string;
    user: IUser | Types.ObjectId | string;
    content: string;
}