import { Router } from 'express';
import { BookController } from '../../controllers/book/book.controller';
import { BookService } from '../../controllers/book/book.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { restrictTo } from '../../filters/restrict-to.filter';
import { bookValidator } from '../../validators/body/book/book.validator';
import { bookRatingRouter } from './book-rating.route';
import { bookFollowRouter } from './book-follow.route';
import { bookReviewRouter } from './book-review.route';
import { bookExcerptRouter } from './book-excerpt.route';
import { favoriteBookRouter } from './favorite-book.route';

const router = Router();
const book = new BookController(new BookService());

router
    .use('/ratings', bookRatingRouter)
    .use('/follows', bookFollowRouter)
    .use('/reviews', bookReviewRouter)
    .use("/excerpts", bookExcerptRouter)
    .use("/favorites", favoriteBookRouter)

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

// (Short-Hands for some requests)
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
        '/:id/ratings',
        checkIdParam, checkValidationResult, // VALIDATORS
        book.getBookWithRates
    );


export { router as bookRouter };