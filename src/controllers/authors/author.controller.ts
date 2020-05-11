import { BaseController } from '../base/base.controller';
import { AuthorService } from './author.service';
import { catchAsync } from '../../utils/catch-async';
import { SendResponse } from '../../utils/send-response';
import multer from 'multer';
import { BadRequest } from '../../utils/app-error';
import moment from 'moment';
import sharp from 'sharp';

export class AuthorController extends BaseController {
    constructor(public authorService: AuthorService) {
        super(authorService.model);
    }

    uploadAuthorPhoto = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image')) cb(null, true);
            else cb(BadRequest('Not an image! Please upload only images.'));
        }
    }).single('photo');

    resizeAuthorPhoto = catchAsync(async (req, res, next) => {
        if (!req.file) return next();
        req.file.filename = `author-${req.user.id}-${moment().unix()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(250, 250)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`${__dirname}/../../assets/img/author-images/${req.file.filename}`);

        next();
    });

    create = catchAsync(async (req, res, next) => {
        if (req.file?.filename) req.body.image = req.file.filename;
        SendResponse({ data: await this.authorService.baseCreate(req.body), res, next });
    });


    update = catchAsync(async (req, res, next) => {
        if (req.file?.filename) req.body.image = req.file.filename;
        SendResponse({ data: await this.authorService.baseUpdate(req.params.id, req.body), res, next });
    });

    getAuthorWithBooks = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.authorService.getWithBooks(req.params.id, req.query), res, next });
    });

    getAuthorWithFavoredUsers = catchAsync(async (req, res, next) => {
        SendResponse({ data: this.authorService.getWithFavoredUsers(req.params.id, req.query), res, next });
    });
}