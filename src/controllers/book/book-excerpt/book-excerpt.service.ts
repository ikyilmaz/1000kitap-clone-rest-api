import { BaseService } from '../../base/base.service';
import { IBookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.interface';
import { Model } from 'mongoose';

export class BookExcerptService extends BaseService<IBookExcerpt> {
    constructor(public model: Model<IBookExcerpt>) {
        super(model);
    }
}