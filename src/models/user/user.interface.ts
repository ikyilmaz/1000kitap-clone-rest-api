import { IBaseModel } from '../base-model.interface';
import { UserRoles } from './user.enums';
import { UserVirtuals } from './user.enums';
import { IUserProfile } from '../user-profile/user-profile.interface';
import { Types } from 'mongoose';
import { IBookReview } from '../m2m/book-user/book-review/book-review.interface';
import { IBookExcerpt } from '../m2m/book-user/book-excerpt/book-excerpt.interface';
import { IBook } from '../book/book.interface';
import { IBookFollow } from '../m2m/book-user/book-follow/book-follow.interface';
import { IBookRating } from '../m2m/book-user/book-rating/book-rating.interface';
import { IAuthor } from '../author/author.interface';
import { IFavoriteBook } from '../m2m/book-user/favorite-book/favorite-book.interface';

export interface IUser extends IBaseModel {
    firstName: string;
    lastName: string;
    isActive: boolean;
    username: string;
    email: string;
    photo: string;
    role: UserRoles;
    password: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;

    // Virtual Fields
    profile?: IUserProfile | Types.ObjectId | string;
    reviews?: IBookReview | Types.ObjectId | string;
    reviewsCount?: number;
    excerpts?: IBookExcerpt | Types.ObjectId | string;
    excerptsCount?: number;
    followedBooks?: IBookFollow | Types.ObjectId | string;
    followedBooksCount?: number;
    ratedBooks?: IBookRating | Types.ObjectId | string;
    ratedBooksCount?: number;
    followedUsers?: IUser | Types.ObjectId | string;
    followedUsersCount?: number;
    followingUsers?: IUser | Types.ObjectId | string;
    followingUsersCount?: number;
    favoriteAuthors?: IAuthor | Types.ObjectId | string;
    favoriteAuthorsCount?: number;
    favoriteBooks?: IFavoriteBook | Types.ObjectId | string;
    favoriteBooksCount?: number;

    hashPassword(password: string): Promise<string>

    comparePasswords(candidatePassword: string, hashedPassword: string): Promise<boolean>

    changedPasswordAfter(JWTTimestamp: string): boolean
}