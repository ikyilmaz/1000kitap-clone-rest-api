import { BaseController } from '../../base/base.controller';
import { BaseBookService } from '../base-book.service';
import { IFavoriteBook } from '../../../models/m2m/book-user/favorite-book/favorite-book.interface';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';
import { FavoriteBook } from '../../../models/m2m/book-user/favorite-book/favorite-book.model';

export class FavoriteBookController extends BaseController {
    constructor(public baseBookService: BaseBookService<IFavoriteBook>) {
        super(baseBookService.model);
    }

    get = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.get(FavoriteBook, req.params.id, req.query), res, next
        })
    );

    getMany = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.getMany(FavoriteBook, req.query), res, next
        })
    );

    create = catchAsync(async (req, res, next) =>
        SendResponse({
            data: await this.baseBookService.baseCreate({
                book: req.body.book,
                user: req.user._id || req.user.id
            }),
            statusCode: 201, res, next
        })
    );

}