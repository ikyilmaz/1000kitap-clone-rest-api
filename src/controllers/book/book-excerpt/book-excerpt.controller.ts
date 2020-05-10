import { BaseController } from '../../base/base.controller';
import { BookExcerptService } from './book-excerpt.service';
import { catchAsync } from '../../../utils/catch-async';
import { NotFound } from '../../../utils/app-error';

export class BookExcerptController extends BaseController {
    constructor(public bookExcerptService: BookExcerptService) {
        super(bookExcerptService.model);
    }

    get = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const data = await this.bookExcerptService.get({ id });
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });

    create = catchAsync(async (req, res, next) => {
        const data = await this.bookExcerptService.create({
            ...req.body,
            user: req.user._id || req.user.id
        });

        res.status(201).json({ status: 'success', data });
    });

    update = catchAsync(async (req, res, next) => {
        const data = await this.bookExcerptService.update(req.params.id, { content: req.body.content });

        res.status(200).json({ status: 'success', data });
    });
}
