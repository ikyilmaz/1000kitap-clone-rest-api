import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';
import { checkIdParam } from '../validators/param/id.validator';
import { checkCreateOrUpdateUserBody } from '../validators/body/user/create-update-user.validator';

const router = Router();
const userController = new UserController(new UserService());

router
    .route('/')
    .get(userController.getMany)
    .post(
        checkCreateOrUpdateUserBody(true),
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
        checkCreateOrUpdateUserBody(false),
        userController.update
    )
    .delete(
        checkIdParam,
        userController.delete
    );

export const userRouter = router;