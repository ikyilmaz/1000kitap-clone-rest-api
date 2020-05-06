export class AppError extends Error {
    status: string;
    isOperational: true = true;

    constructor(public readonly message: string, public readonly statusCode: number) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}