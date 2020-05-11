import { Router } from 'express';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { authRequired } from '../../filters/auth-required.filter';
import { isOwner } from '../../filters/is-owner.filter';
import { FavoriteAuthor } from '../../models/m2m/author-user/favorite-author/favorite-author.model';
import { FavoriteAuthorController } from '../../controllers/authors/favorite-author/favorite-author.controller';
import { FavoriteAuthorService } from '../../controllers/authors/favorite-author/favorite-author.service';
import { favoriteAuthorValidator } from '../../validators/body/author/favorite-author.route';

const router = Router();

const favoriteAuthor = new FavoriteAuthorController(new FavoriteAuthorService(FavoriteAuthor));

router
    .route(
        '/'
    )
    .get(
        favoriteAuthor.getMany
    )
    .post(
        favoriteAuthorValidator.create, checkValidationResult,
        authRequired,
        favoriteAuthor.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult,
        favoriteAuthor.get
    )
    .delete(
        checkIdParam, checkValidationResult,
        authRequired,
        isOwner(FavoriteAuthor),
        favoriteAuthor.baseDelete
    );

export { router as favoriteAuthorRouter };