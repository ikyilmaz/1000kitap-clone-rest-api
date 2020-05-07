import { Category } from '../../models/category/category.model';

export class CategoryService {
    public model = Category;

    getByName = (name: string) => this.model.findOne({ name });

}