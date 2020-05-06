import { catchAsync } from '../../utils/catchAsync';
import { BaseController } from '../base.controller';
import { UserService } from './user.service';
import { Request } from 'express';
import { AppError } from '../../utils/appError';

export class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super(userService.model);
    }

    get = catchAsync(async (req, res, next) => {
        const data = await this.userService.getOne(req.params.id);
        if (!data) return next(new AppError('not found', 404));
        res.status(200).json({ status: 'success', data });
    });

    getMany = catchAsync(async (req, res, next) => {
        const data = await this.userService.getMany(req.query);
        if (!data) return next(new AppError('not found', 404));
        res.status(200).json({ status: 'success', data });
    });

    create = catchAsync(async (req, res, next) => {

    });

    update = catchAsync(async (req, res, next) => {

    });
}