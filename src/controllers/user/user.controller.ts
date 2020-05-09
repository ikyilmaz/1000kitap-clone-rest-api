import { catchAsync } from '../../utils/catch-async';
import { BaseController } from '../base.controller';
import { UserService } from './user.service';
import { NotFound } from '../../utils/app-error';
import validator from 'validator';

export class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super(userService.model);
    }

    create = catchAsync(async (req, res, next) => {
        const data = await this.userService.create(req.body);
        res.status(201).json({ status: 'success', data });
    });

    get = catchAsync(async (req, res, next) => {
        const conditions = this.getConditions(req.params.id);

        const data = await this.userService.getOne(conditions, req.query as any);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    getMany = catchAsync(async (req, res, next) => {
        const data = await this.userService.getMany(req.query);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    getOneUsersProfile = catchAsync(async (req, res, next) => {
        const conditions = this.getConditions(req.params.id);

        const data = await this.userService.getOneWithProfile(conditions, req.query as any)

        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });

    });

    private getConditions = (id: string) => {
        let conditions: Partial<Pick<{ id: string; username: string }, any>> = {};

        if (validator.isMongoId(id)) conditions.id = id;
        else conditions.username = id;

        return conditions;
    };
}