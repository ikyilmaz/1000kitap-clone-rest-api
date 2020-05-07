import app from './app';
import chalk from 'chalk';
import { DB_CONNECTION_STRING, DB_NAME, HOST, PORT } from './config/config';
import mongoose from 'mongoose';
import type from './types/request';

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(chalk.blueBright('--> Successfully connected to %s database'), DB_NAME);
        app.listen(PORT, HOST, () => console.log(chalk.yellow(`--> Listening on http://${HOST}:${PORT}`)));
    })
    .catch(err => console.error(err));
