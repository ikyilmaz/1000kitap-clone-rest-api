import { BaseController } from '../base/base.controller';
import { AuthorService } from './author.service';
import { catchAsync } from '../../utils/catch-async';
import { SendResponse } from '../../utils/send-response';

export class AuthorController extends BaseController {
    constructor(public authorService: AuthorService) {
        super(authorService.model);
    }

    getAuthorWithBooks = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.authorService.getWithBooks(req.params.id, req.query), res, next
        });
    });

    getAuthorWithFavoredUsers = catchAsync(async (req, res, next) => {
        SendResponse({
            data: this.authorService.getWithFavoredUsers(req.params.id, req.query), res, next
        });
    });
}