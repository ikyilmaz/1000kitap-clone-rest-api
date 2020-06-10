import { config } from 'dotenv';
import { promisify } from 'util';

promisify(config)({ path: __dirname + '/../../.env' });

export const PORT = Number(process.env.PORT as string);
export const HOST = process.env.HOST as string;
export const DB_USERNAME = process.env.DB_USERNAME as string;
export const DB_PASSWORD = process.env.DB_PASSWORD as string;
export const DB_NAME = process.env.DB_NAME as string;
export const DB_CONNECTION_STRING = (process.env.DB_CONNECTION_STRING as string)
    .replace('<username>', DB_USERNAME)
    .replace('<password>', DB_PASSWORD)
    .replace('<dbname>', DB_NAME);
export const NODE_ENV = process.env.NODE_ENV as 'production' || 'development' || 'test';
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
export const JWT_COOKIE_EXPIRES_IN = Number(process.env.JWT_COOKIE_EXPIRES_IN as string);
