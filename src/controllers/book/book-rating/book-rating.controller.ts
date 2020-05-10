import { BaseController } from '../../base/base.controller';
import { BaseBookService } from '../base-book.service';
import { IBookRating } from '../../../models/m2m/book-user/book-rating/book-rating.interface';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';
import { BookReview } from '../../../models/m2m/book-user/book-review/book-review.model';
import { filterObject } from '../../../utils/filter-object';
import { BadRequest } from '../../../utils/app-error';
import { BookRating } from '../../../models/m2m/book-user/book-rating/book-rating.model';

export class BookRatingController extends BaseController {
    constructor(public baseBookService: BaseBookService<IBookRating>) {
        super(baseBookService.model);
    }

    get = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.get(BookRating, req.params.id, req.query), res, next
        })
    );

    getMany = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.getMany(BookRating, req.query), res, next
        })
    );

    create = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.baseCreate({
                book: req.body.book,
                rating: req.body.rating,
                user: req.user._id || req.user.id
            }),
            statusCode: 201, res, next
        })
    );

    update = catchAsync(async (req, res, next) => {
        const data = filterObject(req.body, 'rating');
        if (!data) return next(BadRequest());

        SendResponse({
            data: await this.baseBookService.baseUpdate(req.params.id, data),
            res, next
        });
    });

}