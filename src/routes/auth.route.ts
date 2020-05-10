import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../controllers/auth/auth.service';
import { authValidator } from '../validators/body/auth.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { authRequired } from '../filters/auth-required.filter';

const router = Router();
const auth = new AuthController(new AuthService());

router.post(
    '/sign-up',
    authValidator.signUp, checkValidationResult, // VALIDATORS
    auth.signUp
);

router.post(
    '/sign-in',
    authValidator.signIn, checkValidationResult, // VALIDATORS
    auth.signIn
);

router.get(
    '/sign-out',
    auth.signOut
);

router.get(
    '/user',
    authRequired,
    auth.user
);

router.get(
    '/profile',
    authRequired,
    auth.profile
);

router.get(
    '/is-logged-in',
    auth.isLoggedIn
);

router.patch(
    '/update',
    authValidator.update, checkValidationResult, // VALIDATORS
    authRequired,
    auth.update
);

router.patch(
    '/update-password',
    authValidator.updatePassword, checkValidationResult,    // VALIDATORS
    authRequired,
    auth.updatePassword
);

router.patch(
    '/update-email',
    authValidator.updateEmail, checkValidationResult,  // VALIDATORS
    authRequired,
    auth.updateEmail
);

export const authRouter = router;