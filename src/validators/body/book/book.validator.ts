import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

const createOrUpdate = (isCreate: boolean) => checkSchema({
    title: {
        notEmpty: isCreate ? isNotEmpty('title') : undefined,
        isString: true
    },
    printDate: {
        optional: true,
        isString: true
    },
    author: {
        optional: true,
        isMongoId: { errorMessage: 'field \'author\' must be mongoId' }
    },
    numberOfPages: {
        optional: true,
        isInt: { errorMessage: 'field \'numberOfPages\' must be int' }
    },
    format: {
        optional: true,
        isIn: {
            options: ['paperback', 'normal'], //....
            errorMessage: 'field \'format\' must be either paperback or normal'
        }
    },
    ISBN: {
        optional: true,
        isISBN: { errorMessage: 'field \'ISBN\' must be ISBN' }
    },
    category: {
        optional: true,
        isMongoId: { errorMessage: 'field \'category\' must be mongoId' }
    },
    language: {
        optional: true,
        isString: true
    },
    country: {
        optional: true,
        isString: true
    },
    publisher: {
        notEmpty: isCreate ? isNotEmpty('publisher') : undefined,
        isString: true
    },
    edition: {
        optional: true,
        isInt: { errorMessage: 'field \'numberOfPages\' must be int' }
    }
});

export const bookValidator = {
    createOrUpdate
};