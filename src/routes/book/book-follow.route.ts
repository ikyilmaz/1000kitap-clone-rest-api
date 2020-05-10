import { Router } from 'express';
import { BaseBookService } from '../../controllers/book/base-book.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { isOwner } from '../../filters/is-owner.filter';
import { BookReview } from '../../models/m2m/book-user/book-review/book-review.model';
import { BookFollowController } from '../../controllers/book/book-follow/book-follow.controller';
import { BookFollow } from '../../models/m2m/book-user/book-follow/book-follow.model';
import { bookFollowValidator } from '../../validators/body/book/book-follow.validator';

const router = Router();
const bookFollow = new BookFollowController(new BaseBookService(BookFollow));

router
    .route(
        '/'
    )
    .get(
        bookFollow.getMany
    )
    .post(
        bookFollowValidator.create, checkValidationResult, // VALIDATORS
        authRequired,
        bookFollow.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookFollow.get
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookFollow),
        bookFollow.baseDelete
    );

export { router as bookReviewRouter };