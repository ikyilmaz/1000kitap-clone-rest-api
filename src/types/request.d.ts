import { IUser } from '../models/user/user.interface';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
            model: mongoose.Document
        }
    }
}
