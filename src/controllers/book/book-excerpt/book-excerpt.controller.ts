import { BaseController } from '../../base/base.controller';
import { BaseBookService } from '../base-book.service';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';
import { IBookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.interface';
import { BookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { filterObject } from '../../../utils/filter-object';
import { BadRequest } from '../../../utils/app-error';

export class BookExcerptController extends BaseController {
    constructor(public baseBookService: BaseBookService<IBookExcerpt>) {
        super(baseBookService.model);
    }

    get = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.get(BookExcerpt, req.params.id, req.query), res, next
        })
    );

    getMany = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.getMany(BookExcerpt, req.query), res, next
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

        const data = filterObject(req.body, 'content', 'postedBy');
        if (!data) return next(BadRequest());

        SendResponse({
            data: await this.baseBookService.baseUpdate(req.params.id, data),
            res, next
        });
    });

}
