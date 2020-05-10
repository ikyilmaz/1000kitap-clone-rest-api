import { checkSchema } from 'express-validator';
import { isNotEmpty } from './lib/is-not-empty';

const signUp = checkSchema({
    firstName: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'firstName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    lastName: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'lastName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    username: {
        notEmpty: isNotEmpty('username'),
        isString: true,
        isLength: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        },
        isAlphanumeric: {
            errorMessage: 'field \'username\' must be alphanumeric',
            options: 'en-US'
        }
    },
    email: {
        notEmpty: isNotEmpty('email'),
        isString: true,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    },
    password: {
        notEmpty: isNotEmpty('password'),
        isString: true,
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    }
});

const signIn = checkSchema({
    username: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    email: {
        optional: true,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    },
    password: {
        isString: true,
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    }
});

const update = checkSchema({
    firstName: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'firstName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    lastName: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'lastName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    username: {
        optional: true,
        isString: true,
        isLength: {
            errorMessage: 'field \'username\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        },
        isAlphanumeric: {
            errorMessage: 'field \'username\' must be alphanumeric',
            options: 'en-US'
        }
    }
});

const updatePassword = checkSchema({
    password: {
        notEmpty: isNotEmpty('password'),
        isString: true,
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    },
    newPassword: {
        notEmpty: isNotEmpty('newPassword'),
        isString: true,
        isLength: {
            errorMessage: 'field \'newPassword\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    },
    newPasswordConfirm: {
        notEmpty: isNotEmpty('newPasswordConfirm'),
        isString: true,
        isLength: {
            errorMessage: 'field \'newPasswordConfirm\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    }
});

const updateEmail = checkSchema({
    email: {
        notEmpty: isNotEmpty('email'),
        isString: true,
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    }
});

export const authValidator = {
    signIn,
    signUp,
    update,
    updateEmail,
    updatePassword
};