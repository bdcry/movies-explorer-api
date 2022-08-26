const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;

// errors
const BadRequest = require('../utils/errors/BadRequest'); // 400
const AuthorizationError = require('../utils/errors/AuthorizationError'); // 401
const NotFound = require('../utils/errors/NotFound'); // 404
const DuplicateConflictError = require('../utils/errors/DuplicateConflictError'); // 409

// good codes
const { CORRECT_CODE, CREATE_CODE } = require('../utils/goodCodes'); // 200 201

// Создаёт пользователя
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then(() => {
          res.status(CREATE_CODE).send({
            email,
            name,
          });
        })
        .catch((err) => {
          if (err.name === 'BadRequest') {
            throw new BadRequest('Переданы неверные данные');
          }
          if (err.code === 11000) {
            next(new DuplicateConflictError('Указанный email давно отдыхает в базе данных, используйте другой email :)'));
          }
          next(err);
        });
    })
    .catch(next);
};

// Авторизация
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' }); // создали токен
      res.status(CORRECT_CODE).send({ token });
    })
    .catch(() => {
      next(new AuthorizationError('Неверные логин или пароль'));
    });
};

// Возвращает информацию о пользователе
const getUserAbout = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(CORRECT_CODE).send(user))
    .catch(next);
};

// Обновляет информацию о пользователе
const patchUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Нет пользователя с таким i');
    })
    .then((user) => res.status(CORRECT_CODE).send(user))
    .catch((err) => {
      if (err.name === 'BadRequest' || err.name === 'CastError') {
        throw new BadRequest('Неверно указан id пользователя');
      }
      if (err.code === 11000) {
        throw new DuplicateConflictError('Такой email уже занят :(');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  createUser,
  patchUserProfile,
  login,
  getUserAbout,
};
