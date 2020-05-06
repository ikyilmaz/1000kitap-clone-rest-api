import { Router } from 'express';
import { CategoryController } from '../controllers/category/category.controller';
import { CategoryService } from '../controllers/category/category.service';
import { Category } from '../models/category/category.model';

const router = Router();
const categoryController = new CategoryController(new CategoryService(Category));

router
    .route('/')
    .get(categoryController.getMany)
    .post(categoryController.create);

router
    .route('/:id')
    .get(categoryController.get)
    .patch(categoryController.update)
    .delete(categoryController.delete);

export const categoryRouter = router;