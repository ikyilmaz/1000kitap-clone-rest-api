import { Router } from 'express';
import { BaseBookService } from '../controllers/book/base-book.service';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { authRequired } from '../filters/auth-required.filter';
import { isOwner } from '../filters/is-owner.filter';
import { BookReviewController } from '../controllers/book/book-review/book-review.controller';
import { BookReview } from '../models/m2m/book-user/book-review/book-review.model';
import { bookReviewValidator } from '../validators/body/book-review.validator';

const router = Router();
const bookReview = new BookReviewController(new BaseBookService(BookReview));

router
    .route(
        '/'
    )
    .get(
        bookReview.getMany
    )
    .post(
        bookReviewValidator.createOrUpdate(true), checkValidationResult,
        authRequired,
        bookReview.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookReview.get
    )
    .patch(
        checkIdParam, bookReviewValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookReview),
        bookReview.update
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookReview),
        bookReview.baseDelete
    );

export { router as bookExcerptRouter };