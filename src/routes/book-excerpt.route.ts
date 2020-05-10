import { Router } from 'express';
import { BookExcerptController } from '../controllers/book/book-excerpt/book-excerpt.controller';
import { BookExcerpt } from '../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { BookExcerptService } from '../controllers/book/book-excerpt/book-excerpt.service';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { bookExcerptValidator } from '../validators/body/book-excerpt.validator';

const router = Router();
const bookExcerpt = new BookExcerptController(new BookExcerptService(BookExcerpt));

router
    .route(
        '/'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookExcerpt.getMany
    )
    .post(
        bookExcerptValidator.createOrUpdate(true), checkValidationResult,
        bookExcerpt.create
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookExcerpt.get
    );

export { router as bookExcerptRouter };