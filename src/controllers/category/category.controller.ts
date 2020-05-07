import { BaseController } from '../base.controller';
import { CategoryService } from './category.service';
import { catchAsync } from '../../utils/catch-async';
import { NotFound } from '../../utils/app-error';

export class CategoryController extends BaseController {
    constructor(public categoryService: CategoryService) {
        super(categoryService.model);
    }

    get = catchAsync(async (req, res, next) => {
        const data = await this.categoryService.getByName(req.params.name);
        if (!data) return next(NotFound());
        res.status(200).json({ status: 'success', data });
    });
}