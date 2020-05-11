import { Router } from 'express';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { bookLibraryValidator } from '../validators/body/book-library.validator';
import { authRequired } from '../filters/auth-required.filter';
import { BookLibraryController } from '../controllers/book-library/book-library.controller';
import { BookLibrary } from '../models/book-library/book-library.model';
import { BookLibraryService } from '../controllers/book-library/book-library.service';

const router = Router();

const bookLibrary = new BookLibraryController(new BookLibraryService(BookLibrary));

router
    .route(
        '/'
    )
    .get(
        bookLibrary.baseGetMany
    )
    .post(
        bookLibraryValidator.createOrUpdate(true), checkValidationResult,
        authRequired,
        bookLibrary.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult,
        bookLibrary.get
    )
    .patch(
        checkIdParam, bookLibraryValidator.createOrUpdate(false), checkValidationResult
    )
    .delete(
        checkIdParam, checkValidationResult
    );

export { router as bookLibraryRouter };