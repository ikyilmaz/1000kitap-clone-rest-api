import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';
import { checkIdParam } from '../validators/param/id.validator';
import { userValidator } from '../validators/body/user.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';
import { authRequired } from '../filters/auth-required.filter';
import { restrictTo } from '../filters/restrict-to.filter';

const router = Router();
const userController = new UserController(new UserService());

router
    .route('/')
    .get(
        userController.getMany
    )
    .post(
        userValidator.createOrUpdate(true), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        userController.create
    );

router
    .route("/:id/profile")
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        userController.getOneUsersProfile
    )

router
    .route('/:id')
    .get(
        checkIdParam, checkValidationResult, // VALIDATORS
        userController.get
    )
    .patch(
        checkIdParam, userValidator.createOrUpdate(false), checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        userController.update
    )
    .delete(
        checkIdParam, checkValidationResult, // VALIDATORS
        authRequired,
        restrictTo('admin'),
        userController.delete
    );

export const userRouter = router;