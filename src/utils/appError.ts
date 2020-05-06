export class AppError extends Error {
    status: string;
    isOperational: true = true;

    constructor(public readonly message: string, public readonly statusCode: number) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

export const NotFound = () => new AppError('not found', 404);
export const BadRequest = (msg?: string) => new AppError(msg ? msg : 'bad request', 400);
export const Unauthorized = (msg?: string) => new AppError(msg ? msg : 'unauthorized', 401);