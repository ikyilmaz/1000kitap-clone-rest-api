import { Book } from '../../models/book/book.model';
import { APIFeatures } from '../../utils/api-features';

export class BookService {
    public model = Book;

    getMany = (query: { [key: string]: any }) => {
        const documentQuery = this.model.find()
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'author', select: 'firstName lastName' });
        return new APIFeatures(documentQuery, query).filter().sort().limitFields().paginate().query;
    };

    get = (id: string, query: { [key: string]: any }) => {
        const documentQuery = this.model.findById(id)
            .populate({ path: 'category', select: 'name' })
            .populate({ path: 'author' });
        return new APIFeatures(documentQuery, query).limitFields().query;
    };
}