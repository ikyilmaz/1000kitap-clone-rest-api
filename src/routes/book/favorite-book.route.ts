import { Router } from 'express';
import { BaseBookService } from '../../controllers/book/base-book.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { isOwner } from '../../filters/is-owner.filter';
import { FavoriteBookController } from '../../controllers/book/favorite-book/favorite-book.controller';
import { FavoriteBook } from '../../models/m2m/book-user/favorite-book/favorite-book.model';
import { favoriteBookValidator } from '../../validators/body/book/favorite-book.validator';

const router = Router();
const favoriteBook = new FavoriteBookController(new BaseBookService(FavoriteBook));

router
    .route(
        '/'
    )
    .get(
        favoriteBook.getMany
    )
    .post(
        favoriteBookValidator.create, checkValidationResult, // VALIDATORS
        authRequired,
        favoriteBook.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        favoriteBook.get
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(FavoriteBook),
        favoriteBook.baseDelete
    );

export { router as favoriteBookRouter };