import { Router } from 'express';
import { CategoryController } from '../controllers/category/category.controller';
import { CategoryService } from '../controllers/category/category.service';
import { checkIdParam } from '../validators/param/id.validator';
import { categoryValidator } from '../validators/body/category.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';

const router = Router();
const categoryController = new CategoryController(new CategoryService());

router
    .route(
        '/'
    )
    .get(
        categoryController.getMany
    )
    .post(
        categoryValidator.createOrUpdate(true),
        checkValidationResult,
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
        categoryValidator.createOrUpdate(false),
        checkValidationResult,
        categoryController.update
    )
    .delete(
        checkIdParam,
        categoryController.delete
    );

export const categoryRouter = router;