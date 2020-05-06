import { User } from '../models/user/user.model';
import fs from 'fs';
// @ts-ignore
import { books as jsonBooks } from './books.json';
import { users as jsonUsers } from './users.json';
// @ts-ignore
import { authors as jsonAuthors } from './authors.json';
import { categories as jsonCategories } from './categories.json';
import { Category } from '../models/category/category.model';
import mongoose from 'mongoose';
import { DB_CONNECTION_STRING, DB_NAME } from '../config/config';
import chalk from 'chalk';
import { Book } from '../models/book/book.model';
import { BookExcerpt } from '../models/book-excerpt/book-excerpt.model';
import { BookReview } from '../models/book-review/book-review.model';
import { Author } from '../models/author/author.model';

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
            Book.deleteMany({}).catch(err => console.log('Book.deleteMany', err))
        ]);

        console.log(chalk.redBright('all deleted!'));
    }
    const c = Category.create(jsonCategories).catch(err => console.log('Category.create()', err));
    const u = User.create(jsonUsers).catch(err => console.log('User.create()', err));
    const a = Author.create(jsonAuthors).catch(err => console.log('Author.create()', err));
    const b = Book.create(jsonBooks).catch(err => console.log('Book.create()', err));

    await Promise.all([c, u, a, b]);
};

dummy().then(() => console.log(chalk.redBright('done!'))).catch(err => console.log(err)).finally(() => process.exit(1));




