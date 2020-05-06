import { IUser } from '../models/user/user.interface';

declare global {
    namespace Express {
        export interface Request {
            user: IUser
        }
    }
}