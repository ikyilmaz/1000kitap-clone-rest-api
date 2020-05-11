import { BaseController } from '../../base/base.controller';
import { CurrentUserService } from './current-user.service';
import { catchAsync } from '../../../utils/catch-async';
import { SendResponse } from '../../../utils/send-response';
import { BookReview } from '../../../models/m2m/book-user/book-review/book-review.model';
import { BookExcerpt } from '../../../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { FavoriteBook } from '../../../models/m2m/book-user/favorite-book/favorite-book.model';
import { BookFollow } from '../../../models/m2m/book-user/book-follow/book-follow.model';
import { BookRating } from '../../../models/m2m/book-user/book-rating/book-rating.model';

export class CurrentUserController extends BaseController {
    constructor(public currentUserService: CurrentUserService) {
        super(currentUserService.model);
    }

    getUsersBookLibraries = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.currentUserService.getBookLibraries(req.user._id, req.query), res, next });
    });

    getUsersBookLibrary = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.currentUserService.getBookLibrary(req.user._id, req.params.id, req.query),
            res,
            next
        });
    });

    getUsersReviews = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.currentUserService.get({
                currentUserId: req.user._id,
                query: req.query,
                model: BookReview
            }), res, next
        });
    });

    getUsersExcerpts = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.currentUserService.get({
                currentUserId: req.user._id,
                query: req.query,
                model: BookExcerpt
            }), res, next
        });
    });

    getUsersFollowedBooks = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.currentUserService.get({
                currentUserId: req.user._id,
                query: req.query,
                model: BookFollow
            }), res, next
        });
    });

    getUsersRatedBooks = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.currentUserService.get({
                currentUserId: req.user._id,
                query: req.query,
                model: BookRating
            }), res, next
        });
    });

    getUsersFollowers = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.currentUserService.getFollowers(req.user._id, req.query), res, next });
    });

    getUsersFollowings = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.currentUserService.getFollowings(req.user._id, req.query), res, next });
    });

    getUsersFavoriteAuthors = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.currentUserService.getFavoriteAuthors(req.user._id, req.query), res, next });
    });

    getUsersFavoriteBooks = catchAsync(async (req, res, next) => {
        SendResponse({
            data: await this.currentUserService.get({
                currentUserId: req.user._id,
                query: req.query,
                model: FavoriteBook
            }), res, next
        });
    });

    updateUserProfile = catchAsync(async (req, res, next) => {
        await this.currentUserService.updateUserProfile(req.user._id, req.body);
        const data = await this.currentUserService.getUserProfile(req.user._id, req.query);
        res.status(200).json({ 'status': 'success', data });
    });

    getUserProfile = catchAsync(async (req, res, next) => {
        SendResponse({ data: await this.currentUserService.getUserProfile(req.user._id, req.query), res, next });
    });
}