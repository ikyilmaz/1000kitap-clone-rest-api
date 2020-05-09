import { IUser } from '../../../user/user.interface';
import { Types } from 'mongoose';
import { IBook } from '../../../book/book.interface';
import { IBaseModel } from '../../../base-model.interface';

export interface IFavoriteBook extends IBaseModel {
    user: IUser | Types.ObjectId | string;
    book: IBook | Types.ObjectId | string;
}