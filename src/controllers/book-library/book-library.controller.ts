import { BaseController } from '../base/base.controller';
import { BookLibraryService } from './book-library.service';
import { catchAsync } from '../../utils/catch-async';

export class BookLibraryController extends BaseController {
    constructor(public bookLibraryService: BookLibraryService) {
        super(bookLibraryService.model);
    }

    create = catchAsync(async (req, res, next) => {

    })
}