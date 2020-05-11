import { Router } from 'express';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';

const router = Router();
router
    .route(
        "/"
    )
    .get(

    )
    .post(

    )

router
    .route(
        "/:id"
    )
    .get(
        checkIdParam, checkValidationResult
    )
    .patch(
        checkIdParam, checkValidationResult
    )
    .delete(
        checkIdParam, checkValidationResult
    )

export { router as bookLibraryRouter };