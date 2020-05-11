import { BaseController } from '../base/base.controller';
import { BookLibraryService } from './book-library.service';
import { catchAsync } from '../../utils/catch-async';
import { SendResponse } from '../../utils/send-response';
import { filterObject } from '../../utils/filter-object';
import multer from 'multer';
import { BadRequest } from '../../utils/app-error';
import moment from 'moment';
import sharp from 'sharp';

export class BookLibraryController extends BaseController {
    constructor(public bookLibraryService: BookLibraryService) {
        super(bookLibraryService.model);
    }

    get = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookLibraryService.get(req.params.id, req.query), res, next
        });
    });

    getMany = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookLibraryService.getMany(req.query), res, next
        });
    });

    uploadBookLibraryPhoto = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image')) cb(null, true);
            else cb(BadRequest('Not an image! Please upload only images.'));
        }
    }).single('photo');

    resizeBookLibraryPhoto = catchAsync(async (req, res, next) => {
        if (!req.file) return next();
        req.file.filename = `book-library-${req.user.id}-${moment().unix()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(250, 250)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`${__dirname}/../../assets/img/book-library-images/${req.file.filename}`);

        next();
    });

    create = catchAsync(async (req, res, next) => {
        req.body = filterObject(req.body, 'name', 'privacy', 'description');

        if (req.file?.filename) req.body.photo = req.file.filename;

        SendResponse({
            data: await this.bookLibraryService.baseCreate({
                ...req.body,
                user: req.user._id || req.user.id
            }), res, next
        });
    });

    update = catchAsync(async (req, res, next) => {
        req.body = filterObject(req.body, 'name', 'description', 'privacy');

        if (req.file?.filename) req.body.photo = req.file.filename;

        SendResponse({
            data: await this.bookLibraryService.baseUpdate(req.params.id, req.body), res, next
        });
    });

    addBook = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.bookLibraryService.addBook(req.params.id, req.body), res, next
        });
    });
}