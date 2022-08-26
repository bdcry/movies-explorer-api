const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../utils/errors/AuthorizationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String, // строка
    required: [true, 'Это обязательное поле'], // обязательное поле
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: (props) => `${props.value} не является email`,
    },
  },
  password: {
    type: String, // строка
    required: [true, 'Это обязательное поле'], // обязательное поле
    select: false,
  },
  name: {
    type: String, // строка
    required: [true, 'Это обязательное поле'], // обязательное поле
    minlength: [2, 'Должно быть от 2 до 30 символов'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Должно быть от 2 до 30 символов'], // а максимальная — 30 символов
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function func(email, password) {
  return this.findOne({ email })
    .select('+password') // скрываем пароль
    .then((user) => {
      if (!user) {
        throw new AuthorizationError(
          'Похоже, что почта или пароль некорректные!',
        );
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthorizationError(
            'Похоже, что почта или пароль некорректные!',
          );
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
