const moviesRouter = require('express').Router();
const {
  validationDeleteMovie,
  validationCreateMovie,
} = require('../middlewares/validation');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');

// возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/', getMovies);

// создаёт фильм
moviesRouter.post('/', validationCreateMovie, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = moviesRouter;
