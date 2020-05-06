import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

export const checkCreateOrUpdateCategoryBody = (isCreate: boolean) => checkSchema({
    name: {
        notEmpty: isCreate ? isNotEmpty('name') : undefined,
        isLength: {
            errorMessage: 'field \'name\' must be between 2 and 64 characters',
            options: { max: 64, min: 2 }
        }
    },
    description: {
        optional: true,
        isLength: {
            errorMessage: 'field \'description\' must be between 2 and 128 characters',
            options: { max: 128, min: 2 }
        }
    }
}, ['body']);
