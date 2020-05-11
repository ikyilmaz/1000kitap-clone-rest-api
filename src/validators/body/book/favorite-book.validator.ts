import { checkSchema } from "express-validator";
import { isNotEmpty } from '../lib/is-not-empty';

const create = checkSchema({
    book: {
        notEmpty: isNotEmpty('book'),
        isMongoId: { errorMessage: 'field \'book\' must be a valid mongoId' }
    }
})

export const favoriteBookValidator = {
    create
}