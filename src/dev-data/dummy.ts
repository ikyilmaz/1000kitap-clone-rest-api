import { User } from '../models/user/user.model';
import { books } from './books.json';
import { users } from './users.json';
import { authors } from './authors.json';
import { categories } from './categories.json';
import { Category } from '../models/category/category.model';
import mongoose from 'mongoose';
import { DB_CONNECTION_STRING, DB_NAME } from '../config/config';
import chalk from 'chalk';
import { Book } from '../models/book/book.model';
import { BookExcerpt } from '../models/m2m/book-user/book-excerpt/book-excerpt.model';
import { BookReview } from '../models/m2m/book-user/book-review/book-review.model';
import { Author } from '../models/author/author.model';
import { UserProfile } from '../models/user-profile/user-profile.model';
import { raw } from 'express';

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(async () => console.log(chalk.blueBright('--> Successfully connected to %s database'), DB_NAME))
    .catch(err => console.error(err));

const dummy = async () => {
    if (process.argv[2] === '--force' || process.argv[2] === '-f') {
        await Promise.all([
            User.deleteMany({}).catch(err => console.log('User.deleteMany', err)),
            BookReview.deleteMany({}).catch(err => console.log('BookReview.deleteMany', err)),
            BookExcerpt.deleteMany({}).catch(err => console.log('BookExcerpt.deleteMany', err)),
            Category.deleteMany({}).catch(err => console.log('Category.deleteMany()', err)),
            Author.deleteMany({}).catch(err => console.log('Author.deleteMany()', err)),
            Book.deleteMany({}).catch(err => console.log('Book.deleteMany', err)),
            UserProfile.deleteMany({}).catch(err => console.log('UserProfile.deleteMany', err))
        ]);

        console.log(chalk.redBright('all deleted!'));
    }
    const c = Category.create(categories).catch(err => console.log('Category.create()', err));
    for (const user of users) {
        await User.create(user)
            .then(async user => {

                let gender: string | undefined = undefined;
                const randomNumber = Math.round((Math.random() * 3));
                if (randomNumber == 1) gender = 'F';
                else if (randomNumber == 2) gender = 'M';

                const userProfile = await UserProfile.create({
                    user: user._id || user.id, gender
                });

            })
            .catch(err => console.log('User.create()', err));
    }
    const a = Author.create(authors).catch(err => console.log('Author.create()', err));
    const b = Book.create(books).catch(err => console.log('Book.create()', err));

    await Promise.all([c, a, b]);
};

dummy().then(() => console.log(chalk.redBright('done!'))).catch(err => console.log(err)).finally(() => process.exit(1));



