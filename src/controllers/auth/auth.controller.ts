import { BaseController } from '../base.controller';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catch-async';
import { filterObject } from '../../utils/filter-object';
import { BadRequest, Unauthorized } from '../../utils/app-error';
import moment from 'moment';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/config';
import { User } from '../../models/user/user.model';
import { IUser } from '../../models/user/user.interface';

export class AuthController extends BaseController {
    constructor(public authService: AuthService) {
        super(authService.model);
    }

    signUp = catchAsync(async (req, res, next) => {
        throw new Error('implement me');
    });

    signIn = catchAsync(async (req, res, next) => {
        if (!req.body.username || !req.body.email) return next(BadRequest('fields \'username\' or \'email\' must be specified'));
        throw new Error('implement me');
    });

    signOut = catchAsync(async (req, res, next) => {
        throw new Error('implement me');
    });

    user = catchAsync(async (req, res, next) => {
        res.status(200).json({ status: 'success', data: this.clearUser(req.user) });
    });

    isLoggedIn = catchAsync(async (req, res, next) => {
        let token;
        if (req.headers.authorization?.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
        else if (req.cookies.jwt) token = req.cookies.jwt;


        if (!token) return res.status(200).json({ status: 'success', data: null });

        const decoded = await promisify(jwt.verify)(token, JWT_SECRET) as { id: string; iat: string };

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) return res.status(200).json({ status: 'success', data: null });

        if (currentUser.changedPasswordAfter(decoded.iat)) return res.status(200).json({
            status: 'success',
            data: null
        });

        res.status(200).json({ status: 'success', data: this.clearUser(req.user) });
    });

    update = catchAsync(async (req, res, next) => {
        req.body = filterObject(req.body, 'firstName', 'lastName', 'username');
        super.update(req, res, next);
    });

    updateEmail = catchAsync(async (req, res, next) => {

        // Send Verification Email
        //...

        req.body = filterObject(req.body, 'email');
        super.update(req, res, next);
    });

    updatePassword = catchAsync(async (req, res, next) => {

        const { password, newPassword, newPasswordConfirm } = req.body;

        if (newPassword != newPasswordConfirm) return next(BadRequest('field \'newPassword\' and \'newPasswordConfirm\' doesn\'t match'));

        if (!(req.user.comparePasswords(req.user.password, password))) return next(Unauthorized('password is not correct'));

        const hashedPassword = await req.user.hashPassword(newPassword);

        await req.user.update({ password: hashedPassword, passwordChangedAt: moment() });

        req.user.password = undefined as unknown as string;

        res.status(200).json({ status: 'success', data: req.user });
    });

    clearUser(user: IUser) {
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.passwordChangedAt;
        delete userObject.passwordResetExpires;
        delete userObject.passwordResetToken;
        return userObject;
    }
}