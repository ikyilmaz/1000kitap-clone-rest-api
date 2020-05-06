import { BaseController } from '../base.controller';
import { AuthService } from './auth.service';
import { catchAsync } from '../../utils/catch-async';
import { filterObject } from '../../utils/filter-object';
import { BadRequest, Unauthorized } from '../../utils/app-error';
import moment from 'moment';
import { checkValidationResult } from '../../utils/check-validation-result';

export class AuthController extends BaseController {
    constructor(public authService: AuthService) {
        super(authService.model);
    }

    signUp = catchAsync(async (req, res, next) => {
        if (checkValidationResult(req, next)) return;
        throw Error("implement me")
    });

    signIn = catchAsync(async (req, res, next) => {
        if (checkValidationResult(req, next)) return;
        throw Error("implement me")
    });

    signOut = catchAsync(async (req, res, next) => {
        throw Error("implement me")
    });

    me = catchAsync(async (req, res, next) => {
        throw Error("implement me")
    });

    isLoggedIn = catchAsync(async (req, res, next) => {
        throw Error("implement me")
    });

    updateMe = catchAsync(async (req, res, next) => {
        if (checkValidationResult(req, next)) return;

        req.body = filterObject(req.body, 'firstName', 'lastName', 'username');
        super.update(req, res, next);
    });

    updateEmail = catchAsync(async (req, res, next) => {
        if (checkValidationResult(req, next)) return;

        // Send Verification Email
        //...

        req.body = filterObject(req.body, 'email');
        super.update(req, res, next);
    });

    updatePassword = catchAsync(async (req, res, next) => {
        if (checkValidationResult(req, next)) return;

        const { password, newPassword, newPasswordConfirm } = req.body;

        if (newPassword != newPasswordConfirm) return next(BadRequest('field \'newPassword\' and \'newPasswordConfirm\' doesn\'t match'));

        if (!(req.user.comparePasswords(req.user.password, password))) return next(Unauthorized('password is not correct'));

        const hashedPassword = await req.user.hashPassword(newPassword);

        await req.user.update({ password: hashedPassword, passwordChangedAt: moment() });

        req.user.password = undefined as unknown as string;

        res.status(200).json({ status: 'success', data: req.user });
    });


}