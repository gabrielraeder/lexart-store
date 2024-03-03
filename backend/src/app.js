const express = require('express');
const cors = require('cors');
const ErrorHandler = require('./middlewares/error.middleware');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/', (_req, res) => res.status(200).json({ message: 'SUCCESS' }));
app.use(router);
app.use(ErrorHandler.errorMiddleware);

module.exports = app;
