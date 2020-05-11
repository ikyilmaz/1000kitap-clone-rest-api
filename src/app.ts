import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { AppError } from './utils/app-error';
import { userRouter } from './routes/user/user.route';
import { categoryRouter } from './routes/category.route';
import { authRouter } from './routes/auth.route';
import { bookRouter } from './routes/book/book.route';
import { bookLibraryRouter } from './routes/book-library.route';
import { authorRouter } from './routes/author/author.route';
import { currentUserRouter } from './routes/user/current-user.route';

const app = express();                                 // Express Engine

app.use(express.json({ limit: '10kb' }));       // Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));                        // Logger

// Routes
app.use('/api/v1/users', userRouter);                   // USER
app.use("/api/v1/current-user", currentUserRouter)      // CURRENT USER (Short-Hands for some requests)
app.use('/api/v1/categories', categoryRouter);          // CATEGORY
app.use('/api/v1/auth', authRouter);                    // AUTH
app.use('/api/v1/book-libraries', bookLibraryRouter);   // BOOK LIBRARY (User's Libraries)
app.use('/api/v1/books', bookRouter);                   // BOOK
app.use('/api/v1/authors', authorRouter);               // AUTHOR

// Hello World Message
app.all('/', ((req, res) => res.status(200).send('hello world')));

// Error Controller
app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) return res.status(err.statusCode).json({ status: err.status, message: err.message });
    next(err);
});

export default app;