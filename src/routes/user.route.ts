import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';
import { checkIdParam } from '../validators/param/id.validator';
import { userValidator } from '../validators/body/user.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { authRequired } from '../filters/auth-required.filter';
import { restrictTo } from '../filters/restrict-to.filter';

const router = Router();
const user = new UserController(new UserService());

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

router
    .get(
        '/:id/profile',
        user.getUserWithProfile
    )
    .get(
        '/:id/reviews',
        user.getUserWithReviews
    )
    .get(
        '/:id/excerpts',
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
        user.update
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        user.delete
    );

export const userRouter = router;