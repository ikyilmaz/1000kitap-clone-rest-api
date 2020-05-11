import { Router } from 'express';
import { UserController } from '../../controllers/user/user.controller';
import { UserService } from '../../controllers/user/user.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { userValidator } from '../../validators/body/user/user.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { restrictTo } from '../../filters/restrict-to.filter';
import { User } from '../../models/user/user.model';

const router = Router();

const user = new UserController(new UserService(User));

router
    .route('/')
    .get(
        user.getMany
    )
    .post(
        userValidator.createOrUpdate(true), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        user.create
    );

// (Short-Hands for some requests)
router
    .get(
        '/:id/profile',
        user.getUserWithProfile
    )
    .get(
        '/:id/book-reviews',
        user.getUserWithReviews
    )
    .get(
        '/:id/book-excerpts',
        user.getUserWithExcerpts
    )
    .get(
        '/:id/favorite-authors',
        user.getUserWithFavoriteAuthors
    )
    .get(
        '/:id/favorite-books',
        user.getUserWithFavoriteBooks
    )
    .get(
        '/:id/followers',
        user.getUserWithFollowers
    )
    .get(
        '/:id/follows',
        user.getUserWithFollows
    )
    .get(
        '/:id/rated-books',
        user.getUserWithRatedBooks
    )
    .patch(
        '/:id/deactivate',
        checkIdParam, checkValidationResult, // VALIDATORS
        user.deactivateOrActivate(false)
    )
    .patch(
        '/:id/activate',
        checkIdParam, checkValidationResult, // VALIDATORS
        user.deactivateOrActivate(true)
    );


router
    .route('/:id')
    .get(
        user.get
    )
    .patch(
        checkIdParam, userValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        user.baseUpdate
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        user.baseDelete
    );

export { router as userRouter };