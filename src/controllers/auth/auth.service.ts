import { User } from '../../models/user/user.model';
import { IUser } from '../../models/user/user.interface';

export class AuthService {
    public model = User;

    create = (user: any) => {
        return this.model.create({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password
        });
    };

    update = (id: string, body: { [key: string]: any }) => {
        return this.model.findByIdAndUpdate(id, body, { new: true });
    };
}