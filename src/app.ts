import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { AppError } from './utils/app-error';
import { userRouter } from './routes/user.route';
import { categoryRouter } from './routes/category.route';
import { authRouter } from './routes/auth.route';
import { bookRouter } from './routes/book/book.route';
import { bookExcerptRouter } from './routes/book/book-excerpt.route';
import { bookReviewRouter } from './routes/book/book-review.route';
import { bookFollowRouter } from './routes/book/book-follow.route';
import { bookRatingRouter } from './routes/book/book-rating.route';
import { favoriteBookRouter } from './routes/book/favorite-book.route';
import { bookLibraryRouter } from './routes/book-library.route';

const app = express(); // Express Engine

app.use(express.json({ limit: '10kb' })); // Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny')); // Logger

// Routes
app.use('/api/v1/users', userRouter);

app.use('/api/v1/categories', categoryRouter);

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/book-libraries', bookLibraryRouter);

app.use('/api/v1/books', bookRouter);

// Hello World Message
app.all('/', ((req, res) => res.status(200).send('hello world')));

// Error Controller
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) return res.status(err.statusCode).json({ status: err.status, message: err.message });
    next(err);
});

export default app;
