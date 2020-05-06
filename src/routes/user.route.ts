import { Router } from 'express';
import { UserController } from '../controllers/user/user.controller';
import { UserService } from '../controllers/user/user.service';

const router = Router();
const userController = new UserController(new UserService())

router
    .route('/')
    .get(userController.getMany)
    .post(userController.create);

router
    .route('/:id')
    .get(userController.get)
    .patch(userController.update)
    .delete(userController.delete);

export const userRouter = router;