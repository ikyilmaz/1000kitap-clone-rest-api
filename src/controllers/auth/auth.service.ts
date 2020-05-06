import { Document, Model } from 'mongoose';
import { IUser } from '../../models/user/user.interface';
import { User } from '../../models/user/user.model';

export class AuthService {
    public model = User

    update = (id: string, body: { [key: string]: any }) => {
        User.firs
        return this.model.findByIdAndUpdate(id, body, { new: true });
    };
}