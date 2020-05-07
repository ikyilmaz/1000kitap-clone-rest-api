import { checkSchema } from 'express-validator';
import { isNotEmpty } from './lib/is-not-empty';

const signUp = checkSchema({
    firstName: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'firstName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    lastName: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'lastName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    username: {
        isString: true,
        notEmpty: isNotEmpty('username'),
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
        isString: true,
        notEmpty: isNotEmpty('email'),
        isEmail: { errorMessage: 'field \'email\' must be a valid email address' }
    },
    password: {
        isString: true,
        notEmpty: isNotEmpty('password'),
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
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'firstName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    lastName: {
        isString: true,
        optional: true,
        isLength: {
            errorMessage: 'field \'lastName\' must be between 2 and 64 characters',
            options: { min: 2, max: 64 }
        }
    },
    username: {
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
        isString: true,
        notEmpty: isNotEmpty('password'),
        isLength: {
            errorMessage: 'field \'password\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    },
    newPassword: {
        isString: true,
        notEmpty: isNotEmpty('newPassword'),
        isLength: {
            errorMessage: 'field \'newPassword\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    },
    newPasswordConfirm: {
        isString: true,
        notEmpty: isNotEmpty('newPasswordConfirm'),
        isLength: {
            errorMessage: 'field \'newPasswordConfirm\' must be between 6 and 32 characters',
            options: { min: 6, max: 32 }
        }
    }
});

const updateEmail = checkSchema({
    email: {
        isString: true,
        notEmpty: isNotEmpty('email'),
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