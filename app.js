require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsRules } = require('./middlewares/cors');
const error = require('./middlewares/error');

const { PORT, MoviesExplorerdb, limiter } = require('./utils/config');

const app = express();

app.use(requestLogger); // подключаем логгер запросов

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.use(corsRules);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(express.json());

app.use('/', routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(error); // собственный обработчик ошибок

mongoose.connect(MoviesExplorerdb, () => {
  console.log(`Connect DB to ${MoviesExplorerdb}`);
});

app.listen(PORT, () => {
  console.log(`Start Server:${PORT}`);
});
