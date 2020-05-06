export class AppError extends Error {
    status: string;
    isOperational: true = true;

    constructor(public readonly message: string, public readonly statusCode: number) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

export const NotFound = () => new AppError('not found', 404);
export const BadRequest = (err?: any) => new AppError(err ? err : 'bad request', 400);
export const Unauthorized = (err?: any) => new AppError(err ? err : 'unauthorized', 401);