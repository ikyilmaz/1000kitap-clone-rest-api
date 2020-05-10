import { catchAsync } from '../../utils/catch-async';
import { BaseController } from '../base/base.controller';
import { UserService } from './user.service';
import { NotFound } from '../../utils/app-error';
import validator from 'validator';
import { IUser } from '../../models/user/user.interface';
import { DocumentQuery } from 'mongoose';

export class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super(userService.model);
    }

    create = catchAsync(async (req, res, next) => {
        const data = await this.userService.create(req.body);
        res.status(201).json({ status: 'success', data });
    });

    getMany = catchAsync(async (req, res, next) => {
        const data = await this.userService.getMany(req.query);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    deactivateOrActivate = (isActive: boolean) => catchAsync(async (req, res, next) => {
        const data = await this.userService.update(req.params.id, { isActive });
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });
    
    private getUserWith = (func: (conditions: Pick<any, any>, query: Pick<any, any>) => DocumentQuery<IUser | null, IUser, {}>) =>
        catchAsync(async (req, res, next) => {
            const conditions = this.getConditions(req.params.id);

            const data = await func(conditions, req.query);

            if (!data) return next(NotFound());
            res.status(200).json({ status: 'success', data });
        });

    get = this.getUserWith((conditions, query) =>
        this.userService.getOne(conditions, query)
    );

    getUserWithProfile = this.getUserWith((conditions, query) =>
        this.userService.getOneWithProfile(conditions, query)
    );

    getUserWithReviews = this.getUserWith((conditions, query) =>
        this.userService.getOneWithReviews(conditions, query)
    );

    getUserWithExcerpts = this.getUserWith((conditions, query) =>
        this.userService.getOneWithExcerpts(conditions, query)
    );

    getUserWithFavoriteAuthors = this.getUserWith((conditions, query) =>
        this.userService.getOneWithFavoriteAuthors(conditions, query)
    );

    getUserWithFavoriteBooks = this.getUserWith((conditions, query) =>
        this.userService.getOneWithFavoriteBooks(conditions, query)
    );

    getUserWithFollowers = this.getUserWith((conditions, query) =>
        this.userService.getOneWithFollowers(conditions, query)
    );

    getUserWithFollows = this.getUserWith((conditions, query) =>
        this.userService.getOneWithFollows(conditions, query)
    );

    getUserWithRatedBooks = this.getUserWith((conditions, query) =>
        this.userService.getOneWithRatedBooks(conditions, query)
    );

    private getConditions = (id: string) => {
        let conditions: Partial<Pick<{ id: string; username: string }, any>> = {};

        if (validator.isMongoId(id)) conditions.id = id;
        else conditions.username = id;

        return conditions;
    };
}