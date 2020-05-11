import { BaseController } from '../base/base.controller';
import { BookLibraryService } from './book-library.service';
import { catchAsync } from '../../utils/catch-async';
import { SendResponse } from '../../utils/send-response';
import { filterObject } from '../../utils/filter-object';

export class BookLibraryController extends BaseController {
    constructor(public bookLibraryService: BookLibraryService) {
        super(bookLibraryService.model);
    }

    get = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookLibraryService.get(req.params.id, req.query), res, next
        });
    });

    getMany = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookLibraryService.getMany(req.query), res, next
        });
    });

    create = catchAsync(async (req, res, next) => {
        req.body = filterObject(req.body, 'name', 'privacy', 'description');
        SendResponse({
            data: await this.bookLibraryService.baseCreate({
                ...req.body,
                user: req.user._id || req.user.id
            }), res, next
        });
    });
}