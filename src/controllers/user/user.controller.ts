import { catchAsync } from '../../utils/catch-async';
import { BaseController } from '../base.controller';
import { UserService } from './user.service';
import { NotFound } from '../../utils/app-error';

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
}