import { checkSchema } from 'express-validator';
import { isNotEmpty } from './lib/is-not-empty';

const createOrUpdate = (isCreate: boolean) => checkSchema({
    name: {
        notEmpty: isCreate ? isNotEmpty('name') : undefined,
        optional: !isCreate ? true : undefined,
        isString: true,
        isLength: {
            errorMessage: 'field \'name\' must be between 1 and 64 characters',
            options: { min: 1, max: 64 }
        }
    },
    privacy: {
        isString: true,
        optional: true,
        isIn: {
            options: ['PRIVATE', 'PUBLIC'],
            errorMessage: 'field \'privacy\' must be either \'PRIVATE\' or \'PUBLIC\''
        }
    },
    description: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'description\' must be between 1 and 255 characters',
            options: { min: 1, max: 255 }
        }
    }
});

export const bookLibraryValidator = {
    createOrUpdate
};