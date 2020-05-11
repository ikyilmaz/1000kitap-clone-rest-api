import { checkSchema } from 'express-validator';
import { isNotEmpty } from '../lib/is-not-empty';

const createOrUpdate = (isCreate: boolean) => checkSchema({
    firstName: {
        notEmpty: isCreate ? isNotEmpty('firstName') : undefined,
        optional: !isCreate ? true : undefined,
        isString: true
    },
    lastName: {
        notEmpty: isCreate ? isNotEmpty('lastName') : undefined,
        optional: !isCreate ? true : undefined,
        isString: true
    },
    placeOfBirth: {
        optional: true,
        isString: true
    },
    birthday: {
        optional: true,
        isString: true
    },
    biography: {
        optional: true
    },
    title: {
        optional: true
    }
});

export const authorValidator = {
    createOrUpdate
};