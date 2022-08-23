const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
      validator: (v) => /(http:\/\/|https:\/\/)(www)*[a-z0-9\S]*/.test(v),
      message: 'Cсылка не подходит :(',
    },
  },
  trailerLink: {
    type: String, // строка
    required: [true, 'Это обязательное поле'], // обязательное поле
    validate: {
      validator: (v) => /(http:\/\/|https:\/\/)(www)*[a-z0-9\S]*/.test(v),
      message: 'Cсылка не подходит :(',
    },
  },
  thumbnail: {
    type: String, // строка
    required: [true, 'Это обязательное поле'], // обязательное поле
    validate: {
      validator: (v) => /(http:\/\/|https:\/\/)(www)*[a-z0-9\S]*/.test(v),
      message: 'Cсылка не подходит :(',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
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

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
