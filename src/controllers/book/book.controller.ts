import { BaseController } from '../base.controller';
import { BookService } from './book.service';
import { catchAsync } from '../../utils/catch-async';
import { NotFound } from '../../utils/app-error';

export class BookController extends BaseController {
    constructor(public bookService: BookService) {
        super(bookService.model);
    }

    getMany = catchAsync(async (req, res, next) => {
        const data = await this.bookService.getMany(req.query);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });


    get = catchAsync(async (req, res, next) => {
        const data = await this.bookService.get(req.params.id, req.query);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });
}