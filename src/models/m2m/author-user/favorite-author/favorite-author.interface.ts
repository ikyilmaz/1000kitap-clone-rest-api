import { IUser } from '../../../user/user.interface';
import { Types } from "mongoose";
import { IAuthor } from '../../../author/author.interface';
import { IBaseModel } from '../../../base-model.interface';

export interface IFavoriteAuthor extends IBaseModel{
    user: IUser | Types.ObjectId | string;
    author: IAuthor | Types.ObjectId | string;
}