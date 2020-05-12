import { checkSchema } from 'express-validator';

/**
 * @description checks the given field in the params
* */
export const checkCustomIdParam = (...customIdFields: string[]) => {
    const paramsObj: Partial<Pick<any, any>> = {};

    customIdFields.forEach(customIdField => {
        paramsObj[customIdField] = { isMongoId: { errorMessage: `param '${customIdField}' must be a mongoId` } };
    });

    return checkSchema(paramsObj, ['params']);
};