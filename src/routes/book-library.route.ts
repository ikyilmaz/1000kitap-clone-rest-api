import { Router } from 'express';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { bookLibraryValidator } from '../validators/body/book-library.validator';
import { authRequired } from '../filters/auth-required.filter';
import { BookLibraryController } from '../controllers/book-library/book-library.controller';
import { BookLibrary } from '../models/book-library/book-library.model';
import { BookLibraryService } from '../controllers/book-library/book-library.service';
import { isOwner } from '../filters/is-owner.filter';
import { checkCustomIdParam } from '../validators/param/custom-id.validator';

const router = Router();

const bookLibrary = new BookLibraryController(new BookLibraryService(BookLibrary));

router
    .route(
        '/'
    )
    .get(
        bookLibrary.getMany
    )
    .post(
        bookLibrary.uploadBookLibraryPhoto,
        bookLibraryValidator.createOrUpdate(true), checkValidationResult,
        authRequired,
        bookLibrary.resizeBookLibraryPhoto,
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
        bookLibrary.uploadBookLibraryPhoto,
        checkIdParam, bookLibraryValidator.createOrUpdate(false), checkValidationResult,
        bookLibrary.resizeBookLibraryPhoto,
        authRequired,
        bookLibrary.update
    )
    .delete(
        checkIdParam, checkValidationResult,
        authRequired,
        isOwner(BookLibrary),
        bookLibrary.baseDelete
    );

router
    .route(
        '/:id/add-book'
    )
    .post(
        checkIdParam, bookLibraryValidator.addBook, checkValidationResult,
        authRequired,
        isOwner(BookLibrary),
        bookLibrary.addBook
    );

export { router as bookLibraryRouter };