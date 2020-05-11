import { BaseService } from '../base/base.service';
import { IBookLibrary } from '../../models/book-library/book-library.interface';
import { Model } from 'mongoose';

export class BookLibraryService extends BaseService<IBookLibrary> {
    constructor(public model: Model<IBookLibrary>) {
        super(model);
    }
}