import { Router } from 'express';
import { CurrentUserController } from '../../controllers/user/current-user/current-user.controller';
import { CurrentUserService } from '../../controllers/user/current-user/current-user.service';
import { User } from '../../models/user/user.model';
import { authRequired } from '../../filters/auth-required.filter';

const router = Router();

const currentUser = new CurrentUserController(new CurrentUserService(User));

router
    .use(authRequired);

router
    .get('/book-libraries', currentUser.getUsersBookLibraries)
    .get('/book-libraries/:id', currentUser.getUsersBookLibrary)
    .get('/book-reviews', currentUser.getUsersReviews)
    .get('/book-excerpts', currentUser.getUsersExcerpts)
    .get('/followed-books', currentUser.getUsersFollowedBooks)
    .get('/rated-books', currentUser.getUsersRatedBooks)
    .get('/followers', currentUser.getUsersFollowers)
    .get('/followings', currentUser.getUsersFollowings)
    .get('/favorite-authors', currentUser.getUsersFavoriteAuthors)
    .get('/favorite-books', currentUser.getUsersFavoriteBooks);

router
    .route(
        '/user-profile'
    )
    .get(
        currentUser.getUserProfile
    )
    .patch(
        // TODO ADD VALIDATOR
        currentUser.updateUserProfile
    );


export { router as currentUserRouter };