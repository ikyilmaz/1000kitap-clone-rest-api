import { Router } from 'express';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { isOwner } from '../../filters/is-owner.filter';
import { FavoriteAuthor } from '../../models/m2m/author-user/favorite-author/favorite-author.model';
import { FavoriteAuthorController } from '../../controllers/authors/favorite-author/favorite-author.controller';
import { FavoriteAuthorService } from '../../controllers/authors/favorite-author/favorite-author.service';

const router = Router();

const favoriteAuthor = new FavoriteAuthorController(new FavoriteAuthorService(FavoriteAuthor));

router
    .route(
        '/'
    )
    .get(
        favoriteAuthor.baseGet
    )
    .post(
        authRequired,
        favoriteAuthor.baseGet
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult,
        favoriteAuthor.baseGet
    )
    .delete(
        checkIdParam, checkValidationResult,
        authRequired,
        isOwner(FavoriteAuthor),
        favoriteAuthor.baseGet
    );

export { router as favoriteAuthorRouter };