import { User } from '../../models/user/user.model';

export class AuthService {
    public model = User

    update = (id: string, body: { [key: string]: any }) => {
        return this.model.findByIdAndUpdate(id, body, { new: true });
    };
}