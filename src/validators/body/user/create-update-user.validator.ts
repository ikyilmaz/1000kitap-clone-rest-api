import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

export const checkCreateOrUpdateUserBody = (isCreate: boolean) => checkSchema({
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
        isAlpha: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
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
    }
}, ['body']);