import { BaseController } from '../base.controller';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catch-async';
import { filterObject } from '../../utils/filter-object';
import { BadRequest, Unauthorized } from '../../utils/app-error';
import moment from 'moment';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { JWT_COOKIE_EXPIRES_IN, JWT_EXPIRES_IN, JWT_SECRET } from '../../config/config';
import { User } from '../../models/user/user.model';
import { IUser } from '../../models/user/user.interface';
import { NextFunction, raw, Request, Response } from 'express';
import { UserVirtuals } from '../../models/user/user.enums';
import { limitFields } from '../../utils/api-features-funcs';

export class AuthController extends BaseController {
    constructor(public authService: AuthService) {
        super(authService.model);
    }

    signUp = catchAsync(async (req, res, next) => {
        const user = await this.authService.create(req.body);
        // Send Welcome Email
        //...
        this.createAndSendToken(user, 201, req, res);
    });

    signIn = catchAsync(async (req, res, next) => {
        const { username, email, password } = req.body;
        console.log(req.body);
        if (!username && !email) return next(BadRequest('fields \'username\' or \'email\' must be specified'));

        const conditions: Partial<{ username?: string; email?: string; }> = {};

        if (email) conditions.email = email;
        else conditions.username = username;

        const user = await this.authService.get(conditions);

        if (!user || !(await user.comparePasswords(password, user.password)))
            return next(Unauthorized('incorrect credentials'));

        this.createAndSendToken(user, 200, req, res);
    });

    signOut = catchAsync(async (req, res, next) => {
        res.cookie('jwt', 'signed-out', { expires: moment().add(10, 'seconds').toDate(), httpOnly: true });
        res.status(200).json({ status: 'success' });
    });

    user = catchAsync(async (req, res, next) => {
        res.status(200).json({ status: 'success', data: this.clearUser(req.user) });
    });

    profile = catchAsync(async (req, res, next) => {
        const data = await req.user.populate({
            path: UserVirtuals.PROFILE,
            justOne: true,
            select: limitFields(req.query['profileFields'] as string, ['-__v'])
        }).execPopulate();

        res.status(200).json({ status: 'success', data });
    });

    isLoggedIn = catchAsync(async (req, res, next) => {
        let token;
        if (req.headers.authorization?.startsWith('Bearer')) token = req.headers.authorization.split(' ')[1];
        else if (req.cookies?.jwt) token = req.cookies.jwt;


        if (!token) return res.status(200).json({ status: 'success', data: null });

        const decoded = await promisify(jwt.verify)(token, JWT_SECRET) as { id: string; iat: string };

        const currentUser = await User.findById(decoded.id);

        if (!currentUser) return res.status(200).json({ status: 'success', data: null });

        if (currentUser.changedPasswordAfter(decoded.iat)) return res.status(200).json({
            status: 'success',
            data: null
        });

        res.status(200).json({ status: 'success', data: this.clearUser(currentUser) });
    });

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        req.body = filterObject(req.body, 'firstName', 'lastName', 'username');

        const data = await this.authService.update(req.user._id, req.body);

        res.status(200).json({ status: 'success', data });

    });

    updateEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // Send Verification Email
        //...

        req.body = filterObject(req.body, 'email');

        const data = await this.authService.update(req.user._id, req.body);

        res.status(200).json({ status: 'success', data });

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

    private clearUser = (user: IUser) => {
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.passwordChangedAt;
        delete userObject.passwordResetExpires;
        delete userObject.passwordResetToken;
        return userObject;
    };

    private createAndSendToken = (user: IUser, statusCode: number, req: Request, res: Response) => {

        let token: string;
        token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        res.cookie('jwt', token, {
            expires: new Date(
                Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        });

        user.password = undefined as any;

        res.status(statusCode).json({
            status: 'success',
            token,
            data: user
        });
    };
}