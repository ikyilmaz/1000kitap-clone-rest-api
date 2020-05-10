import { Router } from 'express';
import { BookExcerptController } from '../controllers/book/book-excerpt/book-excerpt.controller';
import { BookExcerpt } from '../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { BookExcerptService } from '../controllers/book/book-excerpt/book-excerpt.service';
import { checkIdParam } from '../validators/param/id.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';

const router = Router();
const bookExcerpt = new BookExcerptController(new BookExcerptService(BookExcerpt));

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        bookExcerpt.get
    )
    .post(
        bookExcerpt.create
    );

export { router as bookExcerptRouter };