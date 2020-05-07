import { BaseController } from '../base.controller';
import { BookService } from './book.service';
import { catchAsync } from '../../utils/catch-async';
import { NotFound } from '../../utils/app-error';
import * as mongoose from 'mongoose';

export class BookController extends BaseController {
    constructor(public bookService: BookService) {
        super(bookService.model);
    }

    getMany = catchAsync(async (req, res, next) => {
        const data = await this.bookService.getMany(req.query as any);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });


    get = catchAsync(async (req, res, next) => {
        const data = await this.bookService.get(req.params.id, req.query as any);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    getWithReviews = catchAsync(async (req, res, next) => {
        const data = await this.bookService.getWithReviews(req.params.id, req.query as any);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    getWithExcerpts = catchAsync(async (req, res, next) => {
        const data = await this.bookService.getWithExcerpts(req.params.id, req.query as any);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });
}