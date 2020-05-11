import { checkSchema } from 'express-validator';

export const checkCustomIdParam = (...customIdFields: string[]) => {
    const paramsObj: Partial<Pick<any, any>> = {};

    customIdFields.forEach(customIdField => {
        paramsObj[customIdField] = { isMongoId: { errorMessage: 'param \'id\' must be a mongoId' } };
    });

    return checkSchema(paramsObj, ['params']);
};