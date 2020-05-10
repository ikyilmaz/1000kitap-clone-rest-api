import { BaseController } from '../../base/base.controller';
import { BaseBookService } from '../base-book.service';
import { IBookFollow } from '../../../models/m2m/book-user/book-follow/book-follow.interface';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';
import { BookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { filterObject } from '../../../utils/filter-object';
import { BadRequest } from '../../../utils/app-error';
import { BookFollow } from '../../../models/m2m/book-user/book-follow/book-follow.model';

export class BookFollowController extends BaseController {
    constructor(public baseBookService: BaseBookService<IBookFollow>) {
        super(baseBookService.model);
    }

    get = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.get(BookFollow, req.params.id, req.query), res, next
        })
    );

    getMany = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.getMany(BookFollow, req.query), res, next
        })
    );

    create = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.baseCreate({
                book: req.body.book,
                user: req.user._id || req.user.id
            }),
            statusCode: 201, res, next
        })
    );
}