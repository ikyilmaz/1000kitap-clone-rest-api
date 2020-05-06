import { IBaseModel } from '../base-model.interface';

export interface IUser extends IBaseModel {
    firstName: string;
    lastName: string;
    isActive: boolean;
    username: string;
    email: string;
    photo: string,
    role: Roles,
    password: string;
    passwordChangedAt: Date,
    passwordResetToken: string,
    passwordResetExpires: Date
}