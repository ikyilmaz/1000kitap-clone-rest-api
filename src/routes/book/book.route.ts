import { Router } from 'express';
import { BookController } from '../../controllers/book/book.controller';
import { BookService } from '../../controllers/book/book.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { restrictTo } from '../../filters/restrict-to.filter';
import { bookValidator } from '../../validators/body/book/book.validator';

const router = Router();
const book = new BookController(new BookService());

router
    .route(
        '/'
    )
    .get(
        book.getMany
    )
    .post(
        bookValidator.createOrUpdate(true), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        book.baseCreate
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        book.get
    )
    .patch(
        checkIdParam, bookValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        book.baseUpdate
    )

    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        book.baseDelete
    );

router
    .get(
        '/:id/excerpts',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithExcerpts
    )
    .get(
        '/:id/reviews',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithReviews
    )
    .get(
        '/:id/favorites',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithFavorites
    )
    .get(
        '/:id/followers',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithFollowers
    )
    .get(
        '/:id/libraries',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithLibraries
    )
    .get(
        '/:id/rates',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithRates
    );

export { router as bookRouter };