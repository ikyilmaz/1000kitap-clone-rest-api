import { BaseController } from '../../base/base.controller';
import { UserProfileService } from './user-profile.service';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';

export class UserProfileController extends BaseController {
    constructor(public userProfileService: UserProfileService) {
        super(userProfileService.model);
    }

    get = catchAsync(async (req, res, next) => SendResponse({
        data: await this.userProfileService.get(req.params.id, req.query), res, next
    }));

    getMany = catchAsync(async (req, res, next) => SendResponse({
        data: await this.userProfileService.getMany(req.query), res, next
    }));

    update = catchAsync((req, res, next) => {
        req.body.user = req.user._id;
        SendResponse({
            data: this.userProfileService.update(req.body), res, next
        });
    });
}
