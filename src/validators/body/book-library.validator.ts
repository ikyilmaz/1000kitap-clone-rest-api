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
        notEmpty: isCreate ? isNotEmpty('privacy') : undefined,
        optional: !isCreate ? true : undefined,
        isIn: {
            options: [[
                'PUBLIC',
                'JUST_ME',
                'JUST_FOLLOWERS'
            ]],
            errorMessage: 'field \'privacy\' must be in PUBLIC, JUST_ME, JUST_FOLLOWERS'
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

const addBook = checkSchema({
    book: {
        notEmpty: isNotEmpty('book'),
        isMongoId: { errorMessage: 'field \'book\' must be a valid mongoId' }
    },
    status: {
        optional: true,
        isIn: {
            options: [['READING', 'TO_BE_READ', 'READ', 'DISCONTINUE', 'NOT_READ']],
            errorMessage: "field 'status' must be in 'READING', 'TO_BE_READ', 'READ', 'DISCONTINUE', 'NOT_READ'"
        }
    }
});

export const bookLibraryValidator = {
    createOrUpdate,
    addBook
};