import { Router } from 'express';
import { BaseBookService } from '../../controllers/book/base-book.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { isOwner } from '../../filters/is-owner.filter';
import { BookRatingController } from '../../controllers/book/book-rating/book-rating.controller';
import { BookRating } from '../../models/m2m/book-user/book-rating/book-rating.model';
import { bookRatingValidator } from '../../validators/body/book/book-rating.validator';

const router = Router();
const bookRating = new BookRatingController(new BaseBookService(BookRating));

router
    .route(
        '/'
    )
    .get(
        bookRating.getMany
    )
    .post(
        bookRatingValidator.createOrUpdate(true), checkValidationResult,
        authRequired,
        bookRating.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookRating.get
    )
    .patch(
        checkIdParam, bookRatingValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookRating),
        bookRating.update
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookRating),
        bookRating.baseDelete
    );

export { router as bookRatingRouter };