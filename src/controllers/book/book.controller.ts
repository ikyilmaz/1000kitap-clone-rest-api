import { BaseController } from '../base/base.controller';
import { BookService } from './book.service';
import { catchAsync } from '../../utils/catch-async';
import { SendResponse } from '../../utils/send-response';

export class BookController extends BaseController {
    constructor(public bookService: BookService) {
        super(bookService.model);
    }

    getMany = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getMany(req.query as any), res, next
        });
    });


    get = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.get(req.params.id, req.query as any), res, next
        });
    });

    getWithReviews = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getWithReviews(req.params.id, req.query as any), res, next
        });
    });

    getWithExcerpts = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getWithExcerpts(req.params.id, req.query as any), res, next
        });
    });
}