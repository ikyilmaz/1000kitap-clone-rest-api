import { Router } from 'express';
import { UserProfileController } from '../../controllers/user/user-profile/user-profile.controller';
import { UserProfileService } from '../../controllers/user/user-profile/user-profile.service';
import { UserProfile } from '../../models/user/user-profile/user-profile.model';
import { checkIdParam } from '../../validators/param/id.validator';
import { checkValidationResult } from '../../filters/check-validation-result.filter';


const router = Router();
const userProfile = new UserProfileController(new UserProfileService(UserProfile));

router
    .route(
        '/'
    )
    .get(
        userProfile.getMany
    );

router
    .route(
        '/:id'
    )
    .get(
        checkIdParam, checkValidationResult,
        userProfile.get
    );

export { router as userProfileRouter };