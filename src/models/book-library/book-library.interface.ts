import { IUser } from '../user/user.interface';
import { Types } from 'mongoose';
import { IBaseModel } from '../base-model.interface';

export interface IBookLibrary extends IBaseModel {
    name: string;
    user: IUser | Types.ObjectId | string;
}