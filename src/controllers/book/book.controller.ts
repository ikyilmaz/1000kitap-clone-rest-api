import { BaseController } from '../base.controller';
import { BookService } from './book.service';

export class BookController extends BaseController {
    constructor(public bookService: BookService) {
        super(bookService.model);
    }
}