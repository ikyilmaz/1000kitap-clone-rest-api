import app from './app';
import chalk from 'chalk';
import { DB_CONNECTION_STRING, DB_NAME, HOST, PORT } from './config/config';
import mongoose from 'mongoose';
import type from './types/request';
import { Author } from './models/author/author.model';
import { User } from './models/user/user.model';
import { Category } from './models/category/category.model';
import { Book } from './models/book/book.model';
import { BookExcerpt } from './models/book-excerpt/book-excerpt.model';
import { BookReview } from './models/book-review/book-review.model';
import moment from 'moment';

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(async () => {
        console.log(chalk.blueBright('--> Successfully connected to %s database'), DB_NAME);
        const before = moment();
        await Promise.all(
            [
                Author.init(),
                User.init(),
                Category.init(),
                Book.init(),
                BookExcerpt.init(),
                BookReview.init()
            ]
        ).catch(err => console.error(err));

        console.log(
            chalk.yellowBright('--> All the models are initialized in %s milliseconds'),
            before.diff(moment()).toString().replace('-', '')
        );

        mongoose.set('debug', function(collectionName: any, method: any, query: any, doc: any) {
            console.log('---------QUERY---------');
            console.log(chalk.yellowBright('1) COLLECTION NAME --> %s'), chalk.redBright(collectionName));
            console.log(chalk.yellowBright('2) METHOD --> %s'), chalk.redBright(method));
            console.log(chalk.yellowBright('3) QUERY --> '), query);
            console.log(chalk.yellowBright('4) DOCUMENT --> '), doc);
            console.log('----------END----------');
        });

        app.listen(PORT, HOST, () => console.log(chalk.yellow(`--> Listening on http://${HOST}:${PORT}`)));
    })
    .catch(err => console.error(err));
