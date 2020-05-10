import { Router } from 'express';
import { BookExcerptController } from '../../controllers/book/book-excerpt/book-excerpt.controller';
import { BookExcerpt } from '../../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { BaseBookService } from '../../controllers/book/base-book.service';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';
import { bookExcerptValidator } from '../../validators/body/book/book-excerpt.validator';
import { authRequired } from '../../filters/auth-required.filter';
import { isOwner } from '../../filters/is-owner.filter';

const router = Router();
const bookExcerpt = new BookExcerptController(new BaseBookService(BookExcerpt));

router
    .route(
        '/'
    )
    .get(
        bookExcerpt.getMany
    )
    .post(
        bookExcerptValidator.createOrUpdate(true), checkValidationResult,
        authRequired,
        bookExcerpt.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookExcerpt.get
    )
    .patch(
        checkIdParam, bookExcerptValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookExcerpt),
        bookExcerpt.update
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        isOwner(BookExcerpt),
        bookExcerpt.baseDelete
    );

export { router as bookExcerptRouter };