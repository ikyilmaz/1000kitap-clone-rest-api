import { User } from '../../models/user/user.model';
import { UserProfile } from '../../models/user-profile/user-profile.model';

export class AuthService {
    public model = User;

    get = (conditions: { [key: string]: any }) => {
        return this.model.findOne(conditions).select('+password');
    };

    create = async (user: any) => {
        const createdUser = await this.model.create({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            password: user.password
        });

        createdUser.profile = await UserProfile.create({ user: createdUser._id || createdUser.id });

        return createdUser;
    };

    update = (id: string, body: { [key: string]: any }) => {
        return this.model.findByIdAndUpdate(id, body, { new: true });
    };
}