import { catchAsync } from '../../utils/catchAsync';
import { BaseController } from '../base.controller';
import { UserService } from './user.service';
import { Request } from 'express';
import { AppError, NotFound } from '../../utils/appError';
import { APIFeatures } from '../../utils/apiFeatures';

export class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super(userService.model);
    }

    get = catchAsync(async (req, res, next) => {
        const data = await this.userService.getOne(req.params.id);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    getMany = catchAsync(async (req, res, next) => {
        const data = await this.userService.getMany(req.query);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    create = catchAsync(async (req, res, next) => {
        const data = await this.userService.create(req.body);
        res.status(201).json({ status: 'success', data });
    });

    update = catchAsync(async (req, res, next) => {

    });
}