import { checkSchema } from 'express-validator';
import { isNotEmpty } from './lib/is-not-empty';
const c = ""
const createOrUpdate = (isCreate: boolean) => {
    return checkSchema({
        book: {
            notEmpty: isCreate ? isNotEmpty('book') : undefined,
            optional: !isCreate ? true : undefined,
            isMongoId: { errorMessage: 'field \'book\' must be a valid mongoId' }
        },
        content: {
            notEmpty: isNotEmpty('content'),
            isLength: {
                errorMessage: 'field \'content\' must be between 2 and 128 characters',
                options: { min: 2, max: 255 }
            }
        },
        postedBy: {
            optional: true,
            isIn: {
                errorMessage: 'field \'postedBy\' must be either \'WEB_SITE\' or \'MOBILE_APP\'',
                options: ['WEB_SITE', 'MOBILE_APP']
            }
        }
    });
};


export const bookReviewValidator = {
    createOrUpdate
};