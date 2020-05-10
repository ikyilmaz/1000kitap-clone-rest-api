import { IUser } from '../../../user/user.interface';
import { Types } from 'mongoose';
import { IBaseModel } from '../../../base-model.interface';

export interface IUserFollow extends IBaseModel{
    followingBy: IUser | Types.ObjectId | string;
    following: IUser | Types.ObjectId | string;
}