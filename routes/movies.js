const moviesRouter = require('express').Router();
const {
  validationDeleteMovie,
  validationCreateMovie,
} = require('../middlewares/validation');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');

// возвращает все сохранённые текущим пользователем фильмы
moviesRouter.get('/movies', getMovies);

// создаёт фильм
moviesRouter.post('/movies', validationCreateMovie, createMovie);

// удаляет сохранённый фильм по id
moviesRouter.delete('/movies/:movieId', validationDeleteMovie, deleteMovie);

module.exports = moviesRouter;
