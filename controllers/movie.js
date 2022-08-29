const Movie = require('../models/movie');

// errors
const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403
const BadRequest = require('../utils/errors/BadRequest'); // 400
const NotFound = require('../utils/errors/NotFound'); // 404

// erorr messages
const { messagesError } = require('../utils/const');

// good codes
const { CORRECT_CODE, CREATE_CODE } = require('../utils/goodCodes'); // 200 201

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(CREATE_CODE).send({
      _id: movie._id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(messagesError.validation));
      }
      return next(err);
    });
};

// возвращает все сохранённые текущим пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFound(messagesError.notFound);
      }
      res.status(CORRECT_CODE).send(movies);
    })
    .catch(next);
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const owner = req.user._id;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound(messagesError.notFoundMovieID);
    })
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        return Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => res.status(CORRECT_CODE).send(deletedMovie))
          .catch(next);
      }
      throw new ForbiddenError(messagesError.forbiddenError);
    })
    .catch(next);
};
