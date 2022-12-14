const mongoose = require('mongoose');

// erorr messages
const { messagesError } = require('../utils/const');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    director: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    duration: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    year: {
      type: Number,
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    description: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    image: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
      validate: {
        validator: (v) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/.test(
          v,
        ),
        message: messagesError.validationUrl,
      },
    },
    trailerLink: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
      validate: {
        validator: (v) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/.test(
          v,
        ),
        message: messagesError.validationUrl,
      },
    },
    thumbnail: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
      validate: {
        validator: (v) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.,~#?&//=!]*$)/.test(
          v,
        ),
        message: messagesError.validationUrl,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    movieId: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    nameRU: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
    nameEN: {
      type: String, // строка
      required: [true, 'Это обязательное поле'], // обязательное поле
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
