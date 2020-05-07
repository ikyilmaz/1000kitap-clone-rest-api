import { checkSchema } from 'express-validator';
import { isNotEmpty } from './lib/is-not-empty';

const createOrUpdate = (isCreate: boolean) => checkSchema({
    name: {
        isString: true,
        notEmpty: isCreate ? isNotEmpty('name') : undefined,
        isLength: {
            errorMessage: 'field \'name\' must be between 2 and 64 characters',
            options: { max: 64, min: 2 }
        }
    },
    description: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'description\' must be between 2 and 128 characters',
            options: { max: 128, min: 2 }
        }
    }
}, ['body']);

export const categoryValidator = {
    createOrUpdate
}
