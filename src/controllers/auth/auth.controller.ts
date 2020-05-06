import { BaseController } from '../base.controller';
import { Document, Model } from 'mongoose';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import { filterObject } from '../../utils/filterObject';
import { BadRequest, Unauthorized } from '../../utils/appError';
import { User } from '../../models/user/user.model';
import moment from 'moment';

export class AuthController extends BaseController {
    constructor(public authService: AuthService) {
        super(authService.model);
    }

    signUp = catchAsync(async (req, res, next) => {

    });

    signIn = catchAsync(async (req, res, next) => {

    });

    signOut = catchAsync(async (req, res, next) => {

    });

    me = catchAsync(async (req, res, next) => {


    });

    isLoggedIn = catchAsync(async (req, res, next) => {


    });

    updateMe = catchAsync(async (req, res, next) => {
        req.body = filterObject(req.body, 'firstName', 'lastName', 'username');
        super.update(req, res, next);
    });

    updateEmail = catchAsync(async (req, res, next) => {
        // Send Verification Email
        req.body = filterObject(req.body, 'email');
        super.update(req, res, next);
    });

    updatePassword = catchAsync(async (req, res, next) => {
        // const errors = validationResult(req)
        //
        // if (!errors.isEmpty()) return res.status(400).json({
        //     status: "fail",
        //     message: errors.mapped()
        // })

        const { password, newPassword, newPasswordConfirm } = req.body;

        if (newPassword != newPasswordConfirm) return next(BadRequest('field \'newPassword\' and \'newPasswordConfirm\' doesn\'t match'));

        if (!(req.user.comparePasswords(req.user.password, password))) return next(Unauthorized('password is not correct'));

        const hashedPassword = await req.user.hashPassword(newPassword);

        await req.user.update({ password: hashedPassword, passwordChangedAt: moment() });

        req.user.password = undefined as unknown as string;

        res.status(200).json({ status: 'success', data: req.user });
    });


}