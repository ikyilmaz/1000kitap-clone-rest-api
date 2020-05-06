import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { AppError } from './utils/appError';
import { userRouter } from './routes/user.route';

const app = express(); // Express Engine

app.use(express.json({ limit: '10kb' })); // Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny')); // Logger

// Routes
app.use('/api/v1/users', userRouter);

// Hello World Message
app.all('/', ((req, res) => res.status(200).send('hello world')));

app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) return res.status(err.statusCode).json({ status: err.status, message: err.message });
    next(err);
});
export default app;
