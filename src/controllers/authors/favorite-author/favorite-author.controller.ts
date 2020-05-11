import { BaseController } from '../../base/base.controller';
import { FavoriteAuthorService } from './favorite-author.service';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';

export class FavoriteAuthorController extends BaseController {
    constructor(public favoriteAuthorService: FavoriteAuthorService) {
        super(favoriteAuthorService.model);
    }

    create = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.favoriteAuthorService.baseCreate({ user: req.user._id, author: req.body.author }),
            res,
            next
        });
    });

    get = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.favoriteAuthorService.get(req.params.id, req.query), res, next });
    });

    getMany = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.favoriteAuthorService.getMany(req.query), res, next });
    });
}