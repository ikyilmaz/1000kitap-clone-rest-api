import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';
import { checkIdParam } from '../validators/param/id.validator';
import { userValidator } from '../validators/body/user.validator';
import { checkValidationResult } from '../filters/check-validation-result.filter';

const router = Router();
const userController = new UserController(new UserService());

router
    .route('/')
    .get(
        userController.getMany
    )
    .post(
        userValidator.createOrUpdate(true),
        checkValidationResult,
        userController.create
    );

router
    .route('/:id')
    .get(
        checkIdParam,
        userController.get
    )
    .patch(
        checkIdParam,
        userValidator.createOrUpdate(false),
        checkValidationResult,
        userController.update
    )
    .delete(
        checkIdParam,
        userController.delete
    );

export const userRouter = router;