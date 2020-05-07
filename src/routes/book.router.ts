import { Router } from 'express';
import { BookController } from '../controllers/book/book.controller';
import { BookService } from '../controllers/book/book.service';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { authRequired } from '../filters/auth-required.filter';
import { restrictTo } from '../filters/restrict-to.filter';
import { bookValidator } from '../validators/body/book.validator';

const router = Router();
const bookController = new BookController(new BookService());

router
    .route(
        '/'
    )
    .get(
        bookController.getMany
    )
    .post(
        bookValidator.createOrUpdate(true), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        bookController.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookController.get
    )
    .patch(
        checkIdParam, bookValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        bookController.update
    )

    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        bookController.delete
    );

router
    .route(
        '/:id/reviews' // BookID
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookController.getWithReviews
    );

router
    .route(
        '/:id/excerpts'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookController.getWithExcerpts
    );

export const bookRouter = router;