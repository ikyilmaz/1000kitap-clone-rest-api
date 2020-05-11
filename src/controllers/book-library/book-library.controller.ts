import { BaseController } from '../base/base.controller';
import { BookLibraryService } from './book-library.service';

export class BookLibraryController extends BaseController {
    constructor(public bookLibraryService: BookLibraryService) {
        super(bookLibraryService.model);
    }
}