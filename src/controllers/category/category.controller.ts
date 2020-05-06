import { BaseController } from '../base.controller';
import { CategoryService } from './category.service';

export class CategoryController extends BaseController {
    constructor(public categoryService: CategoryService) {
        super(categoryService.model);
    }
}