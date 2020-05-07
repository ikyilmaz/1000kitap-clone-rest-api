import { Router } from 'express';
import { AuthController } from '../controllers/auth/auth.controller';
import { AuthService } from '../controllers/auth/auth.service';
import { authValidator } from '../validators/body/auth.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';

const router = Router();
const auth = new AuthController(new AuthService());

router.post(
    '/sign-up',
    authValidator.signUp,
    checkValidationResult,
    auth.signUp
);

router.post(
    '/sign-in',
    authValidator.signIn,
    checkValidationResult,
    auth.signIn
);

router.get(
    '/sign-out',
    auth.signIn
);

router.get(
    '/user',
    auth.user
);

router.get(
    '/is-logged-in',
    auth.isLoggedIn
);

router.patch(
    '/update',
    authValidator.update,
    checkValidationResult,
    auth.update
);

router.patch(
    '/update-password',
    authValidator.updatePassword,
    checkValidationResult,
    auth.updatePassword
);

router.patch(
    '/update-email',
    authValidator.updateEmail,
    checkValidationResult,
    auth.updateEmail
);

export const authRouter = router;