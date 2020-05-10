import { BaseController } from '../../base/base.controller';
import { BookExcerptService } from './book-excerpt.service';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';

export class BookExcerptController extends BaseController {
    constructor(public bookExcerptService: BookExcerptService) {
        super(bookExcerptService.model);
    }

    get = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.bookExcerptService.get(req.params.id, req.query), res, next
        })
    );

    getMany = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.bookExcerptService.getMany(req.query), res, next
        })
    );

    create = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.bookExcerptService.baseCreate({
                ...req.body,
                user: req.user._id || req.user.id
            }),
            statusCode: 201, res, next
        })
    );

    update = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookExcerptService.baseUpdate(req.params.id, { content: req.body.content }),
            res, next
        });
    });

}
