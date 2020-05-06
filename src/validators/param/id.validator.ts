import { checkSchema } from 'express-validator';

export const checkIdParam = checkSchema({
    id: {
        isMongoId: { errorMessage: 'param \'id\' must be a mongoId' }
    }
}, ['params']);