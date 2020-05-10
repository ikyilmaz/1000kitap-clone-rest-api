import { BaseController } from '../../base/base.controller';
import { BaseBookService } from '../base-book.service';
import { IBookReview } from '../../../models/m2m/book-user/book-review/book-review.interface';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';
import { BookReview } from '../../../models/m2m/book-user/book-review/book-review.model';
import { filterObject } from '../../../utils/filter-object';
import { BadRequest } from '../../../utils/app-error';

export class BookReviewController extends BaseController {
    constructor(public baseBookService: BaseBookService<IBookReview>) {
        super(baseBookService.model);
    }

    get = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.get(BookReview, req.params.id, req.query), res, next
        })
    );

    getMany = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.getMany(BookReview, req.query), res, next
        })
    );

    create = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.baseCreate({
                ...req.body,
                user: req.user._id || req.user.id
            }),
            statusCode: 201, res, next
        })
    );

    update = catchAsync(async (req, res, next) => {
        const data = filterObject(req.body, 'content');
        if (!data) return next(BadRequest());

        SendResponse({
            data: await this.baseBookService.baseUpdate(req.params.id, data),
            res, next
        });
    });
}