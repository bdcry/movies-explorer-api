const express = require('express');
const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');
const usersRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const errorRouter = require('./routes/errors');
// const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

mongoose.connect('mongodb://localhost:27017/moviesexplorerdb', {
  useNewUrlParser: true,
}, (err) => {
  if (err) throw err;
  console.log('Connected to MongoDB!');
});

app.use(express.json());

app.post('/signin', validationLogin, login);

app.post('/signup', validationCreateUser, createUser);

app.use('/movies', moviesRouter);
app.use('/users', usersRouter);
app.all('*', errorRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла техническая чоколадка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
