import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

const createOrUpdate = (isCreate: boolean) => checkSchema({
    firstName: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'firstName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    lastName: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'lastName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    username: {
        isString: true,
        notEmpty: isCreate ? isNotEmpty('username') : undefined,
        isLength: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        },
        isAlphanumeric: {
            errorMessage: 'field \'username\' must be alphanumeric',
            options: 'en-US'
        }
    },
    email: {
        isString: true,
        notEmpty: isCreate ? isNotEmpty('email') : undefined,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    },
    password: {
        isString: true,
        notEmpty: isCreate ? isNotEmpty('password') : undefined,
        isEmpty: !isCreate ? { errorMessage: 'please user /api/v1/users/update-password instead' } : undefined,
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 2, max: 32 }
        }
    },
    role: {
        isString: true,
        optional: true,
        isIn: {
            errorMessage: 'field \'role\' must be either admin or user',
            options: ['admin', 'user']
        }
    }
}, ['body']);

export const userValidator = {
    createOrUpdate
}
