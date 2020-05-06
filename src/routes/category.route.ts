import { Router } from 'express';
import { CategoryController } from '../controllers/category/category.controller';
import { CategoryService } from '../controllers/category/category.service';
import { Category } from '../models/category/category.model';
import { checkIdParam } from '../validators/param/id.validator';
import { checkCreateOrUpdateCategoryBody } from '../validators/body/category/create-update-category.validator';

const router = Router();
const categoryController = new CategoryController(new CategoryService(Category));

router
    .route(
        '/'
    )
    .get(
        categoryController.getMany
    )
    .post(
        checkCreateOrUpdateCategoryBody(true),
        categoryController.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam,
        categoryController.get
    )
    .patch(
        checkIdParam,
        checkCreateOrUpdateCategoryBody(false),
        categoryController.update
    )
    .delete(
        checkIdParam,
        categoryController.delete
    );

export const categoryRouter = router;