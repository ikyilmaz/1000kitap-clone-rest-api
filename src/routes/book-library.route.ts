import { Router } from 'express';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { bookLibraryValidator } from '../validators/body/book-library.validator';

const router = Router();
router
    .route(
        '/'
    )
    .get(

    )
    .post(
        bookLibraryValidator.createOrUpdate(true), checkValidationResult
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult
    )
    .patch(
        checkIdParam, bookLibraryValidator.createOrUpdate(false), checkValidationResult
    )
    .delete(
        checkIdParam, checkValidationResult
    );

export { router as bookLibraryRouter };