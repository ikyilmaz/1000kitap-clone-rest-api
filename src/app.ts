import express from 'express';
import morgan from 'morgan';

const app = express(); // Express Engine

app.use(express.json({ limit: '10kb' })); // Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny')); // Logger

// Hello World Message
app.all('/', ((req, res) => res.status(200).send('hello world')));

export default app;
