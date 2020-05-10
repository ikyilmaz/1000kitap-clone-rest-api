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
            data: await this.bookService.getMany(req.query), res, next
        });
    });


    get = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.get(req.params.id, req.query), res, next
        });
    });

    getBookWithReviews = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getOneWithReviews(req.params.id, req.query), res, next
        });
    });

    getBookWithExcerpts = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getOneWithExcerpts(req.params.id, req.query), res, next
        });
    });

    getBookWithFollowers = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getOneWithFollowers(req.params.id, req.query), res, next
        });
    });

    getBookWithRates = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getOneWithRates(req.params.id, req.query), res, next
        });
    });

    getBookWithLibraries = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getOneWithLibraries(req.params.id, req.query), res, next
        });
    });

    getBookWithFavorites = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookService.getOneWithFavorites(req.params.id, req.query), res, next
        });
    });
}