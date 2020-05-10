import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

const createOrUpdate = (isCreate: boolean) => checkSchema({
    book: {
        notEmpty: isCreate ? isNotEmpty('book') : undefined,
        optional: !isCreate ? true : undefined,
        isMongoId: { errorMessage: 'field \'book\' must be a valid mongoId' }
    },
    rating: {
        notEmpty: isNotEmpty('rating'),
        isInt: {
            errorMessage: 'field \'rating\' must be at least 0 and at most 10',
            options: { min: 0, max: 10 }
        }
    }
});


export const bookRatingValidator = {
    createOrUpdate
};