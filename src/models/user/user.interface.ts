import { IBaseModel } from '../base-model.interface';
import { UserRoles } from './user.enums';
import { UserVirtuals } from './user.enums';
import { IUserProfile } from '../user-profile/user-profile.interface';
import { Types } from 'mongoose';

export interface IUser extends IBaseModel {
    firstName: string;
    lastName: string;
    isActive: boolean;
    username: string;
    email: string;
    photo: string;
    role: UserRoles;
    password: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;

    // Virtual Fields
    profile?: IUserProfile | Types.ObjectId | string;

    hashPassword(password: string): Promise<string>

    comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean>

    changedPasswordAfter(JWTTimestamp: string): boolean
}