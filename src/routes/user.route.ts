import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';
import { checkIdParam } from '../validators/param/id.validator';

const router = Router();
const userController = new UserController(new UserService());

router
    .route('/')
    .get(userController.getMany)
    .post(userController.create);

router
    .route('/:id')
    .get(
        checkIdParam,
        userController.get
    )
    .patch(
        checkIdParam,
        userController.update
    )
    .delete(
        checkIdParam,
        userController.delete
    );

export const userRouter = router;