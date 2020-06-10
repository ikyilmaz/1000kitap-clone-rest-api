import { checkSchema } from 'express-validator';

const update = checkSchema({
    biography: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'biography\' must contain no more than 255 characters',
            options: { min: 1, max: 255 }
        }
    },
    placeOfBirth: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'placeOfBirth\' must contain no more than 64 characters',
            options: { min: 1, max: 64 }
        }
    },
    birthday: {
        optional: true,
        isISO8601: true
    },
    livesIn: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'livesIn\' must contain no more than 64 characters',
            options: { min: 1, max: 64 }
        }
    },
    gender: {
        isString: true,
        optional: true,
        isIn: {
            options: ['M' /*MALE*/, 'F' /*FEMALE*/, 'UNKNOWN']
        }
    },
    profession: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'profession\' must contain no more than 128 characters',
            options: { min: 1, max: 128 }
        }
    }
});

export const userProfileValidator = {
    update
};
