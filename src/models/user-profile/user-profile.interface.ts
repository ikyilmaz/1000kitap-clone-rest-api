import { IUser } from '../user/user.interface';
import { Types } from 'mongoose';
import { IBaseModel } from '../base-model.interface';

export interface IUserProfile extends IBaseModel {
    user: IUser | Types.ObjectId | string;
    biography: string;
    placeOfBirth: string;
    birthday: string;
    livesIn: string;
    gender: 'M' /*MALE*/ | 'F' /*FEMALE*/ | 'UNKNOWN';
    profession: string;
}