import { Router } from 'express';
import { CategoryController } from '../controllers/category/category.controller';
import { CategoryService } from '../controllers/category/category.service';
import { checkIdParam } from '../validators/param/id.validator';
import { categoryValidator } from '../validators/body/category.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { authRequired } from '../filters/auth-required.filter';
import { restrictTo } from '../filters/restrict-to.filter';

const router = Router();
const categoryController = new CategoryController(new CategoryService());

router
    .route(
        '/'
    )
    .get(
        categoryController.baseGetMany
    )
    .post(
        categoryValidator.createOrUpdate(true), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        categoryController.baseCreate
    );

router
    .get(
        '/:name',
        categoryController.baseGet
    );

router
    .route(
        '/:id'
    )

    .patch(
        checkIdParam, categoryValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        categoryController.baseUpdate
    )

    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        categoryController.baseDelete
    );

export { router as categoryRouter };