import { catchAsync } from '../utils/catch-async';
import { promisify } from 'util';
import { Unauthorized } from '../utils/app-error';
import jwt from 'jsonwebtoken'
import { User } from '../models/user/user.model';
import { JWT_SECRET } from '../config/config';

export const authRequired = catchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) return next(Unauthorized());


    const decoded = await promisify(jwt.verify)(token, JWT_SECRET) as {id: string; iat: string}

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return next(Unauthorized('the user belonging to this token does no longer exist'));


    if (currentUser.changedPasswordAfter(decoded.iat)) return next(Unauthorized('user recently changed password, please log in again'));

    req.user = currentUser;
    next();
});