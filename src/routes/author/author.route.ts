import { Router } from 'express';
import { AuthorController } from '../../controllers/authors/author.controller';
import { Author } from '../../models/author/author.model';
import { AuthorService } from '../../controllers/authors/author.service';
import { authRequired } from '../../filters/auth-required.filter';
import { restrictTo } from '../../filters/restrict-to.filter';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authorValidator } from '../../validators/body/author/author.validator';
import { favoriteAuthorRouter } from './favorite-author.route';

const router = Router();

const author = new AuthorController(new AuthorService(Author));

router
    .use('/favorites', favoriteAuthorRouter);

router
    .route(
        '/'
    )
    .get(
        author.baseGetMany
    )
    .post(
        author.uploadAuthorPhoto,
        authorValidator.createOrUpdate(true), checkValidationResult,
        author.resizeAuthorPhoto,
        authRequired,
        restrictTo('admin'),
        author.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult,
        author.baseGet
    )
    .patch(
        author.uploadAuthorPhoto,
        checkIdParam, authorValidator.createOrUpdate(true), checkValidationResult,
        author.resizeAuthorPhoto,
        authRequired,
        restrictTo('admin'),
        author.update
    )
    .delete(
        checkIdParam, checkValidationResult,
        authRequired,
        restrictTo('admin'),
        author.baseDelete
    );

router
    .get(
        '/:id/books',
        checkIdParam, checkValidationResult,
        author.getAuthorWithBooks
    )
    .get(
        '/:id/favored-users',
        checkIdParam, checkValidationResult,
        author.getAuthorWithFavoredUsers
    );


export { router as authorRouter };