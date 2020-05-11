import { checkSchema } from 'express-validator';

const create = checkSchema({
    author: { isMongoId: { errorMessage: 'field \'author\' must be a mongoId' } }
});

export const favoriteAuthorValidator = {
    create
};